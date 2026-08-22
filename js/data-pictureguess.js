// Picture Guess: every round shows a real photo, not just an emoji.
//
// This is a static site with no image hosting of its own, so instead of
// baking in hotlinked image URLs (which rot the moment a file gets renamed
// or deleted), each entry carries a `wikiTitle` — the exact Wikipedia
// article title for its subject. js/pictureguess.js resolves that title to
// a current thumbnail image at play time via Wikipedia's free, CORS-enabled
// REST API (https://en.wikipedia.org/api/rest_v1/page/summary/<title>),
// which always points at that article's current lead image. Images are
// Wikimedia Commons media, released under free licenses (public domain or
// CC BY-SA) or used the same way Wikipedia itself displays them.
//
// `emoji` is kept only as the decorative category-card icon and as an
// offline/fallback glyph if a photo can't be fetched — never as the primary
// clue anymore.
const PICTUREGUESS_CATEGORIES = {
  "Places": [
    { emoji: "🗼", answer: "Eiffel Tower (Paris)", wikiTitle: "Eiffel Tower" },
    { emoji: "🗽", answer: "Statue of Liberty (New York)", wikiTitle: "Statue of Liberty" },
    { emoji: "🗻", answer: "Mount Fuji (Japan)", wikiTitle: "Mount Fuji" },
    { emoji: "🏛️", answer: "The Parthenon (Greece)", wikiTitle: "Parthenon" },
    { emoji: "🎡", answer: "The London Eye (London)", wikiTitle: "London Eye" },
    { emoji: "🏰", answer: "Neuschwanstein Castle (Germany)", wikiTitle: "Neuschwanstein Castle" },
    { emoji: "🌉", answer: "Golden Gate Bridge (San Francisco)", wikiTitle: "Golden Gate Bridge" },
    { emoji: "🕋", answer: "The Kaaba (Mecca)", wikiTitle: "Kaaba" }
  ],
  "Food": [
    { emoji: "🍕", answer: "Pizza", wikiTitle: "Pizza" },
    { emoji: "🍣", answer: "Sushi", wikiTitle: "Sushi" },
    { emoji: "🌮", answer: "Taco", wikiTitle: "Taco" },
    { emoji: "🍜", answer: "Ramen", wikiTitle: "Ramen" },
    { emoji: "🍔", answer: "Burger", wikiTitle: "Hamburger" },
    { emoji: "🥟", answer: "Dumpling", wikiTitle: "Dumpling" },
    { emoji: "🍩", answer: "Donut", wikiTitle: "Doughnut" },
    { emoji: "🧇", answer: "Waffle", wikiTitle: "Waffle" }
  ],
  "Animals": [
    { emoji: "🦁", answer: "Lion", wikiTitle: "Lion" },
    { emoji: "🐘", answer: "Elephant", wikiTitle: "Elephant" },
    { emoji: "🦒", answer: "Giraffe", wikiTitle: "Giraffe" },
    { emoji: "🐧", answer: "Penguin", wikiTitle: "Penguin" },
    { emoji: "🦋", answer: "Butterfly", wikiTitle: "Butterfly" },
    { emoji: "🐢", answer: "Turtle", wikiTitle: "Turtle" },
    { emoji: "🦈", answer: "Shark", wikiTitle: "Shark" },
    { emoji: "🦉", answer: "Owl", wikiTitle: "Owl" }
  ],
  "Movies": [
    { emoji: "🦁👑", answer: "The Lion King", wikiTitle: "The Lion King" },
    { emoji: "🕷️🧑", answer: "Spider-Man", wikiTitle: "Spider-Man (2002 film)" },
    { emoji: "🧊❄️👸", answer: "Frozen", wikiTitle: "Frozen (2013 film)" },
    { emoji: "🦈🌊", answer: "Jaws", wikiTitle: "Jaws (film)" },
    { emoji: "🚢🧊💔", answer: "Titanic", wikiTitle: "Titanic (1997 film)" },
    { emoji: "🦖🏝️", answer: "Jurassic Park", wikiTitle: "Jurassic Park (film)" },
    { emoji: "👻🚫", answer: "Ghostbusters", wikiTitle: "Ghostbusters (1984 film)" },
    { emoji: "🐟🔍", answer: "Finding Nemo", wikiTitle: "Finding Nemo" }
  ],
  "Anime": [
    { emoji: "🍥🦊", answer: "Naruto", wikiTitle: "Naruto" },
    { emoji: "🐉⚡", answer: "Dragon Ball", wikiTitle: "Dragon Ball" },
    { emoji: "⚔️😈", answer: "Demon Slayer", wikiTitle: "Demon Slayer: Kimetsu no Yaiba" },
    { emoji: "🏴‍☠️🍖", answer: "One Piece", wikiTitle: "One Piece" },
    { emoji: "📓💀", answer: "Death Note", wikiTitle: "Death Note" },
    { emoji: "🦸‍♂️🎓", answer: "My Hero Academia", wikiTitle: "My Hero Academia" },
    { emoji: "⚙️🔥", answer: "Fullmetal Alchemist", wikiTitle: "Fullmetal Alchemist" },
    { emoji: "🧱🦖", answer: "Attack on Titan", wikiTitle: "Attack on Titan" }
  ],
  "Celebrities": [
    { emoji: "🤴🎤", answer: "Michael Jackson (King of Pop)", wikiTitle: "Michael Jackson" },
    { emoji: "🥊🇵🇭", answer: "Manny Pacquiao", wikiTitle: "Manny Pacquiao" },
    { emoji: "👑🎵", answer: "Beyoncé (Queen Bey)", wikiTitle: "Beyoncé" },
    { emoji: "🏀👑", answer: "LeBron James (King James)", wikiTitle: "LeBron James" },
    { emoji: "⚡🏃", answer: "Usain Bolt (Lightning Bolt)", wikiTitle: "Usain Bolt" },
    { emoji: "🎤💃", answer: "Madonna (Queen of Pop)", wikiTitle: "Madonna (entertainer)" },
    { emoji: "🥊🦋🐝", answer: "Muhammad Ali (float like a butterfly, sting like a bee)", wikiTitle: "Muhammad Ali" },
    { emoji: "📱🍎", answer: "Steve Jobs (Apple co-founder)", wikiTitle: "Steve Jobs" }
  ],
  "Philippine Locations": [
    { emoji: "🏝️🤍", answer: "Boracay", wikiTitle: "Boracay" },
    { emoji: "⛰️🍫", answer: "Chocolate Hills (Bohol)", wikiTitle: "Chocolate Hills" },
    { emoji: "🌋", answer: "Mayon Volcano", wikiTitle: "Mayon" },
    { emoji: "🏙️🇵🇭", answer: "Manila", wikiTitle: "Manila" },
    { emoji: "🌾⛰️", answer: "Banaue Rice Terraces", wikiTitle: "Banaue Rice Terraces" },
    { emoji: "🏔️❄️", answer: "Baguio", wikiTitle: "Baguio" },
    { emoji: "🐠🤿", answer: "Palawan", wikiTitle: "Palawan" },
    { emoji: "🌊🏄", answer: "Siargao", wikiTitle: "Siargao" }
  ],
  "Logos": [
    { emoji: "🍎", answer: "Apple", wikiTitle: "Apple Inc." },
    { emoji: "✅", answer: "Nike", wikiTitle: "Nike, Inc." },
    { emoji: "🍟🍔", answer: "McDonald's", wikiTitle: "McDonald's" },
    { emoji: "🐦", answer: "Twitter (X)", wikiTitle: "Twitter" },
    { emoji: "▶️🔴", answer: "YouTube", wikiTitle: "YouTube" },
    { emoji: "👤📘", answer: "Facebook", wikiTitle: "Facebook" },
    { emoji: "☕🧜‍♀️", answer: "Starbucks", wikiTitle: "Starbucks" },
    { emoji: "🚗⚡", answer: "Tesla", wikiTitle: "Tesla, Inc." }
  ]
};

const PICTUREGUESS_CATEGORY_ICONS = {
  "Places": "🗺️",
  "Food": "🍽️",
  "Animals": "🐾",
  "Movies": "🎬",
  "Anime": "🍜",
  "Celebrities": "🌟",
  "Philippine Locations": "🇵🇭",
  "Logos": "🏷️"
};
