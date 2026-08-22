(function () {
  "use strict";

  const BLUR_STEPS = [20, 12, 6, 0];
  const AWARD_POINTS = 10;
  const MAX_TEAMS = 6;

  const state = {
    category: null,
    pool: [],
    usedIndices: new Set(),
    currentPic: null,
    revealLevel: 0,
    picsPlayed: 0
  };

  const screens = {
    setup: document.getElementById("screen-setup"),
    play: document.getElementById("screen-play"),
    summary: document.getElementById("screen-summary"),
    tiebreak: document.getElementById("screen-tiebreak")
  };
  const showScreen = createScreenManager(screens);

  // ---------- Setup: category ----------
  const categoryGrid = document.getElementById("category-grid");
  const btnStart = document.getElementById("btn-start");

  function makeCategoryCard(name) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "theme-btn";
    btn.innerHTML = `<span class="t-icon">${PICTUREGUESS_CATEGORY_ICONS[name] || "🖼️"}</span><span class="t-name">${name}</span>`;
    btn.addEventListener("click", () => {
      state.category = name;
      document.querySelectorAll(".theme-btn").forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
      validateSetup();
    });
    return btn;
  }
  renderGroupedPicker(categoryGrid, { "Pick one": Object.keys(PICTUREGUESS_CATEGORIES) }, makeCategoryCard);

  function validateSetup() {
    btnStart.disabled = !state.category;
  }
  validateSetup();

  // ---------- Setup: teams ----------
  const teamScoreboard = createTeamScoreboard({
    setupContainer: document.getElementById("teams-setup"),
    addBtn: document.getElementById("btn-add-team"),
    scoreboardContainer: document.getElementById("scoreboard"),
    maxTeams: MAX_TEAMS
  });
  teamScoreboard.addTeam("Team 1");
  teamScoreboard.addTeam("Team 2");

  const timerSetup = createTimerSetup({
    mount: document.getElementById("timer-setup"),
    unitLabel: "per step",
    recommended: 4,
    presets: [3, 4, 6, 8],
    defaultEnabled: true
  });

  btnStart.addEventListener("click", () => {
    state.pool = PICTUREGUESS_CATEGORIES[state.category];
    state.usedIndices = new Set();
    state.picsPlayed = 0;
    document.getElementById("category-label").textContent = state.category;
    teamScoreboard.renderScoreboard();
    showScreen("play");
    pickPicture();
  });

  // ---------- Play ----------
  const pictureLoadingEl = document.getElementById("picture-loading");
  const pictureImageEl = document.getElementById("picture-image");
  const pictureFallbackEl = document.getElementById("picture-fallback");
  const pictureFallbackEmojiEl = document.getElementById("picture-fallback-emoji");
  const btnSharpen = document.getElementById("btn-sharpen");
  const btnRevealAnswer = document.getElementById("btn-reveal-answer");
  const answerBlock = document.getElementById("answer-block");
  const answerTextEl = document.getElementById("answer-text");
  const awardRow = document.getElementById("award-row");
  const btnNextPicture = document.getElementById("btn-next-picture");

  const timer = createGameTimer({
    mount: document.getElementById("game-timer"),
    onExpire: () => sharpen()
  });

  // ---------- Wikipedia thumbnail lookup ----------
  // Resolves a `wikiTitle` to a real, currently-live photo via Wikipedia's
  // free REST API (CORS-enabled, no API key needed) instead of hardcoding
  // hotlinked image URLs that could rot if a file gets renamed. Results are
  // cached in-memory so revisiting a picture (Play Again, etc.) never
  // re-fetches.
  const thumbCache = new Map();
  let pictureLoadToken = 0;

  function fetchWikiThumbnail(title) {
    if (thumbCache.has(title)) return Promise.resolve(thumbCache.get(title));
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
    return fetch(url)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        const src = (data && data.thumbnail && data.thumbnail.source) || null;
        thumbCache.set(title, src);
        return src;
      })
      .catch(() => null);
  }

  function showFallback() {
    pictureLoadingEl.classList.add("hidden");
    pictureImageEl.classList.add("hidden");
    pictureImageEl.removeAttribute("src");
    pictureFallbackEmojiEl.textContent = state.currentPic.emoji;
    pictureFallbackEl.classList.remove("hidden");
  }

  function loadPicture(item) {
    const token = ++pictureLoadToken;
    pictureLoadingEl.classList.remove("hidden");
    pictureImageEl.classList.add("hidden");
    pictureFallbackEl.classList.add("hidden");
    pictureImageEl.removeAttribute("src");

    fetchWikiThumbnail(item.wikiTitle).then((src) => {
      if (token !== pictureLoadToken) return; // a later picture already loaded
      if (!src) {
        showFallback();
        return;
      }
      pictureImageEl.onload = () => {
        if (token !== pictureLoadToken) return;
        pictureLoadingEl.classList.add("hidden");
        pictureImageEl.classList.remove("hidden");
      };
      pictureImageEl.onerror = () => {
        if (token !== pictureLoadToken) return;
        showFallback();
      };
      pictureImageEl.alt = `Guess the picture: ${state.category || ""}`.trim();
      pictureImageEl.src = src;
    });
  }

  function applyBlur() {
    const blurCss = `blur(${BLUR_STEPS[state.revealLevel]}px)`;
    pictureImageEl.style.filter = blurCss;
    pictureFallbackEmojiEl.style.filter = blurCss;
    btnSharpen.disabled = state.revealLevel >= BLUR_STEPS.length - 1;
  }

  function startStepTimer() {
    if (timerSetup.isEnabled() && state.revealLevel < BLUR_STEPS.length - 1) {
      timer.start(timerSetup.getSeconds());
    } else {
      timer.hide();
    }
  }

  function pickPicture() {
    const { item } = pickRandomUnused(state.pool, state.usedIndices);
    state.currentPic = item;
    state.revealLevel = 0;
    loadPicture(item);
    applyBlur();

    answerBlock.classList.add("hidden");
    awardRow.classList.add("hidden");
    btnNextPicture.classList.add("hidden");
    btnSharpen.classList.remove("hidden");
    btnRevealAnswer.classList.remove("hidden");

    startStepTimer();
  }

  function sharpen() {
    timer.hide();
    if (state.revealLevel < BLUR_STEPS.length - 1) {
      state.revealLevel++;
      applyBlur();
    }
    startStepTimer();
  }
  btnSharpen.addEventListener("click", sharpen);

  function revealAnswer() {
    timer.hide();
    state.picsPlayed++;
    state.revealLevel = BLUR_STEPS.length - 1;
    applyBlur();
    answerTextEl.textContent = state.currentPic.answer;
    answerBlock.classList.remove("hidden");
    btnSharpen.classList.add("hidden");
    btnRevealAnswer.classList.add("hidden");
    btnNextPicture.classList.remove("hidden");

    const teams = teamScoreboard.getTeams();
    awardRow.innerHTML = "";
    teams.forEach((team, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "award-btn";
      btn.innerHTML = `<span class="sw" style="background:${team.color}"></span> +${AWARD_POINTS} ${team.name}`;
      btn.addEventListener("click", () => teamScoreboard.award(i, AWARD_POINTS));
      awardRow.appendChild(btn);
    });
    awardRow.classList.remove("hidden");
  }
  btnRevealAnswer.addEventListener("click", revealAnswer);

  btnNextPicture.addEventListener("click", pickPicture);

  // ---------- Summary ----------
  function goToSummary() {
    timer.hide();
    document.getElementById("summary-text").textContent = `You made it through ${state.picsPlayed} picture${state.picsPlayed === 1 ? "" : "s"}.`;
    resolveSession({
      entrants: teamScoreboard.getTeams(),
      mount: document.getElementById("tiebreak-mount"),
      onEnter: () => showScreen("tiebreak"),
      onResolved: (result) => {
        renderFinalScores(result);
        showScreen("summary");
      }
    });
  }

  function renderFinalScores(result) {
    const medals = ["🥇", "🥈", "🥉"];
    const finalScores = document.getElementById("final-scores");
    finalScores.innerHTML = "";
    result.ranked.forEach((team, i) => {
      const row = document.createElement("div");
      row.className = "result-row";
      if (result.winner === team && team.score > 0) row.classList.add("result-winner");
      row.innerHTML = `<span class="result-medal">${medals[i] || "🎗️"}</span><span class="result-swatch" style="background:${team.color}"></span><span class="result-name">${team.name}</span><span class="result-score">${team.score} pts</span>`;
      finalScores.appendChild(row);
    });
    if (result.tiebreak) {
      const note = document.createElement("p");
      note.className = "screen-sub";
      note.textContent = result.shared
        ? "The tie held — the group agreed to share the win."
        : `Tie-breaker settled it in ${result.tiebreak.rounds} round${result.tiebreak.rounds === 1 ? "" : "s"}.`;
      finalScores.appendChild(note);
    }
  }

  document.getElementById("btn-end-session").addEventListener("click", goToSummary);

  document.getElementById("btn-play-again").addEventListener("click", () => {
    state.usedIndices = new Set();
    state.picsPlayed = 0;
    teamScoreboard.resetScores();
    showScreen("play");
    pickPicture();
  });

  document.getElementById("btn-new-game").addEventListener("click", () => {
    state.category = null;
    document.querySelectorAll(".theme-btn").forEach((b) => b.classList.remove("selected"));
    validateSetup();
    showScreen("setup");
  });
})();
