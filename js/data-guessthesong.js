// Guess the Song: each round reveals three progressively specific clues (an
// emoji rebus, a description, then an artist/era hint). Every song carries a
// `pointValue` (100-500) reflecting how obscure it is — 100 is a massive,
// instantly-recognizable hit, 500 is a deep cut. A song can also carry an
// optional YouTube clip — `youtubeId` (the video ID), plus optional
// `clipStart`/`clipDuration` in seconds to bound the playable snippet. When
// present, guessthesong.js lets players play the clip (audio only, no
// title/thumbnail) during the clue phase, then reveals the full video once
// the answer is shown. Songs without a `youtubeId` play exactly as before —
// the clip feature is entirely optional per question.
const GUESSTHESONG_CATEGORIES = {
  "OPM": [
    { clues: ["👶😢🙏", "A father's heartfelt ballad about a wayward child — one of the most famous OPM songs ever, later translated into over 20 languages.", "Artist: Freddie Aguilar (1978)"], answer: "Anak — Freddie Aguilar", pointValue: 100, youtubeId: "NHFNrccUYSY", clipStart: 35, clipDuration: 20 },
    { clues: ["🎩🕺💃", "A nostalgic rock ballad about lost love, told through the metaphor of a magician's assistant.", "Artist: Eraserheads (1995)"], answer: "Ang Huling El Bimbo — Eraserheads", pointValue: 100, youtubeId: "lajnSJZpI34", clipStart: 35, clipDuration: 20 },
    { clues: ["💕📞😢", "A powerhouse ballad about needing someone, made famous by 'Asia's Songbird'.", "Artist: Regine Velasquez"], answer: "Kailangan Kita — Regine Velasquez", pointValue: 200, youtubeId: "5K4xzVsIGh8", clipStart: 35, clipDuration: 20 },
    { clues: ["⏳💔🎤", "A ballad about hoping someone will realize your love 'in time'.", "Artist: Aiza Seguerra"], answer: "Pagdating ng Panahon — Aiza Seguerra", pointValue: 300, youtubeId: "dGc43J9RhDo", clipStart: 35, clipDuration: 20 },
    { clues: ["🌙💭🎨", "A dreamy folk-pop hit from a nine-member Filipino band known for their acoustic sound.", "Artist: Ben&Ben"], answer: "Kathang Isip — Ben&Ben", pointValue: 200, youtubeId: "Bcv2cH8rsKU", clipStart: 35, clipDuration: 20 },
    { clues: ["🌕💌🎸", "A soft acoustic love song comparing someone's beauty to the moon — a huge OPM hit in 2019.", "Artist: juan karlos"], answer: "Buwan — juan karlos", pointValue: 100, youtubeId: "KK3tIclJ140", clipStart: 35, clipDuration: 20 },
    { clues: ["🎭💫🎶", "An indie hit about fate and love, from a Filipino alternative/soul band.", "Artist: Up Dharma Down"], answer: "Tadhana — Up Dharma Down", pointValue: 300, youtubeId: "AojUQzXL0_A", clipStart: 35, clipDuration: 20 },
    { clues: ["🎸💘😅", "An upbeat, quirky OPM love song that became a wedding entrance favorite.", "Artist: Moonstar88"], answer: "Torete — Moonstar88", pointValue: 200, youtubeId: "sYBH40d4Q3o", clipStart: 35, clipDuration: 20 },
    { clues: ["💍🎹💛", "A romantic piano ballad that became one of the most streamed OPM songs of its era.", "Artist: Zack Tabudlo (2021)"], answer: "Give Me Your Forever — Zack Tabudlo", pointValue: 200, youtubeId: "BKenhu5Nph4", clipStart: 35, clipDuration: 20 },
    { clues: ["🎀😊🎶", "An upbeat, breezy love song whose title simply means 'young lady'.", "Artist: Zack Tabudlo (2022)"], answer: "Binibini — Zack Tabudlo", pointValue: 300, youtubeId: "DhzDmhytrTI", clipStart: 35, clipDuration: 20 },
    { clues: ["🙏💔🎤", "A pleading ballad whose title translates roughly to 'coaxing' or 'begging', from a Cebu-based singer-songwriter.", "Artist: Arthur Nery"], answer: "Pagsamo — Arthur Nery", pointValue: 300, youtubeId: "KrRUxRCXpf8", clipStart: 35, clipDuration: 20 },
    { clues: ["1️⃣❤️🎸", "A soulful acoustic ballad whose title means 'just one', about wanting to be someone's only love.", "Artist: Arthur Nery"], answer: "Isa Lang — Arthur Nery", pointValue: 400, youtubeId: "6m-ZuVb1tK4", clipStart: 35, clipDuration: 20 },
    { clues: ["🕊️😢💔", "A quietly devastating ballad about the freedom — and grief — of finally letting someone go.", "Artist: Moira Dela Torre (2019)"], answer: "Malaya — Moira Dela Torre", pointValue: 200, youtubeId: "UPJCS3TPQDA", clipStart: 35, clipDuration: 20 },
    { clues: ["💓😳🎶", "A sweet, fluttery-heart love song whose title mimics the sound of a heartbeat.", "Artist: Moira Dela Torre (2017)"], answer: "Titibo-tibo — Moira Dela Torre", pointValue: 300, youtubeId: "Cp_7VA7076I", clipStart: 35, clipDuration: 20 }
  ],
  "K-Pop": [
    { clues: ["✨🕺🎆", "An upbeat disco-pop English-language hit that topped the Billboard Hot 100 in 2020.", "Artist: BTS"], answer: "Dynamite — BTS", pointValue: 100, youtubeId: "gdZLi9oWNZg", clipStart: 40, clipDuration: 20 },
    { clues: ["🔫💥👑", "A fierce, bass-heavy hit whose title mimics the sound of gunfire.", "Artist: BLACKPINK"], answer: "DDU-DU DDU-DU — BLACKPINK", pointValue: 200, youtubeId: "IHNzOHi8sJs", clipStart: 40, clipDuration: 20 },
    { clues: ["🐴💃😎", "A viral 2012 hit famous for its horse-riding dance, one of YouTube's first billion-view videos.", "Artist: PSY"], answer: "Gangnam Style — PSY", pointValue: 100, youtubeId: "9bZkp7q19f0", clipStart: 47, clipDuration: 20 },
    { clues: ["💣❤️‍🔥👊", "A powerful anthem about ending a toxic relationship, with a booming trumpet intro.", "Artist: BLACKPINK"], answer: "Kill This Love — BLACKPINK", pointValue: 200, youtubeId: "2S24-y0Ij3Y", clipStart: 40, clipDuration: 20 },
    { clues: ["🧈😎🕶️", "A smooth, funky English-language single described as going down 'smooth like butter'.", "Artist: BTS"], answer: "Butter — BTS", pointValue: 100, youtubeId: "WMweEpGlu_U", clipStart: 40, clipDuration: 20 },
    { clues: ["🔥👑💅", "An energetic comeback anthem that broke YouTube premiere records in 2020.", "Artist: BLACKPINK"], answer: "How You Like That — BLACKPINK", pointValue: 200, youtubeId: "ioNng23DkIM", clipStart: 40, clipDuration: 20 },
    { clues: ["🌧️🚶🎶", "A comforting, reflective song released during the pandemic — the first all-Korean song to top the Billboard Hot 100.", "Artist: BTS"], answer: "Life Goes On — BTS", pointValue: 300, youtubeId: "-5q5mZbe3V8", clipStart: 40, clipDuration: 20 },
    { clues: ["💪🚫💔", "A confident anthem about growing stronger from hardship, from a girl group formed by HYBE.", "Artist: LE SSERAFIM"], answer: "Antifragile — LE SSERAFIM", pointValue: 300, youtubeId: "pyf8cbqyfPs", clipStart: 40, clipDuration: 20 },
    { clues: ["😳💌👟", "A Y2K-inspired hit about being too shy to confess a crush, from a five-member girl group.", "Artist: NewJeans (2023)"], answer: "Super Shy — NewJeans", pointValue: 200, youtubeId: "ArmDp-zijuc", clipStart: 40, clipDuration: 20 },
    { clues: ["📼💭🔁", "A nostalgic, sample-heavy hit with two different music videos telling the same story from different angles.", "Artist: NewJeans (2022)"], answer: "Ditto — NewJeans", pointValue: 300, youtubeId: "pSUydWEqKwE", clipStart: 40, clipDuration: 20 }
  ],
  "Pop": [
    { clues: ["🌃🚗💡", "An 80s-inspired synth-pop hit, one of the best-performing Billboard Hot 100 songs of all time.", "Artist: The Weeknd"], answer: "Blinding Lights — The Weeknd", pointValue: 100, youtubeId: "4NRXx6U8ABQ", clipStart: 35, clipDuration: 20 },
    { clues: ["💃❤️🎤", "One of the best-selling digital singles ever, from the album ÷ (Divide).", "Artist: Ed Sheeran"], answer: "Shape of You — Ed Sheeran", pointValue: 100, youtubeId: "JGwWNGJdvx8", clipStart: 35, clipDuration: 20 },
    { clues: ["😈🦷🖤", "A dark, whisper-vocal pop hit that helped its teenage singer sweep the 2020 Grammys.", "Artist: Billie Eilish"], answer: "Bad Guy — Billie Eilish", pointValue: 100, youtubeId: "DyDfgMOUjCI", clipStart: 35, clipDuration: 20 },
    { clues: ["🕺🎺😎", "A funk-revival smash hit pairing a Grammy-winning producer with a Hawaiian-born singer.", "Artists: Mark Ronson feat. Bruno Mars"], answer: "Uptown Funk — Mark Ronson ft. Bruno Mars", pointValue: 100, youtubeId: "OPf0YbXqDm0", clipStart: 15, clipDuration: 20 },
    { clues: ["🚀💃🌙", "A disco-pop hit from the album 'Future Nostalgia'.", "Artist: Dua Lipa"], answer: "Levitating — Dua Lipa", pointValue: 200, youtubeId: "TUVcZfQe-Kw", clipStart: 35, clipDuration: 20 },
    { clues: ["🍉🌞😊", "A sunny, feel-good hit from a former boy-band member's solo album 'Fine Line'.", "Artist: Harry Styles"], answer: "Watermelon Sugar — Harry Styles", pointValue: 200, youtubeId: "E07s5ZYygMg", clipStart: 35, clipDuration: 20 },
    { clues: ["🌊💔🔥", "A soulful breakup anthem from the album '21' that won Record of the Year.", "Artist: Adele"], answer: "Rolling in the Deep — Adele", pointValue: 200, youtubeId: "rYEDA3JcQqw", clipStart: 35, clipDuration: 20 },
    { clues: ["☀️😄👏", "An upbeat, feel-good hit from the 'Despicable Me 2' soundtrack.", "Artist: Pharrell Williams"], answer: "Happy — Pharrell Williams", pointValue: 100, youtubeId: "ZbZSe6N_BXs", clipStart: 35, clipDuration: 20 }
  ],
  "Rock": [
    { clues: ["🎭🎹🎸", "A genre-defying six-minute rock opera, famously featured in a biopic of the same band.", "Artist: Queen"], answer: "Bohemian Rhapsody — Queen", pointValue: 100, youtubeId: "fJ9rUzIMcZQ", clipStart: 168, clipDuration: 20 },
    { clues: ["🧴😤🎸", "The song that helped bring grunge music into the mainstream in 1991.", "Artist: Nirvana"], answer: "Smells Like Teen Spirit — Nirvana", pointValue: 100, youtubeId: "hTWKbfoikeg", clipStart: 60, clipDuration: 20 },
    { clues: ["🌹👧🎸", "Known for its iconic opening guitar riff, from the album 'Appetite for Destruction'.", "Artist: Guns N' Roses"], answer: "Sweet Child O' Mine — Guns N' Roses", pointValue: 100, youtubeId: "1w7OgIMMRc4", clipStart: 50, clipDuration: 20 },
    { clues: ["😴👹🎸", "A heavy metal anthem about nightmares, one of the band's most recognizable songs.", "Artist: Metallica"], answer: "Enter Sandman — Metallica", pointValue: 200, youtubeId: "CD-E-LDc384", clipStart: 55, clipDuration: 20 },
    { clues: ["🙏💪🎸", "An anthemic 80s rock hit about a couple named Tommy and Gina.", "Artist: Bon Jovi"], answer: "Livin' on a Prayer — Bon Jovi", pointValue: 200, youtubeId: "lDK9QqIzhwk", clipStart: 45, clipDuration: 20 },
    { clues: ["🏨🌵🎸", "A mysterious, atmospheric rock classic with a famously long guitar solo outro.", "Artist: Eagles"], answer: "Hotel California — Eagles", pointValue: 200, youtubeId: "dLl4PZtxia8", clipStart: 60, clipDuration: 20 },
    { clues: ["😞🧱🎤", "A nu-metal/rock anthem about feeling pressured to be someone you're not.", "Artist: Linkin Park"], answer: "Numb — Linkin Park", pointValue: 200, youtubeId: "kXYiU_JCYtU", clipStart: 40, clipDuration: 20 },
    { clues: ["🎸🌟😍", "One of the most famous Britpop songs ever — often the first song beginner guitarists learn.", "Artist: Oasis"], answer: "Wonderwall — Oasis", pointValue: 100, youtubeId: "bx1Bh8ZvH84", clipStart: 45, clipDuration: 20 }
  ],
  "Disney": [
    { clues: ["❄️👑🏰", "An empowerment anthem sung by a queen who builds an ice castle after fleeing her kingdom.", "From: Frozen (2013)"], answer: "Let It Go — Frozen", pointValue: 100, youtubeId: "YVVTZgwYwVo", clipStart: 50, clipDuration: 20 },
    { clues: ["🧞‍♂️🌍🪄", "A romantic duet sung on a flying carpet ride.", "From: Aladdin (1992)"], answer: "A Whole New World — Aladdin", pointValue: 200, youtubeId: "eitDnP0_83k", clipStart: 40, clipDuration: 20 },
    { clues: ["🦁🌅👑", "The opening anthem of an African savanna story, sung as a lion cub is presented to the animal kingdom.", "From: The Lion King (1994)"], answer: "Circle of Life — The Lion King", pointValue: 200, youtubeId: "IwH9YvhPN7c", clipStart: 60, clipDuration: 20 },
    { clues: ["🌊⛵🌺", "A song about a girl who feels the pull of the ocean and her destiny beyond her island.", "From: Moana (2016)"], answer: "How Far I'll Go — Moana", pointValue: 200, youtubeId: "cPAbx5kgCJo", clipStart: 35, clipDuration: 20 },
    { clues: ["🐠🦀🎶", "A calypso-style song sung by a crab trying to convince a mermaid to stay in the ocean.", "From: The Little Mermaid (1989)"], answer: "Under the Sea — The Little Mermaid", pointValue: 200, youtubeId: "GC_mV1IpjWA", clipStart: 40, clipDuration: 20 },
    { clues: ["🐒❤️🌴", "A lullaby-like ballad performed by Phil Collins about a mother's love for her child.", "From: Tarzan (1999)"], answer: "You'll Be in My Heart — Tarzan", pointValue: 300, youtubeId: "qBHVGIvd_M8", clipStart: 45, clipDuration: 20 },
    { clues: ["🐗🐽🎶", "A carefree philosophy song taught to a young lion by his warthog and meerkat friends.", "From: The Lion King (1994)"], answer: "Hakuna Matata — The Lion King", pointValue: 100, youtubeId: "0MxulhivCvI", clipStart: 45, clipDuration: 20 },
    { clues: ["🤫👨‍🦱🔮", "A viral ensemble song about a family member nobody wants to mention.", "From: Encanto (2021)"], answer: "We Don't Talk About Bruno — Encanto", pointValue: 100, youtubeId: "bvWRMAU6V-c", clipStart: 45, clipDuration: 20 }
  ],
  "Anime Songs": [
    { clues: ["🔥⚔️🌸", "A high-energy opening theme for an anime about a boy whose sister turns into a demon.", "Artist: LiSA — From: Demon Slayer"], answer: "Gurenge — LiSA (Demon Slayer)", pointValue: 200, youtubeId: "x1FV6IrjZCY", clipStart: 30, clipDuration: 20 },
    { clues: ["🌟🎆💫", "An emotional theme song from a hit film about two teenagers who mysteriously swap bodies.", "Artist: RADWIMPS — From: Your Name"], answer: "Sparkle — RADWIMPS (Your Name)", pointValue: 300, youtubeId: "MgNItWdfEIU", clipStart: 30, clipDuration: 20 },
    { clues: ["🏴‍☠️⛵🎶", "The very first opening theme of a long-running pirate anime, airing since 1999.", "From: One Piece"], answer: "We Are! — One Piece", pointValue: 300, youtubeId: "r7n-L5B0bBw", clipStart: 15, clipDuration: 15 },
    { clues: ["⚗️🔥🎸", "A rock opening theme for an anime about two brothers seeking the Philosopher's Stone.", "Artist: YUI — From: Fullmetal Alchemist: Brotherhood"], answer: "Again — YUI (Fullmetal Alchemist: Brotherhood)", pointValue: 300, youtubeId: "MLfMrBfqCu8", clipStart: 12, clipDuration: 15 },
    { clues: ["🤖👼🌆", "One of the most iconic anime opening themes ever, for a mecha series about teenage pilots.", "From: Neon Genesis Evangelion"], answer: "Cruel Angel's Thesis — Neon Genesis Evangelion", pointValue: 300, youtubeId: "wqmv96HJan8", clipStart: 30, clipDuration: 20 },
    { clues: ["🏰⚔️🦖", "A dramatic opening theme for an anime about humanity fighting giant humanoid Titans.", "From: Attack on Titan"], answer: "Guren no Yumiya — Attack on Titan", pointValue: 300, youtubeId: "2B6nj38AdD0", clipStart: 30, clipDuration: 20 },
    { clues: ["👻⚔️🩸", "An opening theme known for its unique animated dance sequence, for a modern sorcerer anime.", "Artist: Eve — From: Jujutsu Kaisen"], answer: "Kaikai Kitan — Eve (Jujutsu Kaisen)", pointValue: 200, youtubeId: "isY3rtuSsK8", clipStart: 30, clipDuration: 20 },
    { clues: ["⚡🐭🎒", "The English theme song of a globally beloved monster-catching franchise.", "From: Pokémon (English dub theme)"], answer: "Pokémon Theme — Pokémon", pointValue: 100, youtubeId: "2zMIddjFAIA", clipStart: 12, clipDuration: 15 }
  ],
  "2000s Music": [
    { clues: ["💔🎸😤", "A pop-rock breakup anthem by the first-ever American Idol winner.", "Artist: Kelly Clarkson (2004)"], answer: "Since U Been Gone — Kelly Clarkson", pointValue: 100, youtubeId: "R7UrFYvl5TE", clipStart: 35, clipDuration: 20 },
    { clues: ["📸🎉💃", "A genre-blending funk-pop hit famous for the line about shaking it 'like a Polaroid picture'.", "Artist: OutKast (2003)"], answer: "Hey Ya! — OutKast", pointValue: 100, youtubeId: "PWgvGjAhvIw", clipStart: 35, clipDuration: 20 },
    { clues: ["☔👗🎤", "A hit about standing by someone through hard times, featuring Jay-Z.", "Artist: Rihanna ft. Jay-Z (2007)"], answer: "Umbrella — Rihanna ft. Jay-Z", pointValue: 100, youtubeId: "CvBfHwUxHIk", clipStart: 35, clipDuration: 20 },
    { clues: ["😩🕰️🎤", "A defining nu-metal/rap-rock crossover hit about effort that didn't pay off.", "Artist: Linkin Park (2000)"], answer: "In the End — Linkin Park", pointValue: 100, youtubeId: "eVTXPUF4Oz4", clipStart: 35, clipDuration: 20 },
    { clues: ["☠️💋🎶", "A dance-pop hit known for its dramatic strings and a bejeweled bodysuit music video.", "Artist: Britney Spears (2003)"], answer: "Toxic — Britney Spears", pointValue: 100, youtubeId: "LOZuxwVk7TU", clipStart: 35, clipDuration: 20 },
    { clues: ["💃😡🎸", "An indie rock anthem about jealousy, from the album 'Hot Fuss'.", "Artist: The Killers (2003)"], answer: "Mr. Brightside — The Killers", pointValue: 200, youtubeId: "gGdGFtwCNBE", clipStart: 35, clipDuration: 20 },
    { clues: ["🎉🕺🌃", "A party anthem about a great night ahead — one of the best-selling digital singles of all time.", "Artist: Black Eyed Peas (2009)"], answer: "I Gotta Feeling — Black Eyed Peas", pointValue: 100, youtubeId: "uSD4vsh1zDA", clipStart: 35, clipDuration: 20 },
    { clues: ["😒🎸👖", "A pop-punk hit about wishing someone would stop pretending to be someone else.", "Artist: Avril Lavigne (2002)"], answer: "Complicated — Avril Lavigne", pointValue: 200, youtubeId: "5NPBIwQyPWE", clipStart: 35, clipDuration: 20 }
  ],
  "Hip-Hop": [
    { clues: ["💪🕶️🎤", "A Grammy-winning hit that samples a French duo's 'Harder, Better, Faster, Stronger'.", "Artist: Kanye West (2007)"], answer: "Stronger — Kanye West", pointValue: 100, youtubeId: "PsO6ZnUZI0g", clipStart: 35, clipDuration: 20 },
    { clues: ["🥂💔🎹", "A confessional, nearly 9-minute epic that opens with a single repeated piano note, toasting to douchebags and jerkoffs.", "Artist: Kanye West (2010)"], answer: "Runaway — Kanye West", pointValue: 300, youtubeId: "Bm5iA4Zupek", clipStart: 35, clipDuration: 20 },
    { clues: ["😢🎧🌍", "A woozy, falsetto-heavy plea not to leave, from the Grammy-winning album 'IGOR'.", "Artist: Tyler, the Creator (2019)"], answer: "EARFQUAKE — Tyler, the Creator", pointValue: 200, youtubeId: "t-E2gm0a_N0", clipStart: 35, clipDuration: 20 },
    { clues: ["😍🚗💭", "A dreamy love song built around a sample of a 1980s Japanese hit, featuring a Colombian-American singer.", "Artist: Tyler, the Creator (2017)"], answer: "See You Again — Tyler, the Creator ft. Kali Uchis", pointValue: 100, youtubeId: "EZE62LpaqHg", clipStart: 35, clipDuration: 20 },
    { clues: ["🙏💰📸", "A hard-hitting single famous for its striking black-and-white music video and 'sit down' hook.", "Artist: Kendrick Lamar (2017)"], answer: "HUMBLE. — Kendrick Lamar", pointValue: 100, youtubeId: "tvTRZJ-4EyI", clipStart: 35, clipDuration: 20 },
    { clues: ["✊🌟🚔", "A defiant anthem that became a rallying cry for the Black Lives Matter movement.", "Artist: Kendrick Lamar (2015)"], answer: "Alright — Kendrick Lamar", pointValue: 200, youtubeId: "Z-48u_uWMHY", clipStart: 35, clipDuration: 20 },
    { clues: ["🙌💵🎁", "A hit whose music video shows the artist giving away nearly the entire budget to people in need.", "Artist: Drake (2018)"], answer: "God's Plan — Drake", pointValue: 100, youtubeId: "xpVfcZ0ZcFM", clipStart: 35, clipDuration: 20 },
    { clues: ["📱💃🟡", "Known for its colorful, minimalist music video and the artist's now-iconic dance moves.", "Artist: Drake (2015)"], answer: "Hotline Bling — Drake", pointValue: 100, youtubeId: "uxpDa-c-4Mc", clipStart: 35, clipDuration: 20 },
    { clues: ["🌀🎢🔀", "A genre-shifting three-part epic from the album 'ASTROWORLD', featuring a Toronto rapper.", "Artist: Travis Scott (2018)"], answer: "SICKO MODE — Travis Scott ft. Drake", pointValue: 100, youtubeId: "6ONRf7h3Mdk", clipStart: 35, clipDuration: 20 },
    { clues: ["🥶🎤🌆", "A brooding hit featuring a Compton rapper, later a viral TikTok sound.", "Artist: Travis Scott (2016)"], answer: "goosebumps — Travis Scott ft. Kendrick Lamar", pointValue: 200, youtubeId: "Dst9gZkq1a8", clipStart: 35, clipDuration: 20 },
    { clues: ["🇺🇸🔫🕺", "A Grammy Song of the Year winner whose provocative video sparked nationwide conversation.", "Artist: Childish Gambino (2018)"], answer: "This Is America — Childish Gambino", pointValue: 100, youtubeId: "VYOjWnS4cMY", clipStart: 35, clipDuration: 20 },
    { clues: ["😴🎸🌹", "A funky falsetto slow jam that samples Bootsy Collins, later used in a horror film's trailer.", "Artist: Childish Gambino (2016)"], answer: "Redbone — Childish Gambino", pointValue: 200, youtubeId: "k49I5m1J6Is", clipStart: 35, clipDuration: 20 }
  ],
  "R&B & Alternative": [
    { clues: ["✈️💭❤️", "A dreamy falsetto ballad that opens with the line 'my eyes don't shed tears, but boy they pour'.", "Artist: Frank Ocean (2012)"], answer: "Thinkin Bout You — Frank Ocean", pointValue: 200, youtubeId: "6JHu3b-pbh8", clipStart: 35, clipDuration: 20 },
    { clues: ["🌸☀️🎹", "A warm, string-laced highlight from the album 'Blonde', co-produced with a Grammy-winning multi-instrumentalist.", "Artist: Frank Ocean (2016)"], answer: "Pink + White — Frank Ocean", pointValue: 300, youtubeId: "9cHbvRUALrc", clipStart: 35, clipDuration: 20 },
    { clues: ["🔪💔🎬", "A darkly funny breakup song named after a Quentin Tarantino revenge film.", "Artist: SZA (2022)"], answer: "Kill Bill — SZA", pointValue: 100, youtubeId: "MSRcC626prw", clipStart: 35, clipDuration: 20 },
    { clues: ["☁️🌈😌", "A soothing, escapist single released just before the world shut down in early 2020.", "Artist: SZA (2020)"], answer: "Good Days — SZA", pointValue: 200, youtubeId: "2p3zZoraK9g", clipStart: 35, clipDuration: 20 },
    { clues: ["💍🙏💛", "A tender, gospel-tinged love song featuring a Colombian-American singer, from the album 'Freudian'.", "Artist: Daniel Caesar (2017)"], answer: "Get You — Daniel Caesar ft. Kali Uchis", pointValue: 200, youtubeId: "uQFVqltOXRg", clipStart: 35, clipDuration: 20 },
    { clues: ["🥰🎧☕", "A hushed duet that became a slow-burn viral hit, featuring a singer who'd later win Song of the Year.", "Artist: Daniel Caesar (2017)"], answer: "Best Part — Daniel Caesar ft. H.E.R.", pointValue: 300, youtubeId: "hKgl5-lkT8U", clipStart: 35, clipDuration: 20 },
    { clues: ["💀🚶🌆", "A moody, atmospheric single from the album 'WASTELAND', with a title borrowed from a death-row phrase.", "Artist: Brent Faiyaz (2022)"], answer: "Dead Man Walking — Brent Faiyaz", pointValue: 400, youtubeId: "pBR01ndtids", clipStart: 35, clipDuration: 20 },
    { clues: ["🤝💔🌙", "A slow, brooding cut about doubting a partner's loyalty, from the 'Fuck the World' EP.", "Artist: Brent Faiyaz (2020)"], answer: "Trust — Brent Faiyaz", pointValue: 400, youtubeId: "TWqUtor6Gdc", clipStart: 35, clipDuration: 20 },
    { clues: ["😢🎭💫", "A synth-pop highlight from 'After Hours', later remixed as a duet with a fellow pop superstar.", "Artist: The Weeknd (2020)"], answer: "Save Your Tears — The Weeknd", pointValue: 200, youtubeId: "XXYlFuWEuKI", clipStart: 35, clipDuration: 20 },
    { clues: ["💔🌌🕯️", "A brooding ballad from 'Starboy' that unexpectedly returned to the charts years later thanks to a remix.", "Artist: The Weeknd (2016)"], answer: "Die For You — The Weeknd", pointValue: 300, youtubeId: "uPD0QOGTmMI", clipStart: 35, clipDuration: 20 },
    { clues: ["🥺🧡🎹", "A vulnerable, piano-driven confession of feelings for someone in the friend zone.", "Artist: Rex Orange County (2017)"], answer: "Best Friend — Rex Orange County", pointValue: 200, youtubeId: "OqBuXQLR4Y8", clipStart: 35, clipDuration: 20 },
    { clues: ["🌻😔🎷", "A bittersweet, horn-tinged single about heartbreak, from the album 'Pony'.", "Artist: Rex Orange County (2019)"], answer: "Sunflower — Rex Orange County", pointValue: 300, youtubeId: "V0X-SWiDr1g", clipStart: 35, clipDuration: 20 },
    { clues: ["😬💭📱", "A genre-bending TikTok-viral hit with an abrupt tempo shift midway through.", "Artist: Steve Lacy (2022)"], answer: "Bad Habit — Steve Lacy", pointValue: 100, youtubeId: "VF-FGf_ZZiI", clipStart: 35, clipDuration: 20 },
    { clues: ["❤️🩸🎸", "A jealous, guitar-driven love song that went viral years after its original release.", "Artist: Steve Lacy (2017)"], answer: "Dark Red — Steve Lacy", pointValue: 300, youtubeId: "x-OzspEcQG8", clipStart: 35, clipDuration: 20 },
    { clues: ["💄😑📹", "A lo-fi bedroom-pop hit filmed on a laptop webcam that unexpectedly went viral in 2017.", "Artist: Clairo (2017)"], answer: "Pretty Girl — Clairo", pointValue: 300, youtubeId: "mngtcfcaVrI", clipStart: 35, clipDuration: 20 },
    { clues: ["👩‍❤️‍👩🌊🎶", "A dreamy indie-pop single about a crush on another girl, from the album 'Immunity'.", "Artist: Clairo (2019)"], answer: "Sofia — Clairo", pointValue: 300, youtubeId: "e22e-5QXlUw", clipStart: 35, clipDuration: 20 },
    { clues: ["🌫️💤🖤", "A hazy, whisper-soft dream-pop track named after the end of the world.", "Artist: Cigarettes After Sex (2017)"], answer: "Apocalypse — Cigarettes After Sex", pointValue: 300, youtubeId: "sElE_BfQ67s", clipStart: 35, clipDuration: 20 },
    { clues: ["🎡💊🌙", "A slow, reverb-drenched love song about a woman named in the title, from the band's self-titled debut.", "Artist: Cigarettes After Sex (2017)"], answer: "K. — Cigarettes After Sex", pointValue: 400, youtubeId: "L4sbDxR22z4", clipStart: 35, clipDuration: 20 },
    { clues: ["🕺💔🎸", "A funky psych-pop hit about jealousy over a friend named Trevor, from the album 'Currents'.", "Artist: Tame Impala (2015)"], answer: "The Less I Know the Better — Tame Impala", pointValue: 200, youtubeId: "sBzrzS1Ag_g", clipStart: 35, clipDuration: 20 },
    { clues: ["🔄😔🎛️", "A hypnotic, repetitive single from 'Lonerism' about feeling stuck in a relationship's patterns.", "Artist: Tame Impala (2012)"], answer: "Feels Like We Only Go Backwards — Tame Impala", pointValue: 300, youtubeId: "wycjnCCgUes", clipStart: 35, clipDuration: 20 }
  ],
  "Modern Pop": [
    { clues: ["🌊😢🎧", "The dreamy debut single, originally written for the artist's dance instructor, that launched her career at 14.", "Artist: Billie Eilish (2016)"], answer: "Ocean Eyes — Billie Eilish", pointValue: 300, youtubeId: "viimfQi_pUw", clipStart: 35, clipDuration: 20 },
    { clues: ["😌➡️😡", "A quiet ballad that erupts into a furious rock outro partway through, the title track of a 2021 album.", "Artist: Billie Eilish (2021)"], answer: "Happier Than Ever — Billie Eilish", pointValue: 200, youtubeId: "5GJWxDKyk3A", clipStart: 35, clipDuration: 20 },
    { clues: ["🚗😭🎹", "A breakup ballad that broke streaming records upon release, widely believed to reference co-stars from a Disney show.", "Artist: Olivia Rodrigo (2021)"], answer: "drivers license — Olivia Rodrigo", pointValue: 100, youtubeId: "ZmDBbnmKpqQ", clipStart: 35, clipDuration: 20 },
    { clues: ["😤🎸💥", "A pop-punk breakup anthem with an unmistakable Paramore-esque sound.", "Artist: Olivia Rodrigo (2021)"], answer: "good 4 u — Olivia Rodrigo", pointValue: 100, youtubeId: "gNi_6U5Pm_o", clipStart: 35, clipDuration: 20 },
    { clues: ["☕😏🕶️", "A flirty summer hit with the viral line 'that's that me espresso'.", "Artist: Sabrina Carpenter (2024)"], answer: "Espresso — Sabrina Carpenter", pointValue: 100, youtubeId: "eVli-tstM5E", clipStart: 35, clipDuration: 20 },
    { clues: ["🙏😬💔", "A country-tinged single begging a partner not to embarrass her, from the album 'Short n' Sweet'.", "Artist: Sabrina Carpenter (2024)"], answer: "Please Please Please — Sabrina Carpenter", pointValue: 200, youtubeId: "cF1Na4AIecM", clipStart: 35, clipDuration: 20 },
    { clues: ["🚶‍♀️💅🕺", "A disco-pop comeback anthem about moving on after a breakup, the lead single from 'Future Nostalgia'.", "Artist: Dua Lipa (2019)"], answer: "Don't Start Now — Dua Lipa", pointValue: 100, youtubeId: "oygrmJFKYZY", clipStart: 35, clipDuration: 20 },
    { clues: ["📵🚫💔", "A breakout hit laying out a numbered list of rules for getting over an ex, famous for its synchronized-dance video.", "Artist: Dua Lipa (2017)"], answer: "New Rules — Dua Lipa", pointValue: 100, youtubeId: "k2qgadSvNyU", clipStart: 35, clipDuration: 20 },
    { clues: ["💅😌🙏", "A gracious breakup anthem name-checking several of the artist's famous exes.", "Artist: Ariana Grande (2018)"], answer: "thank u, next — Ariana Grande", pointValue: 100, youtubeId: "gl1aHhXnN1k", clipStart: 35, clipDuration: 20 },
    { clues: ["💍🛍️🎵", "A trap-pop flex track that samples 'My Favorite Things' from 'The Sound of Music'.", "Artist: Ariana Grande (2019)"], answer: "7 rings — Ariana Grande", pointValue: 100, youtubeId: "QYh6mYIJG2Y", clipStart: 35, clipDuration: 20 },
    { clues: ["🪞😬🌙", "A self-deprecating lead single from 'Midnights', with the confession 'it's me, hi, I'm the problem, it's me'.", "Artist: Taylor Swift (2022)"], answer: "Anti-Hero — Taylor Swift", pointValue: 100, youtubeId: "b1kbLwvqugk", clipStart: 35, clipDuration: 20 },
    { clues: ["☀️💔🎆", "A synth-pop deep cut from 'Lover' that became a sleeper hit years later thanks to a stadium tour.", "Artist: Taylor Swift (2019)"], answer: "Cruel Summer — Taylor Swift", pointValue: 200, youtubeId: "ic8j13piAhQ", clipStart: 35, clipDuration: 20 },
    { clues: ["🍑☀️🌴", "A laid-back, chart-topping single featuring two R&B artists, from the album 'Justice'.", "Artist: Justin Bieber (2021)"], answer: "Peaches — Justin Bieber ft. Daniel Caesar & Giveon", pointValue: 200, youtubeId: "tQ0yjYUFKAE", clipStart: 35, clipDuration: 20 },
    { clues: ["🙇🕺💃", "An apology anthem famous for its dance-crew-filled music video, from the album 'Purpose'.", "Artist: Justin Bieber (2015)"], answer: "Sorry — Justin Bieber", pointValue: 100, youtubeId: "fRh_vgS2dFE", clipStart: 35, clipDuration: 20 },
    { clues: ["✨🕺💰", "A funky, disco-infused title track that opens with the artist shouting his own name.", "Artist: Bruno Mars (2016)"], answer: "24K Magic — Bruno Mars", pointValue: 200, youtubeId: "UqyT8IEBkvY", clipStart: 35, clipDuration: 20 },
    { clues: ["😍💯📸", "A breakout solo hit reassuring a partner they don't need makeup to look amazing.", "Artist: Bruno Mars (2010)"], answer: "Just the Way You Are — Bruno Mars", pointValue: 100, youtubeId: "LjhCEhWiKXk", clipStart: 35, clipDuration: 20 }
  ],
  "Global Hits": [
    { clues: ["👵❓💔", "A reggaetón hit named after the artist's aunt asking about his love life, from the album 'Un Verano Sin Ti'.", "Artist: Bad Bunny (2022)"], answer: "Tití Me Preguntó — Bad Bunny", pointValue: 300, youtubeId: "WIMWwK7zp3I", clipStart: 35, clipDuration: 20 },
    { clues: ["🤫🌴🎶", "A moody, minimalist reggaetón track whose title means 'the quiet girl'.", "Artist: Bad Bunny (2019)"], answer: "Callaita — Bad Bunny", pointValue: 400, youtubeId: "oonuiDlI7S8", clipStart: 35, clipDuration: 20 },
    { clues: ["🥃💔🚬", "An Afrobeats hit sampling a 2000s Toni Braxton ballad, about drowning heartbreak in vices.", "Artist: Burna Boy (2022)"], answer: "Last Last — Burna Boy", pointValue: 300, youtubeId: "421w1j87fEM", clipStart: 35, clipDuration: 20 },
    { clues: ["🤫💕🌍", "A smooth, guitar-driven Afrobeats love song about keeping a relationship private.", "Artist: Burna Boy (2019)"], answer: "On the Low — Burna Boy", pointValue: 400, youtubeId: "Ecl8Aod0Tl0", clipStart: 35, clipDuration: 20 },
    { clues: ["💃🌊🎉", "A merengue-flamenco fusion summer anthem about dancing off a breakup.", "Artist: Rosalía (2022)"], answer: "DESPECHÁ — Rosalía", pointValue: 300, youtubeId: "5g2hT4GmAGU", clipStart: 35, clipDuration: 20 },
    { clues: ["✈️💃🇨🇴", "A reggaetón collaboration between a Spanish flamenco-pop star and a Colombian hitmaker.", "Artist: Rosalía ft. J Balvin (2019)"], answer: "Con Altura — Rosalía ft. J Balvin", pointValue: 300, youtubeId: "p7bfOZek9t4", clipStart: 35, clipDuration: 20 }
  ]
};

const GUESSTHESONG_CATEGORY_ICONS = {
  "OPM": "🇵🇭",
  "K-Pop": "💜",
  "Pop": "🎤",
  "Rock": "🎸",
  "Disney": "🏰",
  "Anime Songs": "🍜",
  "2000s Music": "📀",
  "Hip-Hop": "🎧",
  "R&B & Alternative": "🌙",
  "Modern Pop": "✨",
  "Global Hits": "🌍"
};
