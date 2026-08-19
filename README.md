# Game Night 🎉

A simple, browser-based website with two party games you can play with a group using a single shared device: **Spy Word** (a social deduction word game) and **Quiz Night** (a Jeopardy-style trivia board game). No installs, no accounts, no internet connection required once the page is loaded (aside from the Google Fonts used for styling).

---

## Project Overview

Game Night is a static website — plain HTML, CSS, and JavaScript, no build tools or frameworks — built for casual group hangouts, parties, or classroom icebreakers. One person (the "host") holds the device, and everyone else takes turns looking at the screen when it's their moment.

The site has three pages:

| Page | Purpose |
|---|---|
| `index.html` | Homepage — pick which game to play |
| `spy.html` | Spy Word Game |
| `quiz.html` | Quiz Night |

---

## Game Night Features

- 🕵️ **Spy Word** — 57 specific themes across 7 categories, 3–10 players, pass-the-device word reveal
- 📺 **Quiz Night** — 17 trivia themes, 100–500 point system, team scoring
- No sign-up, no backend, no data leaves your browser
- Fully responsive — works on a laptop, tablet, or phone screen
- Everything is randomized every round (word pairs, the Spy, quiz questions never repeat mid-game)
- Easy to extend — add new themes or questions by editing one data file, no code changes required

---

## Spy Word Game

Spy Word is a social deduction game. Almost every player secretly receives the same **main word**. One randomly chosen player — the Spy — receives a different, but related, **spy word** instead (or, in some editions of the game, none at all). Players take turns describing their word out loud without saying it directly, and the group tries to figure out who the Spy is before the Spy figures out the real word.

### How to Play Spy Word

1. **Choose a theme.** Pick any of the 57 available themes (e.g. "Naruto Characters" or "K-Pop Groups").
2. **Set the number of players** (3–10) using the `−` / `+` stepper.
3. **Optionally name your players.** If you skip this, players are just called "Player 1", "Player 2", etc.
4. **Tap "Deal the Words."** The game randomly picks one word pair from the theme and randomly assigns exactly one player as the Spy.
5. **Pass the device around.** Each player sees a "Pass the device to [Name]" screen first, so nobody accidentally sees the previous player's word. When it's safely in their hands, they tap **"Tap to Reveal My Word"**, memorize it, then tap **"I've Seen It — Hide Word"** before passing the device on.
6. **Discuss.** Once everyone has seen their word, the group talks it over — each player describes their word in vague terms, trying to prove they know it without giving it away. The Spy has to bluff.
7. **Vote, then tap "Reveal the Spy."** The app reveals who the Spy was and what both words were.
8. **Play Again** reshuffles a new word pair and Spy from the same theme and player list, or **New Game** returns to setup.

### Spy Word Themes

Spy Word themes are intentionally **specific**, not broad — a specific theme like "Naruto Characters" gives closely related words (two ninja characters), which makes for a much better guessing game than a broad theme like "Anime" would. Themes are grouped for easier browsing:

- **Classics** — Profession, Food, Vegetables, Fruit, Animals
- **Pop Culture** — SpongeBob Characters, Marvel Heroes, Marvel Villains, MCU Movies, Marvel Locations, Marvel Superpowers, Dragon Ball Characters, Naruto Characters, One Piece Characters, Demon Slayer Characters, Jujutsu Kaisen Characters, Anime Locations, Anime Powers, Disney Movies, Pixar Characters, Netflix Shows, Sitcom Characters, Famous Movie Characters, Video Game Characters
- **Music** — OPM Artists, K-Pop Groups, International Singers, Rock Bands, Song Titles, Musical Instruments
- **Sports** — Basketball Players, NBA Teams, Football Players, Football Teams, Olympic Sports, Sports Equipment
- **Academic** — College Courses, Computer Science Terms, Engineering Terms, Business Terms, Medical Terms, Education Terms, Architecture Terms
- **Philippines** — Famous Places in the Philippines, Philippine Provinces, Philippine Cities, Filipino Celebrities, Filipino Food, Philippine Historical Figures
- **General Knowledge** — World Capitals, Planets of the Solar System, World Currencies, Ancient Civilizations, Tech Companies, International Dishes, Famous Scientists, E-Commerce Platforms

Each theme has a small bank of word pairs (e.g. `{ main: "Naruto Uzumaki", spy: "Sasuke Uchiha" }`), and a new pair is chosen at random every round so the same round doesn't repeat back-to-back.

---

## Quiz Night

Quiz Night is a Jeopardy-style trivia board. The host picks a theme, and a board appears with categories as columns and point values (100–500) as rows. Teams take turns picking a category and point value, the question appears, and the host reveals the answer only when ready.

### How to Play Quiz Night

1. **Choose a theme** from the grouped list (e.g. "Marvel" or "E-Commerce").
2. **Add your teams.** Two teams are added by default; you can rename them, add more (up to 6), or remove down to 1.
3. **Tap "Start Quiz."** The board appears with that theme's categories and point tiles.
4. **Pick a tile.** Whoever's turn it is calls out a category and point value; the host taps that tile. The tile locks immediately so it can't be picked again.
5. **Read the question out loud.** The answer stays hidden.
6. **Tap "Show Answer"** when the group is ready to check. The correct answer appears, along with an **"Award +[points] to [Team]"** button for every team.
7. **Award the points** to whichever team answered correctly, or tap **"Back to Board"** if nobody got it right.
8. Keep playing until the board is empty (or however long the group wants). **Reset Game** clears the board and scores but keeps the same theme and teams; **New Quiz** returns to the setup screen entirely.

Boards with more than 5 categories (like College Programs' 8, or Music's 7) scroll sideways — a "Scroll sideways to see all categories →" hint appears automatically when that's the case.

### Quiz Night Themes

Grouped the same way as Spy Word for easy browsing:

- **Pop Culture** — Cartoons, Marvel, Anime, Movies & TV, Video Games
- **Music** — Music
- **Academic & Local** — College Programs, Philippine Trivia, E-Commerce
- **General Knowledge** — World Geography, Science, World Trivia, History, Technology, Food, Famous People, Sports

Every theme has 3–8 categories, and every category has exactly five questions — one for each point value.

### Scoring System

Every category in Quiz Night uses the same five-tier point system:

| Points | Difficulty |
|---|---|
| 100 | Easy |
| 200 | Moderately easy |
| 300 | Moderate |
| 400 | Difficult |
| 500 | Very difficult |

Team scores are shown at the top of the board at all times. Points are added automatically when the host awards a question, but the `+10` / `−10` buttons next to each team's score let the host manually correct a score at any time (for example, if a team answered before the "Show Answer" tap, or a scoring mistake needs fixing).

### E-Commerce Theme

A beginner-friendly trivia theme covering the basics of online business — great for students or anyone new to the topic. Its five categories are:

- **E-Commerce Basics** — B2B, B2C, C2C, omnichannel retail, and other foundational terms
- **Online Shopping** — shopping carts, promo codes, product recommendations, Shopee, and sales events like 11.11
- **Digital Payments** — digital wallets, GCash, CVV codes, NFC, and cryptocurrency
- **E-Commerce Platforms** — Amazon, Lazada, Alibaba, eBay, Shopify, and the people/companies behind them
- **Online Business** — delivery logistics, digital marketing, customer experience, and dropshipping

As with every Quiz Night theme, the questions progress from beginner-friendly (100) to genuinely challenging (500).

---

## Installation and Setup

Game Night has **no dependencies and no build step.** It's plain HTML/CSS/JavaScript.

1. Download or clone this folder.
2. That's it — there's nothing to install.

### How to Run the Website

You have two options:

**Option A — just open it.** Double-click `index.html` and it will open in your default browser. This works fine for playing the games.

**Option B — run a local server (recommended).** Some browsers restrict certain features when opening files directly with `file://`. If you notice anything odd, serve the folder locally instead:

```bash
# Using Python (already installed on most systems)
python -m http.server 8000
# then open http://localhost:8000 in your browser
```

or, if you have Node.js installed:

```bash
npx serve .
```

Either way, no accounts, servers, or internet access are required to play — the only thing that needs the internet is loading the Google Fonts on first visit.

---

## Project Structure

```
Gamenight/
├── index.html          Homepage — choose a game
├── spy.html             Spy Word Game page
├── quiz.html             Quiz Night page
├── css/
│   ├── style.css        Shared styles + homepage design
│   ├── spy.css           Spy Word Game styles (noir theme)
│   └── quiz.css           Quiz Night styles (game-show theme)
├── js/
│   ├── spy.js             Spy Word Game logic (screens, state, randomization)
│   ├── data-spy.js         Spy Word themes & word pairs (SPY_THEMES, SPY_THEME_ICONS, SPY_THEME_GROUPS)
│   ├── quiz.js             Quiz Night logic (board, scoring, answer reveal)
│   └── data-quiz.js         Quiz Night themes & questions (QUIZ_THEMES, QUIZ_THEME_GROUPS)
└── README.md            You are here
```

The **data files** (`data-spy.js`, `data-quiz.js`) hold all of the game content. The **logic files** (`spy.js`, `quiz.js`) never need to change when you just want to add more themes or questions — they read whatever is in the data files automatically.

---

## How to Add New Spy Word Themes

Open `js/data-spy.js`. Every theme is an entry in the `SPY_THEMES` object: a name, mapped to a list of word pairs.

```js
"Your Theme Name": [
  { main: "Word A", spy: "Word B" },
  { main: "Word C", spy: "Word D" }
  // add as many pairs as you like — one is picked at random each round
],
```

Then:

1. Add an icon for it in `SPY_THEME_ICONS`:
   ```js
   "Your Theme Name": "🎯",
   ```
2. (Optional) Add it to a group in `SPY_THEME_GROUPS` so it's organized nicely on the setup screen:
   ```js
   "Pop Culture": ["Your Theme Name", /* ...existing themes... */],
   ```
   If you skip this step, it still works — the theme just appears in an automatic "More Themes" group.

**Tips for good Spy Word pairs:**
- Keep each theme *specific* (e.g. "Naruto Characters", not "Anime") so the words are closely related.
- The `main` and `spy` words should be different enough that an alert player can eventually tell who's the Spy, but similar enough that the Spy can bluff for a while.
- Aim for at least 5–6 pairs per theme so rounds don't repeat too quickly.

---

## How to Add New Quiz Questions

Open `js/data-quiz.js`. Every theme in `QUIZ_THEMES` has an `icon` and a list of `categories`, and every category needs a `questions` object with exactly five entries: `100`, `200`, `300`, `400`, `500`.

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
    // add more categories the same way — 3 is a good minimum
  ]
}
```

Then add it to `QUIZ_THEME_GROUPS` the same way as Spy Word themes above (optional but recommended).

**Tips for good quiz questions:**
- Keep the 100-point question genuinely easy — it should be answerable by almost anyone.
- Make sure the difficulty actually climbs toward 500; don't reuse a 200-level fact at 400.
- Double-check your answers are factually correct before adding them.
- A theme with more than 5 categories will automatically get a horizontally scrolling board — no extra work needed.

---

## How to Customize the Games

- **Colors & fonts:** each page has its own stylesheet (`spy.css` uses a noir/red palette with a typewriter font for word reveals; `quiz.css` uses a gold/navy game-show palette). Edit the CSS custom properties (`:root { ... }`) at the top of each file to retheme.
- **Player limits:** in `js/spy.js`, change `MIN_PLAYERS` and `MAX_PLAYERS` at the top of the file.
- **Team limits:** in `js/quiz.js`, change `MAX_TEAMS` at the top of the file.
- **Point values:** in `js/quiz.js`, the `POINT_VALUES` array controls which point tiers appear on every board. If you change it, make sure every category's `questions` object in `data-quiz.js` has a matching entry for each value.

---

## Troubleshooting

**The theme grid looks empty, or the page is blank.**
Open your browser's developer console (F12) and check for a red error. This almost always means a typo in `data-spy.js` or `data-quiz.js` — a missing comma or unmatched bracket will stop the whole file from loading. Compare your edit against the existing entries for the exact format.

**A new theme doesn't show 100–500 point tiles.**
Every category in Quiz Night needs all five point keys (`100`, `200`, `300`, `400`, `500`). If one is missing, that tile just won't render.

**Fonts look different than expected / boxy fallback text.**
The site loads custom fonts from Google Fonts. If you're offline on first load, or a strict network blocks external font requests, the browser will fall back to a system font — the game still works fine either way.

**A tile got selected but nothing happened.**
Tiles lock the instant they're clicked (even before you see the question) so they can't be picked twice by accident. If you clicked the wrong tile, there's no built-in "undo" — use **Reset Game** if you need to start the board over.

**I accidentally closed the answer/question overlay.**
Tap **Back to Board** or click "Show Answer" again from the same tile — it isn't marked as "answered" for scoring purposes until you close it, so you can still award points; the tile itself just can't be re-opened once selected.

---

## Future Improvements

Ideas for anyone who wants to keep building on this project:

- Online/remote multiplayer (right now everything is designed for one shared screen)
- A timer for quiz questions, with an audible buzzer
- Sound effects and richer animations
- A way for the host to build and save a custom theme/question set from within the app, instead of editing code
- A light/dark theme toggle
- Difficulty filters (e.g. "easy mode" using only 100–300 point questions)
- A shareable "results screen" at the end of a Quiz Night game showing the final standings

---

## Suggested Additional Group Games

A few more party/group games that would fit naturally alongside Spy Word and Quiz Night on this site:

- **Who Am I?** — Each player receives a secret character, celebrity, or famous person and must ask yes-or-no questions to figure out who they are.
- **Password** — One player tries to make their teammate guess a secret word using only limited one-word clues.
- **Two Truths and a Lie** — Players receive or create three statements, and everyone tries to identify which one is the lie.
- **Would You Rather?** — Players choose between two funny or difficult scenarios and can optionally explain their choices.
- **Charades** — A player receives a secret word or phrase and must act it out without speaking while the group guesses.
- **Guess the Song** — Players hear a short music clip or receive clues and compete to identify the song or artist.
- **Picture Guess** — Players are shown a partially hidden, blurred, or zoomed-in image and must guess what it is.
- **Most Likely To** — Players answer fun group questions like "Who is most likely to become famous?" and vote for someone in the group.
- **Categories** — Players must quickly name items belonging to a selected category; whoever can't answer in time loses the round.
