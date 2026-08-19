// Picture Guess: since this is a static site with no image hosting (and no
// way to legally serve real celebrity/movie/logo photos), each round shows
// an emoji "picture" that starts blurred and sharpens over time instead.
const PICTUREGUESS_CATEGORIES = {
  "Places": [
    { emoji: "🗼", answer: "Eiffel Tower (Paris)" },
    { emoji: "🗽", answer: "Statue of Liberty (New York)" },
    { emoji: "🗻", answer: "Mount Fuji (Japan)" },
    { emoji: "🏛️", answer: "The Parthenon (Greece)" },
    { emoji: "🎡", answer: "The London Eye (London)" },
    { emoji: "🏰", answer: "Neuschwanstein Castle (Germany)" },
    { emoji: "🌉", answer: "Golden Gate Bridge (San Francisco)" },
    { emoji: "🕋", answer: "The Kaaba (Mecca)" }
  ],
  "Food": [
    { emoji: "🍕", answer: "Pizza" },
    { emoji: "🍣", answer: "Sushi" },
    { emoji: "🌮", answer: "Taco" },
    { emoji: "🍜", answer: "Ramen" },
    { emoji: "🍔", answer: "Burger" },
    { emoji: "🥟", answer: "Dumpling" },
    { emoji: "🍩", answer: "Donut" },
    { emoji: "🧇", answer: "Waffle" }
  ],
  "Animals": [
    { emoji: "🦁", answer: "Lion" },
    { emoji: "🐘", answer: "Elephant" },
    { emoji: "🦒", answer: "Giraffe" },
    { emoji: "🐧", answer: "Penguin" },
    { emoji: "🦋", answer: "Butterfly" },
    { emoji: "🐢", answer: "Turtle" },
    { emoji: "🦈", answer: "Shark" },
    { emoji: "🦉", answer: "Owl" }
  ],
  "Movies": [
    { emoji: "🦁👑", answer: "The Lion King" },
    { emoji: "🕷️🧑", answer: "Spider-Man" },
    { emoji: "🧊❄️👸", answer: "Frozen" },
    { emoji: "🦈🌊", answer: "Jaws" },
    { emoji: "🚢🧊💔", answer: "Titanic" },
    { emoji: "🦖🏝️", answer: "Jurassic Park" },
    { emoji: "👻🚫", answer: "Ghostbusters" },
    { emoji: "🐟🔍", answer: "Finding Nemo" }
  ],
  "Anime": [
    { emoji: "🍥🦊", answer: "Naruto" },
    { emoji: "🐉⚡", answer: "Dragon Ball" },
    { emoji: "⚔️😈", answer: "Demon Slayer" },
    { emoji: "🏴‍☠️🍖", answer: "One Piece" },
    { emoji: "📓💀", answer: "Death Note" },
    { emoji: "🦸‍♂️🎓", answer: "My Hero Academia" },
    { emoji: "⚙️🔥", answer: "Fullmetal Alchemist" },
    { emoji: "🧱🦖", answer: "Attack on Titan" }
  ],
  "Celebrities": [
    { emoji: "🤴🎤", answer: "Michael Jackson (King of Pop)" },
    { emoji: "🥊🇵🇭", answer: "Manny Pacquiao" },
    { emoji: "👑🎵", answer: "Beyoncé (Queen Bey)" },
    { emoji: "🏀👑", answer: "LeBron James (King James)" },
    { emoji: "⚡🏃", answer: "Usain Bolt (Lightning Bolt)" },
    { emoji: "🎤💃", answer: "Madonna (Queen of Pop)" },
    { emoji: "🥊🦋🐝", answer: "Muhammad Ali (float like a butterfly, sting like a bee)" },
    { emoji: "📱🍎", answer: "Steve Jobs (Apple co-founder)" }
  ],
  "Philippine Locations": [
    { emoji: "🏝️🤍", answer: "Boracay" },
    { emoji: "⛰️🍫", answer: "Chocolate Hills (Bohol)" },
    { emoji: "🌋", answer: "Mayon Volcano" },
    { emoji: "🏙️🇵🇭", answer: "Manila" },
    { emoji: "🌾⛰️", answer: "Banaue Rice Terraces" },
    { emoji: "🏔️❄️", answer: "Baguio" },
    { emoji: "🐠🤿", answer: "Palawan" },
    { emoji: "🌊🏄", answer: "Siargao" }
  ],
  "Logos": [
    { emoji: "🍎", answer: "Apple" },
    { emoji: "✅", answer: "Nike" },
    { emoji: "🍟🍔", answer: "McDonald's" },
    { emoji: "🐦", answer: "Twitter (X)" },
    { emoji: "▶️🔴", answer: "YouTube" },
    { emoji: "👤📘", answer: "Facebook" },
    { emoji: "☕🧜‍♀️", answer: "Starbucks" },
    { emoji: "🚗⚡", answer: "Tesla" }
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
