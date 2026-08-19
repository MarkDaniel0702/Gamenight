(function () {
  "use strict";

  const MIN_PLAYERS = 3;
  const MAX_PLAYERS = 10;

  const state = {
    category: null,
    pool: [],
    usedIndices: new Set(),
    names: [],
    scores: [],
    turnIndex: 0,
    currentWord: "",
    lastResult: ""
  };

  const screens = {
    setup: document.getElementById("screen-setup"),
    pass: document.getElementById("screen-pass"),
    act: document.getElementById("screen-act"),
    summary: document.getElementById("screen-summary"),
    tiebreak: document.getElementById("screen-tiebreak")
  };
  const showScreen = createScreenManager(screens);

  // ---------- Setup ----------
  const categoryGrid = document.getElementById("category-grid");
  const btnStart = document.getElementById("btn-start");

  const timerSetup = createTimerSetup({
    mount: document.getElementById("timer-setup"),
    unitLabel: "per round",
    recommended: 60,
    presets: [30, 45, 60, 90],
    defaultEnabled: true
  });

  function makeCategoryCard(name) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "theme-btn";
    btn.innerHTML = `<span class="t-icon">${CHARADES_CATEGORY_ICONS[name] || "🎭"}</span><span class="t-name">${name}</span>`;
    btn.addEventListener("click", () => {
      state.category = name;
      document.querySelectorAll(".theme-btn").forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
      validateSetup();
    });
    return btn;
  }
  renderGroupedPicker(categoryGrid, { "Pick one": Object.keys(CHARADES_CATEGORIES) }, makeCategoryCard);

  const roster = createRoster({
    countDisplay: document.getElementById("count-display"),
    minusBtn: document.getElementById("count-minus"),
    plusBtn: document.getElementById("count-plus"),
    namesContainer: document.getElementById("names-grid"),
    min: MIN_PLAYERS,
    max: MAX_PLAYERS,
    initialCount: 4
  });

  function validateSetup() {
    btnStart.disabled = !state.category;
  }
  validateSetup();

  btnStart.addEventListener("click", () => {
    state.pool = CHARADES_CATEGORIES[state.category];
    state.usedIndices = new Set();
    state.names = roster.getNames();
    state.scores = state.names.map(() => 0);
    state.turnIndex = 0;
    state.lastResult = "";
    showScreen("pass");
    renderPass();
  });

  // ---------- Pass screen ----------
  const prevResultEl = document.getElementById("prev-result");
  const passNameEl = document.getElementById("pass-name");

  function renderPass() {
    passNameEl.textContent = state.names[state.turnIndex];
    if (state.lastResult) {
      prevResultEl.textContent = state.lastResult;
      prevResultEl.classList.remove("hidden");
    } else {
      prevResultEl.classList.add("hidden");
    }
  }

  // ---------- Acting ----------
  const actorNameEl = document.getElementById("actor-name");
  const wordTextEl = document.getElementById("word-text");

  const timer = createGameTimer({
    mount: document.getElementById("game-timer"),
    onExpire: () => finishTurn(`⏰ Time's up! The word was "${state.currentWord}".`)
  });

  document.getElementById("btn-reveal").addEventListener("click", () => {
    const { item } = pickRandomUnused(state.pool, state.usedIndices);
    state.currentWord = item;
    actorNameEl.textContent = state.names[state.turnIndex];
    wordTextEl.textContent = item;
    showScreen("act");
    if (timerSetup.isEnabled()) {
      timer.start(timerSetup.getSeconds());
    } else {
      timer.hide();
    }
  });

  document.getElementById("btn-correct").addEventListener("click", () => {
    timer.hide();
    state.scores[state.turnIndex] += 1;
    finishTurn(`✅ ${state.names[state.turnIndex]} got it! (+1 point)`);
  });

  document.getElementById("btn-skip").addEventListener("click", () => {
    timer.hide();
    finishTurn(`⏭️ Skipped "${state.currentWord}".`);
  });

  function finishTurn(resultText) {
    state.lastResult = resultText;
    state.turnIndex++;
    if (state.turnIndex >= state.names.length) {
      showSummary();
    } else {
      showScreen("pass");
      renderPass();
    }
  }

  // ---------- Summary ----------
  function showSummary() {
    const ranked = state.names.map((name, i) => ({ name, score: state.scores[i] }));
    resolveSession({
      entrants: ranked,
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
    result.ranked.forEach((entry, i) => {
      const row = document.createElement("div");
      row.className = "result-row";
      if (result.winner === entry && entry.score > 0) row.classList.add("result-winner");
      row.innerHTML = `<span class="result-medal">${medals[i] || "🎗️"}</span><span class="result-name">${entry.name}</span><span class="result-score">${entry.score} pt${entry.score === 1 ? "" : "s"}</span>`;
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

  document.getElementById("btn-play-again").addEventListener("click", () => {
    state.usedIndices = new Set();
    state.scores = state.names.map(() => 0);
    state.turnIndex = 0;
    state.lastResult = "";
    showScreen("pass");
    renderPass();
  });

  document.getElementById("btn-new-game").addEventListener("click", () => {
    state.category = null;
    document.querySelectorAll(".theme-btn").forEach((b) => b.classList.remove("selected"));
    validateSetup();
    showScreen("setup");
  });
})();
