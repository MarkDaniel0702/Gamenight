// Shared helpers for the party-game family (Who Am I?, Password, Two Truths
// and a Lie, Would You Rather?, Charades, Guess the Song, Picture Guess,
// Most Likely To, Categories). Spy Word and Quiz Night are intentionally
// left untouched and do not load this file.
"use strict";

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Picks a random item from `arr` that hasn't been used yet this session,
// tracked by index in `usedIndexSet`. Auto-resets once every item's been
// seen, so a game never runs dry mid-round.
function pickRandomUnused(arr, usedIndexSet) {
  let available = [];
  for (let i = 0; i < arr.length; i++) {
    if (!usedIndexSet.has(i)) available.push(i);
  }
  if (available.length === 0) {
    usedIndexSet.clear();
    for (let i = 0; i < arr.length; i++) available.push(i);
  }
  const idx = available[Math.floor(Math.random() * available.length)];
  usedIndexSet.add(idx);
  return { item: arr[idx], index: idx };
}

// A start/stop countdown timer. onTick(secondsLeft) fires every second
// (including the initial call with the full duration); onExpire() fires
// once when it hits zero.
function createTimer({ seconds, onTick, onExpire }) {
  let remaining = seconds;
  let handle = null;
  function start(customSeconds) {
    stop();
    remaining = customSeconds != null ? customSeconds : seconds;
    if (onTick) onTick(remaining);
    handle = setInterval(() => {
      remaining--;
      if (remaining <= 0) {
        if (onTick) onTick(0);
        stop();
        if (onExpire) onExpire();
        return;
      }
      if (onTick) onTick(remaining);
    }, 1000);
  }
  function stop() {
    if (handle) {
      clearInterval(handle);
      handle = null;
    }
  }
  return { start, stop, get running() { return handle !== null; } };
}

// Renders a grouped card picker (used for theme/category/prompt-set
// selection screens). `groups` = { groupName: [key, key, ...] }.
// `renderCard(key)` must return a DOM element for that key.
function renderGroupedPicker(container, groups, renderCard) {
  container.innerHTML = "";
  Object.keys(groups).forEach((groupName) => {
    const items = groups[groupName];
    if (!items || !items.length) return;
    const section = document.createElement("div");
    section.className = "theme-group";

    const label = document.createElement("h3");
    label.className = "theme-group-label";
    label.textContent = groupName;
    section.appendChild(label);

    const row = document.createElement("div");
    row.className = "theme-group-row";
    items.forEach((key) => row.appendChild(renderCard(key)));
    section.appendChild(row);

    container.appendChild(section);
  });
}

// A named-player roster with a +/- stepper. Wires up the given DOM elements
// and keeps an internal list of names (falling back to "Player N").
function createRoster({ countDisplay, minusBtn, plusBtn, namesContainer, min, max, initialCount, onChange }) {
  let count = initialCount || min;
  let names = [];

  function render() {
    countDisplay.textContent = count;
    minusBtn.disabled = count <= min;
    plusBtn.disabled = count >= max;
    const prev = names.slice();
    namesContainer.innerHTML = "";
    for (let i = 0; i < count; i++) {
      const input = document.createElement("input");
      input.type = "text";
      input.className = "name-input";
      input.maxLength = 18;
      input.placeholder = `Player ${i + 1}`;
      input.value = prev[i] || "";
      input.addEventListener("input", () => {
        names[i] = input.value.trim();
      });
      namesContainer.appendChild(input);
    }
    if (onChange) onChange(count);
  }

  minusBtn.addEventListener("click", () => {
    if (count > min) {
      count--;
      render();
    }
  });
  plusBtn.addEventListener("click", () => {
    if (count < max) {
      count++;
      render();
    }
  });

  render();

  return {
    getCount: () => count,
    getNames: () => Array.from({ length: count }, (_, i) => (names[i] && names[i].length ? names[i] : `Player ${i + 1}`))
  };
}

const TEAM_COLORS = ["#7c5cff", "#ffb84d", "#ff6b81", "#31e0c9", "#7dd956", "#ff9f4a"];

// A Quiz-Night-style optional team scoreboard: add/remove/rename teams,
// each with its own color, plus manual +/- score controls.
function createTeamScoreboard({ setupContainer, addBtn, scoreboardContainer, maxTeams }) {
  let teams = [];

  function addTeam(name) {
    if (teams.length >= maxTeams) return;
    teams.push({
      name: name || `Team ${teams.length + 1}`,
      score: 0,
      color: TEAM_COLORS[teams.length % TEAM_COLORS.length]
    });
    renderSetup();
  }

  function renderSetup() {
    setupContainer.innerHTML = "";
    teams.forEach((team, i) => {
      const row = document.createElement("div");
      row.className = "team-row";
      row.innerHTML = `
        <span class="team-swatch" style="background:${team.color}"></span>
        <input type="text" class="team-input" maxlength="16" value="${team.name}">
        <button type="button" class="team-remove" aria-label="Remove team">&times;</button>
      `;
      row.querySelector(".team-input").addEventListener("input", (e) => {
        teams[i].name = e.target.value.trim() || `Team ${i + 1}`;
      });
      row.querySelector(".team-remove").addEventListener("click", () => {
        if (teams.length <= 1) return;
        teams.splice(i, 1);
        renderSetup();
      });
      setupContainer.appendChild(row);
    });
    addBtn.style.display = teams.length >= maxTeams ? "none" : "inline-block";
  }

  function renderScoreboard() {
    scoreboardContainer.innerHTML = "";
    teams.forEach((team, i) => {
      const chip = document.createElement("div");
      chip.className = "score-chip";
      chip.innerHTML = `
        <span class="score-swatch" style="background:${team.color}"></span>
        <span class="score-name">${team.name}</span>
        <span class="score-value" id="party-score-val-${i}">${team.score}</span>
        <span class="score-btns">
          <button type="button" class="score-btn" data-i="${i}" data-d="10">+</button>
          <button type="button" class="score-btn" data-i="${i}" data-d="-10">&minus;</button>
        </span>
      `;
      scoreboardContainer.appendChild(chip);
    });
    scoreboardContainer.querySelectorAll(".score-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const i = Number(btn.dataset.i);
        teams[i].score += Number(btn.dataset.d);
        document.getElementById(`party-score-val-${i}`).textContent = teams[i].score;
      });
    });
  }

  addBtn.addEventListener("click", () => addTeam());

  return {
    addTeam,
    reset() {
      teams = [];
    },
    resetScores() {
      teams.forEach((t) => (t.score = 0));
      renderScoreboard();
    },
    award(index, points) {
      teams[index].score += points;
      renderScoreboard();
    },
    getTeams: () => teams,
    renderSetup,
    renderScoreboard
  };
}

// Small helper matching the site's existing screen-toggle pattern.
function createScreenManager(screenMap) {
  return function showScreen(name) {
    Object.values(screenMap).forEach((el) => el.classList.remove("active"));
    screenMap[name].classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
}
