(function () {
  "use strict";

  const MIN_PLAYERS = 3;
  const MAX_PLAYERS = 10;
  const TIMER_SECONDS = 60;

  const state = {
    category: null,
    names: [],
    characters: [],
    turnIndex: 0,
    timerEnabled: true,
    lastResult: ""
  };

  const screens = {
    setup: document.getElementById("screen-setup"),
    pass: document.getElementById("screen-pass"),
    reveal: document.getElementById("screen-reveal"),
    summary: document.getElementById("screen-summary")
  };
  const showScreen = createScreenManager(screens);

  // ---------- Setup ----------
  const categoryGrid = document.getElementById("category-grid");
  const btnStart = document.getElementById("btn-start");
  const timerToggle = document.getElementById("timer-toggle");

  function makeCategoryCard(name) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "theme-btn";
    btn.innerHTML = `<span class="t-icon">${WHOAMI_CATEGORY_ICONS[name] || "🎭"}</span><span class="t-name">${name}</span>`;
    btn.addEventListener("click", () => {
      state.category = name;
      document.querySelectorAll(".theme-btn").forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
      validateSetup();
    });
    return btn;
  }
  renderGroupedPicker(categoryGrid, { "Pick one": Object.keys(WHOAMI_CATEGORIES) }, makeCategoryCard);

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

  function dealCharacters() {
    const pool = shuffle(WHOAMI_CATEGORIES[state.category]);
    state.names = roster.getNames();
    state.characters = state.names.map((_, i) => pool[i % pool.length]);
  }

  btnStart.addEventListener("click", () => {
    state.timerEnabled = timerToggle.checked;
    dealCharacters();
    state.turnIndex = 0;
    state.lastResult = "";
    showScreen("pass");
    renderPassScreen();
  });

  // ---------- Pass screen ----------
  const prevResultEl = document.getElementById("prev-result");
  const passNameEl = document.getElementById("pass-name");
  const passName2El = document.getElementById("pass-name-2");

  function renderPassScreen() {
    const name = state.names[state.turnIndex];
    passNameEl.textContent = name;
    passName2El.textContent = name;
    if (state.lastResult) {
      prevResultEl.textContent = state.lastResult;
      prevResultEl.classList.remove("hidden");
    } else {
      prevResultEl.classList.add("hidden");
    }
  }

  // ---------- Reveal / guessing ----------
  const guesserNameEl = document.getElementById("guesser-name");
  const characterTextEl = document.getElementById("character-text");
  const revealTimerEl = document.getElementById("reveal-timer");

  const timer = createTimer({
    seconds: TIMER_SECONDS,
    onTick: (s) => {
      revealTimerEl.textContent = `⏱️ ${s}s`;
      revealTimerEl.classList.toggle("timer-urgent", s <= 10 && s > 0);
    },
    onExpire: () => finishTurn(`⏰ Time's up! The answer was ${state.characters[state.turnIndex]}.`)
  });

  document.getElementById("btn-reveal").addEventListener("click", () => {
    guesserNameEl.textContent = state.names[state.turnIndex];
    characterTextEl.textContent = state.characters[state.turnIndex];
    showScreen("reveal");
    if (state.timerEnabled) {
      revealTimerEl.classList.remove("hidden");
      timer.start();
    } else {
      revealTimerEl.classList.add("hidden");
    }
  });

  document.getElementById("btn-got-it").addEventListener("click", () => {
    timer.stop();
    finishTurn(`🎉 ${state.names[state.turnIndex]} got it!`);
  });

  document.getElementById("btn-give-up").addEventListener("click", () => {
    timer.stop();
    finishTurn(`The answer was ${state.characters[state.turnIndex]}.`);
  });

  function finishTurn(resultText) {
    state.lastResult = resultText;
    state.turnIndex++;
    if (state.turnIndex >= state.names.length) {
      showScreen("summary");
    } else {
      showScreen("pass");
      renderPassScreen();
    }
  }

  // ---------- Summary ----------
  document.getElementById("btn-play-again").addEventListener("click", () => {
    dealCharacters();
    state.turnIndex = 0;
    state.lastResult = "";
    showScreen("pass");
    renderPassScreen();
  });

  document.getElementById("btn-new-game").addEventListener("click", () => {
    state.category = null;
    document.querySelectorAll(".theme-btn").forEach((b) => b.classList.remove("selected"));
    validateSetup();
    showScreen("setup");
  });
})();
