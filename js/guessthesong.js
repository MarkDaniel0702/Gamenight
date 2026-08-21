(function () {
  "use strict";

  const MAX_TEAMS = 6;

  const state = {
    category: null,
    pool: [],
    usedIndices: new Set(),
    currentSong: null,
    clueLevel: 1,
    songsPlayed: 0,
    themeComplete: false,
    maxScore: 0
  };

  const screens = {
    setup: document.getElementById("screen-setup"),
    play: document.getElementById("screen-play"),
    summary: document.getElementById("screen-summary"),
    tiebreak: document.getElementById("screen-tiebreak"),
    themeComplete: document.getElementById("screen-theme-complete")
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
    state.themeComplete = false;
    state.maxScore = state.pool.reduce((sum, song) => sum + song.pointValue, 0);
    document.getElementById("category-label").textContent = state.category;
    teamScoreboard.renderScoreboard();
    showScreen("play");
    pickSong();
  });

  // ---------- Optional YouTube clip player ----------
  // Loads the official YouTube IFrame Player API on first use. During the
  // clue phase the player is mounted but visually hidden (1px, opacity 0) so
  // audio can play without exposing the title, thumbnail, or video frame —
  // only custom Play/Pause/Replay controls are shown. At reveal time the
  // frame expands into a normal video player. Songs without a `youtubeId`
  // never touch any of this — the clip-player element stays hidden.
  let ytApiPromise = null;
  function loadYouTubeAPI() {
    if (window.YT && window.YT.Player) return Promise.resolve(window.YT);
    if (ytApiPromise) return ytApiPromise;
    ytApiPromise = new Promise((resolve) => {
      const prevReady = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof prevReady === "function") prevReady();
        resolve(window.YT);
      };
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      tag.onerror = () => { ytApiPromise = null; };
      document.head.appendChild(tag);
    });
    return ytApiPromise;
  }

  const clipPlayerEl = document.getElementById("clip-player");
  const clipFrameMount = document.getElementById("clip-yt-mount");
  const clipBadge = document.getElementById("clip-badge");
  const btnClipPlay = document.getElementById("btn-clip-play");
  const btnClipPause = document.getElementById("btn-clip-pause");
  const btnClipReplay = document.getElementById("btn-clip-replay");
  const clipFallback = document.getElementById("clip-fallback");
  const clipProgress = document.getElementById("clip-progress");
  const clipProgressFill = document.getElementById("clip-progress-fill");

  let ytPlayer = null;
  let clipWatchdog = null;
  let clipLoadToken = 0; // guards against a slow API load landing after the song changed

  function stopClipWatchdog() {
    if (clipWatchdog) {
      clearInterval(clipWatchdog);
      clipWatchdog = null;
    }
  }

  function setClipControlsEnabled(enabled) {
    btnClipPlay.disabled = !enabled;
    btnClipReplay.disabled = !enabled;
  }

  function destroyClipPlayer() {
    clipLoadToken++;
    stopClipWatchdog();
    if (ytPlayer) {
      try { ytPlayer.destroy(); } catch (e) { /* already gone */ }
      ytPlayer = null;
    }
    clipFrameMount.innerHTML = "";
    clipPlayerEl.classList.add("hidden");
    clipPlayerEl.dataset.state = "compact";
    clipFallback.classList.add("hidden");
    clipBadge.classList.remove("hidden");
    btnClipPlay.classList.remove("hidden");
    btnClipPause.classList.add("hidden");
    btnClipReplay.classList.remove("hidden");
    btnClipPlay.textContent = "⏳ Loading…";
    setClipControlsEnabled(false);
    clipProgress.classList.add("hidden");
    clipProgressFill.style.width = "0%";
  }

  function startClipWatchdog(song) {
    stopClipWatchdog();
    if (!song.clipDuration) return;
    const start = song.clipStart || 0;
    const end = start + song.clipDuration;
    clipWatchdog = setInterval(() => {
      if (!ytPlayer || typeof ytPlayer.getCurrentTime !== "function") return;
      const t = ytPlayer.getCurrentTime();
      if (t >= end) {
        ytPlayer.pauseVideo();
        ytPlayer.seekTo(start, true);
        clipProgressFill.style.width = "0%";
        stopClipWatchdog();
      } else {
        const frac = Math.max(0, Math.min(1, (t - start) / song.clipDuration));
        clipProgressFill.style.width = `${frac * 100}%`;
      }
    }, 250);
  }

  function setupClipPlayer(song) {
    destroyClipPlayer();
    if (!song.youtubeId) return;

    const token = clipLoadToken;
    clipPlayerEl.classList.remove("hidden");
    clipProgress.classList.toggle("hidden", !song.clipDuration);

    loadYouTubeAPI().then((YT) => {
      if (token !== clipLoadToken) return; // song moved on while the API was loading
      const mountEl = document.createElement("div");
      clipFrameMount.appendChild(mountEl);
      const start = song.clipStart || 0;
      ytPlayer = new YT.Player(mountEl, {
        videoId: song.youtubeId,
        playerVars: {
          start,
          controls: 0,
          disablekb: 1,
          modestbranding: 1,
          rel: 0,
          iv_load_policy: 3,
          fs: 0,
          playsinline: 1
        },
        events: {
          onReady: () => {
            if (token !== clipLoadToken) return;
            btnClipPlay.textContent = "▶️ Play";
            setClipControlsEnabled(true);
            // Handles the rare case where the answer was revealed before this
            // (slow) API/player load finished — catch the frame up to match.
            const answerBlockEl = document.getElementById("answer-block");
            if (answerBlockEl && !answerBlockEl.classList.contains("hidden")) {
              clipPlayerEl.dataset.state = "revealed";
            }
          },
          onError: () => {
            if (token !== clipLoadToken) return;
            // Owner disabled embedding, video removed, etc. — fall back
            // gracefully instead of leaving a broken/blank player.
            clipPlayerEl.classList.remove("hidden");
            clipPlayerEl.dataset.state = "compact";
            clipFallback.classList.remove("hidden");
            btnClipPlay.classList.add("hidden");
            btnClipPause.classList.add("hidden");
            btnClipReplay.classList.add("hidden");
            clipBadge.classList.add("hidden");
            clipProgress.classList.add("hidden");
          },
          onStateChange: (e) => {
            if (token !== clipLoadToken) return;
            if (e.data === YT.PlayerState.PLAYING) {
              btnClipPlay.classList.add("hidden");
              btnClipPause.classList.remove("hidden");
              startClipWatchdog(song);
            } else if (e.data === YT.PlayerState.PAUSED || e.data === YT.PlayerState.ENDED) {
              btnClipPlay.classList.remove("hidden");
              btnClipPause.classList.add("hidden");
              if (e.data === YT.PlayerState.ENDED) stopClipWatchdog();
            }
          }
        }
      });
    });
  }

  function revealClipPlayer() {
    if (!state.currentSong || !state.currentSong.youtubeId || !ytPlayer) return;
    clipPlayerEl.dataset.state = "revealed";
  }

  btnClipPlay.addEventListener("click", () => {
    if (ytPlayer && typeof ytPlayer.playVideo === "function") ytPlayer.playVideo();
  });
  btnClipPause.addEventListener("click", () => {
    if (ytPlayer && typeof ytPlayer.pauseVideo === "function") ytPlayer.pauseVideo();
  });
  btnClipReplay.addEventListener("click", () => {
    if (!ytPlayer) return;
    const start = (state.currentSong && state.currentSong.clipStart) || 0;
    ytPlayer.seekTo(start, true);
    ytPlayer.playVideo();
  });

  // ---------- Play ----------
  const clueListEl = document.getElementById("clue-list");
  const clueCountLabel = document.getElementById("clue-count-label");
  const pointValueBadge = document.getElementById("point-value-badge");
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
    setupClipPlayer(item);
    pointValueBadge.textContent = `💰 ${item.pointValue} PTS`;

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
    revealClipPlayer();
    btnNextClue.classList.add("hidden");
    btnRevealAnswer.classList.add("hidden");
    btnNextSong.classList.remove("hidden");

    const points = state.currentSong.pointValue;
    const teams = teamScoreboard.getTeams();
    awardRow.innerHTML = "";
    teams.forEach((team, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "award-btn";
      btn.innerHTML = `<span class="sw" style="background:${team.color}"></span> +${points} ${team.name}`;
      btn.addEventListener("click", () => teamScoreboard.award(i, points));
      awardRow.appendChild(btn);
    });
    awardRow.classList.remove("hidden");
  }
  btnRevealAnswer.addEventListener("click", revealAnswer);

  function checkThemeComplete() {
    return state.usedIndices.size === state.pool.length;
  }

  function goToThemeComplete() {
    timer.hide();
    destroyClipPlayer();
    state.themeComplete = true;

    const message = `You've completed all ${state.pool.length} song${state.pool.length === 1 ? "" : "s"} in this theme!`;
    document.getElementById("theme-complete-message").textContent = message;

    const statsHtml = `
      <div class="stat-item">
        <span class="stat-label">Theme</span>
        <span class="stat-value">${state.category}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">Songs Completed</span>
        <span class="stat-value">${state.songsPlayed} / ${state.pool.length}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">Maximum Possible</span>
        <span class="stat-value">${state.maxScore} pts</span>
      </div>
    `;
    document.getElementById("theme-complete-stats").innerHTML = statsHtml;

    resolveSession({
      entrants: teamScoreboard.getTeams(),
      mount: document.getElementById("tiebreak-mount"),
      onEnter: () => showScreen("tiebreak"),
      onResolved: (result) => {
        renderThemeScores(result);
        showScreen("themeComplete");
      }
    });
  }

  function renderThemeScores(result) {
    const medals = ["🥇", "🥈", "🥉"];
    const themeScores = document.getElementById("theme-complete-scores");
    themeScores.innerHTML = "";
    result.ranked.forEach((team, i) => {
      const row = document.createElement("div");
      row.className = "result-row";
      if (result.winner === team && team.score > 0) row.classList.add("result-winner");
      row.innerHTML = `<span class="result-medal">${medals[i] || "🎗️"}</span><span class="result-swatch" style="background:${team.color}"></span><span class="result-name">${team.name}</span><span class="result-score">${team.score} pts</span>`;
      themeScores.appendChild(row);
    });
    if (result.tiebreak) {
      const note = document.createElement("p");
      note.className = "screen-sub";
      note.textContent = result.shared
        ? "The tie held — the group agreed to share the win."
        : `Tie-breaker settled it in ${result.tiebreak.rounds} round${result.tiebreak.rounds === 1 ? "" : "s"}.`;
      themeScores.appendChild(note);
    }
  }

  btnNextSong.addEventListener("click", () => {
    if (checkThemeComplete()) {
      goToThemeComplete();
    } else {
      pickSong();
    }
  });

  // ---------- Summary ----------
  function goToSummary() {
    timer.hide();
    destroyClipPlayer();
    document.getElementById("summary-text").textContent = `You made it through ${state.songsPlayed} song${state.songsPlayed === 1 ? "" : "s"}.`;
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
    state.songsPlayed = 0;
    state.themeComplete = false;
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

  document.getElementById("btn-restart-theme").addEventListener("click", () => {
    state.usedIndices = new Set();
    state.songsPlayed = 0;
    state.themeComplete = false;
    teamScoreboard.resetScores();
    showScreen("play");
    pickSong();
  });

  document.getElementById("btn-new-theme").addEventListener("click", () => {
    state.category = null;
    state.themeComplete = false;
    document.querySelectorAll(".theme-btn").forEach((b) => b.classList.remove("selected"));
    validateSetup();
    showScreen("setup");
  });
})();
