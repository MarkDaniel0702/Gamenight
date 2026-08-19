# 🎮 Game Night

<p>
  <img alt="No build step" src="https://img.shields.io/badge/build-none-brightgreen">
  <img alt="No dependencies" src="https://img.shields.io/badge/dependencies-none-blue">
  <img alt="No accounts" src="https://img.shields.io/badge/sign--up-not%20required-blue">
  <img alt="Host optional" src="https://img.shields.io/badge/host-optional-orange">
  <img alt="Spy Word themes" src="https://img.shields.io/badge/spy%20word%20themes-57-e8324f">
  <img alt="Quiz Night themes" src="https://img.shields.io/badge/quiz%20night%20themes-17-ffcb3c">
</p>

A colorful, browser-based party game website for **🕵️ Spy Word** (social deduction) and **❓ Quiz Night** (trivia showdown) — built to be played by a group crowded around one shared screen, with **no dedicated host required**.

> [!TIP]
> Never played either game before? Every setup screen has a collapsible **"❓ How does this work?"** box with the full rules — nobody needs to read this README to play.

---

## ✨ Features

| | |
|---|---|
| 🙅 **No host required** | Both games run themselves — turn order, timers, hidden info, and results all happen automatically. |
| 🎙️ **Game Master optional** | Prefer a human running the show? Quiz Night has a manual mode for that too. |
| 🎨 **57 + 17 themes** | From Naruto Characters to E-Commerce, grouped so they're easy to browse. |
| ⏱️ **Built-in timers** | An answer timer in Quiz Night and an optional discussion timer in Spy Word keep rounds moving. |
| 🏁 **Automatic results** | Quiz Night detects when the board is finished and shows final standings on its own. |
| 📱 **Fully responsive** | Works on a laptop, tablet, or phone passed around a table. |
| 🔒 **Private by design** | No accounts, no server, nothing leaves your browser. |

---

## 🕵️ Spy Word Game

A social deduction word game. Almost every player secretly receives the same **main word**. One randomly chosen player — the Spy — receives a different, related **spy word** instead. Everyone describes their word out loud without saying it, and the group tries to catch the Spy before the Spy figures out the real word.

### How to Play

1. **Pick a theme, set the player count (3–10), and optionally name your players.**
2. **Tap "Deal the Words."** The app randomly picks a word pair and randomly assigns exactly one Spy — nobody chooses who the host or Spy is.
3. **Pass the device around.** Each player gets their own private "Pass the device to [Name]" screen, taps to reveal their word, then hides it before handing the device on — so nobody can peek at someone else's word.
4. **Discuss out loud.** Once everyone's seen their word, the group talks it over. If the optional discussion timer is on, a 90-second countdown appears automatically.
5. **Anyone taps "Reveal the Spy."** No permanent host needed — whoever's holding the device at that moment can do it.
6. **Play Again** reshuffles instantly, or **New Game** returns to setup.

> [!NOTE]
> Spy Word doesn't need a Game Master at all — the "host" role is just whoever's physically holding the device at that moment, and it naturally rotates as the device gets passed around.

---

## ❓ Quiz Night

A Jeopardy-style trivia board. Pick a theme, and a board appears with categories as columns and point values (100–500) as rows. Teams take turns picking a tile, the question appears, and the answer stays hidden until someone reveals it.

### How to Play

1. **Pick a theme, add your teams (up to 6), and choose a play style** (see 🤖 Automated Game Master below).
2. **Tap "Start Quiz."** A turn banner shows whose turn it is to pick — no one has to remember or referee that themselves.
3. **Pick a tile.** It locks the instant it's clicked, so it can never accidentally be picked twice.
4. **Read the question out loud.** The answer stays hidden until "Show Answer" is tapped — or the timer runs out, in Automated mode.
5. **Award the points.** Every team has its own "+points" button right there on screen — any team can tap their own when they get it right.
6. **The turn passes automatically**, and once every tile on the board is answered, a **🏁 results screen** appears on its own with the final standings.

---

## 🎯 How the Games Work

Both games follow the same host-optional principles under the hood:

- **Turns are tracked automatically.** Spy Word shows exactly whose turn it is to hold the device; Quiz Night shows a turn banner naming the next team.
- **Private information stays private.** Spy Word's pass-the-device flow hides each player's word before the next player picks up the phone.
- **Results appear on their own.** Quiz Night detects when the board is cleared and jumps straight to a ranked results screen — nobody has to tally scores by hand.
- **Restarting is instant.** "Play Again" / "New Game" / "New Quiz" buttons are always one tap away, no setup lost unnecessarily.

---

## 👥 Multiplayer Support

Both games are designed for **one shared device or screen**, passed around or viewed together:

- **Spy Word** — 3 to 10 players, physically passing the device for each private reveal.
- **Quiz Night** — 1 to 6 teams, all interacting with the same on-screen board and scoreboard together.

Because nothing requires a permanent "host" account or login, any player can start a round, and control naturally passes between people as the games call for it.

---

## 🤖 Automated Game Master

Quiz Night can run itself, or hand control to a human — your choice, picked once at setup:

| Mode | What happens |
|---|---|
| 🤖 **Automated** *(default)* | Turn order rotates automatically, and a **20-second answer timer** appears on every question — if time runs out, the answer reveals itself. |
| 🎙️ **Game Master** | No timer — one person reads questions and reveals answers whenever the group is ready, at their own pace. |

> [!TIP]
> Switching modes doesn't change *who* can click what — every button is available to every player in both modes. Game Master mode just turns off the automatic timer so one person can control pacing.

Spy Word has a lighter-weight version of the same idea: an **optional 90-second discussion timer** (toggle it off at setup if your group prefers to talk it out at their own pace).

---

## 🎨 Themes

### 🕵️ Spy Word — 57 themes across 7 groups

Spy Word themes are deliberately **specific**, not broad — "Naruto Characters" gives two closely related ninjas, which makes for a much better guessing game than a vague "Anime" theme would.

| Group | Themes |
|---|---|
| **Classics** | Profession, Food, Vegetables, Fruit, Animals |
| **Pop Culture** | SpongeBob Characters, Marvel Heroes/Villains, MCU Movies, Marvel Locations/Superpowers, Dragon Ball/Naruto/One Piece/Demon Slayer/Jujutsu Kaisen Characters, Anime Locations/Powers, Disney Movies, Pixar Characters, Netflix Shows, Sitcom Characters, Famous Movie Characters, Video Game Characters |
| **Music** | OPM Artists, K-Pop Groups, International Singers, Rock Bands, Song Titles, Musical Instruments |
| **Sports** | Basketball Players, NBA Teams, Football Players, Football Teams, Olympic Sports, Sports Equipment |
| **Academic** | College Courses, Computer Science/Engineering/Business/Medical/Education/Architecture Terms |
| **Philippines** | Famous Places, Provinces, Cities, Filipino Celebrities, Filipino Food, Historical Figures |
| **General Knowledge** | World Capitals, Planets of the Solar System, World Currencies, Ancient Civilizations, Tech Companies, International Dishes, Famous Scientists, E-Commerce Platforms |

### ❓ Quiz Night — 17 themes across 4 groups

| Group | Themes |
|---|---|
| **Pop Culture** | Cartoons, Marvel, Anime, Movies & TV, Video Games |
| **Music** | Music |
| **Academic & Local** | College Programs, Philippine Trivia, **E-Commerce** |
| **General Knowledge** | World Geography, Science, World Trivia, History, Technology, Food, Famous People, Sports |

> [!NOTE]
> The **E-Commerce** theme is a beginner-friendly track covering online shopping, digital payments, platforms like Shopee and Lazada, and the basics of running an online business — great for students new to the topic.

Boards with more than 5 categories (like College Programs' 8) scroll sideways automatically, with an on-screen hint.

---

## 📊 Scoring System

Every Quiz Night category uses the same five-tier point system:

| Points | Difficulty |
|---|---|
| 🟢 100 | Easy |
| 🟢 200 | Moderately easy |
| 🟡 300 | Moderate |
| 🟠 400 | Difficult |
| 🔴 500 | Very difficult |

Team scores are shown at the top of the board at all times, updating instantly when points are awarded. The `+10` / `−10` buttons next to each team let anyone manually correct a score at any time.

---

## 🛠️ Installation

Game Night has **zero dependencies and no build step** — it's plain HTML, CSS, and JavaScript.

```bash
# Just get the files — nothing to install
git clone <this-repo-url>
```

## ▶️ How to Run

**Option A — just open it.** Double-click `index.html` and it opens in your default browser.

**Option B — run a local server** (recommended if your browser restricts `file://` pages):

```bash
# Using Python (already installed on most systems)
python -m http.server 8000
# then open http://localhost:8000

# ...or using Node.js
npx serve .
```

No accounts, backend, or internet connection are required to play — the only thing that needs the internet is loading the Google Fonts on first visit.

---

## 📁 Project Structure

```
Gamenight/
├── index.html            Homepage — choose a game
├── spy.html                Spy Word Game page
├── quiz.html                 Quiz Night page
├── css/
│   ├── style.css            Shared styles + homepage design
│   ├── spy.css                Spy Word styles (noir theme)
│   └── quiz.css                 Quiz Night styles (game-show theme)
├── js/
│   ├── spy.js                Spy Word logic (screens, state, timers, randomization)
│   ├── data-spy.js             Spy Word themes & word pairs
│   ├── quiz.js                Quiz Night logic (board, turns, timer, scoring, results)
│   └── data-quiz.js             Quiz Night themes & questions
└── README.md              You are here
```

The **data files** (`data-spy.js`, `data-quiz.js`) hold all game content. The **logic files** (`spy.js`, `quiz.js`) never need to change just to add more themes or questions.

---

## ➕ Adding New Themes and Questions

<details>
<summary><strong>🕵️ Add a new Spy Word theme</strong></summary>

Open `js/data-spy.js` and add an entry to `SPY_THEMES`:

```js
"Your Theme Name": [
  { main: "Word A", spy: "Word B" },
  { main: "Word C", spy: "Word D" }
  // one pair is picked at random each round — aim for 5–6+
],
```

Then add an icon in `SPY_THEME_ICONS` and, optionally, a spot for it in `SPY_THEME_GROUPS` so it's organized on the setup screen (skipping this just puts it in an automatic "More Themes" group).

**Good pairs are specific:** "Naruto Characters" beats "Anime" — the words should be closely related but distinct enough that an alert group can eventually spot the Spy.

</details>

<details>
<summary><strong>❓ Add new Quiz Night questions</strong></summary>

Open `js/data-quiz.js`. Every theme needs an `icon` and a list of `categories`, and every category needs all five point levels:

```js
"Your Theme": {
  icon: "🎯",
  categories: [
    {
      name: "Your Category",
      questions: {
        100: { q: "An easy question?", a: "The answer" },
        200: { q: "A slightly harder question?", a: "The answer" },
        300: { q: "A moderate question?", a: "The answer" },
        400: { q: "A difficult question?", a: "The answer" },
        500: { q: "A very difficult question?", a: "The answer" }
      }
    }
  ]
}
```

Add it to `QUIZ_THEME_GROUPS` the same way as Spy Word. Themes with more than 5 categories automatically get a scrollable board — no extra work needed.

> [!IMPORTANT]
> Every category must have exactly the five point keys `100`–`500`, or that tile won't render. Double-check your facts before adding them — accuracy matters more than difficulty.

</details>

---

## 🔧 Customization

| Want to change... | Edit... |
|---|---|
| Colors & fonts | The `:root { ... }` custom properties at the top of `spy.css` / `quiz.css` |
| Min/max players (Spy Word) | `MIN_PLAYERS` / `MAX_PLAYERS` in `js/spy.js` |
| Max teams (Quiz Night) | `MAX_TEAMS` in `js/quiz.js` |
| Answer timer length | `ANSWER_TIMER_SECONDS` in `js/quiz.js` |
| Discussion timer length | `DISCUSSION_SECONDS` in `js/spy.js` |
| Point tiers | `POINT_VALUES` in `js/quiz.js` — update every category's `questions` object to match |

---

## 🐛 Troubleshooting

<details>
<summary><strong>The theme grid looks empty, or the page is blank</strong></summary>

Open your browser's dev console (F12) and check for a red error — almost always a typo in `data-spy.js` or `data-quiz.js` (a missing comma or bracket stops the whole file from loading). Compare against the existing entries for the exact format.
</details>

<details>
<summary><strong>A new theme doesn't show all its point tiles</strong></summary>

Every Quiz Night category needs all five point keys (`100`, `200`, `300`, `400`, `500`). If one's missing, that tile just won't render.
</details>

<details>
<summary><strong>Fonts look different than expected</strong></summary>

The site loads fonts from Google Fonts. Offline on first load, or on a strict network? The browser falls back to a system font — everything still works.
</details>

<details>
<summary><strong>A tile got clicked but nothing happened</strong></summary>

Tiles lock the instant they're clicked (even before the question shows) so they can't be picked twice by accident. There's no built-in undo — use <strong>Reset Game</strong> to start the board over if needed.
</details>

<details>
<summary><strong>The answer timer keeps interrupting discussion</strong></summary>

Switch to <strong>🎙️ Game Master mode</strong> at setup (Quiz Night) or turn off the discussion timer toggle (Spy Word) — both are fully optional.
</details>

---

## 🚀 Future Improvements

Ideas for anyone who wants to keep building on this project:

- 🌐 Online/remote multiplayer (everything today assumes one shared screen)
- 🔊 Sound effects and a buzzer for the answer timer
- 🧩 An in-app theme/question builder, so hosts don't need to edit code
- 🌗 A light/dark theme toggle
- 🎚️ Difficulty filters (e.g. "easy mode" using only 100–300 point questions)
- 📤 A shareable results screen at the end of a Quiz Night game
