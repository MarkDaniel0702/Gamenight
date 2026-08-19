(function () {
  "use strict";

  const MIN_PLAYERS = 3;
  const MAX_PLAYERS = 10;
  const DISCUSSION_SECONDS = 90;

  const state = {
    theme: null,
    playerCount: 4,
    names: [],
    words: [],       // per-player: { name, word, isSpy }
    mainWord: "",
    spyWord: "",
    spyIndex: -1,
    revealIndex: 0,
    timerEnabled: true,
    timerHandle: null
  };

  const screens = {
    setup: document.getElementById("screen-setup"),
    pass: document.getElementById("screen-pass"),
    word: document.getElementById("screen-word"),
    discuss: document.getElementById("screen-discuss"),
    spyreveal: document.getElementById("screen-spyreveal")
  };

  function showScreen(name) {
    Object.values(screens).forEach((el) => el.classList.remove("active"));
    screens[name].classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ---------- Setup screen ----------
  const themeGrid = document.getElementById("theme-grid");
  const countDisplay = document.getElementById("count-display");
  const countMinus = document.getElementById("count-minus");
  const countPlus = document.getElementById("count-plus");
  const namesGrid = document.getElementById("names-grid");
  const btnStart = document.getElementById("btn-start");

  function groupedThemeNames() {
    const groups = {};
    const placed = new Set();
    Object.keys(SPY_THEME_GROUPS || {}).forEach((groupName) => {
      const themeNames = SPY_THEME_GROUPS[groupName].filter((n) => SPY_THEMES[n]);
      if (themeNames.length) {
        groups[groupName] = themeNames;
        themeNames.forEach((n) => placed.add(n));
      }
    });
    const leftovers = Object.keys(SPY_THEMES).filter((n) => !placed.has(n));
    if (leftovers.length) groups["More Themes"] = leftovers;
    return groups;
  }

  function makeThemeButton(themeName) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "theme-btn";
    btn.dataset.theme = themeName;
    btn.innerHTML = `<span class="t-icon">${SPY_THEME_ICONS[themeName] || "🎲"}</span><span class="t-name">${themeName}</span>`;
    btn.addEventListener("click", () => {
      state.theme = themeName;
      document.querySelectorAll(".theme-btn").forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
      validateSetup();
    });
    return btn;
  }

  function renderThemes() {
    themeGrid.innerHTML = "";
    const groups = groupedThemeNames();
    Object.keys(groups).forEach((groupName) => {
      const section = document.createElement("div");
      section.className = "theme-group";

      const label = document.createElement("h3");
      label.className = "theme-group-label";
      label.textContent = groupName;
      section.appendChild(label);

      const row = document.createElement("div");
      row.className = "theme-group-row";
      groups[groupName].forEach((themeName) => row.appendChild(makeThemeButton(themeName)));
      section.appendChild(row);

      themeGrid.appendChild(section);
    });
  }

  function renderNameInputs() {
    // Preserve existing custom names where possible
    const prev = state.names.slice();
    namesGrid.innerHTML = "";
    for (let i = 0; i < state.playerCount; i++) {
      const input = document.createElement("input");
      input.type = "text";
      input.className = "name-input";
      input.maxLength = 18;
      input.placeholder = `Player ${i + 1}`;
      input.value = prev[i] || "";
      input.dataset.index = i;
      input.addEventListener("input", () => {
        state.names[i] = input.value.trim();
      });
      namesGrid.appendChild(input);
    }
  }

  function validateSetup() {
    btnStart.disabled = !state.theme;
  }

  countMinus.addEventListener("click", () => {
    if (state.playerCount > MIN_PLAYERS) {
      state.playerCount--;
      countDisplay.textContent = state.playerCount;
      renderNameInputs();
      updateStepperButtons();
    }
  });
  countPlus.addEventListener("click", () => {
    if (state.playerCount < MAX_PLAYERS) {
      state.playerCount++;
      countDisplay.textContent = state.playerCount;
      renderNameInputs();
      updateStepperButtons();
    }
  });
  function updateStepperButtons() {
    countMinus.disabled = state.playerCount <= MIN_PLAYERS;
    countPlus.disabled = state.playerCount >= MAX_PLAYERS;
  }

  function resolvedNames() {
    return Array.from({ length: state.playerCount }, (_, i) => state.names[i] && state.names[i].length ? state.names[i] : `Player ${i + 1}`);
  }

  function pickRandomPair(themeName) {
    const pairs = SPY_THEMES[themeName];
    return pairs[Math.floor(Math.random() * pairs.length)];
  }

  function dealWords() {
    const pair = pickRandomPair(state.theme);
    state.mainWord = pair.main;
    state.spyWord = pair.spy;
    state.spyIndex = Math.floor(Math.random() * state.playerCount);

    const names = resolvedNames();
    state.words = names.map((name, i) => ({
      name,
      word: i === state.spyIndex ? pair.spy : pair.main,
      isSpy: i === state.spyIndex
    }));
    state.revealIndex = 0;
  }

  const timerToggle = document.getElementById("timer-toggle");

  btnStart.addEventListener("click", () => {
    state.timerEnabled = timerToggle.checked;
    dealWords();
    showScreen("pass");
    renderPass();
  });

  // ---------- Pass / reveal flow ----------
  const progressDots = document.getElementById("progress-dots");
  const passName = document.getElementById("pass-name");
  const btnReveal = document.getElementById("btn-reveal");
  const wordCard = document.getElementById("word-card");
  const wordLabel = document.getElementById("word-label");
  const wordText = document.getElementById("word-text");
  const wordFootnote = document.getElementById("word-footnote");
  const btnHide = document.getElementById("btn-hide");

  function renderPass() {
    const player = state.words[state.revealIndex];
    passName.textContent = player.name;

    progressDots.innerHTML = "";
    state.words.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.className = "dot";
      if (i < state.revealIndex) dot.classList.add("done");
      if (i === state.revealIndex) dot.classList.add("current");
      progressDots.appendChild(dot);
    });
  }

  btnReveal.addEventListener("click", () => {
    const player = state.words[state.revealIndex];
    if (player.isSpy) {
      wordCard.classList.add("is-spy");
      wordLabel.textContent = "YOU ARE THE SPY";
      wordText.textContent = player.word;
      wordFootnote.textContent = "You don't know the real word. Bluff convincingly.";
    } else {
      wordCard.classList.remove("is-spy");
      wordLabel.textContent = "YOUR WORD IS";
      wordText.textContent = player.word;
      wordFootnote.textContent = "Remember it. Don't say it out loud.";
    }
    showScreen("word");
  });

  btnHide.addEventListener("click", () => {
    wordText.textContent = "";
    state.revealIndex++;
    if (state.revealIndex >= state.words.length) {
      showScreen("discuss");
      startDiscussionTimer();
    } else {
      renderPass();
      showScreen("pass");
    }
  });

  // ---------- Discussion / spy reveal ----------
  const btnRevealSpy = document.getElementById("btn-reveal-spy");
  const spyNameEl = document.getElementById("spy-name");
  const spyWordReveal = document.getElementById("spy-word-reveal");
  const btnPlayAgain = document.getElementById("btn-play-again");
  const btnNewGame = document.getElementById("btn-new-game");
  const discussTimerEl = document.getElementById("discuss-timer");
  const discussTimerValueEl = document.getElementById("discuss-timer-value");

  function stopDiscussionTimer() {
    if (state.timerHandle) {
      clearInterval(state.timerHandle);
      state.timerHandle = null;
    }
    btnRevealSpy.classList.remove("btn-urgent");
  }

  function startDiscussionTimer() {
    stopDiscussionTimer();
    if (!state.timerEnabled) {
      discussTimerEl.classList.add("hidden");
      return;
    }
    let secondsLeft = DISCUSSION_SECONDS;
    discussTimerEl.classList.remove("hidden");
    discussTimerValueEl.textContent = secondsLeft;
    state.timerHandle = setInterval(() => {
      secondsLeft--;
      if (secondsLeft <= 0) {
        stopDiscussionTimer();
        discussTimerEl.textContent = "⏰ Time's up! Ready to vote?";
        btnRevealSpy.classList.add("btn-urgent");
        return;
      }
      discussTimerValueEl.textContent = secondsLeft;
    }, 1000);
  }

  btnRevealSpy.addEventListener("click", () => {
    stopDiscussionTimer();
    const spy = state.words[state.spyIndex];
    spyNameEl.textContent = spy.name;
    spyWordReveal.innerHTML = `The real word was <strong>${state.mainWord}</strong>. The Spy had <strong>${state.spyWord}</strong>.`;
    showScreen("spyreveal");
  });

  btnPlayAgain.addEventListener("click", () => {
    dealWords();
    showScreen("pass");
    renderPass();
  });

  btnNewGame.addEventListener("click", () => {
    state.theme = null;
    document.querySelectorAll(".theme-btn").forEach((b) => b.classList.remove("selected"));
    validateSetup();
    showScreen("setup");
  });

  // ---------- init ----------
  renderThemes();
  renderNameInputs();
  updateStepperButtons();
  validateSetup();
})();
