(function () {
  "use strict";

  const MIN_PLAYERS = 2;
  const MAX_PLAYERS = 10;
  const MIN_CLUES = 3;
  const MAX_CLUES = 8;

  const state = {
    category: null,
    pool: [],
    usedIndices: new Set(),
    names: [],
    scores: [],
    turnIndex: 0,
    maxClues: 5,
    cluesUsed: 0,
    currentWord: "",
    lastResult: ""
  };

  const screens = {
    setup: document.getElementById("screen-setup"),
    pass: document.getElementById("screen-pass"),
    clue: document.getElementById("screen-clue"),
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
    btn.innerHTML = `<span class="t-icon">${PASSWORD_CATEGORY_ICONS[name] || "🔐"}</span><span class="t-name">${name}</span>`;
    btn.addEventListener("click", () => {
      state.category = name;
      document.querySelectorAll(".theme-btn").forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
      validateSetup();
    });
    return btn;
  }
  renderGroupedPicker(categoryGrid, { "Pick one": Object.keys(PASSWORD_CATEGORIES) }, makeCategoryCard);

  // ---------- Setup: roster ----------
  const roster = createRoster({
    countDisplay: document.getElementById("count-display"),
    minusBtn: document.getElementById("count-minus"),
    plusBtn: document.getElementById("count-plus"),
    namesContainer: document.getElementById("names-grid"),
    min: MIN_PLAYERS,
    max: MAX_PLAYERS,
    initialCount: 4
  });

  // ---------- Setup: max clues stepper ----------
  const cluesDisplay = document.getElementById("clues-display");
  const cluesMinus = document.getElementById("clues-minus");
  const cluesPlus = document.getElementById("clues-plus");
  let maxCluesSetting = 5;
  function renderCluesStepper() {
    cluesDisplay.textContent = maxCluesSetting;
    cluesMinus.disabled = maxCluesSetting <= MIN_CLUES;
    cluesPlus.disabled = maxCluesSetting >= MAX_CLUES;
  }
  cluesMinus.addEventListener("click", () => {
    if (maxCluesSetting > MIN_CLUES) { maxCluesSetting--; renderCluesStepper(); }
  });
  cluesPlus.addEventListener("click", () => {
    if (maxCluesSetting < MAX_CLUES) { maxCluesSetting++; renderCluesStepper(); }
  });
  renderCluesStepper();

  const timerSetup = createTimerSetup({
    mount: document.getElementById("timer-setup"),
    unitLabel: "per clue",
    recommended: 15,
    presets: [10, 15, 20, 30],
    defaultEnabled: true
  });

  function validateSetup() {
    btnStart.disabled = !state.category;
  }
  validateSetup();

  btnStart.addEventListener("click", () => {
    state.pool = PASSWORD_CATEGORIES[state.category];
    state.usedIndices = new Set();
    state.names = roster.getNames();
    state.scores = state.names.map(() => 0);
    state.turnIndex = 0;
    state.maxClues = maxCluesSetting;
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

  // ---------- Clue giving ----------
  const wordTextEl = document.getElementById("word-text");
  const clueStatusEl = document.getElementById("clue-status");
  const btnNextClue = document.getElementById("btn-next-clue");

  const timer = createGameTimer({
    mount: document.getElementById("game-timer"),
    onExpire: () => {
      if (state.cluesUsed < state.maxClues) {
        giveNextClue();
      } else {
        giveUp();
      }
    }
  });

  function updateClueStatus() {
    clueStatusEl.textContent = `Clue ${state.cluesUsed} of ${state.maxClues}`;
    btnNextClue.disabled = state.cluesUsed >= state.maxClues;
  }

  function startClueTimer() {
    if (timerSetup.isEnabled()) {
      timer.start(timerSetup.getSeconds());
    } else {
      timer.hide();
    }
  }

  document.getElementById("btn-reveal").addEventListener("click", () => {
    const { item } = pickRandomUnused(state.pool, state.usedIndices);
    state.currentWord = item;
    state.cluesUsed = 1;
    wordTextEl.textContent = item;
    updateClueStatus();
    showScreen("clue");
    startClueTimer();
  });

  function giveNextClue() {
    if (state.cluesUsed >= state.maxClues) return;
    state.cluesUsed++;
    updateClueStatus();
    startClueTimer();
  }
  btnNextClue.addEventListener("click", giveNextClue);

  document.getElementById("btn-got-it").addEventListener("click", () => {
    timer.hide();
    const points = Math.max(state.maxClues - state.cluesUsed + 1, 1);
    state.scores[state.turnIndex] += points;
    finishTurn(`✅ Guessed after ${state.cluesUsed} clue${state.cluesUsed === 1 ? "" : "s"}! +${points} pts`);
  });

  function giveUp() {
    timer.hide();
    finishTurn(`The word was "${state.currentWord}".`);
  }
  document.getElementById("btn-give-up").addEventListener("click", giveUp);

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
