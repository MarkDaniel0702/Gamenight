(function () {
  "use strict";

  const MIN_PLAYERS = 2;
  const MAX_PLAYERS = 10;

  const state = {
    names: [],
    activeIndices: [],
    turnPos: 0,
    eliminationMode: true,
    category: "",
    usedCategoryIndices: new Set()
  };

  const screens = {
    setup: document.getElementById("screen-setup"),
    play: document.getElementById("screen-play"),
    summary: document.getElementById("screen-summary")
  };
  const showScreen = createScreenManager(screens);

  const roster = createRoster({
    countDisplay: document.getElementById("count-display"),
    minusBtn: document.getElementById("count-minus"),
    plusBtn: document.getElementById("count-plus"),
    namesContainer: document.getElementById("names-grid"),
    min: MIN_PLAYERS,
    max: MAX_PLAYERS,
    initialCount: 4
  });

  const eliminationToggle = document.getElementById("elimination-toggle");
  const categoryNameEl = document.getElementById("category-name");
  const turnStatusEl = document.getElementById("turn-status");

  const timerSetup = createTimerSetup({
    mount: document.getElementById("timer-setup"),
    unitLabel: "per turn",
    recommended: 10,
    presets: [5, 10, 15, 20],
    defaultEnabled: true
  });

  const timer = createGameTimer({
    mount: document.getElementById("game-timer"),
    onExpire: () => handleStuck()
  });

  function pickCategory() {
    const { item } = pickRandomUnused(CATEGORIES_LIST, state.usedCategoryIndices);
    state.category = item;
    categoryNameEl.textContent = item;
  }

  document.getElementById("btn-start").addEventListener("click", () => {
    state.names = roster.getNames();
    state.eliminationMode = eliminationToggle.checked;
    state.activeIndices = state.names.map((_, i) => i);
    state.turnPos = 0;
    pickCategory();
    showScreen("play");
    startTurn();
  });

  function startTurn() {
    const idx = state.activeIndices[state.turnPos];
    turnStatusEl.textContent = `🎙️ ${state.names[idx]}'s turn!`;
    if (timerSetup.isEnabled()) {
      timer.start(timerSetup.getSeconds());
    } else {
      timer.hide();
    }
  }

  function advanceTurn() {
    state.turnPos = (state.turnPos + 1) % state.activeIndices.length;
    startTurn();
  }

  function handleStuck() {
    timer.hide();
    if (state.eliminationMode) {
      const outIdx = state.activeIndices[state.turnPos];
      state.activeIndices.splice(state.turnPos, 1);
      if (state.activeIndices.length === 1) {
        showSummary(state.names[state.activeIndices[0]]);
        return;
      }
      if (state.turnPos >= state.activeIndices.length) state.turnPos = 0;
      startTurn();
    } else {
      advanceTurn();
    }
  }

  document.getElementById("btn-nailed-it").addEventListener("click", () => {
    timer.hide();
    advanceTurn();
  });

  document.getElementById("btn-stuck").addEventListener("click", handleStuck);

  document.getElementById("btn-new-category").addEventListener("click", () => {
    pickCategory();
    state.turnPos = 0;
    startTurn();
  });

  document.getElementById("btn-end-round").addEventListener("click", () => showSummary(null));

  // ---------- Summary ----------
  function showSummary(winnerName) {
    timer.hide();
    const titleEl = document.getElementById("summary-title");
    const textEl = document.getElementById("summary-text");
    if (winnerName) {
      titleEl.textContent = "🏆 We Have a Winner!";
      textEl.textContent = `${winnerName} is the last one standing!`;
    } else {
      titleEl.textContent = "Round Complete!";
      textEl.textContent = "Great round! Ready for another?";
    }
    showScreen("summary");
  }

  document.getElementById("btn-play-again").addEventListener("click", () => {
    state.activeIndices = state.names.map((_, i) => i);
    state.turnPos = 0;
    pickCategory();
    showScreen("play");
    startTurn();
  });

  document.getElementById("btn-new-game").addEventListener("click", () => {
    state.usedCategoryIndices = new Set();
    showScreen("setup");
  });
})();
