(function () {
  "use strict";

  const MIN_PLAYERS = 2;
  const MAX_PLAYERS = 10;

  const state = {
    category: null,
    pool: [],
    usedIndices: new Set(),
    names: [],
    voteIndex: 0,
    votes: { a: [], b: [] },
    currentPrompt: null,
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
    btn.innerHTML = `<span class="t-icon">${WYR_CATEGORY_ICONS[name] || "🎲"}</span><span class="t-name">${name}</span>`;
    btn.addEventListener("click", () => {
      state.category = name;
      document.querySelectorAll(".theme-btn").forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
      validateSetup();
    });
    return btn;
  }

  renderGroupedPicker(categoryGrid, { "Pick one": Object.keys(WYR_CATEGORIES) }, makeCategoryCard);

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
    unitLabel: "per question",
    recommended: 30,
    presets: [15, 30, 45, 60],
    defaultEnabled: false
  });

  // ---------- Play ----------
  const voteStatus = document.getElementById("vote-status");
  const voteView = document.getElementById("vote-view");
  const resultsView = document.getElementById("results-view");
  const btnVoteA = document.getElementById("btn-vote-a");
  const btnVoteB = document.getElementById("btn-vote-b");
  const optionAText = document.getElementById("option-a-text");
  const optionBText = document.getElementById("option-b-text");
  const resultAText = document.getElementById("result-a-text");
  const resultBText = document.getElementById("result-b-text");
  const resultABar = document.getElementById("result-a-bar");
  const resultBBar = document.getElementById("result-b-bar");
  const resultACount = document.getElementById("result-a-count");
  const resultBCount = document.getElementById("result-b-count");

  function pickPrompt() {
    const { item } = pickRandomUnused(state.pool, state.usedIndices);
    state.currentPrompt = item;
    state.voteIndex = 0;
    state.votes = { a: [], b: [] };
    optionAText.textContent = item.a;
    optionBText.textContent = item.b;
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
      voteStatus.textContent = `🗳️ ${names[state.voteIndex]}, pick A or B!`;
      if (timerSetup.isEnabled()) timer.start(timerSetup.getSeconds());
    } else {
      showResults();
    }
  }

  function castVote(choice) {
    const names = roster.getNames();
    const name = names[state.voteIndex];
    state.votes[choice].push(name);
    state.voteIndex++;
    updateVoteStatus();
  }

  btnVoteA.addEventListener("click", () => castVote("a"));
  btnVoteB.addEventListener("click", () => castVote("b"));

  function showResults() {
    state.questionsPlayed++;
    const total = state.votes.a.length + state.votes.b.length || 1;
    const aPct = Math.round((state.votes.a.length / total) * 100);
    const bPct = 100 - aPct;

    resultAText.textContent = state.currentPrompt.a;
    resultBText.textContent = state.currentPrompt.b;
    resultABar.style.width = `${aPct}%`;
    resultBBar.style.width = `${bPct}%`;
    resultACount.textContent = `${state.votes.a.length} vote${state.votes.a.length === 1 ? "" : "s"} (${aPct}%)`;
    resultBCount.textContent = `${state.votes.b.length} vote${state.votes.b.length === 1 ? "" : "s"} (${bPct}%)`;

    voteView.classList.add("hidden");
    resultsView.classList.remove("hidden");
  }

  document.getElementById("btn-next-question").addEventListener("click", pickPrompt);
  document.getElementById("btn-skip").addEventListener("click", pickPrompt);

  btnStart.addEventListener("click", () => {
    state.pool = WYR_CATEGORIES[state.category];
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
