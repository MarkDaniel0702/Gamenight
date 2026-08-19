(function () {
  "use strict";

  const AWARD_POINTS = 10;
  const MAX_TEAMS = 6;

  const state = {
    category: null,
    pool: [],
    usedIndices: new Set(),
    currentSong: null,
    clueLevel: 1,
    songsPlayed: 0
  };

  const screens = {
    setup: document.getElementById("screen-setup"),
    play: document.getElementById("screen-play"),
    summary: document.getElementById("screen-summary")
  };
  const showScreen = createScreenManager(screens);

  // ---------- Setup: category ----------
  const categoryGrid = document.getElementById("category-grid");
  const btnStart = document.getElementById("btn-start");

  function makeCategoryCard(name) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "theme-btn";
    btn.innerHTML = `<span class="t-icon">${GUESSTHESONG_CATEGORY_ICONS[name] || "🎵"}</span><span class="t-name">${name}</span>`;
    btn.addEventListener("click", () => {
      state.category = name;
      document.querySelectorAll(".theme-btn").forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
      validateSetup();
    });
    return btn;
  }
  renderGroupedPicker(categoryGrid, { "Pick one": Object.keys(GUESSTHESONG_CATEGORIES) }, makeCategoryCard);

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
    unitLabel: "per clue",
    recommended: 12,
    presets: [8, 12, 15, 20],
    defaultEnabled: true
  });

  btnStart.addEventListener("click", () => {
    state.pool = GUESSTHESONG_CATEGORIES[state.category];
    state.usedIndices = new Set();
    state.songsPlayed = 0;
    document.getElementById("category-label").textContent = state.category;
    teamScoreboard.renderScoreboard();
    showScreen("play");
    pickSong();
  });

  // ---------- Play ----------
  const clueListEl = document.getElementById("clue-list");
  const clueCountLabel = document.getElementById("clue-count-label");
  const btnNextClue = document.getElementById("btn-next-clue");
  const btnRevealAnswer = document.getElementById("btn-reveal-answer");
  const answerBlock = document.getElementById("answer-block");
  const answerTextEl = document.getElementById("answer-text");
  const awardRow = document.getElementById("award-row");
  const btnNextSong = document.getElementById("btn-next-song");

  const timer = createGameTimer({
    mount: document.getElementById("game-timer"),
    onExpire: () => {
      if (state.clueLevel < state.currentSong.clues.length) {
        advanceClue();
      } else {
        revealAnswer();
      }
    }
  });

  function renderClues() {
    clueListEl.innerHTML = "";
    for (let i = 0; i < state.clueLevel; i++) {
      const div = document.createElement("div");
      div.className = "clue-item" + (i === 0 ? " clue-emoji" : "");
      div.textContent = state.currentSong.clues[i];
      clueListEl.appendChild(div);
    }
    clueCountLabel.textContent = `CLUE ${state.clueLevel} OF ${state.currentSong.clues.length}`;
    btnNextClue.disabled = state.clueLevel >= state.currentSong.clues.length;
  }

  function startClueTimer() {
    if (timerSetup.isEnabled()) {
      timer.start(timerSetup.getSeconds());
    } else {
      timer.hide();
    }
  }

  function pickSong() {
    const { item } = pickRandomUnused(state.pool, state.usedIndices);
    state.currentSong = item;
    state.clueLevel = 1;
    renderClues();

    answerBlock.classList.add("hidden");
    awardRow.classList.add("hidden");
    btnNextSong.classList.add("hidden");
    btnNextClue.classList.remove("hidden");
    btnRevealAnswer.classList.remove("hidden");

    startClueTimer();
  }

  function advanceClue() {
    if (state.clueLevel >= state.currentSong.clues.length) return;
    state.clueLevel++;
    renderClues();
    startClueTimer();
  }
  btnNextClue.addEventListener("click", () => {
    timer.hide();
    advanceClue();
  });

  function revealAnswer() {
    timer.hide();
    state.songsPlayed++;
    answerTextEl.textContent = state.currentSong.answer;
    answerBlock.classList.remove("hidden");
    btnNextClue.classList.add("hidden");
    btnRevealAnswer.classList.add("hidden");
    btnNextSong.classList.remove("hidden");

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

  btnNextSong.addEventListener("click", pickSong);

  // ---------- Summary ----------
  function goToSummary() {
    timer.hide();
    document.getElementById("summary-text").textContent = `You made it through ${state.songsPlayed} song${state.songsPlayed === 1 ? "" : "s"}.`;
    const ranked = teamScoreboard.getTeams().slice().sort((a, b) => b.score - a.score);
    const medals = ["🥇", "🥈", "🥉"];
    const finalScores = document.getElementById("final-scores");
    finalScores.innerHTML = "";
    ranked.forEach((team, i) => {
      const row = document.createElement("div");
      row.className = "result-row";
      if (i === 0 && team.score > 0) row.classList.add("result-winner");
      row.innerHTML = `<span class="result-medal">${medals[i] || "🎗️"}</span><span class="result-swatch" style="background:${team.color}"></span><span class="result-name">${team.name}</span><span class="result-score">${team.score} pts</span>`;
      finalScores.appendChild(row);
    });
    showScreen("summary");
  }

  document.getElementById("btn-end-session").addEventListener("click", goToSummary);

  document.getElementById("btn-play-again").addEventListener("click", () => {
    state.usedIndices = new Set();
    state.songsPlayed = 0;
    teamScoreboard.resetScores();
    showScreen("play");
    pickSong();
  });

  document.getElementById("btn-new-game").addEventListener("click", () => {
    state.category = null;
    document.querySelectorAll(".theme-btn").forEach((b) => b.classList.remove("selected"));
    validateSetup();
    showScreen("setup");
  });
})();
