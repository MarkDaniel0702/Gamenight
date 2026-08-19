(function () {
  "use strict";

  const MIN_PLAYERS = 2;
  const MAX_PLAYERS = 10;

  const state = {
    names: [],
    scores: [],
    turnIndex: 0,
    statements: [],
    lieIndex: -1,
    usedPromptIndices: new Set(),
    voterOrder: [],
    voterPos: 0,
    roundGuesses: [], // { voterIndex, guessIndex }
    roundsPlayed: 0
  };

  const screens = {
    setup: document.getElementById("screen-setup"),
    play: document.getElementById("screen-play"),
    summary: document.getElementById("screen-summary")
  };
  const showScreen = createScreenManager(screens);

  // ---------- Setup ----------
  const roster = createRoster({
    countDisplay: document.getElementById("count-display"),
    minusBtn: document.getElementById("count-minus"),
    plusBtn: document.getElementById("count-plus"),
    namesContainer: document.getElementById("names-grid"),
    min: MIN_PLAYERS,
    max: MAX_PLAYERS,
    initialCount: 4
  });

  const timerSetup = createTimerSetup({
    mount: document.getElementById("timer-setup"),
    unitLabel: "for discussion & voting",
    recommended: 60,
    presets: [30, 45, 60, 90],
    defaultEnabled: false
  });

  document.getElementById("btn-start").addEventListener("click", () => {
    state.names = roster.getNames();
    state.scores = state.names.map(() => 0);
    state.turnIndex = 0;
    state.roundsPlayed = 0;
    showScreen("play");
    startTurn();
  });

  // ---------- Views within the play screen ----------
  const turnStatus = document.getElementById("turn-status");
  const viewCompose = document.getElementById("view-compose");
  const writeForm = document.getElementById("write-form");
  const viewStatements = document.getElementById("view-statements");
  const viewVoting = document.getElementById("view-voting");
  const viewRoundResults = document.getElementById("view-round-results");

  function showView(view) {
    [viewCompose, viewStatements, viewVoting, viewRoundResults].forEach((v) => v.classList.add("hidden"));
    view.classList.remove("hidden");
  }

  function startTurn() {
    turnStatus.textContent = `🎙️ ${state.names[state.turnIndex]}'s turn`;
    state.statements = [];
    state.lieIndex = -1;
    writeForm.classList.add("hidden");
    showView(viewCompose);
  }

  // ---------- Compose: write your own ----------
  const inputs = [0, 1, 2].map((i) => document.getElementById(`statement-input-${i}`));
  const liePicker = document.getElementById("lie-picker");
  const btnSubmitWrite = document.getElementById("btn-submit-write");
  let selectedLie = -1;

  liePicker.innerHTML = "";
  [0, 1, 2].forEach((i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "lie-btn";
    btn.textContent = `#${i + 1} is the lie`;
    btn.addEventListener("click", () => {
      selectedLie = i;
      liePicker.querySelectorAll(".lie-btn").forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
      validateWriteForm();
    });
    liePicker.appendChild(btn);
  });

  function validateWriteForm() {
    const allFilled = inputs.every((inp) => inp.value.trim().length > 0);
    btnSubmitWrite.disabled = !(allFilled && selectedLie !== -1);
  }
  inputs.forEach((inp) => inp.addEventListener("input", validateWriteForm));

  document.getElementById("btn-mode-write").addEventListener("click", () => {
    inputs.forEach((inp) => (inp.value = ""));
    selectedLie = -1;
    liePicker.querySelectorAll(".lie-btn").forEach((b) => b.classList.remove("selected"));
    btnSubmitWrite.disabled = true;
    writeForm.classList.remove("hidden");
  });

  btnSubmitWrite.addEventListener("click", () => {
    state.statements = inputs.map((inp) => inp.value.trim());
    state.lieIndex = selectedLie;
    showStatementsView();
  });

  document.getElementById("btn-mode-quick").addEventListener("click", () => {
    const { item } = pickRandomUnused(TTL_PROMPT_SETS, state.usedPromptIndices);
    state.statements = item.statements.slice();
    state.lieIndex = item.lieIndex;
    showStatementsView();
  });

  // ---------- Statements shown to the group ----------
  const statementCards = document.getElementById("statement-cards");

  function showStatementsView() {
    statementCards.innerHTML = "";
    state.statements.forEach((text, i) => {
      const card = document.createElement("div");
      card.className = "statement-card";
      card.innerHTML = `<span class="statement-num">#${i + 1}</span><span>${text}</span>`;
      statementCards.appendChild(card);
    });
    showView(viewStatements);
  }

  // ---------- Voting ----------
  const voteStatus = document.getElementById("vote-status");
  const voteStatementCards = document.getElementById("vote-statement-cards");

  const timer = createGameTimer({
    mount: document.getElementById("game-timer"),
    onExpire: () => showRoundResults()
  });

  document.getElementById("btn-start-voting").addEventListener("click", () => {
    state.voterOrder = state.names.map((_, i) => i).filter((i) => i !== state.turnIndex);
    state.voterPos = 0;
    state.roundGuesses = [];

    voteStatementCards.innerHTML = "";
    state.statements.forEach((text, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "statement-card";
      btn.innerHTML = `<span class="statement-num">#${i + 1}</span><span>${text}</span>`;
      btn.addEventListener("click", () => castVote(i));
      voteStatementCards.appendChild(btn);
    });

    showView(viewVoting);
    if (timerSetup.isEnabled()) timer.start(timerSetup.getSeconds());
    updateVoteStatus();
  });

  function updateVoteStatus() {
    if (state.voterPos < state.voterOrder.length) {
      const voterIndex = state.voterOrder[state.voterPos];
      voteStatus.textContent = `🗳️ ${state.names[voterIndex]}, which one is the lie?`;
    } else {
      showRoundResults();
    }
  }

  function castVote(guessIndex) {
    const voterIndex = state.voterOrder[state.voterPos];
    state.roundGuesses.push({ voterIndex, guessIndex });
    state.voterPos++;
    updateVoteStatus();
  }

  // ---------- Round results ----------
  const revealCards = document.getElementById("reveal-cards");
  const voteTally = document.getElementById("vote-tally");
  const scoreboardEl = document.getElementById("scoreboard");

  function showRoundResults() {
    timer.hide();
    state.roundsPlayed++;

    let correctCount = 0;
    state.roundGuesses.forEach(({ voterIndex, guessIndex }) => {
      if (guessIndex === state.lieIndex) {
        correctCount++;
        state.scores[voterIndex] += 1;
      }
    });
    const fooledCount = state.roundGuesses.length - correctCount;
    state.scores[state.turnIndex] += fooledCount;

    revealCards.innerHTML = "";
    state.statements.forEach((text, i) => {
      const card = document.createElement("div");
      const isLie = i === state.lieIndex;
      card.className = "statement-card " + (isLie ? "is-lie" : "is-truth");
      card.innerHTML = `<span class="statement-num">${isLie ? "❌" : "✅"}</span><span>${text}</span>`;
      revealCards.appendChild(card);
    });

    voteTally.textContent = `${correctCount} of ${state.roundGuesses.length} player${state.roundGuesses.length === 1 ? "" : "s"} spotted the lie. ${state.names[state.turnIndex]} fooled ${fooledCount}.`;

    renderScoreboard();
    showView(viewRoundResults);
  }

  function renderScoreboard() {
    scoreboardEl.innerHTML = "";
    state.names.forEach((name, i) => {
      const chip = document.createElement("div");
      chip.className = "score-chip";
      chip.innerHTML = `<span class="score-name">${name}</span><span class="score-value">${state.scores[i]}</span>`;
      scoreboardEl.appendChild(chip);
    });
  }

  document.getElementById("btn-next-turn").addEventListener("click", () => {
    state.turnIndex = (state.turnIndex + 1) % state.names.length;
    startTurn();
  });

  // ---------- Session end ----------
  function goToSummary() {
    document.getElementById("summary-text").textContent = `You played ${state.roundsPlayed} round${state.roundsPlayed === 1 ? "" : "s"}.`;
    const ranked = state.names
      .map((name, i) => ({ name, score: state.scores[i] }))
      .sort((a, b) => b.score - a.score);
    const medals = ["🥇", "🥈", "🥉"];
    const finalScores = document.getElementById("final-scores");
    finalScores.innerHTML = "";
    ranked.forEach((entry, i) => {
      const row = document.createElement("div");
      row.className = "result-row";
      if (i === 0 && entry.score > 0) row.classList.add("result-winner");
      row.innerHTML = `<span class="result-medal">${medals[i] || "🎗️"}</span><span class="result-name">${entry.name}</span><span class="result-score">${entry.score} pt${entry.score === 1 ? "" : "s"}</span>`;
      finalScores.appendChild(row);
    });
    showScreen("summary");
  }

  document.getElementById("btn-end-session").addEventListener("click", () => {
    timer.hide();
    goToSummary();
  });

  document.getElementById("btn-play-again").addEventListener("click", () => {
    state.scores = state.names.map(() => 0);
    state.turnIndex = 0;
    state.roundsPlayed = 0;
    state.usedPromptIndices = new Set();
    showScreen("play");
    startTurn();
  });

  document.getElementById("btn-new-game").addEventListener("click", () => {
    showScreen("setup");
  });
})();
