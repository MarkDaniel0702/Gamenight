(function () {
  "use strict";

  const MIN_PLAYERS = 3;
  const MAX_PLAYERS = 10;

  const state = {
    category: null,
    pool: [],
    usedIndices: new Set(),
    voteIndex: 0,
    votes: [],
    currentPrompt: "",
    questionsPlayed: 0
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
    btn.innerHTML = `<span class="t-icon">${MLT_CATEGORY_ICONS[name] || "🎲"}</span><span class="t-name">${name}</span>`;
    btn.addEventListener("click", () => {
      state.category = name;
      document.querySelectorAll(".theme-btn").forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
      validateSetup();
    });
    return btn;
  }

  renderGroupedPicker(categoryGrid, { "Pick one": Object.keys(MLT_CATEGORIES) }, makeCategoryCard);

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

  function validateSetup() {
    btnStart.disabled = !state.category;
  }
  validateSetup();

  const timerSetup = createTimerSetup({
    mount: document.getElementById("timer-setup"),
    unitLabel: "for voting",
    recommended: 30,
    presets: [15, 30, 45, 60],
    defaultEnabled: false
  });

  // ---------- Play ----------
  const voteStatus = document.getElementById("vote-status");
  const voteView = document.getElementById("vote-view");
  const resultsView = document.getElementById("results-view");
  const promptText = document.getElementById("prompt-text");
  const resultPromptText = document.getElementById("result-prompt-text");
  const voteOptions = document.getElementById("vote-options");
  const resultsListEl = document.getElementById("results-list");

  function pickPrompt() {
    const { item } = pickRandomUnused(state.pool, state.usedIndices);
    state.currentPrompt = item;
    state.voteIndex = 0;
    const names = roster.getNames();
    state.votes = names.map(() => 0);

    promptText.textContent = item;
    resultPromptText.textContent = item;

    voteOptions.innerHTML = "";
    names.forEach((name, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "mlt-vote-btn";
      btn.textContent = name;
      btn.addEventListener("click", () => castVote(i));
      voteOptions.appendChild(btn);
    });

    voteView.classList.remove("hidden");
    resultsView.classList.add("hidden");
    updateVoteStatus();
  }

  const timer = createGameTimer({
    mount: document.getElementById("game-timer"),
    onExpire: () => {
      state.voteIndex++;
      updateVoteStatus();
    }
  });

  function updateVoteStatus() {
    timer.hide();
    const names = roster.getNames();
    if (state.voteIndex < names.length) {
      voteStatus.textContent = `🗳️ ${names[state.voteIndex]}, cast your vote!`;
      if (timerSetup.isEnabled()) timer.start(timerSetup.getSeconds());
    } else {
      showResults();
    }
  }

  function castVote(nomineeIndex) {
    state.votes[nomineeIndex]++;
    state.voteIndex++;
    updateVoteStatus();
  }

  function showResults() {
    state.questionsPlayed++;
    const names = roster.getNames();
    const ranked = names
      .map((name, i) => ({ name, votes: state.votes[i] }))
      .sort((a, b) => b.votes - a.votes);
    const medals = ["🥇", "🥈", "🥉"];

    resultsListEl.innerHTML = "";
    ranked.forEach((entry, i) => {
      const row = document.createElement("div");
      row.className = "result-row";
      if (i === 0 && entry.votes > 0) row.classList.add("result-winner");
      row.innerHTML = `
        <span class="result-medal">${medals[i] || "🎗️"}</span>
        <span class="result-name">${entry.name}</span>
        <span class="result-score">${entry.votes} vote${entry.votes === 1 ? "" : "s"}</span>
      `;
      resultsListEl.appendChild(row);
    });

    voteView.classList.add("hidden");
    resultsView.classList.remove("hidden");
  }

  document.getElementById("btn-next-question").addEventListener("click", pickPrompt);
  document.getElementById("btn-skip").addEventListener("click", pickPrompt);

  btnStart.addEventListener("click", () => {
    state.pool = MLT_CATEGORIES[state.category];
    state.usedIndices = new Set();
    state.questionsPlayed = 0;
    showScreen("play");
    pickPrompt();
  });

  // ---------- Summary ----------
  document.getElementById("btn-end-session").addEventListener("click", () => {
    timer.hide();
    const n = state.questionsPlayed;
    document.getElementById("summary-text").textContent = `You made it through ${n} question${n === 1 ? "" : "s"}.`;
    showScreen("summary");
  });

  document.getElementById("btn-play-again").addEventListener("click", () => {
    state.usedIndices = new Set();
    state.questionsPlayed = 0;
    showScreen("play");
    pickPrompt();
  });

  document.getElementById("btn-new-game").addEventListener("click", () => {
    state.category = null;
    document.querySelectorAll(".theme-btn").forEach((b) => b.classList.remove("selected"));
    validateSetup();
    showScreen("setup");
  });
})();
