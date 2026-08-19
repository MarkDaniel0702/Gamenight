(function () {
  "use strict";

  const TEAM_COLORS = ["#ffcb3c", "#31e0c9", "#ff6b81", "#9b8bff", "#7dd956", "#ff9f4a"];
  const MAX_TEAMS = 6;
  const POINT_VALUES = [100, 200, 300, 400, 500];
  const ANSWER_TIMER_RECOMMENDED = 30;
  const questionBank = createUsedRegistry("quiz-questions");

  const MIN_BONUS = 1;
  const MAX_BONUS = 4;

  const state = {
    theme: null,
    teams: [], // { name, score, color, perks: { double, freePass } }
    answered: new Set(), // "categoryIndex-points"
    current: null, // { catIndex, points, category, question }
    mode: "automated", // "automated" (timer on by default) or "gamemaster" (timer off by default)
    turnIndex: 0,
    bonusCount: 2,
    bonusTiles: new Set() // "categoryIndex-points" keys chosen as bonus tiles this game
  };

  const screens = {
    setup: document.getElementById("screen-setup"),
    board: document.getElementById("screen-board"),
    results: document.getElementById("screen-results")
  };

  function showScreen(name) {
    Object.values(screens).forEach((el) => el.classList.remove("active"));
    screens[name].classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ---------- Setup: theme ----------
  const themeGrid = document.getElementById("theme-grid");
  const btnStart = document.getElementById("btn-start");

  function groupedThemeNames() {
    const groups = {};
    const placed = new Set();
    Object.keys(QUIZ_THEME_GROUPS || {}).forEach((groupName) => {
      const names = QUIZ_THEME_GROUPS[groupName].filter((n) => QUIZ_THEMES[n]);
      if (names.length) {
        groups[groupName] = names;
        names.forEach((n) => placed.add(n));
      }
    });
    const leftovers = Object.keys(QUIZ_THEMES).filter((n) => !placed.has(n));
    if (leftovers.length) groups["More Themes"] = leftovers;
    return groups;
  }

  function makeThemeButton(themeName) {
    const theme = QUIZ_THEMES[themeName];
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "theme-btn";
    const catNames = theme.categories.map((c) => c.name).join(" · ");
    btn.innerHTML = `<span class="t-icon">${theme.icon}</span><span class="t-name">${themeName}</span><span class="t-cats">${catNames}</span>`;
    btn.addEventListener("click", () => {
      state.theme = themeName;
      document.querySelectorAll(".theme-btn").forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
      validateSetup();
    });
    return btn;
  }

  function renderThemeGrid() {
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

  // ---------- Setup: teams ----------
  const teamsSetup = document.getElementById("teams-setup");
  const btnAddTeam = document.getElementById("btn-add-team");

  function addTeam(name) {
    if (state.teams.length >= MAX_TEAMS) return;
    state.teams.push({
      name: name || `Team ${state.teams.length + 1}`,
      score: 0,
      color: TEAM_COLORS[state.teams.length % TEAM_COLORS.length],
      perks: { double: false, freePass: false }
    });
    renderTeamsSetup();
  }

  function renderTeamsSetup() {
    teamsSetup.innerHTML = "";
    state.teams.forEach((team, i) => {
      const row = document.createElement("div");
      row.className = "team-row";
      row.innerHTML = `
        <span class="team-swatch" style="background:${team.color}"></span>
        <input type="text" class="team-input" maxlength="16" value="${team.name}" data-index="${i}">
        <button type="button" class="team-remove" aria-label="Remove team">&times;</button>
      `;
      row.querySelector(".team-input").addEventListener("input", (e) => {
        state.teams[i].name = e.target.value.trim() || `Team ${i + 1}`;
      });
      row.querySelector(".team-remove").addEventListener("click", () => {
        if (state.teams.length <= 1) return;
        state.teams.splice(i, 1);
        renderTeamsSetup();
        validateSetup();
      });
      teamsSetup.appendChild(row);
    });
    btnAddTeam.style.display = state.teams.length >= MAX_TEAMS ? "none" : "inline-block";
    validateSetup();
  }

  btnAddTeam.addEventListener("click", () => addTeam());

  function validateSetup() {
    btnStart.disabled = !state.theme || state.teams.length < 1;
  }

  // ---------- Setup: play style (host-optional) ----------
  const modeGrid = document.getElementById("mode-grid");
  const MODES = [
    { id: "automated", icon: "🤖", name: "Automated", desc: "Turn order runs automatically, with a customizable answer timer (30s recommended) — everyone just plays." },
    { id: "gamemaster", icon: "🎙️", name: "Game Master", desc: "One person controls the pace manually — timer off by default, reveal answers whenever ready." }
  ];

  function renderModeGrid() {
    modeGrid.innerHTML = "";
    MODES.forEach((m) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "theme-btn mode-btn";
      if (m.id === state.mode) btn.classList.add("selected");
      btn.innerHTML = `<span class="t-icon">${m.icon}</span><span class="t-name">${m.name}</span><span class="t-cats">${m.desc}</span>`;
      btn.addEventListener("click", () => {
        state.mode = m.id;
        document.querySelectorAll(".mode-btn").forEach((b) => b.classList.remove("selected"));
        btn.classList.add("selected");
        const enableInput = document.querySelector("#timer-setup .ts-enable");
        if (enableInput) {
          enableInput.checked = m.id === "automated";
          enableInput.dispatchEvent(new Event("change"));
        }
      });
      modeGrid.appendChild(btn);
    });
  }

  const timerSetup = createTimerSetup({
    mount: document.getElementById("timer-setup"),
    unitLabel: "per question",
    recommended: ANSWER_TIMER_RECOMMENDED,
    presets: [15, 20, 30, 45],
    defaultEnabled: true
  });

  // ---------- Setup: bonus slots ----------
  const bonusToggle = document.getElementById("bonus-toggle");
  const bonusCountRow = document.getElementById("bonus-count-row");
  const bonusMinus = document.getElementById("bonus-minus");
  const bonusPlus = document.getElementById("bonus-plus");
  const bonusCountDisplay = document.getElementById("bonus-count-display");

  function updateBonusSetupUI() {
    bonusCountDisplay.textContent = state.bonusCount;
    bonusMinus.disabled = state.bonusCount <= MIN_BONUS;
    bonusPlus.disabled = state.bonusCount >= MAX_BONUS;
    bonusCountRow.classList.toggle("hidden", !bonusToggle.checked);
  }
  bonusToggle.addEventListener("change", updateBonusSetupUI);
  bonusMinus.addEventListener("click", () => {
    if (state.bonusCount > MIN_BONUS) {
      state.bonusCount--;
      updateBonusSetupUI();
    }
  });
  bonusPlus.addEventListener("click", () => {
    if (state.bonusCount < MAX_BONUS) {
      state.bonusCount++;
      updateBonusSetupUI();
    }
  });
  updateBonusSetupUI();

  function generateBonusTiles() {
    state.bonusTiles = new Set();
    if (!bonusToggle.checked) return;
    const theme = QUIZ_THEMES[state.theme];
    const allKeys = [];
    theme.categories.forEach((cat, catIndex) => {
      POINT_VALUES.forEach((points) => allKeys.push(`${catIndex}-${points}`));
    });
    const count = Math.min(state.bonusCount, allKeys.length);
    shuffle(allKeys).slice(0, count).forEach((k) => state.bonusTiles.add(k));
  }

  btnStart.addEventListener("click", () => {
    state.answered = new Set();
    state.turnIndex = 0;
    generateBonusTiles();
    renderScoreboard();
    renderBoard();
    showScreen("board");
  });

  // ---------- Board ----------
  const scoreboardEl = document.getElementById("scoreboard");
  const boardEl = document.getElementById("board");
  const scrollHintEl = document.getElementById("scroll-hint");
  const turnBannerEl = document.getElementById("turn-banner");

  function updateTurnBanner() {
    if (state.teams.length <= 1) {
      turnBannerEl.classList.add("hidden");
      return;
    }
    const team = state.teams[state.turnIndex];
    turnBannerEl.innerHTML = `🎯 <span style="color:${team.color}">${team.name}</span>'s turn to pick a category!`;
    turnBannerEl.classList.remove("hidden");
  }

  function advanceTurn() {
    if (state.teams.length > 1) {
      state.turnIndex = (state.turnIndex + 1) % state.teams.length;
    }
  }

  function totalTileCount() {
    const theme = QUIZ_THEMES[state.theme];
    return theme.categories.length * POINT_VALUES.length;
  }

  function renderScoreboard() {
    scoreboardEl.innerHTML = "";
    state.teams.forEach((team, i) => {
      const chip = document.createElement("div");
      chip.className = "score-chip";
      const perkBadges = [];
      if (team.perks.double) perkBadges.push('<span class="perk-badge" title="Double Points active">✌️</span>');
      if (team.perks.freePass) perkBadges.push('<span class="perk-badge" title="Free Pass banked">🎟️</span>');
      chip.innerHTML = `
        <span class="score-swatch" style="background:${team.color}"></span>
        <span class="score-name">${team.name}</span>
        ${perkBadges.join("")}
        <span class="score-value" id="score-val-${i}">${team.score}</span>
        <span class="score-btns">
          <button type="button" class="score-btn" data-i="${i}" data-d="10">+</button>
          <button type="button" class="score-btn" data-i="${i}" data-d="-10">&minus;</button>
        </span>
      `;
      scoreboardEl.appendChild(chip);
    });
    scoreboardEl.querySelectorAll(".score-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const i = Number(btn.dataset.i);
        const delta = Number(btn.dataset.d);
        state.teams[i].score += delta;
        document.getElementById(`score-val-${i}`).textContent = state.teams[i].score;
      });
    });
  }

  function renderBoard() {
    const theme = QUIZ_THEMES[state.theme];
    boardEl.style.setProperty("--cols", theme.categories.length);
    boardEl.innerHTML = "";
    scrollHintEl.classList.toggle("hidden", theme.categories.length <= 5);
    updateTurnBanner();

    theme.categories.forEach((cat) => {
      const header = document.createElement("div");
      header.className = "cat-header";
      header.textContent = cat.name;
      boardEl.appendChild(header);
    });

    POINT_VALUES.forEach((points) => {
      theme.categories.forEach((cat, catIndex) => {
        const key = `${catIndex}-${points}`;
        const isBonus = state.bonusTiles.has(key);
        const used = state.answered.has(key);
        const tile = document.createElement("button");
        tile.type = "button";
        tile.className = "tile";
        if (isBonus) {
          tile.classList.add("tile-bonus");
          if (used) tile.classList.add("tile-used");
          tile.innerHTML = `⭐<span class="tile-sub">${used ? "USED" : "BONUS"}</span>`;
        } else {
          tile.textContent = points;
        }
        tile.disabled = used;
        tile.addEventListener("click", () => openQuestion(catIndex, points));
        boardEl.appendChild(tile);
      });
    });
  }

  // ---------- Question overlay ----------
  const overlay = document.getElementById("overlay");
  const qMeta = document.getElementById("q-meta");
  const qText = document.getElementById("q-text");
  const answerBlock = document.getElementById("answer-block");
  const aText = document.getElementById("a-text");
  const btnShowAnswer = document.getElementById("btn-show-answer");
  const awardRow = document.getElementById("award-row");
  const btnBackBoard = document.getElementById("btn-back-board");
  const gameTimerMount = document.getElementById("game-timer");
  const bonusBody = document.getElementById("bonus-body");
  const bonusIcon = document.getElementById("bonus-icon");
  const bonusTitle = document.getElementById("bonus-title");
  const bonusDesc = document.getElementById("bonus-desc");
  const bonusInteractive = document.getElementById("bonus-interactive");

  const questionTimer = createGameTimer({
    mount: document.getElementById("game-timer"),
    onExpire: () => revealAnswer()
  });

  function stopTimer() {
    questionTimer.hide();
  }

  function startAnswerTimer() {
    stopTimer();
    if (timerSetup.isEnabled()) {
      questionTimer.start(timerSetup.getSeconds());
    }
  }

  function openQuestion(catIndex, points) {
    const key = `${catIndex}-${points}`;
    if (state.bonusTiles.has(key)) {
      openBonus(catIndex, points, key);
      return;
    }

    const theme = QUIZ_THEMES[state.theme];
    const category = theme.categories[catIndex];
    const pool = category.questions[points];
    const bankKey = `${state.theme}|${category.name}|${points}`;
    const question = questionBank.pickUnused(bankKey, pool).item;

    state.answered.add(key);
    state.current = { catIndex, points };
    renderBoard();

    bonusBody.classList.add("hidden");
    qMeta.classList.remove("hidden");
    qText.classList.remove("hidden");
    gameTimerMount.classList.remove("hidden");
    qMeta.textContent = `${category.name} · ${points} pts`;
    qText.textContent = question.q;
    aText.textContent = question.a;

    answerBlock.classList.add("hidden");
    awardRow.classList.add("hidden");
    btnBackBoard.classList.add("hidden");
    btnShowAnswer.classList.remove("hidden");

    overlay.classList.add("active");
    startAnswerTimer();
  }

  function revealAnswer() {
    stopTimer();
    answerBlock.classList.remove("hidden");
    btnShowAnswer.classList.add("hidden");
    awardRow.classList.remove("hidden");
    btnBackBoard.classList.remove("hidden");

    awardRow.innerHTML = "";
    state.teams.forEach((team) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "award-btn";
      const pts = team.perks.double ? state.current.points * 2 : state.current.points;
      btn.innerHTML = `<span class="sw" style="background:${team.color}"></span> +${pts} ${team.name}${team.perks.double ? " (2x!)" : ""}`;
      btn.addEventListener("click", () => {
        team.score += pts;
        if (team.perks.double) team.perks.double = false;
        renderScoreboard();
        closeOverlay();
        afterQuestionClosed();
      });
      awardRow.appendChild(btn);
    });

    state.teams.forEach((team) => {
      if (!team.perks.freePass) return;
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "award-btn award-btn-perk";
      btn.innerHTML = `<span class="sw" style="background:${team.color}"></span> 🎟️ Free Pass: award ${state.current.points} to ${team.name}`;
      btn.addEventListener("click", () => {
        team.score += state.current.points;
        team.perks.freePass = false;
        renderScoreboard();
        closeOverlay();
        afterQuestionClosed();
      });
      awardRow.appendChild(btn);
    });
  }

  btnShowAnswer.addEventListener("click", revealAnswer);

  btnBackBoard.addEventListener("click", () => {
    closeOverlay();
    afterQuestionClosed();
  });

  function closeOverlay() {
    stopTimer();
    overlay.classList.remove("active");
    bonusBody.classList.add("hidden");
    state.current = null;
  }

  // ---------- Bonus events ----------
  function openBonus(catIndex, points, key) {
    const category = QUIZ_THEMES[state.theme].categories[catIndex];

    state.answered.add(key);
    state.current = { catIndex, points, bonus: true };
    renderBoard();

    qMeta.textContent = `${category.name} · ${points} pts · BONUS`;
    qMeta.classList.remove("hidden");
    qText.classList.add("hidden");
    gameTimerMount.classList.add("hidden");
    answerBlock.classList.add("hidden");
    btnShowAnswer.classList.add("hidden");
    awardRow.classList.add("hidden");
    btnBackBoard.classList.add("hidden");
    bonusBody.classList.remove("hidden");

    const pickingTeam = state.teams[state.turnIndex];
    const pool = state.teams.length >= 2
      ? QUIZ_BONUS_EVENTS
      : QUIZ_BONUS_EVENTS.filter((e) => !e.requiresOpponent);
    const event = pool[Math.floor(Math.random() * pool.length)];

    bonusIcon.textContent = event.icon;
    bonusTitle.textContent = event.name;
    bonusDesc.textContent = event.desc;
    bonusInteractive.innerHTML = "";

    overlay.classList.add("active");
    resolveBonusEvent(event, pickingTeam);
  }

  function finishBonus() {
    renderScoreboard();
    btnBackBoard.classList.remove("hidden");
  }

  function resolveBonusEvent(event, pickingTeam) {
    if (event.type === "points") {
      const amt = 50 * (1 + Math.floor(Math.random() * 6)); // 50..300, step 50
      pickingTeam.score += amt;
      bonusInteractive.innerHTML = `<p class="bonus-result">+${amt} points for <strong>${pickingTeam.name}</strong>!</p>`;
      finishBonus();
    } else if (event.type === "double") {
      pickingTeam.perks.double = true;
      bonusInteractive.innerHTML = `<p class="bonus-result"><strong>${pickingTeam.name}</strong>'s next correct answer is worth double!</p>`;
      finishBonus();
    } else if (event.type === "freepass") {
      pickingTeam.perks.freePass = true;
      bonusInteractive.innerHTML = `<p class="bonus-result"><strong>${pickingTeam.name}</strong> banked a Free Pass!</p>`;
      finishBonus();
    } else if (event.type === "lucky") {
      const draws = [
        { amt: 100, text: "Lucky! +100 points." },
        { amt: 50, text: "A little luck. +50 points." },
        { amt: -50, text: "Unlucky! -50 points." },
        { amt: 0, text: "Nothing happens. Break even." }
      ];
      const draw = draws[Math.floor(Math.random() * draws.length)];
      pickingTeam.score += draw.amt;
      bonusInteractive.innerHTML = `<p class="bonus-result">${draw.text}</p>`;
      finishBonus();
    } else if (event.type === "steal") {
      state.teams.forEach((t) => {
        if (t === pickingTeam) return;
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "award-btn";
        btn.innerHTML = `<span class="sw" style="background:${t.color}"></span> Steal from ${t.name}`;
        btn.addEventListener("click", () => {
          const stealAmt = Math.min(150, Math.max(0, t.score));
          t.score -= stealAmt;
          pickingTeam.score += stealAmt;
          bonusInteractive.innerHTML = `<p class="bonus-result"><strong>${pickingTeam.name}</strong> stole ${stealAmt} points from <strong>${t.name}</strong>!</p>`;
          finishBonus();
        });
        bonusInteractive.appendChild(btn);
      });
    } else if (event.type === "risk") {
      [100, 200, 300].forEach((wager) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "award-btn";
        btn.textContent = `Risk ${wager}`;
        btn.addEventListener("click", () => {
          const win = Math.random() < 0.5;
          if (win) {
            pickingTeam.score += wager * 2;
            bonusInteractive.innerHTML = `<p class="bonus-result">🎉 Win! <strong>${pickingTeam.name}</strong> gains ${wager * 2} points!</p>`;
          } else {
            pickingTeam.score -= wager;
            bonusInteractive.innerHTML = `<p class="bonus-result">💥 Lost the risk. <strong>${pickingTeam.name}</strong> loses ${wager} points.</p>`;
          }
          finishBonus();
        });
        bonusInteractive.appendChild(btn);
      });
    }
  }

  function afterQuestionClosed() {
    advanceTurn();
    if (state.answered.size >= totalTileCount()) {
      showResults();
    } else {
      renderBoard();
    }
  }

  // ---------- Results ----------
  const resultsListEl = document.getElementById("results-list");

  function showResults() {
    const ranked = state.teams.slice().sort((a, b) => b.score - a.score);
    const topScore = ranked[0] ? ranked[0].score : 0;
    const winners = ranked.filter((t) => t.score === topScore);
    const medals = ["🥇", "🥈", "🥉"];

    resultsListEl.innerHTML = "";
    ranked.forEach((team, i) => {
      const row = document.createElement("div");
      row.className = "result-row";
      if (winners.includes(team) && state.teams.length > 1) row.classList.add("result-winner");
      row.innerHTML = `
        <span class="result-medal">${medals[i] || "🎗️"}</span>
        <span class="result-swatch" style="background:${team.color}"></span>
        <span class="result-name">${team.name}</span>
        <span class="result-score">${team.score} pts</span>
      `;
      resultsListEl.appendChild(row);
    });

    showScreen("results");
  }

  function resetBoard() {
    state.answered = new Set();
    state.turnIndex = 0;
    state.teams.forEach((t) => {
      t.score = 0;
      t.perks = { double: false, freePass: false };
    });
    generateBonusTiles();
    renderScoreboard();
    renderBoard();
  }

  function goToNewQuiz() {
    state.theme = null;
    state.teams = [];
    state.answered = new Set();
    state.turnIndex = 0;
    state.bonusTiles = new Set();
    document.querySelectorAll(".theme-btn:not(.mode-btn)").forEach((b) => b.classList.remove("selected"));
    addTeam("Team 1");
    addTeam("Team 2");
    validateSetup();
    showScreen("setup");
  }

  // ---------- Reset / New quiz ----------
  document.getElementById("btn-reset").addEventListener("click", resetBoard);
  document.getElementById("btn-new-quiz").addEventListener("click", goToNewQuiz);
  document.getElementById("btn-results-again").addEventListener("click", () => {
    resetBoard();
    showScreen("board");
  });
  document.getElementById("btn-results-new").addEventListener("click", goToNewQuiz);

  // ---------- init ----------
  renderThemeGrid();
  renderModeGrid();
  addTeam("Team 1");
  addTeam("Team 2");
  validateSetup();
})();
