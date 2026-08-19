// Built-in quiz question bank (works fully offline).
// Structure: QUIZ_THEMES[themeName] = { icon, categories: [{ name, questions: {100:{q,a},200:{...},300:{...},400:{...},500:{...}} }] }
const QUIZ_THEMES = {
  "Cartoons": {
    icon: "📼",
    categories: [
      {
        name: "Disney Channel",
        questions: {
          100: { q: "Which Disney Channel show follows twin brothers running a hotel suite in New York City?", a: "The Suite Life of Zack & Cody" },
          200: { q: "In 'Wizards of Waverly Place', what is the last name of the wizard family?", a: "Russo" },
          300: { q: "Which Disney Channel Original Movie franchise centers on basketball player Troy Bolton?", a: "High School Musical" },
          400: { q: "In 'Hannah Montana', what is the name of Miley's best friend, played by Emily Osment?", a: "Lilly Truscott" },
          500: { q: "What was the first-ever Disney Channel Original Movie, released in 1997?", a: "Under Wraps" }
        }
      },
      {
        name: "Cartoon Network",
        questions: {
          100: { q: "What is the name of the boy genius with a secret lab hidden in his family's house?", a: "Dexter (Dexter's Laboratory)" },
          200: { q: "In 'Adventure Time', what is the name of Finn's shape-shifting dog best friend?", a: "Jake" },
          300: { q: "Which Cartoon Network series follows super-powered sisters defending the city of Townsville?", a: "The Powerpuff Girls" },
          400: { q: "In 'Ben 10', what is the name of the alien-transforming watch device Ben Tennyson wears?", a: "The Omnitrix" },
          500: { q: "In what year did Cartoon Network first launch as a television channel in the United States?", a: "1992" }
        }
      },
      {
        name: "Nickelodeon",
        questions: {
          100: { q: "Who lives in a pineapple under the sea?", a: "SpongeBob SquarePants" },
          200: { q: "In 'Hey Arnold!', what unusual shape is Arnold's head often compared to?", a: "A football" },
          300: { q: "In Nickelodeon's 'Avatar: The Last Airbender', the four nations are named after which four elements?", a: "Water, Earth, Fire, and Air" },
          400: { q: "In 'Rugrats', what is the name of Tommy Pickles' baby brother introduced later in the series?", a: "Dil Pickles" },
          500: { q: "In 'SpongeBob SquarePants', what is the full name of Plankton's supercomputer wife?", a: "Karen Plankton" }
        }
      }
    ]
  },
  "World Geography": {
    icon: "🌍",
    categories: [
      {
        name: "Countries",
        questions: {
          100: { q: "Which country is also a continent?", a: "Australia" },
          200: { q: "Which African country was formerly known as Abyssinia and is famous for never being colonized?", a: "Ethiopia" },
          300: { q: "Which is the only country that borders both France and Spain?", a: "Andorra" },
          400: { q: "Which is the only country in the world with a non-rectangular national flag?", a: "Nepal" },
          500: { q: "Which African country has three capital cities: Pretoria, Cape Town, and Bloemfontein?", a: "South Africa" }
        }
      },
      {
        name: "Capitals",
        questions: {
          100: { q: "What is the capital of Japan?", a: "Tokyo" },
          200: { q: "What is the capital of Canada?", a: "Ottawa" },
          300: { q: "What is the capital of Kazakhstan?", a: "Astana" },
          400: { q: "What is the official capital of Sri Lanka (distinct from its largest city, Colombo)?", a: "Sri Jayawardenepura Kotte" },
          500: { q: "Which tiny Pacific island nation has no official capital city, with Yaren District serving as its de facto seat of government?", a: "Nauru" }
        }
      },
      {
        name: "Landmarks",
        questions: {
          100: { q: "The Eiffel Tower is located in which city?", a: "Paris" },
          200: { q: "Machu Picchu, the ancient Inca citadel, is located in which country?", a: "Peru" },
          300: { q: "The Great Sphinx of Giza is most closely associated with which pharaoh?", a: "Khafre" },
          400: { q: "The ancient city of Petra, carved into rose-colored rock, is located in which country?", a: "Jordan" },
          500: { q: "Which UNESCO World Heritage Site in Cambodia is the largest religious monument in the world by land area?", a: "Angkor Wat" }
        }
      }
    ]
  },
  "Science": {
    icon: "🔬",
    categories: [
      {
        name: "Space",
        questions: {
          100: { q: "Which planet is known as the Red Planet?", a: "Mars" },
          200: { q: "What is the name of the galaxy that contains our solar system?", a: "The Milky Way" },
          300: { q: "What is the term for the boundary around a black hole beyond which nothing can escape?", a: "The event horizon" },
          400: { q: "What is the name of the visible surface layer of the Sun?", a: "The photosphere" },
          500: { q: "What is the term for a collapsed star composed almost entirely of tightly packed neutrons?", a: "A neutron star" }
        }
      },
      {
        name: "Human Body",
        questions: {
          100: { q: "What is the largest organ in the human body?", a: "The skin" },
          200: { q: "How many chambers does the human heart have?", a: "Four" },
          300: { q: "What is the name of the longest bone in the human body?", a: "The femur (thigh bone)" },
          400: { q: "What is the name of the small brain gland often called the 'master gland' because it controls other hormone glands?", a: "The pituitary gland" },
          500: { q: "What is the only bone in the human body that is not connected to another bone?", a: "The hyoid bone" }
        }
      },
      {
        name: "Inventions",
        questions: {
          100: { q: "Who is credited with inventing the telephone?", a: "Alexander Graham Bell" },
          200: { q: "In which decade did Tim Berners-Lee invent the World Wide Web?", a: "The 1980s (1989)" },
          300: { q: "Which company released the influential Macintosh graphical-interface computer in 1984?", a: "Apple" },
          400: { q: "Who is credited with inventing the printing press with movable type in Europe, around 1440?", a: "Johannes Gutenberg" },
          500: { q: "Which Serbian-American inventor is best known for his contributions to the modern alternating current (AC) electricity system?", a: "Nikola Tesla" }
        }
      }
    ]
  },
  "Movies & TV": {
    icon: "🎬",
    categories: [
      {
        name: "Blockbusters",
        questions: {
          100: { q: "Which 1997 film about a doomed ocean liner was the first to gross over $1 billion worldwide?", a: "Titanic" },
          200: { q: "In the Marvel Cinematic Universe, what is the name of Tony Stark's AI assistant?", a: "J.A.R.V.I.S." },
          300: { q: "Which director is known for 'Jaws', 'E.T.', and 'Jurassic Park'?", a: "Steven Spielberg" },
          400: { q: "Which 2009 James Cameron film became the highest-grossing film of all time, surpassing 'Titanic'?", a: "Avatar" },
          500: { q: "Which 1941 film, directed by and starring Orson Welles, is frequently cited by critics as the greatest film ever made?", a: "Citizen Kane" }
        }
      },
      {
        name: "Animated Films",
        questions: {
          100: { q: "In 'Frozen', what is the name of Elsa and Anna's talking snowman?", a: "Olaf" },
          200: { q: "Which Pixar film follows an old man who ties balloons to his house to fly to South America?", a: "Up" },
          300: { q: "What is the name of the kingdom ruled by Simba's family in Disney's 'The Lion King'?", a: "The Pride Lands" },
          400: { q: "Which 1995 film was the first feature-length movie created entirely with computer-generated imagery (CGI)?", a: "Toy Story" },
          500: { q: "Which Japanese animated film, directed by Hayao Miyazaki, won the Academy Award for Best Animated Feature in 2003?", a: "Spirited Away" }
        }
      },
      {
        name: "TV Classics",
        questions: {
          100: { q: "'Friends' is set primarily in which U.S. city?", a: "New York City" },
          200: { q: "In 'Breaking Bad', what is the name of Walter White's criminal alter ego?", a: "Heisenberg" },
          300: { q: "Which HBO fantasy series was based on George R. R. Martin's 'A Song of Ice and Fire' novels?", a: "Game of Thrones" },
          400: { q: "Which sitcom, premiering in 1989, was famously described by its creators as 'a show about nothing'?", a: "Seinfeld" },
          500: { q: "Which 1960s TV series featured one of American television's first scripted interracial kisses, between Captain Kirk and Lieutenant Uhura?", a: "Star Trek (The Original Series)" }
        }
      }
    ]
  },
  "Marvel": {
    icon: "🦸",
    categories: [
      {
        name: "Marvel Movies",
        questions: {
          100: { q: "Which 2002 film starring Tobey Maguire was the first major blockbuster movie based on Spider-Man?", a: "Spider-Man (2002)" },
          200: { q: "Which actor played Wolverine in the X-Men film franchise for 17 years, from 2000 to 2017?", a: "Hugh Jackman" },
          300: { q: "Which 2002 Spider-Man villain, played by Willem Dafoe, is the alter ego of Norman Osborn?", a: "The Green Goblin" },
          400: { q: "In the 2000 film 'X-Men', which actress played the shape-shifting mutant Mystique?", a: "Rebecca Romijn" },
          500: { q: "Which 1998 film, starring Wesley Snipes as a vampire hunter, is considered one of the first Marvel Comics film adaptations to succeed commercially?", a: "Blade" }
        }
      },
      {
        name: "MCU",
        questions: {
          100: { q: "What is the first film in the Marvel Cinematic Universe, released in 2008?", a: "Iron Man" },
          200: { q: "Which 2012 film brought together Iron Man, Captain America, Thor, Hulk, Black Widow, and Hawkeye for the first time?", a: "The Avengers" },
          300: { q: "In 'Avengers: Infinity War' and 'Endgame', what are the powerful artifacts Thanos collects to wipe out half of all life called?", a: "The Infinity Stones" },
          400: { q: "Which actress plays Captain Marvel (Carol Danvers) in the MCU?", a: "Brie Larson" },
          500: { q: "What is the official name of the overarching MCU story arc spanning Phases 1 through 3, culminating in 'Avengers: Endgame'?", a: "The Infinity Saga" }
        }
      },
      {
        name: "Marvel Characters",
        questions: {
          100: { q: "What is the real name of Iron Man?", a: "Tony Stark" },
          200: { q: "What is the name of Thor's magical hammer?", a: "Mjolnir" },
          300: { q: "What is the name of the villain Thanos's home planet?", a: "Titan" },
          400: { q: "What is the real name of Black Panther, king of Wakanda?", a: "T'Challa" },
          500: { q: "In Marvel Comics, what is the true given name of the mutant anti-hero known as Deadpool?", a: "Wade Wilson" }
        }
      },
      {
        name: "Marvel Comics",
        questions: {
          100: { q: "Which legendary comic book writer co-created Spider-Man, the X-Men, and the Avengers, and made cameo appearances in many Marvel films?", a: "Stan Lee" },
          200: { q: "In what year did Marvel Comics publish 'Amazing Fantasy #15', the first appearance of Spider-Man?", a: "1962" },
          300: { q: "Which artist and writer co-created Spider-Man alongside Stan Lee?", a: "Steve Ditko" },
          400: { q: "Which 1963 Marvel Comics title introduced the X-Men, a team of mutant superheroes led by Professor X?", a: "The X-Men #1 (Uncanny X-Men)" },
          500: { q: "In what year was Marvel Comics founded, originally under the name 'Timely Comics'?", a: "1939" }
        }
      }
    ]
  },
  "Anime": {
    icon: "🍜",
    categories: [
      {
        name: "Popular Anime",
        questions: {
          100: { q: "Which anime follows a young ninja named Naruto Uzumaki who dreams of becoming Hokage?", a: "Naruto" },
          200: { q: "Which anime and manga series follows Monkey D. Luffy as he searches for the ultimate treasure known as the 'One Piece'?", a: "One Piece" },
          300: { q: "Which anime features high school student Light Yagami, who obtains a supernatural notebook that can kill anyone whose name is written in it?", a: "Death Note" },
          400: { q: "Which 2013 anime, based on a manga by Hajime Isayama, is set in a world where humanity lives inside walled cities to protect against giant humanoid creatures?", a: "Attack on Titan" },
          500: { q: "Which long-running anime franchise, created by Akira Toriyama, follows Goku through martial arts battles with escalating power levels?", a: "Dragon Ball" }
        }
      },
      {
        name: "Anime Characters",
        questions: {
          100: { q: "What is the name of the main character in 'Naruto' who wants to become the leader of his village?", a: "Naruto Uzumaki" },
          200: { q: "In 'My Hero Academia', what is the nickname of the protagonist Izuku Midoriya?", a: "Deku" },
          300: { q: "In 'Fullmetal Alchemist', what did the Elric brothers Edward and Alphonse each lose while trying to resurrect their mother?", a: "Edward lost an arm and a leg; Alphonse lost his entire body" },
          400: { q: "In 'Death Note', what is the name of the shinigami (death god) who drops his notebook into the human world?", a: "Ryuk" },
          500: { q: "In 'Cowboy Bebop', what is the name of the bounty hunter protagonist who pilots the ship Bebop?", a: "Spike Spiegel" }
        }
      },
      {
        name: "Anime Movies",
        questions: {
          100: { q: "Which Studio Ghibli film follows a girl named Chihiro who becomes trapped in a magical spirit world?", a: "Spirited Away" },
          200: { q: "Which Studio Ghibli film features a giant, friendly forest creature named Totoro?", a: "My Neighbor Totoro" },
          300: { q: "Which 2016 anime film by Makoto Shinkai follows two teenagers who mysteriously swap bodies?", a: "Your Name (Kimi no Na wa)" },
          400: { q: "Which Studio Ghibli co-founder directed 'Spirited Away', 'Princess Mononoke', and 'My Neighbor Totoro'?", a: "Hayao Miyazaki" },
          500: { q: "Which 1988 anime film, directed by Katsuhiro Otomo and based on his own manga, is a landmark of cyberpunk animation set in 'Neo-Tokyo'?", a: "Akira" }
        }
      },
      {
        name: "Anime Quotes",
        questions: {
          100: { q: "Which catchphrase does Naruto Uzumaki often shout, roughly meaning 'believe it'?", a: "'Dattebayo!'" },
          200: { q: "In 'My Hero Academia', All Might reassures others with the catchphrase: 'Because I am ___.'", a: "'Because I am here!'" },
          300: { q: "In 'Attack on Titan', what rallying cry do Survey Corps soldiers shout, meaning 'dedicate your heart'?", a: "'Shinzo wo sasageyo!'" },
          400: { q: "In 'Fullmetal Alchemist', what is the fundamental law the Elric brothers violate, often summarized as 'you cannot gain something without sacrificing something of equal value'?", a: "Equivalent Exchange" },
          500: { q: "In 'Death Note', what does Light Yagami famously declare about his role in the world, reflecting his god complex?", a: "'I am the god of the new world.'" }
        }
      },
      {
        name: "Anime Trivia",
        questions: {
          100: { q: "What Japanese word is used worldwide to describe hand-drawn or computer-animated shows and films originating from Japan?", a: "Anime" },
          200: { q: "What is the source medium that most anime series are originally adapted from?", a: "Manga (Japanese comics)" },
          300: { q: "Which Japanese studio, founded in 1985 by Hayao Miyazaki and Isao Takahata, is famous for films like 'Spirited Away' and 'Princess Mononoke'?", a: "Studio Ghibli" },
          400: { q: "Which anime and manga series holds the Guinness World Record for most copies published for a comic series by a single author, with over 500 million copies?", a: "One Piece" },
          500: { q: "In what year did 'Astro Boy' (Tetsuwan Atom), created by Osamu Tezuka and considered one of the first popular TV anime, premiere in Japan?", a: "1963" }
        }
      }
    ]
  },
  "College Programs": {
    icon: "🎓",
    categories: [
      {
        name: "Computer Science",
        questions: {
          100: { q: "What does 'CPU' stand for, the primary component that executes instructions in a computer?", a: "Central Processing Unit" },
          200: { q: "What is the term for a step-by-step set of instructions used to solve a problem or perform a computation?", a: "An algorithm" },
          300: { q: "In programming, what is the term for a repeated execution of a block of code, such as a 'for' or 'while' structure?", a: "A loop" },
          400: { q: "What data structure uses a Last-In-First-Out (LIFO) principle, commonly used for undo functions and call stacks?", a: "A stack" },
          500: { q: "What is the term for measuring an algorithm's efficiency, expressed with notation such as O(n log n) or O(n²)?", a: "Big O notation" }
        }
      },
      {
        name: "Information Technology",
        questions: {
          100: { q: "What does 'IT' stand for in the context of computing and business?", a: "Information Technology" },
          200: { q: "What term describes a network that connects computers within a limited area, such as a single building or campus?", a: "LAN (Local Area Network)" },
          300: { q: "What does 'IP' stand for in 'IP address'?", a: "Internet Protocol" },
          400: { q: "What is the term for software or hardware that monitors and filters network traffic based on security rules?", a: "A firewall" },
          500: { q: "What networking system, abbreviated 'DNS', translates domain names like 'google.com' into IP addresses?", a: "Domain Name System" }
        }
      },
      {
        name: "Engineering",
        questions: {
          100: { q: "What is the general term for a professional who designs, builds, or maintains structures, machines, or systems?", a: "An engineer" },
          200: { q: "What branch of engineering focuses primarily on the design and construction of buildings, bridges, and roads?", a: "Civil engineering" },
          300: { q: "What branch of engineering deals with the design and study of electrical systems, circuits, and electronics?", a: "Electrical engineering" },
          400: { q: "What unit of power is named after Scottish engineer James Watt?", a: "The watt" },
          500: { q: "What is the term for the point at which a material permanently deforms under stress and will not return to its original shape?", a: "The yield point (yield strength)" }
        }
      },
      {
        name: "Business",
        questions: {
          100: { q: "What is the basic economic term for the money a company earns from selling goods or services, before expenses are subtracted?", a: "Revenue" },
          200: { q: "What four-letter abbreviation refers to a company's Chief Executive Officer, its top-ranking executive?", a: "CEO" },
          300: { q: "What business analysis tool examines a company's Strengths, Weaknesses, Opportunities, and Threats?", a: "SWOT analysis" },
          400: { q: "What accounting term refers to the difference between a company's total revenue and total expenses?", a: "Net profit (net income)" },
          500: { q: "What economic principle states that as more units of a good are produced, the additional benefit gained from each extra unit tends to decrease?", a: "The law of diminishing marginal utility (diminishing returns)" }
        }
      },
      {
        name: "Education",
        questions: {
          100: { q: "What is the general term for the study of teaching methods and practices?", a: "Pedagogy" },
          200: { q: "In the Philippines' K-12 education system, how many years of Senior High School were added on top of the original 10-year basic education cycle?", a: "2 years (Grades 11 and 12)" },
          300: { q: "What term describes an assessment given at the end of an instructional period to measure what students have learned, such as a final exam?", a: "Summative assessment" },
          400: { q: "Which educational psychologist is best known for his theory of cognitive development in children, involving stages like sensorimotor and concrete operational?", a: "Jean Piaget" },
          500: { q: "What term, from educational theorist Benjamin Bloom, refers to a hierarchical framework classifying learning objectives from 'remembering' to 'creating'?", a: "Bloom's Taxonomy" }
        }
      },
      {
        name: "Nursing",
        questions: {
          100: { q: "What instrument do nurses commonly use to listen to a patient's heartbeat and lungs?", a: "A stethoscope" },
          200: { q: "What term refers to a person's body temperature, pulse rate, respiratory rate, and blood pressure, routinely measured by nurses?", a: "Vital signs" },
          300: { q: "What is the abbreviation for the life-saving technique used when someone's heart stops, involving chest compressions and rescue breaths?", a: "CPR (Cardiopulmonary Resuscitation)" },
          400: { q: "What blood type is known as the 'universal donor' because it can be given to patients of any blood type in an emergency?", a: "O negative (O-)" },
          500: { q: "Which nursing theorist, known as the founder of modern nursing, is famous for her work during the Crimean War and for founding the first secular nursing school in 1860?", a: "Florence Nightingale" }
        }
      },
      {
        name: "Architecture",
        questions: {
          100: { q: "What is the term for a detailed drawing showing the layout of a building, viewed from above?", a: "A floor plan" },
          200: { q: "What ancient Greek architectural order is characterized by simple, unadorned columns, the earliest and plainest of the three classical orders?", a: "The Doric order" },
          300: { q: "Which architect designed New York's Guggenheim Museum and the earthquake-resistant house Fallingwater?", a: "Frank Lloyd Wright" },
          400: { q: "What term describes a building's supporting framework of columns and beams that carries its structural load?", a: "The structural frame (skeleton)" },
          500: { q: "Which Spanish architect, famous for the still-unfinished Sagrada Familia basilica in Barcelona, is renowned for his organic, nature-inspired Modernisme style?", a: "Antoni Gaudí" }
        }
      },
      {
        name: "Communication",
        questions: {
          100: { q: "What is the general term for the process of exchanging information or ideas between a sender and a receiver?", a: "Communication" },
          200: { q: "What term describes communication that occurs without words, using gestures, facial expressions, and body language?", a: "Nonverbal communication" },
          300: { q: "In the basic communication model, what term refers to anything that interferes with or distorts the message between sender and receiver?", a: "Noise" },
          400: { q: "What term describes mass communication industries such as newspapers, television, radio, and the internet, collectively?", a: "Mass media" },
          500: { q: "Which Canadian media theorist coined the phrase 'the medium is the message', arguing that how information is delivered shapes its impact as much as its content?", a: "Marshall McLuhan" }
        }
      }
    ]
  },
  "Music": {
    icon: "🎵",
    categories: [
      {
        name: "Pop",
        questions: {
          100: { q: "Who is known as the 'King of Pop', famous for hits like 'Thriller' and 'Billie Jean'?", a: "Michael Jackson" },
          200: { q: "Which pop superstar released the 2022 album 'Midnights' and is known for narrative albums like 'Folklore' and '1989'?", a: "Taylor Swift" },
          300: { q: "Which Barbadian singer, known for hits like 'Umbrella' and 'Diamonds', also founded the Fenty Beauty cosmetics line?", a: "Rihanna" },
          400: { q: "Which 1982 album by Michael Jackson became the best-selling album of all time worldwide?", a: "Thriller" },
          500: { q: "Which pop artist holds the record for the most Grammy Awards won by any artist in history, with over 32 wins as of the mid-2020s?", a: "Beyoncé" }
        }
      },
      {
        name: "Rock",
        questions: {
          100: { q: "Which British rock band, formed in Liverpool in 1960, included John Lennon, Paul McCartney, George Harrison, and Ringo Starr?", a: "The Beatles" },
          200: { q: "Which rock band, fronted by Freddie Mercury, performed 'Bohemian Rhapsody' and 'We Will Rock You'?", a: "Queen" },
          300: { q: "Which American rock band, fronted by Axl Rose and featuring guitarist Slash, released the iconic 1987 album 'Appetite for Destruction'?", a: "Guns N' Roses" },
          400: { q: "Which grunge band, fronted by Kurt Cobain, released the influential 1991 album 'Nevermind', featuring 'Smells Like Teen Spirit'?", a: "Nirvana" },
          500: { q: "Which 1969 music festival in upstate New York became a defining moment for rock and counterculture, featuring Jimi Hendrix and The Who?", a: "Woodstock" }
        }
      },
      {
        name: "OPM",
        questions: {
          100: { q: "Which 1978 song by Freddie Aguilar, about a mother's sacrifices, became one of the most successful OPM songs of all time internationally?", a: "'Anak'" },
          200: { q: "Which Filipino rock band, formed in the late 1980s, is often called 'The Beatles of the Philippines' and is known for hits like 'Ang Huling El Bimbo'?", a: "Eraserheads" },
          300: { q: "Which Filipino singer is popularly known as 'Asia's Songbird', famous for hits like 'Kailangan Kita' and 'In Love With You'?", a: "Regine Velasquez" },
          400: { q: "Which 1995 Eraserheads song, considered one of the greatest OPM songs of all time, tells a story using the metaphor of a magician's assistant?", a: "'Ang Huling El Bimbo'" },
          500: { q: "Which Filipino composer and National Artist for Music wrote the iconic kundiman (Filipino love ballad) 'Sa Ugoy ng Duyan'?", a: "Lucio San Pedro" }
        }
      },
      {
        name: "K-Pop",
        questions: {
          100: { q: "Which South Korean boy band debuted in 2013 and became a global phenomenon with hits like 'Dynamite' and 'Butter'?", a: "BTS" },
          200: { q: "Which K-pop girl group, formed by YG Entertainment and known for 'Kill This Love' and 'DDU-DU DDU-DU', consists of Jisoo, Jennie, Rosé, and Lisa?", a: "BLACKPINK" },
          300: { q: "What is the official fandom name for BTS, referring to their dedicated global fanbase?", a: "ARMY" },
          400: { q: "Which South Korean entertainment company, founded by Lee Soo-man in 1995, is one of the 'Big Three' K-pop agencies and manages groups like EXO and NCT?", a: "SM Entertainment" },
          500: { q: "Which K-pop group became the first to top the Billboard Hot 100 chart with an all-Korean-language song, 'Life Goes On', in 2020?", a: "BTS" }
        }
      },
      {
        name: "International Music",
        questions: {
          100: { q: "Which Canadian singer is known as 'The Weeknd', famous for hits like 'Blinding Lights' and 'Starboy'?", a: "Abel Tesfaye (The Weeknd)" },
          200: { q: "Which Colombian singer, known for hits like 'Hips Don't Lie' and 'Waka Waka', is one of the best-selling Latin music artists of all time?", a: "Shakira" },
          300: { q: "Which 2017 song by Luis Fonsi featuring Daddy Yankee became one of the most-viewed videos on YouTube for several years?", a: "'Despacito'" },
          400: { q: "Which Swedish group, formed in 1972, is known for hits like 'Dancing Queen' and 'Mamma Mia', and remains one of the best-selling music acts of all time?", a: "ABBA" },
          500: { q: "Which French electronic duo, known for wearing robot helmets and producing hits like 'Get Lucky' and 'One More Time', disbanded in 2021 after 28 years together?", a: "Daft Punk" }
        }
      },
      {
        name: "Music History",
        questions: {
          100: { q: "Which Austrian composer, a child prodigy, wrote famous classical works like 'The Magic Flute' and 'Eine kleine Nachtmusik'?", a: "Wolfgang Amadeus Mozart" },
          200: { q: "Which genre of African-American music, originating in the late 19th and early 20th century in the Southern United States, is considered a precursor to rock and roll and jazz?", a: "The Blues" },
          300: { q: "Which British band's 1964 arrival in the United States sparked a cultural phenomenon known as the 'British Invasion'?", a: "The Beatles" },
          400: { q: "Which German composer continued composing major works, including his Ninth Symphony, even after becoming completely deaf?", a: "Ludwig van Beethoven" },
          500: { q: "What technological format, introduced by Sony and Philips in 1982, largely replaced vinyl records and cassette tapes as the dominant music medium through the 1990s?", a: "The Compact Disc (CD)" }
        }
      },
      {
        name: "Artists and Bands",
        questions: {
          100: { q: "Which American singer, known as the 'Queen of Pop', is famous for hits like 'Like a Virgin' and 'Vogue'?", a: "Madonna" },
          200: { q: "Which American rapper and entrepreneur, born Shawn Carter, is married to Beyoncé?", a: "Jay-Z" },
          300: { q: "Which American rock band, fronted by Anthony Kiedis and known for blending rock with funk and rap, released 'Californication' and 'Under the Bridge'?", a: "Red Hot Chili Peppers" },
          400: { q: "Which American band, led by former Nirvana drummer Dave Grohl, formed in 1994 and is known for hits like 'Everlong' and 'Learn to Fly'?", a: "Foo Fighters" },
          500: { q: "Which Jamaican reggae musician, known for 'No Woman, No Cry' and 'Redemption Song', helped popularize reggae music worldwide before his death in 1981?", a: "Bob Marley" }
        }
      }
    ]
  },
  "Video Games": {
    icon: "🎮",
    categories: [
      {
        name: "Classic Games",
        questions: {
          100: { q: "Which 1985 Nintendo game, starring a plumber who must rescue Princess Peach, became one of the best-selling video games of all time?", a: "Super Mario Bros." },
          200: { q: "Which 1980 arcade game, created by Namco, features a yellow character eating dots while avoiding four colored ghosts?", a: "Pac-Man" },
          300: { q: "Which puzzle video game, created by Russian designer Alexey Pajitnov in 1984, involves arranging falling geometric blocks?", a: "Tetris" },
          400: { q: "Which 1991 Sega game introduced a blue hedgehog who could run at super speed, created as a rival mascot to Nintendo's Mario?", a: "Sonic the Hedgehog" },
          500: { q: "Which 1972 game, developed by Atari and featuring two paddles hitting a ball back and forth, is considered one of the first commercially successful video games?", a: "Pong" }
        }
      },
      {
        name: "Iconic Characters",
        questions: {
          100: { q: "What is the name of the green-clad hero who rescues Princess Zelda in Nintendo's long-running fantasy franchise?", a: "Link" },
          200: { q: "What is the name of Sonic the Hedgehog's main rival, a mad scientist who pilots various machines?", a: "Dr. Robotnik (Dr. Eggman)" },
          300: { q: "What is the name of the protagonist in the 'Half-Life' series, a silent theoretical physicist armed with a crowbar?", a: "Gordon Freeman" },
          400: { q: "In the 'Legend of Zelda' series, what is the name of the recurring antagonist, a pig-like sorcerer king who seeks the Triforce?", a: "Ganon (Ganondorf)" },
          500: { q: "What is the real name of the protagonist in 'Assassin's Creed II', a vigilante descended from a wealthy Florentine family?", a: "Ezio Auditore da Firenze" }
        }
      },
      {
        name: "Game Franchises",
        questions: {
          100: { q: "Which Nintendo franchise features colorful creatures that trainers catch, train, and battle, starting with 'Red and Blue' in 1996?", a: "Pokémon" },
          200: { q: "Which sandbox video game, created by Markus 'Notch' Persson and released in 2011, lets players build with cubic blocks in a procedurally generated world?", a: "Minecraft" },
          300: { q: "Which battle royale game, released by Epic Games in 2017, became a cultural phenomenon known for its building mechanics and seasonal events?", a: "Fortnite" },
          400: { q: "Which long-running Japanese role-playing game franchise, first released in 1987 by Square, is known for numbered mainline entries and recurring creatures called Chocobos?", a: "Final Fantasy" },
          500: { q: "Which video game franchise, first released in 1997, is known for its open-world crime gameplay and has sold over 400 million copies across its series?", a: "Grand Theft Auto" }
        }
      }
    ]
  },
  "Sports": {
    icon: "🏆",
    categories: [
      {
        name: "Olympics",
        questions: {
          100: { q: "In which country did the modern Olympic Games originate in ancient times?", a: "Greece" },
          200: { q: "How many rings are on the Olympic flag, representing the five inhabited continents?", a: "Five" },
          300: { q: "Which city hosted the 2020 Summer Olympics, which were postponed to 2021 due to the COVID-19 pandemic?", a: "Tokyo, Japan" },
          400: { q: "Which Jamaican sprinter holds the world records in both the 100m and 200m and won eight Olympic gold medals?", a: "Usain Bolt" },
          500: { q: "Which American swimmer holds the record for the most Olympic medals of all time, with 28 total medals?", a: "Michael Phelps" }
        }
      },
      {
        name: "Basketball",
        questions: {
          100: { q: "How many players from each team are on the court at one time in a standard basketball game?", a: "Five" },
          200: { q: "Which NBA player, nicknamed 'His Airness', won six NBA championships with the Chicago Bulls?", a: "Michael Jordan" },
          300: { q: "Which Philippine professional basketball league, founded in 1975, is the oldest active professional basketball league in Asia?", a: "PBA (Philippine Basketball Association)" },
          400: { q: "Which NBA player holds the record for most career points scored, surpassing Kareem Abdul-Jabbar in 2023?", a: "LeBron James" },
          500: { q: "Which basketball player scored 100 points in a single NBA game in 1962, a record that still stands?", a: "Wilt Chamberlain" }
        }
      },
      {
        name: "Football (Soccer)",
        questions: {
          100: { q: "How many players are on a standard soccer team on the field at one time, including the goalkeeper?", a: "Eleven" },
          200: { q: "Which country has won the most FIFA World Cup titles, with five championships?", a: "Brazil" },
          300: { q: "Which Argentine football star won the 2022 FIFA World Cup with Argentina and has won a record eight Ballon d'Or awards?", a: "Lionel Messi" },
          400: { q: "Which international club competition, organized by UEFA, is Europe's top-tier club football tournament?", a: "The UEFA Champions League" },
          500: { q: "Which country hosted and won the first-ever FIFA World Cup in 1930?", a: "Uruguay" }
        }
      }
    ]
  },
  "Philippine Trivia": {
    icon: "🥭",
    categories: [
      {
        name: "Philippine History",
        questions: {
          100: { q: "Who is the national hero of the Philippines, known for writing 'Noli Me Tángere' and 'El Filibusterismo'?", a: "José Rizal" },
          200: { q: "In what year did the Philippines declare independence from Spain, an event now celebrated as Independence Day?", a: "1898" },
          300: { q: "Which Filipino revolutionary leader became the first President of the Philippines in 1899?", a: "Emilio Aguinaldo" },
          400: { q: "Which Portuguese explorer, sailing for Spain, arrived in the Philippines in 1521 and was later killed in the Battle of Mactan?", a: "Ferdinand Magellan" },
          500: { q: "Who was the Filipino chieftain of Mactan who defeated and killed Ferdinand Magellan in 1521?", a: "Lapu-Lapu" }
        }
      },
      {
        name: "Philippine Culture",
        questions: {
          100: { q: "What is the national language of the Philippines, based largely on Tagalog?", a: "Filipino" },
          200: { q: "What bamboo dance, performed by stepping between clapping bamboo poles, is a well-known traditional Philippine folk dance?", a: "Tinikling" },
          300: { q: "What is the term for a traditional Filipino community spirit of helping neighbors with work, such as building a house?", a: "Bayanihan" },
          400: { q: "The iconic Philippine jeepney was originally created after World War II by modifying which vehicles left behind by American soldiers?", a: "U.S. military jeeps" },
          500: { q: "What UNESCO-recognized Philippine rice terraces, carved into the mountains over 2,000 years ago by the Ifugao people, are often called the 'Eighth Wonder of the World'?", a: "The Banaue Rice Terraces" }
        }
      },
      {
        name: "Philippine Facts",
        questions: {
          100: { q: "What is the capital city of the Philippines?", a: "Manila" },
          200: { q: "Approximately how many islands make up the Philippine archipelago?", a: "About 7,641 islands" },
          300: { q: "What is the official currency of the Philippines?", a: "The Philippine peso" },
          400: { q: "Which Philippine volcano, known for its near-perfect cone shape, is located in Albay province?", a: "Mayon Volcano" },
          500: { q: "What is the name of the deepest point in the Philippine Sea, one of the deepest points in all of Earth's oceans, located east of the Philippines?", a: "The Philippine Trench (the Emden Deep)" }
        }
      }
    ]
  },
  "World Trivia": {
    icon: "🌐",
    categories: [
      {
        name: "World Records",
        questions: {
          100: { q: "What is the tallest mountain in the world, located in the Himalayas?", a: "Mount Everest" },
          200: { q: "What is the largest ocean on Earth by surface area?", a: "The Pacific Ocean" },
          300: { q: "What is the longest river in the world, located in Africa?", a: "The Nile River" },
          400: { q: "What is the smallest country in the world by land area?", a: "Vatican City" },
          500: { q: "What is the largest hot desert in the world, covering much of North Africa?", a: "The Sahara Desert" }
        }
      },
      {
        name: "World Cultures",
        questions: {
          100: { q: "In Japan, what is the traditional art of paper folding called?", a: "Origami" },
          200: { q: "What is the traditional Indian greeting, performed by pressing one's palms together and slightly bowing?", a: "Namaste" },
          300: { q: "Which country is credited as the birthplace of pizza, specifically the city of Naples?", a: "Italy" },
          400: { q: "What is the term for the traditional Japanese tea ceremony, emphasizing mindfulness and ritual?", a: "Chanoyu (the Way of Tea, Sado)" },
          500: { q: "What is the name of the Jewish New Year celebration, typically occurring in September or October?", a: "Rosh Hashanah" }
        }
      },
      {
        name: "World Events",
        questions: {
          100: { q: "In what year did World War II end?", a: "1945" },
          200: { q: "What historic 1989 event, involving the destruction of a section of a Berlin barrier, symbolized the end of the Cold War divide?", a: "The Fall of the Berlin Wall" },
          300: { q: "Which international organization, founded in 1945 to maintain global peace and security, currently has 193 member states?", a: "The United Nations" },
          400: { q: "What global health crisis, caused by a novel coronavirus, was declared a pandemic by the WHO in March 2020?", a: "The COVID-19 pandemic" },
          500: { q: "In what year did the Chernobyl nuclear disaster occur in present-day Ukraine, then part of the Soviet Union?", a: "1986" }
        }
      }
    ]
  },
  "History": {
    icon: "📜",
    categories: [
      {
        name: "Ancient History",
        questions: {
          100: { q: "Which ancient Egyptian structures, built as tombs for pharaohs, are among the Seven Wonders of the Ancient World?", a: "The Pyramids (of Giza)" },
          200: { q: "Which ancient civilization built the Colosseum, a large amphitheater used for gladiator contests?", a: "The Roman Empire (Ancient Rome)" },
          300: { q: "Which Chinese dynasty began construction of an early version of the Great Wall of China to protect against northern invasions?", a: "The Qin Dynasty" },
          400: { q: "Which Macedonian king created one of the largest empires of the ancient world by the age of 30, stretching from Greece to India?", a: "Alexander the Great" },
          500: { q: "Which ancient Mesopotamian king created one of the earliest known written law codes, inscribed on a stone stele around 1754 BCE?", a: "Hammurabi" }
        }
      },
      {
        name: "Modern History",
        questions: {
          100: { q: "Which U.S. president delivered the Gettysburg Address in 1863 during the American Civil War?", a: "Abraham Lincoln" },
          200: { q: "In what year did the Titanic sink after hitting an iceberg on its maiden voyage?", a: "1912" },
          300: { q: "Astronauts from which country were the first humans to walk on the Moon in 1969, aboard Apollo 11?", a: "The United States" },
          400: { q: "Which Indian leader is famous for leading India to independence from British rule through nonviolent civil disobedience?", a: "Mahatma Gandhi" },
          500: { q: "Which 1919 treaty formally ended World War I and imposed heavy reparations on Germany?", a: "The Treaty of Versailles" }
        }
      },
      {
        name: "Wars & Revolutions",
        questions: {
          100: { q: "Which war, fought from 1861 to 1865, was fought between the northern and southern United States, largely over slavery?", a: "The American Civil War" },
          200: { q: "Which 1789 revolution led to the overthrow of the French monarchy and the eventual rise of Napoleon Bonaparte?", a: "The French Revolution" },
          300: { q: "Which war, lasting from 1955 to 1975, was fought in Southeast Asia between North and South Vietnam, with heavy U.S. involvement?", a: "The Vietnam War" },
          400: { q: "Which 1917 revolution led to the overthrow of the Russian monarchy and the eventual rise of the Soviet Union?", a: "The Russian Revolution" },
          500: { q: "Which war, fought between 1950 and 1953, ended in an armistice that still technically leaves North and South Korea in a state of war?", a: "The Korean War" }
        }
      }
    ]
  },
  "Technology": {
    icon: "💻",
    categories: [
      {
        name: "Computers & Internet",
        questions: {
          100: { q: "What does 'WWW' stand for, the system that lets users navigate linked web pages?", a: "World Wide Web" },
          200: { q: "What social media platform, launched in 2004 by Mark Zuckerberg, was originally created for Harvard students?", a: "Facebook" },
          300: { q: "What term describes unwanted or malicious software designed to damage, disrupt, or gain unauthorized access to a computer system?", a: "Malware" },
          400: { q: "What is the term for storing and accessing data and programs over the internet instead of a computer's hard drive?", a: "Cloud computing" },
          500: { q: "What programming language, created by Brendan Eich in just 10 days in 1995, is the primary scripting language used to make websites interactive?", a: "JavaScript" }
        }
      },
      {
        name: "Gadgets",
        questions: {
          100: { q: "Which company created the iPhone, first released in 2007?", a: "Apple" },
          200: { q: "What wearable device, popularized by companies like Fitbit and Apple, tracks steps, heart rate, and other health metrics?", a: "A fitness tracker (smartwatch)" },
          300: { q: "What term describes glasses or headsets that overlay digital information onto the real world, as opposed to fully immersive virtual reality?", a: "Augmented reality (AR)" },
          400: { q: "Which company released the first mass-market e-reader, the Kindle, in 2007?", a: "Amazon" },
          500: { q: "What was the name of the first commercially successful portable music player, released by Apple in 2001, which helped popularize digital music?", a: "The iPod" }
        }
      },
      {
        name: "Tech Companies",
        questions: {
          100: { q: "Which company, founded by Bill Gates and Paul Allen in 1975, created the Windows operating system?", a: "Microsoft" },
          200: { q: "Which search engine company, founded by Larry Page and Sergey Brin in 1998, is now part of the parent company Alphabet?", a: "Google" },
          300: { q: "Which electric car and clean energy company was founded and is led by Elon Musk?", a: "Tesla" },
          400: { q: "Which South Korean company is the world's largest manufacturer of smartphones and semiconductors, alongside making TVs and appliances?", a: "Samsung" },
          500: { q: "Which company did Steve Jobs, Steve Wozniak, and Ronald Wayne co-found in a garage in 1976?", a: "Apple" }
        }
      }
    ]
  },
  "Food": {
    icon: "🍽️",
    categories: [
      {
        name: "World Cuisine",
        questions: {
          100: { q: "What Italian dish consists of a flat, round base topped with tomato sauce, cheese, and various toppings, then baked?", a: "Pizza" },
          200: { q: "What Japanese dish consists of vinegared rice combined with raw fish or other ingredients?", a: "Sushi" },
          300: { q: "What spicy Korean side dish, made from fermented vegetables (usually napa cabbage), is a staple of Korean cuisine?", a: "Kimchi" },
          400: { q: "What French cooking technique involves slowly cooking food in its own fat at a low temperature, often used for duck?", a: "Confit" },
          500: { q: "What is the name of the fermented soybean paste used as a base for miso soup in Japanese cuisine?", a: "Miso" }
        }
      },
      {
        name: "Filipino Food",
        questions: {
          100: { q: "What popular Filipino dish is made by marinating meat in vinegar, soy sauce, and garlic, then stewing it?", a: "Adobo" },
          200: { q: "What is the name of the Filipino dish of stir-fried rice, often made using leftover rice from the previous day's meal?", a: "Sinangag (garlic fried rice)" },
          300: { q: "What Filipino noodle dish, brought by Chinese immigrants, is commonly served at birthday celebrations to symbolize long life?", a: "Pancit" },
          400: { q: "What Filipino dessert consists of layered shaved ice, evaporated milk, and sweetened fruits, beans, and jellies?", a: "Halo-halo" },
          500: { q: "What Visayan roasted pig dish, famous in Cebu, was once named the 'Best Dish in the World' by chef Anthony Bourdain?", a: "Lechon (Cebu lechon)" }
        }
      },
      {
        name: "Desserts & Drinks",
        questions: {
          100: { q: "What frozen dessert, typically made from dairy, sugar, and flavorings, is a popular treat worldwide?", a: "Ice cream" },
          200: { q: "What Italian coffee drink is made by forcing hot water through finely-ground coffee beans, forming a concentrated shot?", a: "Espresso" },
          300: { q: "What French dessert consists of a rich custard base topped with a layer of hardened caramelized sugar?", a: "Crème brûlée" },
          400: { q: "What Mexican beverage, made from the fermented agave plant, is the base spirit for margaritas?", a: "Tequila" },
          500: { q: "What is the term for the traditional Ethiopian coffee ceremony, an important social ritual involving roasting beans in front of guests?", a: "The Ethiopian coffee ceremony (Buna)" }
        }
      }
    ]
  },
  "Famous People": {
    icon: "🌟",
    categories: [
      {
        name: "Scientists",
        questions: {
          100: { q: "Which physicist developed the theory of general relativity and famously came up with the equation E=mc²?", a: "Albert Einstein" },
          200: { q: "Which British scientist proposed the theory of evolution by natural selection in his 1859 book 'On the Origin of Species'?", a: "Charles Darwin" },
          300: { q: "Which Polish-French scientist was the first person to win Nobel Prizes in two different scientific fields (Physics and Chemistry)?", a: "Marie Curie" },
          400: { q: "Which English scientist formulated the laws of motion and universal gravitation, publishing them in his 1687 work 'Principia Mathematica'?", a: "Sir Isaac Newton" },
          500: { q: "Which British theoretical physicist, known for his work on black holes and the book 'A Brief History of Time', lived most of his life with ALS (motor neurone disease)?", a: "Stephen Hawking" }
        }
      },
      {
        name: "Leaders & Politicians",
        questions: {
          100: { q: "Who was the first President of the United States?", a: "George Washington" },
          200: { q: "Which South African leader, imprisoned for 27 years for his anti-apartheid activism, became the country's first Black president in 1994?", a: "Nelson Mandela" },
          300: { q: "Who was the Prime Minister of the United Kingdom during most of World War II, known for his defiant wartime speeches?", a: "Winston Churchill" },
          400: { q: "Which Filipino president, the 5th President of the Philippines, declared Martial Law in 1972 and ruled for over two decades?", a: "Ferdinand Marcos Sr." },
          500: { q: "Who was the first female Prime Minister of the United Kingdom, serving from 1979 to 1990 and nicknamed the 'Iron Lady'?", a: "Margaret Thatcher" }
        }
      },
      {
        name: "Icons & Innovators",
        questions: {
          100: { q: "Which entrepreneur co-founded Apple and is credited with revolutionizing personal computers, phones, and music players?", a: "Steve Jobs" },
          200: { q: "Which American civil rights leader delivered the famous 'I Have a Dream' speech in 1963?", a: "Martin Luther King Jr." },
          300: { q: "Which Filipino boxer became the only eight-division world champion in boxing history and later served as a Philippine senator?", a: "Manny Pacquiao" },
          400: { q: "Which media mogul and philanthropist became the first Black woman billionaire, known for her long-running talk show?", a: "Oprah Winfrey" },
          500: { q: "Which women's rights activist and Pakistani education advocate survived a Taliban assassination attempt in 2012 and became the youngest-ever Nobel Prize laureate at age 17?", a: "Malala Yousafzai" }
        }
      }
    ]
  },
  "E-Commerce": {
    icon: "🛒",
    categories: [
      {
        name: "E-Commerce Basics",
        questions: {
          100: { q: "What does the term 'E-Commerce' refer to?", a: "Electronic Commerce — buying and selling goods or services online" },
          200: { q: "What abbreviation describes an online business that sells directly to individual customers, like an online clothing store selling to shoppers?", a: "B2C (Business-to-Consumer)" },
          300: { q: "What abbreviation describes an online transaction between two businesses, such as a supplier selling materials to a manufacturer?", a: "B2B (Business-to-Business)" },
          400: { q: "What abbreviation describes an online transaction where individual consumers sell directly to other consumers, such as on Facebook Marketplace?", a: "C2C (Consumer-to-Consumer)" },
          500: { q: "What term describes a retail approach where a business sells to customers through multiple integrated channels at once, such as its website, app, and physical store?", a: "Omnichannel retailing" }
        }
      },
      {
        name: "Online Shopping",
        questions: {
          100: { q: "What is the term for the virtual list where online shoppers place items before checking out?", a: "The shopping cart" },
          200: { q: "Which Southeast Asian E-Commerce app, recognizable by its orange branding, is one of the most popular online shopping platforms in the Philippines?", a: "Shopee" },
          300: { q: "What term describes a code shoppers enter at checkout to receive a discount on their online order?", a: "A promo code (voucher code)" },
          400: { q: "What term describes the E-Commerce practice of showing customers products similar to ones they've viewed or bought, to encourage more sales?", a: "Product recommendations" },
          500: { q: "What annual online shopping event, held every November 11th and popularized by Alibaba, has become one of the world's largest single-day sales events?", a: "11.11 (Singles' Day sale)" }
        }
      },
      {
        name: "Digital Payments",
        questions: {
          100: { q: "What is the general term for a mobile app that lets users store money digitally and pay for purchases using their phone?", a: "A digital wallet (e-wallet)" },
          200: { q: "Which popular Philippine mobile wallet app, often used for paying bills and online purchases, has a blue-colored logo?", a: "GCash" },
          300: { q: "What three-letter code do shoppers enter when paying online with a credit or debit card, usually found on the back of the card?", a: "CVV (Card Verification Value)" },
          400: { q: "What technology allows contactless payments by tapping a card or phone near a payment terminal?", a: "NFC (Near-Field Communication)" },
          500: { q: "What decentralized digital currency, created in 2009 by the pseudonymous Satoshi Nakamoto, is sometimes accepted as an alternative online payment method?", a: "Bitcoin" }
        }
      },
      {
        name: "E-Commerce Platforms",
        questions: {
          100: { q: "Which American company, founded by Jeff Bezos in 1994, is the world's largest online marketplace and started out selling only books?", a: "Amazon" },
          200: { q: "Which E-Commerce platform, known for its blue branding and popular across the Philippines and Southeast Asia, was originally founded by Rocket Internet in 2012?", a: "Lazada" },
          300: { q: "Which Chinese E-Commerce company, founded by Jack Ma in 1999, operates platforms like Taobao and AliExpress?", a: "Alibaba" },
          400: { q: "Which online marketplace, founded in 1995, was one of the first major platforms to popularize consumer-to-consumer online auctions?", a: "eBay" },
          500: { q: "Which Canadian company provides the software platform that lets businesses set up their own independent online stores, powering brands like Gymshark and Allbirds?", a: "Shopify" }
        }
      },
      {
        name: "Online Business",
        questions: {
          100: { q: "What term describes a business that operates entirely online without any physical retail store?", a: "An online store (online-only business)" },
          200: { q: "What term describes the service that brings an online order from the seller's warehouse to the customer's doorstep?", a: "Delivery (logistics / courier service)" },
          300: { q: "What term describes online advertising strategies, such as social media ads and influencer marketing, used to promote products and drive sales?", a: "Digital marketing" },
          400: { q: "What term describes a customer's overall satisfaction throughout the process of browsing, purchasing, and receiving an online order?", a: "Customer experience (CX)" },
          500: { q: "What business model lets entrepreneurs sell products online without holding any inventory themselves, since the supplier ships directly to the customer?", a: "Dropshipping" }
        }
      }
    ]
  }
};

// Groups themes for the theme-selection screen. Any theme not listed here
// (e.g. a future addition) automatically falls into a "More Themes" group,
// so new themes can be added to QUIZ_THEMES above without touching this map.
const QUIZ_THEME_GROUPS = {
  "Pop Culture": ["Cartoons", "Marvel", "Anime", "Movies & TV", "Video Games"],
  "Music": ["Music"],
  "Academic & Local": ["College Programs", "Philippine Trivia", "E-Commerce"],
  "General Knowledge": ["World Geography", "Science", "World Trivia", "History", "Technology", "Food", "Famous People", "Sports"]
};
