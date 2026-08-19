// Guess the Song: since this is a static site with no audio playback, each
// round reveals three progressively specific clues (an emoji rebus, a
// description, then an artist/era hint) instead of an audio clip.
const GUESSTHESONG_CATEGORIES = {
  "OPM": [
    { clues: ["👶😢🙏", "A father's heartfelt ballad about a wayward child — one of the most famous OPM songs ever, later translated into over 20 languages.", "Artist: Freddie Aguilar (1978)"], answer: "Anak — Freddie Aguilar" },
    { clues: ["🎩🕺💃", "A nostalgic rock ballad about lost love, told through the metaphor of a magician's assistant.", "Artist: Eraserheads (1995)"], answer: "Ang Huling El Bimbo — Eraserheads" },
    { clues: ["💕📞😢", "A powerhouse ballad about needing someone, made famous by 'Asia's Songbird'.", "Artist: Regine Velasquez"], answer: "Kailangan Kita — Regine Velasquez" },
    { clues: ["⏳💔🎤", "A ballad about hoping someone will realize your love 'in time'.", "Artist: Aiza Seguerra"], answer: "Pagdating ng Panahon — Aiza Seguerra" },
    { clues: ["🌙💭🎨", "A dreamy folk-pop hit from a nine-member Filipino band known for their acoustic sound.", "Artist: Ben&Ben"], answer: "Kathang Isip — Ben&Ben" },
    { clues: ["🌕💌🎸", "A soft acoustic love song comparing someone's beauty to the moon — a huge OPM hit in 2019.", "Artist: juan karlos"], answer: "Buwan — juan karlos" },
    { clues: ["🎭💫🎶", "An indie hit about fate and love, from a Filipino alternative/soul band.", "Artist: Up Dharma Down"], answer: "Tadhana — Up Dharma Down" },
    { clues: ["🎸💘😅", "An upbeat, quirky OPM love song that became a wedding entrance favorite.", "Artist: Moonstar88"], answer: "Torete — Moonstar88" }
  ],
  "K-Pop": [
    { clues: ["✨🕺🎆", "An upbeat disco-pop English-language hit that topped the Billboard Hot 100 in 2020.", "Artist: BTS"], answer: "Dynamite — BTS" },
    { clues: ["🔫💥👑", "A fierce, bass-heavy hit whose title mimics the sound of gunfire.", "Artist: BLACKPINK"], answer: "DDU-DU DDU-DU — BLACKPINK" },
    { clues: ["🐴💃😎", "A viral 2012 hit famous for its horse-riding dance, one of YouTube's first billion-view videos.", "Artist: PSY"], answer: "Gangnam Style — PSY" },
    { clues: ["💣❤️‍🔥👊", "A powerful anthem about ending a toxic relationship, with a booming trumpet intro.", "Artist: BLACKPINK"], answer: "Kill This Love — BLACKPINK" },
    { clues: ["🧈😎🕶️", "A smooth, funky English-language single described as going down 'smooth like butter'.", "Artist: BTS"], answer: "Butter — BTS" },
    { clues: ["🔥👑💅", "An energetic comeback anthem that broke YouTube premiere records in 2020.", "Artist: BLACKPINK"], answer: "How You Like That — BLACKPINK" },
    { clues: ["🌧️🚶🎶", "A comforting, reflective song released during the pandemic — the first all-Korean song to top the Billboard Hot 100.", "Artist: BTS"], answer: "Life Goes On — BTS" },
    { clues: ["💪🚫💔", "A confident anthem about growing stronger from hardship, from a girl group formed by HYBE.", "Artist: LE SSERAFIM"], answer: "Antifragile — LE SSERAFIM" }
  ],
  "Pop": [
    { clues: ["🌃🚗💡", "An 80s-inspired synth-pop hit, one of the best-performing Billboard Hot 100 songs of all time.", "Artist: The Weeknd"], answer: "Blinding Lights — The Weeknd" },
    { clues: ["💃❤️🎤", "One of the best-selling digital singles ever, from the album ÷ (Divide).", "Artist: Ed Sheeran"], answer: "Shape of You — Ed Sheeran" },
    { clues: ["😈🦷🖤", "A dark, whisper-vocal pop hit that helped its teenage singer sweep the 2020 Grammys.", "Artist: Billie Eilish"], answer: "Bad Guy — Billie Eilish" },
    { clues: ["🕺🎺😎", "A funk-revival smash hit pairing a Grammy-winning producer with a Hawaiian-born singer.", "Artists: Mark Ronson feat. Bruno Mars"], answer: "Uptown Funk — Mark Ronson ft. Bruno Mars" },
    { clues: ["🚀💃🌙", "A disco-pop hit from the album 'Future Nostalgia'.", "Artist: Dua Lipa"], answer: "Levitating — Dua Lipa" },
    { clues: ["🍉🌞😊", "A sunny, feel-good hit from a former boy-band member's solo album 'Fine Line'.", "Artist: Harry Styles"], answer: "Watermelon Sugar — Harry Styles" },
    { clues: ["🌊💔🔥", "A soulful breakup anthem from the album '21' that won Record of the Year.", "Artist: Adele"], answer: "Rolling in the Deep — Adele" },
    { clues: ["☀️😄👏", "An upbeat, feel-good hit from the 'Despicable Me 2' soundtrack.", "Artist: Pharrell Williams"], answer: "Happy — Pharrell Williams" }
  ],
  "Rock": [
    { clues: ["🎭🎹🎸", "A genre-defying six-minute rock opera, famously featured in a biopic of the same band.", "Artist: Queen"], answer: "Bohemian Rhapsody — Queen" },
    { clues: ["🧴😤🎸", "The song that helped bring grunge music into the mainstream in 1991.", "Artist: Nirvana"], answer: "Smells Like Teen Spirit — Nirvana" },
    { clues: ["🌹👧🎸", "Known for its iconic opening guitar riff, from the album 'Appetite for Destruction'.", "Artist: Guns N' Roses"], answer: "Sweet Child O' Mine — Guns N' Roses" },
    { clues: ["😴👹🎸", "A heavy metal anthem about nightmares, one of the band's most recognizable songs.", "Artist: Metallica"], answer: "Enter Sandman — Metallica" },
    { clues: ["🙏💪🎸", "An anthemic 80s rock hit about a couple named Tommy and Gina.", "Artist: Bon Jovi"], answer: "Livin' on a Prayer — Bon Jovi" },
    { clues: ["🏨🌵🎸", "A mysterious, atmospheric rock classic with a famously long guitar solo outro.", "Artist: Eagles"], answer: "Hotel California — Eagles" },
    { clues: ["😞🧱🎤", "A nu-metal/rock anthem about feeling pressured to be someone you're not.", "Artist: Linkin Park"], answer: "Numb — Linkin Park" },
    { clues: ["🎸🌟😍", "One of the most famous Britpop songs ever — often the first song beginner guitarists learn.", "Artist: Oasis"], answer: "Wonderwall — Oasis" }
  ],
  "Disney": [
    { clues: ["❄️👑🏰", "An empowerment anthem sung by a queen who builds an ice castle after fleeing her kingdom.", "From: Frozen (2013)"], answer: "Let It Go — Frozen" },
    { clues: ["🧞‍♂️🌍🪄", "A romantic duet sung on a flying carpet ride.", "From: Aladdin (1992)"], answer: "A Whole New World — Aladdin" },
    { clues: ["🦁🌅👑", "The opening anthem of an African savanna story, sung as a lion cub is presented to the animal kingdom.", "From: The Lion King (1994)"], answer: "Circle of Life — The Lion King" },
    { clues: ["🌊⛵🌺", "A song about a girl who feels the pull of the ocean and her destiny beyond her island.", "From: Moana (2016)"], answer: "How Far I'll Go — Moana" },
    { clues: ["🐠🦀🎶", "A calypso-style song sung by a crab trying to convince a mermaid to stay in the ocean.", "From: The Little Mermaid (1989)"], answer: "Under the Sea — The Little Mermaid" },
    { clues: ["🐒❤️🌴", "A lullaby-like ballad performed by Phil Collins about a mother's love for her child.", "From: Tarzan (1999)"], answer: "You'll Be in My Heart — Tarzan" },
    { clues: ["🐗🐽🎶", "A carefree philosophy song taught to a young lion by his warthog and meerkat friends.", "From: The Lion King (1994)"], answer: "Hakuna Matata — The Lion King" },
    { clues: ["🤫👨‍🦱🔮", "A viral ensemble song about a family member nobody wants to mention.", "From: Encanto (2021)"], answer: "We Don't Talk About Bruno — Encanto" }
  ],
  "Anime Songs": [
    { clues: ["🔥⚔️🌸", "A high-energy opening theme for an anime about a boy whose sister turns into a demon.", "Artist: LiSA — From: Demon Slayer"], answer: "Gurenge — LiSA (Demon Slayer)" },
    { clues: ["🌟🎆💫", "An emotional theme song from a hit film about two teenagers who mysteriously swap bodies.", "Artist: RADWIMPS — From: Your Name"], answer: "Sparkle — RADWIMPS (Your Name)" },
    { clues: ["🏴‍☠️⛵🎶", "The very first opening theme of a long-running pirate anime, airing since 1999.", "From: One Piece"], answer: "We Are! — One Piece" },
    { clues: ["⚗️🔥🎸", "A rock opening theme for an anime about two brothers seeking the Philosopher's Stone.", "Artist: YUI — From: Fullmetal Alchemist: Brotherhood"], answer: "Again — YUI (Fullmetal Alchemist: Brotherhood)" },
    { clues: ["🤖👼🌆", "One of the most iconic anime opening themes ever, for a mecha series about teenage pilots.", "From: Neon Genesis Evangelion"], answer: "Cruel Angel's Thesis — Neon Genesis Evangelion" },
    { clues: ["🏰⚔️🦖", "A dramatic opening theme for an anime about humanity fighting giant humanoid Titans.", "From: Attack on Titan"], answer: "Guren no Yumiya — Attack on Titan" },
    { clues: ["👻⚔️🩸", "An opening theme known for its unique animated dance sequence, for a modern sorcerer anime.", "Artist: Eve — From: Jujutsu Kaisen"], answer: "Kaikai Kitan — Eve (Jujutsu Kaisen)" },
    { clues: ["⚡🐭🎒", "The English theme song of a globally beloved monster-catching franchise.", "From: Pokémon (English dub theme)"], answer: "Pokémon Theme — Pokémon" }
  ],
  "2000s Music": [
    { clues: ["💔🎸😤", "A pop-rock breakup anthem by the first-ever American Idol winner.", "Artist: Kelly Clarkson (2004)"], answer: "Since U Been Gone — Kelly Clarkson" },
    { clues: ["📸🎉💃", "A genre-blending funk-pop hit famous for the line about shaking it 'like a Polaroid picture'.", "Artist: OutKast (2003)"], answer: "Hey Ya! — OutKast" },
    { clues: ["☔👗🎤", "A hit about standing by someone through hard times, featuring Jay-Z.", "Artist: Rihanna ft. Jay-Z (2007)"], answer: "Umbrella — Rihanna ft. Jay-Z" },
    { clues: ["😩🕰️🎤", "A defining nu-metal/rap-rock crossover hit about effort that didn't pay off.", "Artist: Linkin Park (2000)"], answer: "In the End — Linkin Park" },
    { clues: ["☠️💋🎶", "A dance-pop hit known for its dramatic strings and a bejeweled bodysuit music video.", "Artist: Britney Spears (2003)"], answer: "Toxic — Britney Spears" },
    { clues: ["💃😡🎸", "An indie rock anthem about jealousy, from the album 'Hot Fuss'.", "Artist: The Killers (2003)"], answer: "Mr. Brightside — The Killers" },
    { clues: ["🎉🕺🌃", "A party anthem about a great night ahead — one of the best-selling digital singles of all time.", "Artist: Black Eyed Peas (2009)"], answer: "I Gotta Feeling — Black Eyed Peas" },
    { clues: ["😒🎸👖", "A pop-punk hit about wishing someone would stop pretending to be someone else.", "Artist: Avril Lavigne (2002)"], answer: "Complicated — Avril Lavigne" }
  ]
};

const GUESSTHESONG_CATEGORY_ICONS = {
  "OPM": "🇵🇭",
  "K-Pop": "💜",
  "Pop": "🎤",
  "Rock": "🎸",
  "Disney": "🏰",
  "Anime Songs": "🍜",
  "2000s Music": "📀"
};
