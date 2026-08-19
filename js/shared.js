// Shared helpers loaded by every game on the site, including Spy Word and
// Quiz Night.
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

// Like pickRandomUnused, but persisted to localStorage so a slot's history
// survives page reloads and separate game nights on the same device/browser.
// `namespace` scopes the storage keys (e.g. "quiz"); each distinct `key`
// passed to pickUnused (e.g. "Cartoons|Disney Channel|100") gets its own
// used-index history. Falls back to an in-memory Map if localStorage is
// unavailable (file:// pages, private browsing, storage quota, etc).
function createUsedRegistry(namespace) {
  const memory = new Map();
  const storageKey = (key) => `br:${namespace}:${key}`;

  function readSet(key) {
    if (memory.has(key)) return memory.get(key);
    let arr = [];
    try {
      const raw = localStorage.getItem(storageKey(key));
      if (raw) arr = JSON.parse(raw);
    } catch (e) {
      arr = [];
    }
    const set = new Set(Array.isArray(arr) ? arr : []);
    memory.set(key, set);
    return set;
  }

  function writeSet(key, set) {
    memory.set(key, set);
    try {
      localStorage.setItem(storageKey(key), JSON.stringify(Array.from(set)));
    } catch (e) {
      // ignore — in-memory Map still holds the current session's history
    }
  }

  return {
    getSet: readSet,
    mark(key, index) {
      const set = readSet(key);
      set.add(index);
      writeSet(key, set);
    },
    clear(key) {
      writeSet(key, new Set());
    },
    // Picks a random unused item from `arr` for `key`, auto-resetting once
    // every item's been seen. When a reset happens, the item most recently
    // used before the reset is excluded from the first pick of the new
    // cycle (unless arr has only one item), so the same item never repeats
    // back-to-back across a pool exhaustion.
    pickUnused(key, arr) {
      const used = readSet(key);
      let available = [];
      for (let i = 0; i < arr.length; i++) {
        if (!used.has(i)) available.push(i);
      }
      if (available.length === 0) {
        const lastKey = `${storageKey(key)}:last`;
        let lastIndex = -1;
        try {
          const raw = localStorage.getItem(lastKey);
          if (raw != null) lastIndex = Number(raw);
        } catch (e) {
          lastIndex = -1;
        }
        available = [];
        for (let i = 0; i < arr.length; i++) available.push(i);
        if (arr.length > 1 && available.includes(lastIndex)) {
          available = available.filter((i) => i !== lastIndex);
        }
        writeSet(key, new Set());
      }
      const idx = available[Math.floor(Math.random() * available.length)];
      const set = readSet(key);
      set.add(idx);
      writeSet(key, set);
      try {
        localStorage.setItem(`${storageKey(key)}:last`, String(idx));
      } catch (e) {
        // ignore
      }
      return { item: arr[idx], index: idx };
    }
  };
}

// A start/stop/pause/resume countdown timer. onTick(secondsLeft) fires every
// second (including the initial call with the full duration); onExpire()
// fires once when it hits zero. pause()/resume() preserve the remaining time
// instead of resetting it, unlike stop()+start().
function createTimer({ seconds, onTick, onExpire }) {
  let remaining = seconds;
  let handle = null;
  function tick() {
    remaining--;
    if (remaining <= 0) {
      if (onTick) onTick(0);
      stop();
      if (onExpire) onExpire();
      return;
    }
    if (onTick) onTick(remaining);
  }
  function start(customSeconds) {
    stop();
    remaining = customSeconds != null ? customSeconds : seconds;
    if (onTick) onTick(remaining);
    handle = setInterval(tick, 1000);
  }
  function stop() {
    if (handle) {
      clearInterval(handle);
      handle = null;
    }
  }
  function pause() {
    stop();
  }
  function resume() {
    if (handle || remaining <= 0) return;
    handle = setInterval(tick, 1000);
  }
  return {
    start,
    stop,
    pause,
    resume,
    getRemaining: () => remaining,
    get running() { return handle !== null; }
  };
}

// Renders the universal pre-game timer settings widget into `mount`: an
// on/off switch, preset duration chips, and a custom numeric input. Every
// game calls this once at setup and reads getSeconds()/isEnabled() when the
// game actually starts. `presets` should include `recommended`.
function createTimerSetup({ mount, unitLabel, recommended, presets, defaultEnabled }) {
  const presetList = (presets && presets.length ? presets : [recommended]).filter((v, i, a) => a.indexOf(v) === i);
  let seconds = recommended;
  let enabled = defaultEnabled !== false;

  mount.innerHTML = `
    <div class="timer-setup">
      <div class="timer-setup-head">
        <label class="timer-switch">
          <input type="checkbox" class="ts-enable" ${enabled ? "checked" : ""}>
          <span class="ts-track"><span class="ts-thumb"></span></span>
          <span class="ts-label">⏱️ Timer</span>
        </label>
        <span class="ts-recommended">Recommended: ${recommended}s ${unitLabel}</span>
      </div>
      <div class="ts-body${enabled ? "" : " hidden"}">
        <div class="ts-presets">
          ${presetList.map((p) => `<button type="button" class="ts-preset${p === seconds ? " selected" : ""}" data-s="${p}">${p}s</button>`).join("")}
        </div>
        <label class="ts-custom">
          Custom
          <input type="number" class="ts-custom-input" min="5" max="600" step="5" value="${seconds}">
          <span>seconds</span>
        </label>
      </div>
    </div>
  `;

  const enableInput = mount.querySelector(".ts-enable");
  const body = mount.querySelector(".ts-body");
  const presetBtns = Array.from(mount.querySelectorAll(".ts-preset"));
  const customInput = mount.querySelector(".ts-custom-input");

  function selectSeconds(s) {
    if (!Number.isFinite(s)) return;
    seconds = Math.max(5, Math.min(600, Math.round(s)));
    customInput.value = seconds;
    presetBtns.forEach((b) => b.classList.toggle("selected", Number(b.dataset.s) === seconds));
  }

  presetBtns.forEach((b) => {
    b.addEventListener("click", () => selectSeconds(Number(b.dataset.s)));
  });
  customInput.addEventListener("input", () => {
    if (customInput.value === "") return;
    selectSeconds(Number(customInput.value));
  });
  customInput.addEventListener("blur", () => selectSeconds(seconds));

  enableInput.addEventListener("change", () => {
    enabled = enableInput.checked;
    body.classList.toggle("hidden", !enabled);
  });

  return {
    getSeconds: () => seconds,
    isEnabled: () => enabled
  };
}

// Builds the universal in-game timer HUD (countdown + Pause/Resume/Reset)
// into `mount`, wrapping createTimer. warnFrac/urgentFrac are fractions of
// the *started* duration so the warning stages scale with whatever custom
// length the player picked, not a fixed second count.
function createGameTimer({ mount, warnFrac, urgentFrac, showControls, onExpire }) {
  const useControls = showControls !== false;
  const warnFraction = warnFrac != null ? warnFrac : 0.5;
  const urgentFraction = urgentFrac != null ? urgentFrac : 0.25;

  mount.innerHTML = `
    <div class="timer-hud hidden">
      <span class="timer-value">⏱️ --s</span>
      ${useControls ? `
      <span class="timer-controls">
        <button type="button" class="timer-ctrl ts-pause" aria-label="Pause timer">⏸️</button>
        <button type="button" class="timer-ctrl ts-resume hidden" aria-label="Resume timer">▶️</button>
        <button type="button" class="timer-ctrl ts-reset" aria-label="Reset timer">↺</button>
      </span>` : ""}
    </div>
  `;

  const hud = mount.querySelector(".timer-hud");
  const valueEl = mount.querySelector(".timer-value");
  const pauseBtn = mount.querySelector(".ts-pause");
  const resumeBtn = mount.querySelector(".ts-resume");
  const resetBtn = mount.querySelector(".ts-reset");

  let lastSeconds = 0;

  const timer = createTimer({
    seconds: 0,
    onTick: (s) => {
      valueEl.textContent = `⏱️ ${s}s`;
      const urgentAt = Math.max(2, Math.round(lastSeconds * urgentFraction));
      const warnAt = Math.max(urgentAt + 1, Math.round(lastSeconds * warnFraction));
      hud.classList.toggle("timer-urgent", s > 0 && s <= urgentAt);
      hud.classList.toggle("timer-warn", s > 0 && s > urgentAt && s <= warnAt);
    },
    onExpire: () => {
      if (pauseBtn) pauseBtn.classList.add("hidden");
      if (resumeBtn) resumeBtn.classList.add("hidden");
      if (onExpire) onExpire();
    }
  });

  if (useControls) {
    pauseBtn.addEventListener("click", () => {
      timer.pause();
      pauseBtn.classList.add("hidden");
      resumeBtn.classList.remove("hidden");
    });
    resumeBtn.addEventListener("click", () => {
      timer.resume();
      resumeBtn.classList.add("hidden");
      pauseBtn.classList.remove("hidden");
    });
    resetBtn.addEventListener("click", () => start(lastSeconds));
  }

  function start(seconds) {
    lastSeconds = seconds;
    hud.classList.remove("hidden", "timer-warn", "timer-urgent");
    if (pauseBtn) pauseBtn.classList.remove("hidden");
    if (resumeBtn) resumeBtn.classList.add("hidden");
    timer.start(seconds);
  }
  function hide() {
    timer.stop();
    hud.classList.add("hidden");
  }

  return {
    start,
    stop: timer.stop,
    pause: timer.pause,
    resume: timer.resume,
    reset: () => start(lastSeconds),
    show: () => hud.classList.remove("hidden"),
    hide
  };
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
