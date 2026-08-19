// Universal session tie-breaker, shared by every game with a final score
// (Quiz Night, Charades, Password, Two Truths and a Lie, Guess the Song,
// Picture Guess). Not wrapped in an IIFE, matching js/shared.js and the
// js/data-*.js files, so `resolveSession` and the challenge banks it needs
// share the page's global scope with the calling game script.
"use strict";

const tiebreakChallengeBank = createUsedRegistry("tiebreak-challenges");
const tiebreakContentBank = createUsedRegistry("tiebreak-content");

// Finds the entrants tied at the top score. One leader resolves immediately
// via onResolved; two or more switches to the tie-breaker screen (onEnter)
// and plays challenges — reshuffling on repeat rounds — until a single
// winner remains or the group accepts a shared win.
function resolveSession({ entrants, mount, onEnter, onResolved }) {
  const ranked = entrants.slice().sort((a, b) => b.score - a.score);
  const topScore = ranked.length ? ranked[0].score : 0;
  const tied = ranked.filter((e) => e.score === topScore);

  if (tied.length <= 1) {
    onResolved({ ranked, winner: ranked[0] || null, shared: false, tiebreak: null });
    return;
  }

  onEnter();
  const sessionKey = `s${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
  runTiebreakRound({ ranked, tied, mount, onResolved, rounds: 0, sessionKey });
}

function runTiebreakRound({ ranked, tied, mount, onResolved, rounds, sessionKey }) {
  const challenge = tiebreakChallengeBank.pickUnused(sessionKey, TIEBREAKER_CHALLENGES).item;

  mount.innerHTML = `
    <div class="tb-panel">
      <span class="tb-icon">${challenge.icon}</span>
      <h2 class="tb-title">${challenge.name}</h2>
      <p class="tb-tied">Tied: ${tied.map((t) => `<strong>${t.name}</strong>`).join(", ")}</p>
      <p class="tb-instructions">${challenge.instructions}</p>
      <div id="tb-body" class="tb-body"></div>
      <div class="tb-actions">
        <button type="button" class="btn-primary tb-play">⚔️ Play Tie-Breaker</button>
        <button type="button" class="btn-secondary tb-share">🤝 Accept a Shared Win</button>
      </div>
    </div>
  `;

  const body = mount.querySelector("#tb-body");
  const playBtn = mount.querySelector(".tb-play");
  const shareBtn = mount.querySelector(".tb-share");

  shareBtn.addEventListener("click", () => {
    onResolved({ ranked, winner: null, shared: true, tiebreak: { type: challenge.type, rounds: rounds + 1 } });
  });

  playBtn.addEventListener("click", () => {
    playBtn.classList.add("hidden");
    shareBtn.classList.add("hidden");
    renderChallenge(challenge, tied, body, (result) => {
      if (result.winner) {
        onResolved({ ranked, winner: result.winner, shared: false, tiebreak: { type: challenge.type, rounds: rounds + 1 } });
      } else {
        runTiebreakRound({ ranked, tied: result.stillTied, mount, onResolved, rounds: rounds + 1, sessionKey });
      }
    });
  });
}

function tbWinnerButtons(entrants, container, done) {
  entrants.forEach((e) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "award-btn";
    btn.textContent = e.name;
    btn.addEventListener("click", () => done({ winner: e }));
    container.appendChild(btn);
  });
}

function tbClosestEntrants(entrants, guesses, real) {
  const diffs = entrants.map((e) => Math.abs(guesses[e.__tbId] - real));
  const validDiffs = diffs.filter((d) => !Number.isNaN(d));
  if (validDiffs.length === 0) return entrants.slice(); // nobody entered a guess — try again
  const bestDiff = Math.min(...validDiffs);
  return entrants.filter((e, i) => diffs[i] === bestDiff);
}

function renderChallenge(challenge, tied, body, done) {
  tied.forEach((e, i) => {
    if (!e.__tbId) e.__tbId = `tb-${i}-${e.name}`;
  });

  if (challenge.type === "trivia" || challenge.type === "fastest") {
    const { item } = tiebreakContentBank.pickUnused("trivia", TIEBREAKER_TRIVIA);
    body.innerHTML = `
      <p class="tb-question">${item.q}</p>
      ${challenge.type === "fastest" ? '<div id="tb-timer" class="timer-mount"></div>' : ""}
      <button type="button" class="btn-secondary tb-reveal">Show Answer</button>
      <p class="tb-result hidden">Answer: <strong>${item.a}</strong></p>
      <div class="tb-buttons"></div>
    `;
    const revealBtn = body.querySelector(".tb-reveal");
    const answerEl = body.querySelector(".tb-result");
    const buttonsEl = body.querySelector(".tb-buttons");

    if (challenge.type === "fastest") {
      const timer = createGameTimer({ mount: body.querySelector("#tb-timer"), showControls: false, onExpire: () => {} });
      timer.start(10);
    }

    revealBtn.addEventListener("click", () => {
      answerEl.classList.remove("hidden");
      revealBtn.classList.add("hidden");
      tbWinnerButtons(tied, buttonsEl, done);
    });
  } else if (challenge.type === "estimate" || challenge.type === "guess-number") {
    let real;
    let qText;
    if (challenge.type === "estimate") {
      const { item } = tiebreakContentBank.pickUnused("estimate", TIEBREAKER_ESTIMATES);
      real = item.a;
      qText = item.q;
    } else {
      real = 1 + Math.floor(Math.random() * 100);
      qText = "Everyone tied, enter your guess (1–100):";
    }
    body.innerHTML = `
      <p class="tb-question">${qText}</p>
      <div class="tb-guess-rows"></div>
      <button type="button" class="btn-primary tb-reveal-guess">Reveal &amp; Score</button>
    `;
    const rowsEl = body.querySelector(".tb-guess-rows");
    tied.forEach((e) => {
      const row = document.createElement("div");
      row.className = "tb-guess-row";
      row.innerHTML = `<span>${e.name}</span><input type="number" class="tb-guess-input" data-id="${e.__tbId}">`;
      rowsEl.appendChild(row);
    });
    body.querySelector(".tb-reveal-guess").addEventListener("click", () => {
      const guesses = {};
      rowsEl.querySelectorAll("input").forEach((inp) => {
        guesses[inp.dataset.id] = inp.value.trim() === "" ? NaN : Number(inp.value);
      });
      const winners = tbClosestEntrants(tied, guesses, real);
      body.innerHTML = winners.length === 1
        ? `<p class="tb-result">The answer was <strong>${real}</strong>. <strong>${winners[0].name}</strong> was closest!</p>`
        : `<p class="tb-result">The answer was <strong>${real}</strong>. Still tied: ${winners.map((w) => w.name).join(", ")}.</p>`;
      setTimeout(() => {
        if (winners.length === 1) done({ winner: winners[0] });
        else done({ stillTied: winners });
      }, 1600);
    });
  } else if (challenge.type === "showdown") {
    const { item: category } = tiebreakContentBank.pickUnused("category", TIEBREAKER_CATEGORIES);
    let alive = tied.slice();
    let pos = 0;
    body.innerHTML = `
      <p class="tb-question">Category: <strong>${category}</strong></p>
      <p id="tb-turn" class="tb-result"></p>
      <div class="tb-buttons">
        <button type="button" class="award-btn tb-ok">✅ Named one</button>
        <button type="button" class="award-btn tb-out">❌ Stuck / Repeated</button>
      </div>
    `;
    const turnEl = body.querySelector("#tb-turn");
    function renderTurn() {
      turnEl.textContent = `${alive[pos].name}'s turn`;
    }
    renderTurn();
    body.querySelector(".tb-ok").addEventListener("click", () => {
      pos = (pos + 1) % alive.length;
      renderTurn();
    });
    body.querySelector(".tb-out").addEventListener("click", () => {
      alive.splice(pos, 1);
      if (alive.length === 1) {
        done({ winner: alive[0] });
        return;
      }
      pos = pos % alive.length;
      renderTurn();
    });
  } else if (challenge.type === "physical") {
    const { item } = tiebreakContentBank.pickUnused("physical", TIEBREAKER_PHYSICAL);
    body.innerHTML = `<p class="tb-question">${item}</p><div class="tb-buttons"></div>`;
    tbWinnerButtons(tied, body.querySelector(".tb-buttons"), done);
  }
}
