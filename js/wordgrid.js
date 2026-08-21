(function () {
  "use strict";

  const MIN_PLAYERS = 2;
  const MAX_PLAYERS = 10;
  const MIN_GUESSES = 4;
  const MAX_GUESSES = 8;

  const state = {
    category: null,
    pool: [],
    usedIndices: new Set(),
    names: [],
    scores: [],
    turnIndex: 0,
    maxGuesses: 6,
    guessesUsed: 0,
    currentWord: "",
    lastResult: "",
    busy: false
  };

  const screens = {
    setup: document.getElementById("screen-setup"),
    pass: document.getElementById("screen-pass"),
    guess: document.getElementById("screen-guess"),
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
    btn.innerHTML = `<span class="t-icon">${WORDGRID_CATEGORY_ICONS[name] || "🟩"}</span><span class="t-name">${name}</span>`;
    btn.addEventListener("click", () => {
      state.category = name;
      document.querySelectorAll(".theme-btn").forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
      validateSetup();
    });
    return btn;
  }
  renderGroupedPicker(categoryGrid, { "Pick one": Object.keys(WORDGRID_CATEGORIES) }, makeCategoryCard);

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

  // ---------- Setup: max guesses stepper ----------
  const guessesDisplay = document.getElementById("guesses-display");
  const guessesMinus = document.getElementById("guesses-minus");
  const guessesPlus = document.getElementById("guesses-plus");
  let maxGuessesSetting = 6;
  function renderGuessesStepper() {
    guessesDisplay.textContent = maxGuessesSetting;
    guessesMinus.disabled = maxGuessesSetting <= MIN_GUESSES;
    guessesPlus.disabled = maxGuessesSetting >= MAX_GUESSES;
  }
  guessesMinus.addEventListener("click", () => {
    if (maxGuessesSetting > MIN_GUESSES) { maxGuessesSetting--; renderGuessesStepper(); }
  });
  guessesPlus.addEventListener("click", () => {
    if (maxGuessesSetting < MAX_GUESSES) { maxGuessesSetting++; renderGuessesStepper(); }
  });
  renderGuessesStepper();

  const timerSetup = createTimerSetup({
    mount: document.getElementById("timer-setup"),
    unitLabel: "per guess",
    recommended: 45,
    presets: [30, 45, 60, 90],
    defaultEnabled: true
  });

  function validateSetup() {
    btnStart.disabled = !state.category;
  }
  validateSetup();

  btnStart.addEventListener("click", () => {
    state.pool = WORDGRID_CATEGORIES[state.category];
    state.usedIndices = new Set();
    state.names = roster.getNames();
    state.scores = state.names.map(() => 0);
    state.turnIndex = 0;
    state.maxGuesses = maxGuessesSetting;
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

  // ---------- Guessing ----------
  const wordBoard = document.getElementById("word-board");
  const guessStatusEl = document.getElementById("guess-status");
  const guessInput = document.getElementById("guess-input");
  const btnGuess = document.getElementById("btn-guess");
  const btnGiveUp = document.getElementById("btn-give-up");
  const messageEl = document.getElementById("guess-message");

  const timer = createGameTimer({
    mount: document.getElementById("game-timer"),
    onExpire: handleTimerExpire
  });

  function createGameBoard(wordLength) {
    wordBoard.innerHTML = "";
    for (let r = 0; r < state.maxGuesses; r++) {
      const row = document.createElement("div");
      row.className = "word-row";
      for (let c = 0; c < wordLength; c++) {
        const tile = document.createElement("div");
        tile.className = "word-tile";
        row.appendChild(tile);
      }
      wordBoard.appendChild(row);
    }
  }

  function updateGuessStatus() {
    guessStatusEl.textContent = `Guess ${state.guessesUsed + 1} of ${state.maxGuesses}`;
  }

  function setBusy(isBusy) {
    state.busy = isBusy;
    btnGuess.disabled = isBusy;
    btnGiveUp.disabled = isBusy;
    guessInput.disabled = isBusy;
  }

  function showMessage(text) {
    messageEl.textContent = text || "";
  }

  function startGuessTimer() {
    if (timerSetup.isEnabled()) {
      timer.start(timerSetup.getSeconds());
    } else {
      timer.hide();
    }
  }

  document.getElementById("btn-reveal").addEventListener("click", () => {
    const { item } = pickRandomUnused(state.pool, state.usedIndices);
    state.currentWord = item;
    state.guessesUsed = 0;
    createGameBoard(item.length);
    updateGuessStatus();
    showMessage("");
    guessInput.value = "";
    guessInput.maxLength = item.length;
    setBusy(false);
    showScreen("guess");
    startGuessTimer();
    guessInput.focus();
  });

  function computeStatuses(guess, secret) {
    const secretLetters = secret.split("");
    const guessLetters = guess.split("");
    const statuses = Array(secret.length).fill(null);

    for (let i = 0; i < guessLetters.length; i++) {
      if (guessLetters[i] === secretLetters[i]) {
        statuses[i] = "correct";
        secretLetters[i] = null;
      }
    }
    for (let i = 0; i < guessLetters.length; i++) {
      if (statuses[i]) continue;
      const idx = secretLetters.indexOf(guessLetters[i]);
      if (idx !== -1) {
        statuses[i] = "present";
        secretLetters[idx] = null;
      } else {
        statuses[i] = "absent";
      }
    }
    return statuses;
  }

  function animateRow(rowIndex, letters, statuses, done) {
    const row = wordBoard.children[rowIndex];
    const len = letters.length;
    for (let i = 0; i < len; i++) {
      const tile = row.children[i];
      setTimeout(() => {
        tile.classList.add("flip");
        setTimeout(() => {
          tile.textContent = letters[i];
          tile.classList.add(statuses[i]);
          if (i === len - 1 && done) done();
        }, 280);
      }, i * 300);
    }
  }

  function handleGuess() {
    if (state.busy) return;
    const guess = guessInput.value.trim().toUpperCase();
    if (guess.length !== state.currentWord.length || !/^[A-Z]+$/.test(guess)) {
      showMessage(`Guess must be ${state.currentWord.length} letters, letters only.`);
      return;
    }
    showMessage("");
    submitGuess(guess);
  }
  btnGuess.addEventListener("click", handleGuess);
  guessInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") handleGuess();
  });

  function submitGuess(guess) {
    setBusy(true);
    timer.hide();
    state.guessesUsed++;
    const rowIndex = state.guessesUsed - 1;
    const statuses = computeStatuses(guess, state.currentWord);
    animateRow(rowIndex, guess.split(""), statuses, () => {
      guessInput.value = "";
      if (guess === state.currentWord) {
        handleWin();
      } else if (state.guessesUsed >= state.maxGuesses) {
        handleLoss();
      } else {
        updateGuessStatus();
        setBusy(false);
        startGuessTimer();
        guessInput.focus();
      }
    });
  }

  function handleTimerExpire() {
    if (state.busy) return;
    const guess = guessInput.value.trim().toUpperCase();
    if (guess.length === state.currentWord.length && /^[A-Z]+$/.test(guess)) {
      submitGuess(guess);
      return;
    }
    setBusy(true);
    state.guessesUsed++;
    const rowIndex = state.guessesUsed - 1;
    const placeholder = state.currentWord.split("").map(() => "–");
    const statuses = state.currentWord.split("").map(() => "absent");
    animateRow(rowIndex, placeholder, statuses, () => {
      guessInput.value = "";
      if (state.guessesUsed >= state.maxGuesses) {
        handleLoss();
      } else {
        updateGuessStatus();
        showMessage("⏰ Time's up! That guess is skipped.");
        setBusy(false);
        startGuessTimer();
      }
    });
  }

  function handleWin() {
    timer.hide();
    const points = Math.max(state.maxGuesses - state.guessesUsed + 1, 1);
    state.scores[state.turnIndex] += points;
    finishTurn(`✅ ${state.names[state.turnIndex]} guessed it in ${state.guessesUsed} ${state.guessesUsed === 1 ? "try" : "tries"}! +${points} pts`);
  }

  function handleLoss() {
    timer.hide();
    finishTurn(`❌ Out of guesses. The word was "${state.currentWord}".`);
  }

  function giveUp() {
    if (state.busy) return;
    timer.hide();
    finishTurn(`🏳️ ${state.names[state.turnIndex]} gave up. The word was "${state.currentWord}".`);
  }
  btnGiveUp.addEventListener("click", giveUp);

  function finishTurn(resultText) {
    state.lastResult = resultText;
    setBusy(false);
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
