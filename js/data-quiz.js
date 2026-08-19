// Built-in quiz question bank (works fully offline).
// Structure: QUIZ_THEMES[themeName] = { icon, categories: [{ name, questions: {100:{q,a},200:{...},300:{...},400:{...},500:{...}} }] }
const QUIZ_THEMES = {
  "Cartoons": {
    icon: "📼",
    categories: [
      {
        name: "Disney Channel",
        questions: {
          100: [
            { q: "Which Disney Channel show follows twin brothers running a hotel suite in New York City?", a: "The Suite Life of Zack & Cody" },
            { q: "Which Disney Channel show stars Miley Cyrus as a girl living a double life as a famous pop star?", a: "Hannah Montana" },
            { q: "Which Disney Channel show stars Raven Baxter, a teenager with the psychic ability to see glimpses of the future?", a: "That's So Raven" }
          ],
          200: [
            { q: "In 'Wizards of Waverly Place', what is the last name of the wizard family?", a: "Russo" },
            { q: "In 'The Suite Life of Zack & Cody', what is the name of the hotel where the twins live?", a: "The Tipton Hotel" },
            { q: "Which Disney Channel show follows aspiring pop star Sonny Munroe joining a sketch comedy show called 'So Random!'?", a: "Sonny with a Chance" }
          ],
          300: [
            { q: "Which Disney Channel Original Movie franchise centers on basketball player Troy Bolton?", a: "High School Musical" },
            { q: "What is the name of the high school in the 'High School Musical' film series?", a: "East High School" },
            { q: "Which actress played Gabriella Montez, Troy Bolton's love interest, in the 'High School Musical' trilogy?", a: "Vanessa Hudgens" }
          ],
          400: [
            { q: "In 'Hannah Montana', what is the name of Miley's best friend, played by Emily Osment?", a: "Lilly Truscott" },
            { q: "What is the name of Hannah Montana's father and manager, played by Billy Ray Cyrus?", a: "Robby Ray Stewart" },
            { q: "In 'Wizards of Waverly Place', what is the name of Alex's older brother who ultimately becomes the family wizard?", a: "Justin Russo" }
          ],
          500: [
            { q: "What was the first-ever Disney Channel Original Movie, released in 1997?", a: "Under Wraps" },
            { q: "In what year did Disney Channel transition from a premium subscription channel to a widely available, ad-supported basic cable channel?", a: "1997" },
            { q: "Which actress starred in the title roles of the Disney Channel Original Movie 'Cadet Kelly', playing a spoiled teen sent to military school?", a: "Hilary Duff" }
          ]
        }
      },
      {
        name: "Cartoon Network",
        questions: {
          100: [
            { q: "What is the name of the boy genius with a secret lab hidden in his family's house?", a: "Dexter (Dexter's Laboratory)" },
            { q: "Which Cartoon Network show follows a boy named Mac and his imaginary friend, a red gumball-shaped creature named Bloo?", a: "Foster's Home for Imaginary Friends" },
            { q: "Which Cartoon Network series stars a boy named Gumball, a blue cat, living in the town of Elmore?", a: "The Amazing World of Gumball" }
          ],
          200: [
            { q: "In 'Adventure Time', what is the name of Finn's shape-shifting dog best friend?", a: "Jake" },
            { q: "What is the name of the fictional post-apocalyptic land where 'Adventure Time' takes place?", a: "The Land of Ooo" },
            { q: "In 'Teen Titans', what is the name of the team's half-human, half-demon empath member?", a: "Raven" }
          ],
          300: [
            { q: "Which Cartoon Network series follows super-powered sisters defending the city of Townsville?", a: "The Powerpuff Girls" },
            { q: "What are the names of the three Powerpuff Girls?", a: "Blossom, Bubbles, and Buttercup" },
            { q: "Which Cartoon Network scientist created the Powerpuff Girls using sugar, spice, and everything nice, plus an accidental extra ingredient?", a: "Professor Utonium" }
          ],
          400: [
            { q: "In 'Ben 10', what is the name of the alien-transforming watch device Ben Tennyson wears?", a: "The Omnitrix" },
            { q: "In 'Ben 10', what is the name of Ben Tennyson's cousin who accompanies him on his adventures?", a: "Gwen Tennyson" },
            { q: "Which Cartoon Network series follows Billy, Mandy, and the Grim Reaper after the two kids win a bet against Death?", a: "The Grim Adventures of Billy & Mandy" }
          ],
          500: [
            { q: "In what year did Cartoon Network first launch as a television channel in the United States?", a: "1992" },
            { q: "Which media company originally launched Cartoon Network in 1992, using its library of MGM and Hanna-Barbera cartoons?", a: "Turner Broadcasting System" },
            { q: "In what year did Cartoon Network launch its late-night programming block, Adult Swim?", a: "2001" }
          ]
        }
      },
      {
        name: "Nickelodeon",
        questions: {
          100: [
            { q: "Who lives in a pineapple under the sea?", a: "SpongeBob SquarePants" },
            { q: "Which Nickelodeon animated series follows a mischievous baby named Tommy Pickles and his friends?", a: "Rugrats" },
            { q: "Which Nickelodeon show stars a talking dog named Blue whose paw prints lead to clues in each episode?", a: "Blue's Clues" }
          ],
          200: [
            { q: "In 'Hey Arnold!', what unusual shape is Arnold's head often compared to?", a: "A football" },
            { q: "In 'Hey Arnold!', what is the name of the city where the show is set?", a: "Hillwood" },
            { q: "Which Nickelodeon series follows a boy named Timmy Turner who is granted two magical fairies as godparents?", a: "The Fairly OddParents" }
          ],
          300: [
            { q: "In Nickelodeon's 'Avatar: The Last Airbender', the four nations are named after which four elements?", a: "Water, Earth, Fire, and Air" },
            { q: "In 'Avatar: The Last Airbender', what is the name of the young Avatar who must master all four elements?", a: "Aang" },
            { q: "Which Nickelodeon series, a sequel to 'Avatar: The Last Airbender', follows Avatar Korra?", a: "The Legend of Korra" }
          ],
          400: [
            { q: "In 'Rugrats', what is the name of Tommy Pickles' baby brother introduced later in the series?", a: "Dil Pickles" },
            { q: "In 'Rugrats', what is the name of the doll that Angelica Pickles treats as her only confidant and best friend?", a: "Cynthia" },
            { q: "In 'Invader Zim', what is the name of Zim's malfunctioning robot servant/sidekick?", a: "GIR" }
          ],
          500: [
            { q: "In 'SpongeBob SquarePants', what is the full name of Plankton's supercomputer wife?", a: "Karen Plankton" },
            { q: "In 'SpongeBob SquarePants', what is the full name of the Krusty Krab's owner, Mr. Krabs?", a: "Eugene H. Krabs" },
            { q: "In 'SpongeBob SquarePants', what is the name of the boating school SpongeBob repeatedly fails to graduate from?", a: "Mrs. Puff's Boating School" }
          ]
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
          100: [
            { q: "Which country is also a continent?", a: "Australia" },
            { q: "What is the largest country in the world by land area?", a: "Russia" },
            { q: "Which country has the largest population in the world, as of the mid-2020s?", a: "India" }
          ],
          200: [
            { q: "Which African country was formerly known as Abyssinia and is famous for never being colonized?", a: "Ethiopia" },
            { q: "Which country is known as the 'Land of the Rising Sun'?", a: "Japan" },
            { q: "Which South American country is home to the largest share of the Amazon Rainforest?", a: "Brazil" }
          ],
          300: [
            { q: "Which is the only country that borders both France and Spain?", a: "Andorra" },
            { q: "Which transcontinental country has its largest city, Istanbul, split between Europe and Asia by the Bosphorus Strait?", a: "Turkey" },
            { q: "Which country completely surrounds San Marino, one of the smallest nations in the world?", a: "Italy" }
          ],
          400: [
            { q: "Which is the only country in the world with a non-rectangular national flag?", a: "Nepal" },
            { q: "Which country's English name contains all five vowels (a, e, i, o, u) exactly once?", a: "Mozambique" },
            { q: "Which landlocked country is completely surrounded by South Africa?", a: "Lesotho" }
          ],
          500: [
            { q: "Which African country has three capital cities: Pretoria, Cape Town, and Bloemfontein?", a: "South Africa" },
            { q: "Which country has the world's shortest coastline of any coastal nation, at just over 4 kilometers?", a: "Monaco" },
            { q: "Which country is widely cited as the only nation named after a real historical woman, its patron saint?", a: "Saint Lucia" }
          ]
        }
      },
      {
        name: "Capitals",
        questions: {
          100: [
            { q: "What is the capital of Japan?", a: "Tokyo" },
            { q: "What is the capital of France?", a: "Paris" },
            { q: "What is the capital of the United States?", a: "Washington, D.C." }
          ],
          200: [
            { q: "What is the capital of Canada?", a: "Ottawa" },
            { q: "What is the capital of Australia?", a: "Canberra" },
            { q: "What is the capital of Egypt?", a: "Cairo" }
          ],
          300: [
            { q: "What is the capital of Kazakhstan?", a: "Astana" },
            { q: "What is the capital of Turkey (not its largest city, Istanbul)?", a: "Ankara" },
            { q: "What is the capital of South Korea?", a: "Seoul" }
          ],
          400: [
            { q: "What is the official capital of Sri Lanka (distinct from its largest city, Colombo)?", a: "Sri Jayawardenepura Kotte" },
            { q: "What is the seat of government of Bolivia, though Sucre is the country's official constitutional capital?", a: "La Paz" },
            { q: "What is the capital of Myanmar (Burma), a purpose-built city that replaced Yangon in 2006?", a: "Naypyidaw" }
          ],
          500: [
            { q: "Which tiny Pacific island nation has no official capital city, with Yaren District serving as its de facto seat of government?", a: "Nauru" },
            { q: "Ngerulmud, one of the world's least-populated national capitals, is the capital of which Pacific island nation?", a: "Palau" },
            { q: "What is the capital of Ivory Coast (Côte d'Ivoire), though Abidjan is the country's largest city and economic hub?", a: "Yamoussoukro" }
          ]
        }
      },
      {
        name: "Landmarks",
        questions: {
          100: [
            { q: "The Eiffel Tower is located in which city?", a: "Paris" },
            { q: "The Statue of Liberty stands in the harbor of which U.S. city?", a: "New York City" },
            { q: "The Great Wall is located in which country?", a: "China" }
          ],
          200: [
            { q: "Machu Picchu, the ancient Inca citadel, is located in which country?", a: "Peru" },
            { q: "The Colosseum, an ancient Roman amphitheater, is located in which city?", a: "Rome" },
            { q: "Stonehenge, the prehistoric stone circle, is located in which country?", a: "England (United Kingdom)" }
          ],
          300: [
            { q: "The Great Sphinx of Giza is most closely associated with which pharaoh?", a: "Khafre" },
            { q: "The Taj Mahal, built by Mughal emperor Shah Jahan, is located in which country?", a: "India" },
            { q: "Which mountain range contains Mount Everest, the world's tallest peak?", a: "The Himalayas" }
          ],
          400: [
            { q: "The ancient city of Petra, carved into rose-colored rock, is located in which country?", a: "Jordan" },
            { q: "The ancient Maya ruins of Chichén Itzá, home to the pyramid El Castillo, are located in which country?", a: "Mexico" },
            { q: "Which UNESCO-listed salt flat, the largest in the world, is located in Bolivia?", a: "Salar de Uyuni" }
          ],
          500: [
            { q: "Which UNESCO World Heritage Site in Cambodia is the largest religious monument in the world by land area?", a: "Angkor Wat" },
            { q: "The Moai statues, massive stone figures carved by the Rapa Nui people, are found on which remote island?", a: "Easter Island" },
            { q: "Which ancient Mesopotamian ziggurat, located in modern-day Iraq, was dedicated to the moon god Nanna?", a: "The Great Ziggurat of Ur" }
          ]
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
          100: [
            { q: "Which planet is known as the Red Planet?", a: "Mars" },
            { q: "What is the closest star to Earth?", a: "The Sun" },
            { q: "Which planet is the largest in our solar system?", a: "Jupiter" }
          ],
          200: [
            { q: "What is the name of the galaxy that contains our solar system?", a: "The Milky Way" },
            { q: "What is the name of the natural satellite that orbits Earth?", a: "The Moon" },
            { q: "Which space agency landed the first humans on the Moon in 1969?", a: "NASA" }
          ],
          300: [
            { q: "What is the term for the boundary around a black hole beyond which nothing can escape?", a: "The event horizon" },
            { q: "What is the term for a star's explosive death, resulting in a brief, extremely bright burst of light?", a: "A supernova" },
            { q: "What is the name of the force that keeps planets in orbit around the Sun?", a: "Gravity" }
          ],
          400: [
            { q: "What is the name of the visible surface layer of the Sun?", a: "The photosphere" },
            { q: "What is the term for a dying star that expands into a huge, cool, luminous star before shedding its outer layers?", a: "A red giant" },
            { q: "What is the name given to the leftover thermal radiation from the Big Bang, discovered accidentally in 1965?", a: "The Cosmic Microwave Background" }
          ],
          500: [
            { q: "What is the term for a collapsed star composed almost entirely of tightly packed neutrons?", a: "A neutron star" },
            { q: "What is the term for the theoretical point of infinite density at the center of a black hole?", a: "The singularity" },
            { q: "What is the name of the mass threshold, roughly 1.4 solar masses, above which a white dwarf star will collapse into a neutron star or trigger a supernova?", a: "The Chandrasekhar limit" }
          ]
        }
      },
      {
        name: "Human Body",
        questions: {
          100: [
            { q: "What is the largest organ in the human body?", a: "The skin" },
            { q: "How many bones are in the adult human body?", a: "206" },
            { q: "What is the main organ responsible for pumping blood throughout the human body?", a: "The heart" }
          ],
          200: [
            { q: "How many chambers does the human heart have?", a: "Four" },
            { q: "What is the largest internal organ in the human body?", a: "The liver" },
            { q: "How many pairs of ribs does the human body typically have?", a: "Twelve (12 pairs)" }
          ],
          300: [
            { q: "What is the name of the longest bone in the human body?", a: "The femur (thigh bone)" },
            { q: "What part of the brain is responsible for coordinating balance and muscle movement?", a: "The cerebellum" },
            { q: "What is the medical term for the human voice box, containing the vocal cords?", a: "The larynx" }
          ],
          400: [
            { q: "What is the name of the small brain gland often called the 'master gland' because it controls other hormone glands?", a: "The pituitary gland" },
            { q: "What is the name of the small, almond-shaped brain structure that plays a key role in processing fear and emotion?", a: "The amygdala" },
            { q: "What is the name of the fluid-filled sac that surrounds and cushions the heart?", a: "The pericardium" }
          ],
          500: [
            { q: "What is the only bone in the human body that is not connected to another bone?", a: "The hyoid bone" },
            { q: "What is the name of the tiny stirrup-shaped bone in the middle ear, the smallest bone in the human body?", a: "The stapes" },
            { q: "What is the medical term for the bundle of nerves at the base of the spine, resembling a horse's tail?", a: "The cauda equina" }
          ]
        }
      },
      {
        name: "Inventions",
        questions: {
          100: [
            { q: "Who is credited with inventing the telephone?", a: "Alexander Graham Bell" },
            { q: "Who is credited with inventing the first commercially practical light bulb?", a: "Thomas Edison" },
            { q: "Who is credited with inventing the airplane, alongside his brother, in 1903?", a: "The Wright brothers (Orville and Wilbur Wright)" }
          ],
          200: [
            { q: "In which decade did Tim Berners-Lee invent the World Wide Web?", a: "The 1980s (1989)" },
            { q: "Which Scottish inventor's improvements to the steam engine helped power the Industrial Revolution?", a: "James Watt" },
            { q: "Who is credited with developing the first successful vaccine, for smallpox, in 1796?", a: "Edward Jenner" }
          ],
          300: [
            { q: "Which company released the influential Macintosh graphical-interface computer in 1984?", a: "Apple" },
            { q: "Which two Stanford PhD students founded Google in 1998, based on their PageRank search algorithm?", a: "Larry Page and Sergey Brin" },
            { q: "Who is credited with inventing the first practical typewriter, patented in 1868?", a: "Christopher Latham Sholes" }
          ],
          400: [
            { q: "Who is credited with inventing the printing press with movable type in Europe, around 1440?", a: "Johannes Gutenberg" },
            { q: "Who is credited with inventing dynamite in 1867, later founding the Nobel Prize with his fortune?", a: "Alfred Nobel" },
            { q: "Which British engineer designed 'Stephenson's Rocket', pioneering railway locomotive transport in the 1820s?", a: "George Stephenson" }
          ],
          500: [
            { q: "Which Serbian-American inventor is best known for his contributions to the modern alternating current (AC) electricity system?", a: "Nikola Tesla" },
            { q: "Which German engineer is credited with building the first working automobile powered by an internal combustion engine, patented in 1886?", a: "Karl Benz" },
            { q: "Which American engineer, working at Motorola, is credited with inventing the handheld mobile phone and making the first cellular call in 1973?", a: "Martin Cooper" }
          ]
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
          100: [
            { q: "Which 1997 film about a doomed ocean liner was the first to gross over $1 billion worldwide?", a: "Titanic" },
            { q: "Which 2019 Marvel film became the highest-grossing film of all time (unadjusted for inflation), until 'Avatar' reclaimed the title?", a: "Avengers: Endgame" },
            { q: "Which 1975 Steven Spielberg film about a great white shark is often considered the first summer blockbuster?", a: "Jaws" }
          ],
          200: [
            { q: "In the Marvel Cinematic Universe, what is the name of Tony Stark's AI assistant?", a: "J.A.R.V.I.S." },
            { q: "Which actor plays Iron Man / Tony Stark in the Marvel Cinematic Universe?", a: "Robert Downey Jr." },
            { q: "Which 1993 Steven Spielberg film brought dinosaurs to life using groundbreaking CGI, based on a Michael Crichton novel?", a: "Jurassic Park" }
          ],
          300: [
            { q: "Which director is known for 'Jaws', 'E.T.', and 'Jurassic Park'?", a: "Steven Spielberg" },
            { q: "Which director is known for the 'Dark Knight' trilogy, 'Inception', and 'Oppenheimer'?", a: "Christopher Nolan" },
            { q: "Which 1977 George Lucas film launched the 'Star Wars' franchise?", a: "Star Wars (Episode IV: A New Hope)" }
          ],
          400: [
            { q: "Which 2009 James Cameron film became the highest-grossing film of all time, surpassing 'Titanic'?", a: "Avatar" },
            { q: "Which director wrote and directed both 'Titanic' and 'Avatar', two of the highest-grossing films of all time?", a: "James Cameron" },
            { q: "Which 2008 Christopher Nolan film, featuring Heath Ledger's Oscar-winning performance as the Joker, became a landmark for the superhero genre?", a: "The Dark Knight" }
          ],
          500: [
            { q: "Which 1941 film, directed by and starring Orson Welles, is frequently cited by critics as the greatest film ever made?", a: "Citizen Kane" },
            { q: "Which 1927 film became the first movie to win the Academy Award for Best Picture?", a: "Wings" },
            { q: "Which 1915 D. W. Griffith film, though a landmark in film technique, is widely condemned today for its racist depiction of the Ku Klux Klan?", a: "The Birth of a Nation" }
          ]
        }
      },
      {
        name: "Animated Films",
        questions: {
          100: [
            { q: "In 'Frozen', what is the name of Elsa and Anna's talking snowman?", a: "Olaf" },
            { q: "In Disney's 'Toy Story', what type of toy is Woody?", a: "A cowboy (pull-string doll)" },
            { q: "What is the name of the clownfish who searches for his son in the Pixar film 'Finding Nemo'?", a: "Marlin" }
          ],
          200: [
            { q: "Which Pixar film follows an old man who ties balloons to his house to fly to South America?", a: "Up" },
            { q: "Which Pixar film follows a rat named Remy who dreams of becoming a chef in Paris?", a: "Ratatouille" },
            { q: "In Disney's 'Aladdin', what is the name of the wish-granting genie originally voiced by Robin Williams?", a: "Genie" }
          ],
          300: [
            { q: "What is the name of the kingdom ruled by Simba's family in Disney's 'The Lion King'?", a: "The Pride Lands" },
            { q: "What is the name of Simba's wise mandrill friend who serves as an advisor in 'The Lion King'?", a: "Rafiki" },
            { q: "In Pixar's 'Inside Out', what is the name of the primary emotion voiced by Amy Poehler who leads Riley's mind?", a: "Joy" }
          ],
          400: [
            { q: "Which 1995 film was the first feature-length movie created entirely with computer-generated imagery (CGI)?", a: "Toy Story" },
            { q: "Which 1937 Disney film was the first full-length animated feature film in movie history?", a: "Snow White and the Seven Dwarfs" },
            { q: "Which animation studio, co-founded by John Lasseter and Ed Catmull, produced 'Toy Story' in partnership with Disney?", a: "Pixar" }
          ],
          500: [
            { q: "Which Japanese animated film, directed by Hayao Miyazaki, won the Academy Award for Best Animated Feature in 2003?", a: "Spirited Away" },
            { q: "Which 1940 Disney film, a collection of animated segments set to classical music, was a box-office failure on release but is now considered a landmark of animation?", a: "Fantasia" },
            { q: "Which stop-motion animated film, directed by Henry Selick and produced by Tim Burton, is set in both Halloween Town and Christmas Town?", a: "The Nightmare Before Christmas" }
          ]
        }
      },
      {
        name: "TV Classics",
        questions: {
          100: [
            { q: "'Friends' is set primarily in which U.S. city?", a: "New York City" },
            { q: "In 'The Simpsons', what is the name of the fictional town where the Simpson family lives?", a: "Springfield" },
            { q: "Which long-running animated sitcom follows the Griffin family in the town of Quahog, Rhode Island?", a: "Family Guy" }
          ],
          200: [
            { q: "In 'Breaking Bad', what is the name of Walter White's criminal alter ego?", a: "Heisenberg" },
            { q: "In 'The Office' (US), what type of company does Dunder Mifflin sell?", a: "Paper" },
            { q: "Which medical drama, set at Seattle Grace Hospital, follows surgeon Meredith Grey?", a: "Grey's Anatomy" }
          ],
          300: [
            { q: "Which HBO fantasy series was based on George R. R. Martin's 'A Song of Ice and Fire' novels?", a: "Game of Thrones" },
            { q: "Which sitcom, set around a group of friends including Sheldon, Leonard, and Penny, focuses on the lives of scientists in Pasadena?", a: "The Big Bang Theory" },
            { q: "Which crime drama anthology series, created by David Simon, is set in Baltimore and often cited as one of the greatest TV shows ever made?", a: "The Wire" }
          ],
          400: [
            { q: "Which sitcom, premiering in 1989, was famously described by its creators as 'a show about nothing'?", a: "Seinfeld" },
            { q: "Which 1970s sitcom, a spin-off of 'All in the Family', was one of the first American shows to feature a Black family in a starring role?", a: "The Jeffersons" },
            { q: "Which anthology horror/sci-fi series, created by Rod Serling, debuted in 1959 and became famous for its twist endings?", a: "The Twilight Zone" }
          ],
          500: [
            { q: "Which 1960s TV series featured one of American television's first scripted interracial kisses, between Captain Kirk and Lieutenant Uhura?", a: "Star Trek (The Original Series)" },
            { q: "Which 1969-1974 British sketch comedy series, featuring John Cleese and Eric Idle, revolutionized sketch comedy with its surreal humor?", a: "Monty Python's Flying Circus" },
            { q: "Which 1951 sitcom, starring Lucille Ball, pioneered filming before a live studio audience using a three-camera setup, a technique still standard today?", a: "I Love Lucy" }
          ]
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
          100: [
            { q: "Which 2002 film starring Tobey Maguire was the first major blockbuster movie based on Spider-Man?", a: "Spider-Man (2002)" },
            { q: "Which actor played Professor X in the 2000 film 'X-Men'?", a: "Patrick Stewart" },
            { q: "Which actress played Storm in the original 'X-Men' film trilogy (2000-2006)?", a: "Halle Berry" }
          ],
          200: [
            { q: "Which actor played Wolverine in the X-Men film franchise for 17 years, from 2000 to 2017?", a: "Hugh Jackman" },
            { q: "Which actress played Jean Grey in the original 'X-Men' film trilogy?", a: "Famke Janssen" },
            { q: "Which actor starred as the vampire hunter in the 'Blade' film trilogy (1998-2004)?", a: "Wesley Snipes" }
          ],
          300: [
            { q: "Which 2002 Spider-Man villain, played by Willem Dafoe, is the alter ego of Norman Osborn?", a: "The Green Goblin" },
            { q: "Which actor played Doctor Octopus in 'Spider-Man 2' (2004)?", a: "Alfred Molina" },
            { q: "Which director, known for horror films like 'Evil Dead', helmed the original 2002-2007 'Spider-Man' trilogy starring Tobey Maguire?", a: "Sam Raimi" }
          ],
          400: [
            { q: "In the 2000 film 'X-Men', which actress played the shape-shifting mutant Mystique?", a: "Rebecca Romijn" },
            { q: "Which actor played the supervillain Magneto in the original 'X-Men' film trilogy?", a: "Ian McKellen" },
            { q: "Which actor portrayed Bruce Banner in Ang Lee's 2003 film 'Hulk'?", a: "Eric Bana" }
          ],
          500: [
            { q: "Which 1998 film, starring Wesley Snipes as a vampire hunter, is considered one of the first Marvel Comics film adaptations to succeed commercially?", a: "Blade" },
            { q: "Which actor played Captain America in two 1979 made-for-television movies, an early live-action adaptation of the Marvel hero?", a: "Reb Brown" },
            { q: "Which 1990 Marvel film adaptation, directed by Albert Pyun, had its intended U.S. theatrical release cancelled and went straight to video instead?", a: "Captain America (1990 film)" }
          ]
        }
      },
      {
        name: "MCU",
        questions: {
          100: [
            { q: "What is the first film in the Marvel Cinematic Universe, released in 2008?", a: "Iron Man" },
            { q: "Which actor plays Captain America / Steve Rogers in the MCU?", a: "Chris Evans" },
            { q: "Which actor plays Thor in the Marvel Cinematic Universe?", a: "Chris Hemsworth" }
          ],
          200: [
            { q: "Which 2012 film brought together Iron Man, Captain America, Thor, Hulk, Black Widow, and Hawkeye for the first time?", a: "The Avengers" },
            { q: "Which 2018 MCU film introduced Black Panther as the lead character in his own solo film?", a: "Black Panther" },
            { q: "Which villain, played by Tom Hiddleston, is Thor's adoptive brother and the primary antagonist of 'The Avengers' (2012)?", a: "Loki" }
          ],
          300: [
            { q: "In 'Avengers: Infinity War' and 'Endgame', what are the powerful artifacts Thanos collects to wipe out half of all life called?", a: "The Infinity Stones" },
            { q: "Which actor plays Thanos in the Marvel Cinematic Universe?", a: "Josh Brolin" },
            { q: "What is the name of the plan in 'Avengers: Endgame' in which the surviving heroes travel back in time to retrieve the Infinity Stones?", a: "The Time Heist" }
          ],
          400: [
            { q: "Which actress plays Captain Marvel (Carol Danvers) in the MCU?", a: "Brie Larson" },
            { q: "Which 2021 MCU film, directed by Chloé Zhao, follows a group of ancient alien beings who have secretly protected Earth?", a: "Eternals" },
            { q: "Which actress plays Wanda Maximoff / the Scarlet Witch in the MCU?", a: "Elizabeth Olsen" }
          ],
          500: [
            { q: "What is the official name of the overarching MCU story arc spanning Phases 1 through 3, culminating in 'Avengers: Endgame'?", a: "The Infinity Saga" },
            { q: "What is the official title Marvel Studios gave to the MCU story arc that follows Phases 4 through 6, after the Infinity Saga?", a: "The Multiverse Saga" },
            { q: "Which musician, playing a cosmic character named Eros (Starfox), appeared in the mid-credits scene of 'Eternals' (2021)?", a: "Harry Styles" }
          ]
        }
      },
      {
        name: "Marvel Characters",
        questions: {
          100: [
            { q: "What is the real name of Iron Man?", a: "Tony Stark" },
            { q: "What is the real name of Spider-Man?", a: "Peter Parker" },
            { q: "What is the real name of Captain America?", a: "Steve Rogers" }
          ],
          200: [
            { q: "What is the name of Thor's magical hammer?", a: "Mjolnir" },
            { q: "What is the name of the shield Captain America carries into battle?", a: "The Vibranium Shield" },
            { q: "What color is the Hulk's skin when Bruce Banner transforms in anger?", a: "Green" }
          ],
          300: [
            { q: "What is the name of the villain Thanos's home planet?", a: "Titan" },
            { q: "What is the name of the fictional African nation ruled by the Black Panther?", a: "Wakanda" },
            { q: "What is the name of Doctor Strange's magical cloak that has a mind of its own?", a: "The Cloak of Levitation" }
          ],
          400: [
            { q: "What is the real name of Black Panther, king of Wakanda?", a: "T'Challa" },
            { q: "What is the real name of the mutant leader of the X-Men, Professor X?", a: "Charles Xavier" },
            { q: "What is the real name of the villain Magneto, leader of the Brotherhood of Mutants?", a: "Erik Lehnsherr" }
          ],
          500: [
            { q: "In Marvel Comics, what is the true given name of the mutant anti-hero known as Deadpool?", a: "Wade Wilson" },
            { q: "In Marvel Comics, what is the real name of the villain Doctor Doom, ruler of Latveria?", a: "Victor von Doom" },
            { q: "In Marvel Comics, what is the birth name of the Green Goblin's son, who also becomes a version of the Goblin?", a: "Harry Osborn" }
          ]
        }
      },
      {
        name: "Marvel Comics",
        questions: {
          100: [
            { q: "Which legendary comic book writer co-created Spider-Man, the X-Men, and the Avengers, and made cameo appearances in many Marvel films?", a: "Stan Lee" },
            { q: "Which comic book publisher is home to characters like Spider-Man, the X-Men, and the Avengers?", a: "Marvel Comics" },
            { q: "Which artist co-created the Fantastic Four, the Hulk, and the X-Men alongside Stan Lee, known for his dynamic panel layouts?", a: "Jack Kirby" }
          ],
          200: [
            { q: "In what year did Marvel Comics publish 'Amazing Fantasy #15', the first appearance of Spider-Man?", a: "1962" },
            { q: "In what year did Marvel Comics publish 'Fantastic Four #1', the first appearance of Marvel's first superhero team?", a: "1961" },
            { q: "Which 1963 comic introduced the Avengers as a team for the first time?", a: "The Avengers #1" }
          ],
          300: [
            { q: "Which artist and writer co-created Spider-Man alongside Stan Lee?", a: "Steve Ditko" },
            { q: "Which writer-artist, known for his gritty 1980s run on 'Daredevil', later co-created 'The Dark Knight Returns' for DC Comics?", a: "Frank Miller" },
            { q: "What is the name of the fictional Marvel Comics neighborhood that serves as Daredevil's home turf, based on a real Manhattan neighborhood?", a: "Hell's Kitchen" }
          ],
          400: [
            { q: "Which 1963 Marvel Comics title introduced the X-Men, a team of mutant superheroes led by Professor X?", a: "The X-Men #1 (Uncanny X-Men)" },
            { q: "In what year did Marvel Comics publish 'Iron Man #1' as a standalone ongoing series, following his 1963 debut in 'Tales of Suspense'?", a: "1968" },
            { q: "Which 1981 'Uncanny X-Men' storyline is famous for introducing a dystopian alternate future ruled by Sentinels?", a: "Days of Future Past" }
          ],
          500: [
            { q: "In what year was Marvel Comics founded, originally under the name 'Timely Comics'?", a: "1939" },
            { q: "What was the title of the first comic book published by Marvel's predecessor, Timely Comics, in 1939, featuring the debut of the Human Torch and Namor?", a: "Marvel Comics #1" },
            { q: "Who founded Timely Comics in 1939, the company that would later become Marvel Comics?", a: "Martin Goodman" }
          ]
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
          100: [
            { q: "Which anime follows a young ninja named Naruto Uzumaki who dreams of becoming Hokage?", a: "Naruto" },
            { q: "Which anime follows a boy named Tanjiro Kamado who becomes a demon slayer to save his sister?", a: "Demon Slayer (Kimetsu no Yaiba)" },
            { q: "Which anime and manga franchise features Pikachu and a trainer named Ash Ketchum?", a: "Pokémon" }
          ],
          200: [
            { q: "Which anime and manga series follows Monkey D. Luffy as he searches for the ultimate treasure known as the 'One Piece'?", a: "One Piece" },
            { q: "Which anime series follows Izuku Midoriya as he trains to become a hero despite being born without a superpower called a 'Quirk'?", a: "My Hero Academia" },
            { q: "Which classic anime follows Usagi Tsukino, a schoolgirl who transforms into a magical guardian to fight evil?", a: "Sailor Moon" }
          ],
          300: [
            { q: "Which anime features high school student Light Yagami, who obtains a supernatural notebook that can kill anyone whose name is written in it?", a: "Death Note" },
            { q: "Which anime, adapted from a manga by Hiromu Arakawa, follows brothers Edward and Alphonse Elric attempting alchemy to bring back their mother?", a: "Fullmetal Alchemist" },
            { q: "Which anime series, set in a virtual reality MMORPG that traps its players, stars a swordsman named Kirito trying to clear the game to escape?", a: "Sword Art Online" }
          ],
          400: [
            { q: "Which 2013 anime, based on a manga by Hajime Isayama, is set in a world where humanity lives inside walled cities to protect against giant humanoid creatures?", a: "Attack on Titan" },
            { q: "Which 1998 anime, created by Shinichirō Watanabe, follows a crew of bounty hunters traveling aboard a spaceship in a jazz-influenced sci-fi setting?", a: "Cowboy Bebop" },
            { q: "Which anime series, first airing in 1995 and created by Hideaki Anno, follows teenage pilots battling mysterious beings called Angels?", a: "Neon Genesis Evangelion" }
          ],
          500: [
            { q: "Which long-running anime franchise, created by Akira Toriyama, follows Goku through martial arts battles with escalating power levels?", a: "Dragon Ball" },
            { q: "Which manga artist created 'JoJo's Bizarre Adventure', a long-running series known for its dramatic poses and 'Stand' powers, first serialized in 1987?", a: "Hirohiko Araki" },
            { q: "Which anime series, created by Yoshihiro Togashi and adapted into a popular 2011 remake, follows young Gon Freecss as he searches for his father while taking the Hunter Exam?", a: "Hunter x Hunter" }
          ]
        }
      },
      {
        name: "Anime Characters",
        questions: {
          100: [
            { q: "What is the name of the main character in 'Naruto' who wants to become the leader of his village?", a: "Naruto Uzumaki" },
            { q: "What is the name of the schoolgirl protagonist of 'Sailor Moon' who transforms into a magical guardian?", a: "Usagi Tsukino (Sailor Moon)" },
            { q: "What is the name of the pirate captain protagonist of 'One Piece' who wants to become the Pirate King?", a: "Monkey D. Luffy" }
          ],
          200: [
            { q: "In 'My Hero Academia', what is the nickname of the protagonist Izuku Midoriya?", a: "Deku" },
            { q: "In 'Demon Slayer', what is the name of Tanjiro Kamado's younger sister who is turned into a demon?", a: "Nezuko Kamado" },
            { q: "In 'Dragon Ball Z', what is the name of Goku's eldest son, a half-Saiyan known for his own transformation into a Super Saiyan?", a: "Gohan" }
          ],
          300: [
            { q: "In 'Fullmetal Alchemist', what did the Elric brothers Edward and Alphonse each lose while trying to resurrect their mother?", a: "Edward lost an arm and a leg; Alphonse lost his entire body" },
            { q: "In 'One Piece', what is the name of the three-sword-style swordsman who serves as Luffy's first mate?", a: "Roronoa Zoro" },
            { q: "In 'Naruto', what is the name of Naruto's rival and teammate, an Uchiha clan survivor obsessed with avenging his family?", a: "Sasuke Uchiha" }
          ],
          400: [
            { q: "In 'Death Note', what is the name of the shinigami (death god) who drops his notebook into the human world?", a: "Ryuk" },
            { q: "In 'Attack on Titan', what is the name of the protagonist who vows to destroy every Titan after his mother is eaten?", a: "Eren Yeager" },
            { q: "In 'Hunter x Hunter', what is the name of Gon Freecss's best friend, a former assassin from the Zoldyck family?", a: "Killua Zoldyck" }
          ],
          500: [
            { q: "In 'Cowboy Bebop', what is the name of the bounty hunter protagonist who pilots the ship Bebop?", a: "Spike Spiegel" },
            { q: "In 'Neon Genesis Evangelion', what is the name of the mysterious, blue-haired pilot of Evangelion Unit-00?", a: "Rei Ayanami" },
            { q: "In 'JoJo's Bizarre Adventure', what is the real name of the vampiric antagonist who seeks the power of the Stone Mask in Part 1?", a: "Dio Brando" }
          ]
        }
      },
      {
        name: "Anime Movies",
        questions: {
          100: [
            { q: "Which Studio Ghibli film follows a girl named Chihiro who becomes trapped in a magical spirit world?", a: "Spirited Away" },
            { q: "Which 2004 Studio Ghibli film follows a girl named Sophie who is cursed to live in an old woman's body, and features a magical walking castle?", a: "Howl's Moving Castle" },
            { q: "Which Studio Ghibli film follows a young witch named Kiki who starts a delivery service using her flying broom?", a: "Kiki's Delivery Service" }
          ],
          200: [
            { q: "Which Studio Ghibli film features a giant, friendly forest creature named Totoro?", a: "My Neighbor Totoro" },
            { q: "Which Studio Ghibli film follows a red-haired goldfish princess who wants to become human after befriending a young boy named Sosuke?", a: "Ponyo" },
            { q: "Which 2019 Makoto Shinkai anime film follows a boy who moves to Tokyo and discovers a girl who can control the weather?", a: "Weathering with You" }
          ],
          300: [
            { q: "Which 2016 anime film by Makoto Shinkai follows two teenagers who mysteriously swap bodies?", a: "Your Name (Kimi no Na wa)" },
            { q: "Which 1997 Studio Ghibli film follows San, a girl raised by wolves, amid a conflict between forest gods and industrial humans?", a: "Princess Mononoke" },
            { q: "Which 1988 Studio Ghibli war drama, directed by Isao Takahata, follows two siblings trying to survive during the firebombing of Japan in World War II?", a: "Grave of the Fireflies" }
          ],
          400: [
            { q: "Which Studio Ghibli co-founder directed 'Spirited Away', 'Princess Mononoke', and 'My Neighbor Totoro'?", a: "Hayao Miyazaki" },
            { q: "Which longtime composer, known for scoring nearly every Hayao Miyazaki film including 'Spirited Away' and 'Princess Mononoke', is Studio Ghibli's signature musical collaborator?", a: "Joe Hisaishi" },
            { q: "Which 2013 Hayao Miyazaki film is a fictionalized biography of Jiro Horikoshi, designer of the Mitsubishi Zero fighter plane?", a: "The Wind Rises" }
          ],
          500: [
            { q: "Which 1988 anime film, directed by Katsuhiro Otomo and based on his own manga, is a landmark of cyberpunk animation set in 'Neo-Tokyo'?", a: "Akira" },
            { q: "Which 1995 Mamoru Oshii film, a landmark of cyberpunk cinema following cyborg cop Motoko Kusanagi, heavily influenced 'The Matrix'?", a: "Ghost in the Shell" },
            { q: "Which 1997 Satoshi Kon film, his directorial debut, is a psychological thriller about a pop idol stalked after leaving her music career?", a: "Perfect Blue" }
          ]
        }
      },
      {
        name: "Anime Quotes",
        questions: {
          100: [
            { q: "Which catchphrase does Naruto Uzumaki often shout, roughly meaning 'believe it'?", a: "'Dattebayo!'" },
            { q: "What does Luffy repeatedly declare he will become, in his famous catchphrase from 'One Piece'?", a: "'The Pirate King' (King of the Pirates)" },
            { q: "What is the classic catchphrase Pikachu is known for saying, effectively its own name repeated, in the 'Pokémon' anime?", a: "'Pika Pika!'" }
          ],
          200: [
            { q: "In 'My Hero Academia', All Might reassures others with the catchphrase: 'Because I am ___.'", a: "'Because I am here!'" },
            { q: "What does Goku shout as the name of his signature energy-beam attack in the 'Dragon Ball' franchise?", a: "'Kamehameha!'" },
            { q: "In 'One Piece', what does Luffy shout as he stretches his arm back before punching, a signature attack name meaning 'Rubber Gun'?", a: "'Gomu Gomu no Pistol'" }
          ],
          300: [
            { q: "In 'Attack on Titan', what rallying cry do Survey Corps soldiers shout, meaning 'dedicate your heart'?", a: "'Shinzo wo sasageyo!'" },
            { q: "In 'My Hero Academia', what motto, meaning 'go beyond your limit', does All Might live by and pass on to Izuku Midoriya?", a: "'Plus Ultra'" },
            { q: "In 'Naruto', which teacher of Team 7 is famous for the line 'those who break the rules are scum, but those who abandon their comrades are worse than scum'?", a: "Kakashi Hatake" }
          ],
          400: [
            { q: "In 'Fullmetal Alchemist', what is the fundamental law the Elric brothers violate, often summarized as 'you cannot gain something without sacrificing something of equal value'?", a: "Equivalent Exchange" },
            { q: "In 'Attack on Titan', what famous anime-original line does Mikasa tell Eren, describing the world as both harsh and beautiful?", a: "'The world is cruel, but also very beautiful.'" },
            { q: "In 'Cowboy Bebop', what phrase does Spike Spiegel repeatedly use to describe his laid-back philosophy toward fate and the past?", a: "'Whatever happens, happens'" }
          ],
          500: [
            { q: "In 'Death Note', what does Light Yagami famously declare about his role in the world, reflecting his god complex?", a: "'I am the god of the new world.'" },
            { q: "In 'Neon Genesis Evangelion', what mantra does Shinji Ikari repeat to himself throughout the series to fight off his fear and self-doubt?", a: "'I mustn't run away'" },
            { q: "What line, spoken by multiple characters throughout 'Cowboy Bebop' including its finale, refers to the weight of one's past choices?", a: "'You're gonna carry that weight.'" }
          ]
        }
      },
      {
        name: "Anime Trivia",
        questions: {
          100: [
            { q: "What Japanese word is used worldwide to describe hand-drawn or computer-animated shows and films originating from Japan?", a: "Anime" },
            { q: "What is the Japanese honorific suffix '-san' commonly used for, when addressing characters in anime?", a: "A general term of respect (like 'Mr./Ms.')" },
            { q: "What term describes fans dressing up as their favorite anime and video game characters, often at conventions?", a: "Cosplay" }
          ],
          200: [
            { q: "What is the source medium that most anime series are originally adapted from?", a: "Manga (Japanese comics)" },
            { q: "What term describes a genre of Japanese fiction and anime aimed primarily at teenage boys, exemplified by titles like 'Naruto' and 'One Piece'?", a: "Shōnen" },
            { q: "What Japanese term describes fan-made, self-published works, including unofficial manga and anime-inspired comics?", a: "Dōjinshi" }
          ],
          300: [
            { q: "Which Japanese studio, founded in 1985 by Hayao Miyazaki and Isao Takahata, is famous for films like 'Spirited Away' and 'Princess Mononoke'?", a: "Studio Ghibli" },
            { q: "Which Japanese animation studio, founded in 1948 and one of the oldest and largest in the country, has produced 'Dragon Ball', 'Sailor Moon', and 'One Piece'?", a: "Toei Animation" },
            { q: "Which anime studio, founded in 2012 by former Production I.G. staff, produced the first three seasons of 'Attack on Titan' before the series moved to another studio?", a: "WIT Studio" }
          ],
          400: [
            { q: "Which anime and manga series holds the Guinness World Record for most copies published for a comic series by a single author, with over 500 million copies?", a: "One Piece" },
            { q: "Which studio animated the final season of 'Attack on Titan', taking over from WIT Studio starting in 2020?", a: "MAPPA" },
            { q: "What is the title of the longest-running anime television series in history, based on a manga by Machiko Hasegawa and airing continuously since 1969?", a: "Sazae-san" }
          ],
          500: [
            { q: "In what year did 'Astro Boy' (Tetsuwan Atom), created by Osamu Tezuka and considered one of the first popular TV anime, premiere in Japan?", a: "1963" },
            { q: "What is the title of the oldest surviving Japanese animated film, a 1917 short rediscovered in 2007?", a: "Namakura Gatana (The Dull Sword)" },
            { q: "Which pioneering Japanese manga artist, nicknamed the 'Godfather of Manga', created 'Astro Boy' and pioneered the limited-animation techniques that shaped the anime industry's visual style?", a: "Osamu Tezuka" }
          ]
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
          100: [
            { q: "What does 'CPU' stand for, the primary component that executes instructions in a computer?", a: "Central Processing Unit" },
            { q: "What does 'RAM' stand for, the type of computer memory used for temporarily storing data the CPU is actively using?", a: "Random Access Memory" },
            { q: "What is the common term for a mistake in a computer program's code that causes it to behave incorrectly?", a: "A bug" }
          ],
          200: [
            { q: "What is the term for a step-by-step set of instructions used to solve a problem or perform a computation?", a: "An algorithm" },
            { q: "What is the general term for a named, reusable block of code that performs a specific task and can be called from elsewhere in a program?", a: "A function (or method)" },
            { q: "What term describes the process of finding and fixing errors in computer code?", a: "Debugging" }
          ],
          300: [
            { q: "In programming, what is the term for a repeated execution of a block of code, such as a 'for' or 'while' structure?", a: "A loop" },
            { q: "What term describes a programming structure that executes different blocks of code depending on whether a condition is true or false, such as an 'if-else' statement?", a: "A conditional statement" },
            { q: "What is the term for a function that calls itself in order to solve a problem by breaking it into smaller subproblems?", a: "Recursion" }
          ],
          400: [
            { q: "What data structure uses a Last-In-First-Out (LIFO) principle, commonly used for undo functions and call stacks?", a: "A stack" },
            { q: "What data structure uses a First-In-First-Out (FIFO) principle, commonly used in task scheduling and print job management?", a: "A queue" },
            { q: "What is the term for a hierarchical data structure made up of nodes, each with a set of children, commonly used in structures like a binary search tree?", a: "A tree" }
          ],
          500: [
            { q: "What is the term for measuring an algorithm's efficiency, expressed with notation such as O(n log n) or O(n²)?", a: "Big O notation" },
            { q: "What term describes a programming paradigm centered on objects that bundle data and behavior together, using concepts like classes, inheritance, and polymorphism?", a: "Object-oriented programming (OOP)" },
            { q: "What is the term for the classic optimization problem where the goal is to find the shortest possible route that visits a set of cities exactly once and returns to the origin?", a: "The Traveling Salesman Problem" }
          ]
        }
      },
      {
        name: "Information Technology",
        questions: {
          100: [
            { q: "What does 'IT' stand for in the context of computing and business?", a: "Information Technology" },
            { q: "What does 'PC' commonly stand for, referring to a computer designed for individual use?", a: "Personal Computer" },
            { q: "What is the common term for the physical components of a computer, such as the monitor, keyboard, and hard drive?", a: "Hardware" }
          ],
          200: [
            { q: "What term describes a network that connects computers within a limited area, such as a single building or campus?", a: "LAN (Local Area Network)" },
            { q: "What term describes a network that connects computers across a large geographic area, such as across cities or countries, exemplified by the internet itself?", a: "WAN (Wide Area Network)" },
            { q: "What is the common term for a secure network connection that lets remote users access a network as if directly connected, often used for remote work?", a: "A VPN (Virtual Private Network)" }
          ],
          300: [
            { q: "What does 'IP' stand for in 'IP address'?", a: "Internet Protocol" },
            { q: "What does 'HTTP' stand for, the protocol used for transmitting web pages over the internet?", a: "HyperText Transfer Protocol" },
            { q: "What is the term, abbreviated 'DHCP', for the protocol that automatically assigns IP addresses to devices on a network?", a: "Dynamic Host Configuration Protocol" }
          ],
          400: [
            { q: "What is the term for software or hardware that monitors and filters network traffic based on security rules?", a: "A firewall" },
            { q: "What term describes an attack where a system is flooded with excessive traffic to make it unavailable to legitimate users, abbreviated 'DDoS'?", a: "Distributed Denial-of-Service attack" },
            { q: "What term describes the practice of converting readable data into a coded format to prevent unauthorized access?", a: "Encryption" }
          ],
          500: [
            { q: "What networking system, abbreviated 'DNS', translates domain names like 'google.com' into IP addresses?", a: "Domain Name System" },
            { q: "What term describes a network architecture model with seven layers, from Physical to Application, used to standardize how systems communicate?", a: "The OSI Model (Open Systems Interconnection model)" },
            { q: "What is the term for the maximum amount of data that can be transmitted over a network connection in a given time, usually measured in bits per second?", a: "Bandwidth" }
          ]
        }
      },
      {
        name: "Engineering",
        questions: {
          100: [
            { q: "What is the general term for a professional who designs, builds, or maintains structures, machines, or systems?", a: "An engineer" },
            { q: "What is the general term for a detailed drawing or diagram used by engineers to plan and communicate a design?", a: "A blueprint (technical drawing)" },
            { q: "What is the general term for testing a small-scale, working version of a design before full production?", a: "A prototype" }
          ],
          200: [
            { q: "What branch of engineering focuses primarily on the design and construction of buildings, bridges, and roads?", a: "Civil engineering" },
            { q: "What branch of engineering focuses on the design of engines, machines, and mechanical systems?", a: "Mechanical engineering" },
            { q: "What branch of engineering applies principles of biology and medicine to design tools like prosthetics and medical devices?", a: "Biomedical engineering" }
          ],
          300: [
            { q: "What branch of engineering deals with the design and study of electrical systems, circuits, and electronics?", a: "Electrical engineering" },
            { q: "What branch of engineering focuses on designing and building aircraft and spacecraft?", a: "Aerospace engineering" },
            { q: "What branch of engineering applies chemistry, physics, and biology principles to design large-scale industrial processes?", a: "Chemical engineering" }
          ],
          400: [
            { q: "What unit of power is named after Scottish engineer James Watt?", a: "The watt" },
            { q: "What SI unit of force is named after English scientist Sir Isaac Newton?", a: "The newton" },
            { q: "What engineering term describes the internal force per unit area experienced by a material when subjected to an external load, typically measured in pascals?", a: "Stress" }
          ],
          500: [
            { q: "What is the term for the point at which a material permanently deforms under stress and will not return to its original shape?", a: "The yield point (yield strength)" },
            { q: "What term describes the maximum stress a material can withstand while being stretched or pulled before breaking?", a: "Tensile strength (ultimate tensile strength)" },
            { q: "What is the term for the branch of engineering mechanics dealing with how materials deform and fail under stress, foundational to designing safe structures?", a: "Mechanics of materials (strength of materials)" }
          ]
        }
      },
      {
        name: "Business",
        questions: {
          100: [
            { q: "What is the basic economic term for the money a company earns from selling goods or services, before expenses are subtracted?", a: "Revenue" },
            { q: "What is the basic accounting term for the total money a company owes to others, such as loans or unpaid bills?", a: "Liabilities (debt)" },
            { q: "What is the general term for a person who starts and runs a new business, taking on financial risk in hopes of profit?", a: "An entrepreneur" }
          ],
          200: [
            { q: "What four-letter abbreviation refers to a company's Chief Executive Officer, its top-ranking executive?", a: "CEO" },
            { q: "What four-letter abbreviation refers to a company's Chief Financial Officer, responsible for managing its finances?", a: "CFO" },
            { q: "What term describes the total value of a company's shares of stock, calculated by multiplying share price by number of outstanding shares?", a: "Market capitalization" }
          ],
          300: [
            { q: "What business analysis tool examines a company's Strengths, Weaknesses, Opportunities, and Threats?", a: "SWOT analysis" },
            { q: "What marketing concept refers to the combination of Product, Price, Place, and Promotion used to market a good or service?", a: "The Marketing Mix (the Four P's)" },
            { q: "What business term describes a detailed document outlining a company's goals, strategies, and financial projections, often used to attract investors?", a: "A business plan" }
          ],
          400: [
            { q: "What accounting term refers to the difference between a company's total revenue and total expenses?", a: "Net profit (net income)" },
            { q: "What financial statement summarizes a company's assets, liabilities, and shareholders' equity at a specific point in time?", a: "The balance sheet" },
            { q: "What term describes the minimum amount of sales a company must achieve to cover all its costs, resulting in neither profit nor loss?", a: "The break-even point" }
          ],
          500: [
            { q: "What economic principle states that as more units of a good are produced, the additional benefit gained from each extra unit tends to decrease?", a: "The law of diminishing marginal utility (diminishing returns)" },
            { q: "What economic term describes a market structure where a single company is the sole provider of a good or service, giving it significant pricing power?", a: "A monopoly" },
            { q: "What business strategy framework, popularized by Harvard's Michael Porter, describes the five competitive forces that shape industry competition?", a: "Porter's Five Forces" }
          ]
        }
      },
      {
        name: "Education",
        questions: {
          100: [
            { q: "What is the general term for the study of teaching methods and practices?", a: "Pedagogy" },
            { q: "What is the general term for a document outlining the topics, goals, and schedule of a specific course?", a: "A syllabus" },
            { q: "What is the general term for the official document verifying that a student has completed a specific level of education, such as high school?", a: "A diploma" }
          ],
          200: [
            { q: "In the Philippines' K-12 education system, how many years of Senior High School were added on top of the original 10-year basic education cycle?", a: "2 years (Grades 11 and 12)" },
            { q: "In the Philippine K-12 system, how many years of Kindergarten and elementary education precede Junior High School?", a: "7 years (Kindergarten plus Grades 1–6)" },
            { q: "What Philippine law, enacted in 2013, formally established the K-12 basic education program?", a: "The Enhanced Basic Education Act of 2013 (Republic Act No. 10533)" }
          ],
          300: [
            { q: "What term describes an assessment given at the end of an instructional period to measure what students have learned, such as a final exam?", a: "Summative assessment" },
            { q: "What term describes ongoing assessments given during instruction to monitor student learning and provide feedback, such as quizzes or class discussions?", a: "Formative assessment" },
            { q: "What term describes education tailored to accommodate students' individual learning needs, abilities, and styles within the same classroom?", a: "Differentiated instruction" }
          ],
          400: [
            { q: "Which educational psychologist is best known for his theory of cognitive development in children, involving stages like sensorimotor and concrete operational?", a: "Jean Piaget" },
            { q: "Which Russian psychologist developed the theory of the 'Zone of Proximal Development', emphasizing the role of social interaction in learning?", a: "Lev Vygotsky" },
            { q: "Which American psychologist is known for his hierarchy of needs, a theory often applied to student motivation in educational settings?", a: "Abraham Maslow" }
          ],
          500: [
            { q: "What term, from educational theorist Benjamin Bloom, refers to a hierarchical framework classifying learning objectives from 'remembering' to 'creating'?", a: "Bloom's Taxonomy" },
            { q: "Which American psychologist developed the theory of Multiple Intelligences, proposing that people have distinct types of intelligence such as linguistic and spatial?", a: "Howard Gardner" },
            { q: "What term, coined by Brazilian educator Paulo Freire in his influential 1968 work, refers to an educational approach that empowers students to critically examine oppressive social conditions?", a: "Critical pedagogy (from 'Pedagogy of the Oppressed')" }
          ]
        }
      },
      {
        name: "Nursing",
        questions: {
          100: [
            { q: "What instrument do nurses commonly use to listen to a patient's heartbeat and lungs?", a: "A stethoscope" },
            { q: "What is the common term for the medical professional who provides direct patient care, administers medications, and assists doctors in hospitals?", a: "A nurse" },
            { q: "What device do nurses commonly use to measure a patient's blood pressure?", a: "A sphygmomanometer (blood pressure cuff)" }
          ],
          200: [
            { q: "What term refers to a person's body temperature, pulse rate, respiratory rate, and blood pressure, routinely measured by nurses?", a: "Vital signs" },
            { q: "What is the standard unit used to measure a patient's body temperature in most countries, including the Philippines?", a: "Degrees Celsius" },
            { q: "What term describes the process of recording a patient's medical history, symptoms, and treatments in their file?", a: "Charting (documentation)" }
          ],
          300: [
            { q: "What is the abbreviation for the life-saving technique used when someone's heart stops, involving chest compressions and rescue breaths?", a: "CPR (Cardiopulmonary Resuscitation)" },
            { q: "What is the abbreviation for the routine daily tasks nurses help patients with, such as bathing, dressing, and eating?", a: "ADLs (Activities of Daily Living)" },
            { q: "What is the medical abbreviation for 'Intravenous', referring to medication or fluids administered directly into a vein?", a: "IV" }
          ],
          400: [
            { q: "What blood type is known as the 'universal donor' because it can be given to patients of any blood type in an emergency?", a: "O negative (O-)" },
            { q: "What blood type is known as the 'universal recipient' because a person with this type can receive blood from any donor type?", a: "AB positive (AB+)" },
            { q: "What term describes the standard set of precautions nurses use with all patients to prevent the spread of infection, including handwashing and wearing gloves?", a: "Standard precautions (universal precautions)" }
          ],
          500: [
            { q: "Which nursing theorist, known as the founder of modern nursing, is famous for her work during the Crimean War and for founding the first secular nursing school in 1860?", a: "Florence Nightingale" },
            { q: "Which nursing theorist developed the 'Theory of Human Caring', emphasizing the importance of compassionate, holistic caregiving in nursing practice?", a: "Jean Watson" },
            { q: "Who is known as the 'Mother of Philippine Nursing', having become the first Filipino superintendent of the Philippine General Hospital School of Nursing in the 1920s?", a: "Anastacia Giron-Tupas" }
          ]
        }
      },
      {
        name: "Architecture",
        questions: {
          100: [
            { q: "What is the term for a detailed drawing showing the layout of a building, viewed from above?", a: "A floor plan" },
            { q: "What is the general term for the front-facing side of a building, often the main design focus?", a: "The façade" },
            { q: "What is the general term for a professional who designs buildings and oversees their construction?", a: "An architect" }
          ],
          200: [
            { q: "What ancient Greek architectural order is characterized by simple, unadorned columns, the earliest and plainest of the three classical orders?", a: "The Doric order" },
            { q: "Which classical Greek architectural order is known for its scroll-like capitals, more ornate than the Doric order?", a: "The Ionic order" },
            { q: "Which classical Greek architectural order is the most ornate of the three, characterized by capitals decorated with acanthus leaves?", a: "The Corinthian order" }
          ],
          300: [
            { q: "Which architect designed New York's Guggenheim Museum and the earthquake-resistant house Fallingwater?", a: "Frank Lloyd Wright" },
            { q: "Which German-American architect, a pioneer of modernist glass-and-steel skyscrapers, led the Bauhaus school before emigrating to the United States?", a: "Ludwig Mies van der Rohe" },
            { q: "Which Swiss-French architect, a pioneer of modernist architecture, is known for the principle 'a house is a machine for living in' and designed Villa Savoye?", a: "Le Corbusier" }
          ],
          400: [
            { q: "What term describes a building's supporting framework of columns and beams that carries its structural load?", a: "The structural frame (skeleton)" },
            { q: "What architectural term describes a curved structure that spans an opening and supports weight above it, a hallmark of Roman architecture?", a: "An arch" },
            { q: "What term describes a building technique using a rigid frame of steel beams to support a skyscraper's weight, enabling glass curtain-wall exteriors?", a: "Steel-frame construction" }
          ],
          500: [
            { q: "Which Spanish architect, famous for the still-unfinished Sagrada Familia basilica in Barcelona, is renowned for his organic, nature-inspired Modernisme style?", a: "Antoni Gaudí" },
            { q: "Which Iraqi-British architect, known for her futuristic, curvilinear designs, became the first woman to win the Pritzker Architecture Prize individually, in 2004?", a: "Zaha Hadid" },
            { q: "Which Finnish-American architect designed the St. Louis Gateway Arch and the TWA Flight Center at JFK Airport?", a: "Eero Saarinen" }
          ]
        }
      },
      {
        name: "Communication",
        questions: {
          100: [
            { q: "What is the general term for the process of exchanging information or ideas between a sender and a receiver?", a: "Communication" },
            { q: "What term describes communication between two or more people through spoken words?", a: "Verbal communication" },
            { q: "What is the general term for the person who originates and sends a message in the communication process?", a: "The sender" }
          ],
          200: [
            { q: "What term describes communication that occurs without words, using gestures, facial expressions, and body language?", a: "Nonverbal communication" },
            { q: "What term describes communication conducted through written words, such as emails, letters, and text messages?", a: "Written communication" },
            { q: "What term describes the person who receives and interprets a message in the communication process?", a: "The receiver" }
          ],
          300: [
            { q: "In the basic communication model, what term refers to anything that interferes with or distorts the message between sender and receiver?", a: "Noise" },
            { q: "What term describes the response a receiver gives back to a sender, indicating how a message was understood, completing the communication loop?", a: "Feedback" },
            { q: "What term describes communication that flows between people at the same organizational level, such as coworkers in the same department?", a: "Lateral (horizontal) communication" }
          ],
          400: [
            { q: "What term describes mass communication industries such as newspapers, television, radio, and the internet, collectively?", a: "Mass media" },
            { q: "What term describes the various online platforms, like Facebook, Instagram, and Twitter/X, used for social interaction and content sharing?", a: "Social media" },
            { q: "What term describes communication that occurs between just two people, such as a face-to-face conversation or phone call?", a: "Interpersonal communication" }
          ],
          500: [
            { q: "Which Canadian media theorist coined the phrase 'the medium is the message', arguing that how information is delivered shapes its impact as much as its content?", a: "Marshall McLuhan" },
            { q: "Which American communication researchers developed 'Agenda-Setting Theory', arguing media doesn't tell people what to think but what to think about?", a: "Maxwell McCombs and Donald Shaw" },
            { q: "Which German philosopher and sociologist developed the concept of the 'public sphere', describing the space where private citizens gather to discuss public matters?", a: "Jürgen Habermas" }
          ]
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
          100: [
            { q: "Who is known as the 'King of Pop', famous for hits like 'Thriller' and 'Billie Jean'?", a: "Michael Jackson" },
            { q: "Which pop singer, nicknamed the 'Princess of Pop', rose to fame with '...Baby One More Time' in 1998?", a: "Britney Spears" },
            { q: "Which British pop singer had a massive global hit in 2017 with 'Shape of You'?", a: "Ed Sheeran" }
          ],
          200: [
            { q: "Which pop superstar released the 2022 album 'Midnights' and is known for narrative albums like 'Folklore' and '1989'?", a: "Taylor Swift" },
            { q: "Which pop singer's 2019 album 'Fine Line' included the hit song 'Watermelon Sugar'?", a: "Harry Styles" },
            { q: "Which pop singer's 2015 album '25' includes the hit single 'Hello'?", a: "Adele" }
          ],
          300: [
            { q: "Which Barbadian singer, known for hits like 'Umbrella' and 'Diamonds', also founded the Fenty Beauty cosmetics line?", a: "Rihanna" },
            { q: "Which pop singer, known for hits like 'Bad Romance' and 'Poker Face', famously wore a dress made of meat to the 2010 MTV VMAs?", a: "Lady Gaga" },
            { q: "Which pop singer's 2021 album '30' became one of the best-selling albums worldwide of the 2020s?", a: "Adele" }
          ],
          400: [
            { q: "Which 1982 album by Michael Jackson became the best-selling album of all time worldwide?", a: "Thriller" },
            { q: "Which pop singer's 2011 album 'Born This Way' debuted at number one on the Billboard 200, selling over a million copies in its first week?", a: "Lady Gaga" },
            { q: "Which 1997 charity single by Elton John, rewritten as a tribute to Princess Diana, became the best-selling physical single of all time?", a: "'Candle in the Wind 1997'" }
          ],
          500: [
            { q: "Which pop artist holds the record for the most Grammy Awards won by any artist in history, with over 32 wins as of the mid-2020s?", a: "Beyoncé" },
            { q: "Which pop singer holds the record among solo artists for the most Billboard Hot 100 number-one singles, with 19 chart-toppers?", a: "Mariah Carey" },
            { q: "Which pop girl group's 1996 debut single 'Wannabe' topped the charts in 22 countries and helped popularize the phrase 'Girl Power'?", a: "The Spice Girls" }
          ]
        }
      },
      {
        name: "Rock",
        questions: {
          100: [
            { q: "Which British rock band, formed in Liverpool in 1960, included John Lennon, Paul McCartney, George Harrison, and Ringo Starr?", a: "The Beatles" },
            { q: "Which American rock band, fronted by Mick Jagger and Keith Richards, is famous for hits like '(I Can't Get No) Satisfaction' and 'Paint It Black'?", a: "The Rolling Stones" },
            { q: "Which Irish rock band, fronted by Bono, is known for hits like 'With or Without You' and the album 'The Joshua Tree'?", a: "U2" }
          ],
          200: [
            { q: "Which rock band, fronted by Freddie Mercury, performed 'Bohemian Rhapsody' and 'We Will Rock You'?", a: "Queen" },
            { q: "Which American rock band, fronted by Steven Tyler, is known for hits like 'Dream On' and 'I Don't Want to Miss a Thing'?", a: "Aerosmith" },
            { q: "Which British rock band, formed in 1968, is known for 'Stairway to Heaven' and 'Whole Lotta Love'?", a: "Led Zeppelin" }
          ],
          300: [
            { q: "Which American rock band, fronted by Axl Rose and featuring guitarist Slash, released the iconic 1987 album 'Appetite for Destruction'?", a: "Guns N' Roses" },
            { q: "Which British rock band, associated with Roger Waters and David Gilmour, released the concept album 'The Dark Side of the Moon' in 1973?", a: "Pink Floyd" },
            { q: "Which American rock band, fronted by Eddie Vedder, emerged from the Seattle grunge scene with its 1991 debut album 'Ten'?", a: "Pearl Jam" }
          ],
          400: [
            { q: "Which grunge band, fronted by Kurt Cobain, released the influential 1991 album 'Nevermind', featuring 'Smells Like Teen Spirit'?", a: "Nirvana" },
            { q: "Which American singer released the operatic rock album 'Bat Out of Hell' in 1977, one of the best-selling albums in music history?", a: "Meat Loaf" },
            { q: "Which American rock band, led by guitarist Eddie Van Halen, released its self-titled debut album in 1978, featuring 'Runnin' with the Devil'?", a: "Van Halen" }
          ],
          500: [
            { q: "Which 1969 music festival in upstate New York became a defining moment for rock and counterculture, featuring Jimi Hendrix and The Who?", a: "Woodstock" },
            { q: "Which 1969 rock festival held on the Isle of Wight, England, featured a rare comeback performance by Bob Dylan?", a: "The Isle of Wight Festival" },
            { q: "Which British rock band's 1973 album 'The Dark Side of the Moon' spent a total of 741 weeks on the Billboard 200 album chart?", a: "Pink Floyd" }
          ]
        }
      },
      {
        name: "OPM",
        questions: {
          100: [
            { q: "Which 1978 song by Freddie Aguilar, about a mother's sacrifices, became one of the most successful OPM songs of all time internationally?", a: "'Anak'" },
            { q: "Which Filipino singer, often called the 'Concert King', is known for hits like 'Be My Lady' and 'Kahit Maputi Na Ang Buhok Ko'?", a: "Martin Nievera" },
            { q: "Which iconic Filipino rock band, fronted by Ely Buendia, is known for songs like 'Pare Ko' and 'Overdrive'?", a: "Eraserheads" }
          ],
          200: [
            { q: "Which Filipino rock band, formed in the late 1980s, is often called 'The Beatles of the Philippines' and is known for hits like 'Ang Huling El Bimbo'?", a: "Eraserheads" },
            { q: "Which Filipino singer-actress, dubbed the 'Megastar', has been a dominant figure in Philippine music and film since the late 1970s?", a: "Sharon Cuneta" },
            { q: "Which Filipino rock band, fronted by Chito Miranda, is known for hits like 'Kaleidoscope World' and 'Buloy'?", a: "Parokya ni Edgar" }
          ],
          300: [
            { q: "Which Filipino singer is popularly known as 'Asia's Songbird', famous for hits like 'Kailangan Kita' and 'In Love With You'?", a: "Regine Velasquez" },
            { q: "Which Filipino singer and actress originated the role of Kim in the West End and Broadway productions of 'Miss Saigon' and later voiced Disney princesses Jasmine and Mulan?", a: "Lea Salonga" },
            { q: "Which Filipino rock band, known for the hit 'Halik', helped popularize the Pinoy rock sound of the 1990s alongside the Eraserheads?", a: "Rivermaya" }
          ],
          400: [
            { q: "Which 1995 Eraserheads song, considered one of the greatest OPM songs of all time, tells a story using the metaphor of a magician's assistant?", a: "'Ang Huling El Bimbo'" },
            { q: "Who composed the music for the Philippine patriotic song 'Bayan Ko', which became an anthem of protest during the Martial Law era?", a: "Constancio de Guzman" },
            { q: "Which Filipino composer and pianist, named National Artist for Music in 2018 and famous for songs like 'Da Coconut Nut', is a celebrated figure in contemporary Philippine music?", a: "Ryan Cayabyab" }
          ],
          500: [
            { q: "Which Filipino composer and National Artist for Music wrote the iconic kundiman (Filipino love ballad) 'Sa Ugoy ng Duyan'?", a: "Lucio San Pedro" },
            { q: "Which Filipino composer, a pioneer of the kundiman art song later named National Artist for Music, composed 'Mutya ng Pasig' and 'Nasaan Ka Irog'?", a: "Nicanor Abelardo" },
            { q: "Which pioneering Filipino rock song, written by Mike Hanopol and performed by the Juan de la Cruz Band in 1973, is widely regarded as one of the first true 'Pinoy rock' anthems?", a: "'Ang Himig Natin'" }
          ]
        }
      },
      {
        name: "K-Pop",
        questions: {
          100: [
            { q: "Which South Korean boy band debuted in 2013 and became a global phenomenon with hits like 'Dynamite' and 'Butter'?", a: "BTS" },
            { q: "Which K-pop girl group, formed by JYP Entertainment, is known for hits like 'Cheer Up' and 'What Type of X'?", a: "TWICE" },
            { q: "Which K-pop boy group, debuting in 2012 under SM Entertainment, is known for hits like 'Growl' and 'Love Shot'?", a: "EXO" }
          ],
          200: [
            { q: "Which K-pop girl group, formed by YG Entertainment and known for 'Kill This Love' and 'DDU-DU DDU-DU', consists of Jisoo, Jennie, Rosé, and Lisa?", a: "BLACKPINK" },
            { q: "Which K-pop boy group, debuting in 2014 under JYP Entertainment, is known for hits like 'Just Right' and 'Hard Carry'?", a: "GOT7" },
            { q: "Which K-pop girl group, debuting in 2014 under SM Entertainment, is known for hits like 'Red Flavor' and 'Psycho'?", a: "Red Velvet" }
          ],
          300: [
            { q: "What is the official fandom name for BTS, referring to their dedicated global fanbase?", a: "ARMY" },
            { q: "What is the official fandom name for BLACKPINK, referring to their dedicated global fanbase?", a: "BLINK" },
            { q: "What is the official fandom name for TWICE, referring to their dedicated fanbase?", a: "ONCE" }
          ],
          400: [
            { q: "Which South Korean entertainment company, founded by Lee Soo-man in 1995, is one of the 'Big Three' K-pop agencies and manages groups like EXO and NCT?", a: "SM Entertainment" },
            { q: "Which South Korean entertainment company, founded by Park Jin-young (J.Y. Park) in 1997, is one of the 'Big Three' K-pop agencies and manages groups like TWICE and Stray Kids?", a: "JYP Entertainment" },
            { q: "Which South Korean entertainment company, founded by Yang Hyun-suk in 1996, is one of the 'Big Three' K-pop agencies and manages BLACKPINK?", a: "YG Entertainment" }
          ],
          500: [
            { q: "Which K-pop group became the first to top the Billboard Hot 100 chart with an all-Korean-language song, 'Life Goes On', in 2020?", a: "BTS" },
            { q: "Which Korean artist's 2012 song 'Gangnam Style' became the first video ever to reach one billion views on YouTube?", a: "PSY" },
            { q: "Which K-pop girl group, debuting in 2007 under SM Entertainment, is considered a pioneering 'second generation' K-pop act, known for hits like 'Gee' and 'Genie'?", a: "Girls' Generation (SNSD)" }
          ]
        }
      },
      {
        name: "International Music",
        questions: {
          100: [
            { q: "Which Canadian singer is known as 'The Weeknd', famous for hits like 'Blinding Lights' and 'Starboy'?", a: "Abel Tesfaye (The Weeknd)" },
            { q: "Which British singer, known for hits like 'Rolling in the Deep' and 'Someone Like You', is one of the best-selling international recording artists of the 21st century?", a: "Adele" },
            { q: "Which Puerto Rican artist, known as 'Bad Bunny', became one of the most-streamed musicians in the world in the early 2020s?", a: "Bad Bunny (Benito Antonio Martínez Ocasio)" }
          ],
          200: [
            { q: "Which Colombian singer, known for hits like 'Hips Don't Lie' and 'Waka Waka', is one of the best-selling Latin music artists of all time?", a: "Shakira" },
            { q: "Which Puerto Rican singer, known as the 'King of Latin Pop', is famous for hits like 'Livin' la Vida Loca'?", a: "Ricky Martin" },
            { q: "Which French DJ and producer, known for hits like 'Titanium' and 'Wake Me Up', is one of the most successful electronic dance music artists worldwide?", a: "David Guetta" }
          ],
          300: [
            { q: "Which 2017 song by Luis Fonsi featuring Daddy Yankee became one of the most-viewed videos on YouTube for several years?", a: "'Despacito'" },
            { q: "Which Italian tenor, known for crossover hits like 'Con te partirò (Time to Say Goodbye)' and 'The Prayer', is one of the best-selling classical crossover artists of all time?", a: "Andrea Bocelli" },
            { q: "Which Australian singer's 2000 hit 'Can't Get You Out of My Head' became a global chart-topping dance-pop anthem?", a: "Kylie Minogue" }
          ],
          400: [
            { q: "Which Swedish group, formed in 1972, is known for hits like 'Dancing Queen' and 'Mamma Mia', and remains one of the best-selling music acts of all time?", a: "ABBA" },
            { q: "Which German electronic music duo, formed in 1970 and regarded as pioneers of electronic and techno music, released the influential 1974 album 'Autobahn'?", a: "Kraftwerk" },
            { q: "Which Icelandic singer, known for her avant-garde style and albums like 'Homogenic' and 'Vespertine', is one of Iceland's most internationally acclaimed musical artists?", a: "Björk" }
          ],
          500: [
            { q: "Which French electronic duo, known for wearing robot helmets and producing hits like 'Get Lucky' and 'One More Time', disbanded in 2021 after 28 years together?", a: "Daft Punk" },
            { q: "Which German singer's 1983 song '99 Luftballons' became an international hit, later re-recorded in English as '99 Red Balloons'?", a: "Nena" },
            { q: "Which French chanson singer, known for 'Non, je ne regrette rien' and considered a national icon in France, died in 1963 shortly after recording that song?", a: "Édith Piaf" }
          ]
        }
      },
      {
        name: "Music History",
        questions: {
          100: [
            { q: "Which Austrian composer, a child prodigy, wrote famous classical works like 'The Magic Flute' and 'Eine kleine Nachtmusik'?", a: "Wolfgang Amadeus Mozart" },
            { q: "Which Italian Baroque composer wrote the famous set of violin concertos known as 'The Four Seasons'?", a: "Antonio Vivaldi" },
            { q: "Which German composer, born in 1685, is known as one of the greatest composers of the Baroque era, famous for the 'Brandenburg Concertos'?", a: "Johann Sebastian Bach" }
          ],
          200: [
            { q: "Which genre of African-American music, originating in the late 19th and early 20th century in the Southern United States, is considered a precursor to rock and roll and jazz?", a: "The Blues" },
            { q: "Which genre of music, originating in Jamaica in the late 1960s, was popularized worldwide by artists like Bob Marley?", a: "Reggae" },
            { q: "Which genre of electronic dance music originated in Chicago's nightclub scene in the early 1980s, taking its name from the club 'The Warehouse'?", a: "House music" }
          ],
          300: [
            { q: "Which British band's 1964 arrival in the United States sparked a cultural phenomenon known as the 'British Invasion'?", a: "The Beatles" },
            { q: "Which rock musician's 1971 death, following those of Jimi Hendrix and Janis Joplin, completed a tragic trio of rock star deaths within two years, all at age 27?", a: "Jim Morrison (of The Doors)" },
            { q: "Which genre of Jamaican music, predating reggae, was popularized in the 1960s by artists like Desmond Dekker and later revived by 2 Tone bands like The Specials?", a: "Ska" }
          ],
          400: [
            { q: "Which German composer continued composing major works, including his Ninth Symphony, even after becoming completely deaf?", a: "Ludwig van Beethoven" },
            { q: "Which Austrian composer's unfinished final work, a Requiem Mass, was completed by his students after his death in 1791?", a: "Wolfgang Amadeus Mozart" },
            { q: "Which Russian composer's '1812 Overture', composed to commemorate Russia's defense against Napoleon, is famous for its use of cannon fire in performance?", a: "Pyotr Ilyich Tchaikovsky" }
          ],
          500: [
            { q: "What technological format, introduced by Sony and Philips in 1982, largely replaced vinyl records and cassette tapes as the dominant music medium through the 1990s?", a: "The Compact Disc (CD)" },
            { q: "Which American inventor patented the phonograph in 1877, the first device capable of both recording and reproducing sound?", a: "Thomas Edison" },
            { q: "What digital audio compression format, developed by German engineers at the Fraunhofer Institute and standardized in 1993, became the dominant format for digital music in the late 1990s and 2000s?", a: "MP3" }
          ]
        }
      },
      {
        name: "Artists and Bands",
        questions: {
          100: [
            { q: "Which American singer, known as the 'Queen of Pop', is famous for hits like 'Like a Virgin' and 'Vogue'?", a: "Madonna" },
            { q: "Which American rapper, born Marshall Mathers III, is famous for albums like 'The Marshall Mathers LP' and 'The Eminem Show'?", a: "Eminem" },
            { q: "Which American singer, known as 'The Boss', is famous for songs like 'Born in the U.S.A.' and 'Dancing in the Dark'?", a: "Bruce Springsteen" }
          ],
          200: [
            { q: "Which American rapper and entrepreneur, born Shawn Carter, is married to Beyoncé?", a: "Jay-Z" },
            { q: "Which American rapper and actor, known for hits like 'In Da Club' and founding G-Unit, survived being shot nine times in 2000?", a: "50 Cent" },
            { q: "Which American singer, known as the 'Godfather of Soul', was famous for hits like 'I Got You (I Feel Good)' and his energetic stage performances?", a: "James Brown" }
          ],
          300: [
            { q: "Which American rock band, fronted by Anthony Kiedis and known for blending rock with funk and rap, released 'Californication' and 'Under the Bridge'?", a: "Red Hot Chili Peppers" },
            { q: "Which American rock band, fronted by Chris Cornell and part of the Seattle grunge scene, released the 1994 album 'Superunknown' featuring 'Black Hole Sun'?", a: "Soundgarden" },
            { q: "Which American singer-songwriter, known as 'The Piano Man', is famous for songs like 'Uptown Girl' and 'We Didn't Start the Fire'?", a: "Billy Joel" }
          ],
          400: [
            { q: "Which American band, led by former Nirvana drummer Dave Grohl, formed in 1994 and is known for hits like 'Everlong' and 'Learn to Fly'?", a: "Foo Fighters" },
            { q: "Which American rock band, fronted by Eddie Vedder, is considered one of the most influential grunge bands alongside Nirvana and Soundgarden?", a: "Pearl Jam" },
            { q: "Which British singer-songwriter, known for his falsetto and hits like 'Rocket Man' and 'Your Song', partnered with lyricist Bernie Taupin for decades?", a: "Elton John" }
          ],
          500: [
            { q: "Which Jamaican reggae musician, known for 'No Woman, No Cry' and 'Redemption Song', helped popularize reggae music worldwide before his death in 1981?", a: "Bob Marley" },
            { q: "Which American blues musician, known as the 'King of the Delta Blues', recorded only 29 songs before his death in 1938 at age 27, yet became hugely influential on rock music?", a: "Robert Johnson" },
            { q: "Which African-American composer, known as the 'Father of Gospel Music', wrote the classic hymn 'Take My Hand, Precious Lord' in 1932?", a: "Thomas A. Dorsey" }
          ]
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
          100: [
            { q: "Which 1985 Nintendo game, starring a plumber who must rescue Princess Peach, became one of the best-selling video games of all time?", a: "Super Mario Bros." },
            { q: "Which 1978 arcade shooter, in which players defend Earth from descending rows of aliens, is considered one of the founding games of the shoot 'em up genre?", a: "Space Invaders" },
            { q: "Which 1981 Nintendo arcade game features a carpenter climbing girders to rescue a woman from a giant ape, marking the first appearance of Mario?", a: "Donkey Kong" }
          ],
          200: [
            { q: "Which 1980 arcade game, created by Namco, features a yellow character eating dots while avoiding four colored ghosts?", a: "Pac-Man" },
            { q: "Which classic 1981 arcade game has players guide a frog across a busy road and river to reach home safely?", a: "Frogger" },
            { q: "Which 1979 Atari arcade game has players pilot a spaceship, shooting and breaking apart floating space rocks while avoiding collisions?", a: "Asteroids" }
          ],
          300: [
            { q: "Which puzzle video game, created by Russian designer Alexey Pajitnov in 1984, involves arranging falling geometric blocks?", a: "Tetris" },
            { q: "Which 1981 arcade game was introduced by Midway as a female counterpart to a hit game, without official approval from the original creators?", a: "Ms. Pac-Man" },
            { q: "Which 1981 Namco arcade game, a sequel to 'Galaxian', became one of the most iconic shoot 'em up games with its diving alien enemy formations?", a: "Galaga" }
          ],
          400: [
            { q: "Which 1991 Sega game introduced a blue hedgehog who could run at super speed, created as a rival mascot to Nintendo's Mario?", a: "Sonic the Hedgehog" },
            { q: "Which 1991 puzzle game by Compile, featuring a witch named Arle Nadja, is credited with popularizing the falling-block 'versus puzzle' subgenre?", a: "Puyo Puyo" },
            { q: "Which 1976 Atari arcade game, in which players use a paddle to break through a wall of bricks with a bouncing ball, was famously prototyped by Steve Wozniak and Steve Jobs?", a: "Breakout" }
          ],
          500: [
            { q: "Which 1972 game, developed by Atari and featuring two paddles hitting a ball back and forth, is considered one of the first commercially successful video games?", a: "Pong" },
            { q: "Which 1962 game, created by MIT students including Steve Russell and considered one of the first-ever digital video games, involved two spaceships dueling near a star?", a: "Spacewar!" },
            { q: "Which 1958 game, created by physicist William Higinbotham on an oscilloscope at Brookhaven National Laboratory, is considered by some historians to be one of the very first video games ever made?", a: "Tennis for Two" }
          ]
        }
      },
      {
        name: "Iconic Characters",
        questions: {
          100: [
            { q: "What is the name of the green-clad hero who rescues Princess Zelda in Nintendo's long-running fantasy franchise?", a: "Link" },
            { q: "What is the name of the mustachioed plumber who is Nintendo's most famous mascot, first appearing in 'Donkey Kong' in 1981?", a: "Mario" },
            { q: "What is the name of the blue hedgehog who serves as Sega's mascot and main rival to Nintendo's Mario?", a: "Sonic the Hedgehog" }
          ],
          200: [
            { q: "What is the name of Sonic the Hedgehog's main rival, a mad scientist who pilots various machines?", a: "Dr. Robotnik (Dr. Eggman)" },
            { q: "What is the name of Mario's younger, taller brother, dressed in green, who is a playable character in many Mario games?", a: "Luigi" },
            { q: "What is the name of the pink, round Nintendo character known for inhaling enemies to copy their abilities?", a: "Kirby" }
          ],
          300: [
            { q: "What is the name of the protagonist in the 'Half-Life' series, a silent theoretical physicist armed with a crowbar?", a: "Gordon Freeman" },
            { q: "What is the nickname commonly used for the relentless space marine protagonist of the 'Doom' series?", a: "The Doom Slayer (Doomguy)" },
            { q: "What is the name of the treasure-hunting archaeologist protagonist of the 'Tomb Raider' video game series?", a: "Lara Croft" }
          ],
          400: [
            { q: "In the 'Legend of Zelda' series, what is the name of the recurring antagonist, a pig-like sorcerer king who seeks the Triforce?", a: "Ganon (Ganondorf)" },
            { q: "In the 'Metal Gear' series, what is the codename of Solid Snake's antagonist and genetic 'brother', created from the same source DNA?", a: "Liquid Snake" },
            { q: "In 'Final Fantasy VII', what is the name of the silver-haired antagonist who kills the character Aerith and later became an iconic villain in gaming history?", a: "Sephiroth" }
          ],
          500: [
            { q: "What is the real name of the protagonist in 'Assassin's Creed II', a vigilante descended from a wealthy Florentine family?", a: "Ezio Auditore da Firenze" },
            { q: "What is the real name of the assassin protagonist in the original 2007 'Assassin's Creed', an ancestor of Ezio Auditore active during the Third Crusade?", a: "Altaïr Ibn-La'Ahad" },
            { q: "In the 1995 role-playing game 'Chrono Trigger', what is the true name of the amnesiac, katana-wielding frog warrior who joins the protagonist's party?", a: "Glenn (Frog)" }
          ]
        }
      },
      {
        name: "Game Franchises",
        questions: {
          100: [
            { q: "Which Nintendo franchise features colorful creatures that trainers catch, train, and battle, starting with 'Red and Blue' in 1996?", a: "Pokémon" },
            { q: "Which Nintendo franchise, starring a mustachioed plumber, began with the 1985 game 'Super Mario Bros.' and remains one of the best-selling video game series of all time?", a: "Super Mario" },
            { q: "Which Nintendo kart-racing franchise, featuring Mario and friends racing with power-up items like shells and bananas, began in 1992?", a: "Mario Kart" }
          ],
          200: [
            { q: "Which sandbox video game, created by Markus 'Notch' Persson and released in 2011, lets players build with cubic blocks in a procedurally generated world?", a: "Minecraft" },
            { q: "Which long-running life-simulation franchise by Electronic Arts, first released in 2000, lets players control virtual people building homes and lives?", a: "The Sims" },
            { q: "Which Nintendo franchise features open-ended life-simulation games where players manage a village of anthropomorphic animals, starting in 2001?", a: "Animal Crossing" }
          ],
          300: [
            { q: "Which battle royale game, released by Epic Games in 2017, became a cultural phenomenon known for its building mechanics and seasonal events?", a: "Fortnite" },
            { q: "Which multiplayer online battle arena game, developed by Riot Games and released in 2009, became one of the most-played PC games in the world and inspired the Netflix series 'Arcane'?", a: "League of Legends" },
            { q: "Which battle royale franchise, developed by Krafton and released in 2017 based on a mod for 'ARMA', helped popularize the battle royale genre alongside Fortnite?", a: "PUBG (PlayerUnknown's Battlegrounds)" }
          ],
          400: [
            { q: "Which long-running Japanese role-playing game franchise, first released in 1987 by Square, is known for numbered mainline entries and recurring creatures called Chocobos?", a: "Final Fantasy" },
            { q: "Which long-running stealth-action franchise, created by Hideo Kojima and first released in 1987, follows the soldier Solid Snake?", a: "Metal Gear" },
            { q: "Which Japanese role-playing game franchise, first released in 1986 by Enix, is known for its recurring 'Slime' enemies and composer Koichi Sugiyama's music?", a: "Dragon Quest" }
          ],
          500: [
            { q: "Which video game franchise, first released in 1997, is known for its open-world crime gameplay and has sold over 400 million copies across its series?", a: "Grand Theft Auto" },
            { q: "Which long-running Konami franchise, first released in 1986, follows vampire hunters from the Belmont clan battling Dracula, and helped define the 'Metroidvania' genre with its 1997 entry 'Symphony of the Night'?", a: "Castlevania" },
            { q: "Which Japanese role-playing game franchise, first released in 1992 for the Super Famicom and developed by Atlus, spawned the popular 'Persona' spin-off series?", a: "Shin Megami Tensei" }
          ]
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
          100: [
            { q: "In which country did the modern Olympic Games originate in ancient times?", a: "Greece" },
            { q: "How often are the Summer Olympic Games held, under normal circumstances?", a: "Every four years" },
            { q: "Which country hosted the 2016 Summer Olympics, the first Olympics held in South America?", a: "Brazil (Rio de Janeiro)" }
          ],
          200: [
            { q: "How many rings are on the Olympic flag, representing the five inhabited continents?", a: "Five" },
            { q: "What are the traditional Olympic medal colors awarded for first, second, and third place?", a: "Gold, silver, and bronze" },
            { q: "In which city were the first modern Olympic Games held in 1896?", a: "Athens, Greece" }
          ],
          300: [
            { q: "Which city hosted the 2020 Summer Olympics, which were postponed to 2021 due to the COVID-19 pandemic?", a: "Tokyo, Japan" },
            { q: "Which city became the first to host the Summer Olympics three times when it hosted the 2012 Games?", a: "London" },
            { q: "Which country hosted the 2008 Summer Olympics, marking the first time China hosted the Games?", a: "China (Beijing)" }
          ],
          400: [
            { q: "Which Jamaican sprinter holds the world records in both the 100m and 200m and won eight Olympic gold medals?", a: "Usain Bolt" },
            { q: "Which American gymnast became the most decorated American gymnast in history, winning the all-around gold medal at both the 2016 and 2020 Olympics?", a: "Simone Biles" },
            { q: "Which Ethiopian long-distance runner won gold medals in both the 5,000m and 10,000m at consecutive Olympics in 2004 and 2008?", a: "Kenenisa Bekele" }
          ],
          500: [
            { q: "Which American swimmer holds the record for the most Olympic medals of all time, with 28 total medals?", a: "Michael Phelps" },
            { q: "Which Soviet gymnast won 18 Olympic medals across the 1956, 1960, and 1964 Games, holding the record for most Olympic medals by a woman for decades?", a: "Larisa Latynina" },
            { q: "Which Finnish long-distance runner, nicknamed the 'Flying Finn', won nine Olympic gold medals in the 1920s?", a: "Paavo Nurmi" }
          ]
        }
      },
      {
        name: "Basketball",
        questions: {
          100: [
            { q: "How many players from each team are on the court at one time in a standard basketball game?", a: "Five" },
            { q: "How many points is a standard field goal worth in basketball when shot from inside the three-point line?", a: "Two points" },
            { q: "In what U.S. city was basketball invented by James Naismith in 1891?", a: "Springfield, Massachusetts" }
          ],
          200: [
            { q: "Which NBA player, nicknamed 'His Airness', won six NBA championships with the Chicago Bulls?", a: "Michael Jordan" },
            { q: "Which American basketball league, founded in 1946, is the premier professional men's basketball league in the United States?", a: "The NBA (National Basketball Association)" },
            { q: "Which basketball player, known as 'Magic', led the Los Angeles Lakers to five NBA championships in the 1980s?", a: "Magic Johnson (Earvin Johnson)" }
          ],
          300: [
            { q: "Which Philippine professional basketball league, founded in 1975, is the oldest active professional basketball league in Asia?", a: "PBA (Philippine Basketball Association)" },
            { q: "Which basketball player, nicknamed 'The Big Aristotle' and 'Shaq', won four NBA championships and is considered one of the most dominant centers in NBA history?", a: "Shaquille O'Neal" },
            { q: "Which international basketball competition, held every four years and organized by FIBA, is basketball's equivalent to soccer's World Cup?", a: "The FIBA Basketball World Cup" }
          ],
          400: [
            { q: "Which NBA player holds the record for most career points scored, surpassing Kareem Abdul-Jabbar in 2023?", a: "LeBron James" },
            { q: "Which basketball player set the NBA single-season record for most three-pointers made and is widely credited with revolutionizing the game with high-volume three-point shooting?", a: "Stephen Curry" },
            { q: "Which Filipino basketball legend, who led the Philippines to a bronze medal at the 1954 FIBA World Championship, was named FIBA's Asian Player of the Century in 2002?", a: "Carlos Loyzaga" }
          ],
          500: [
            { q: "Which basketball player scored 100 points in a single NBA game in 1962, a record that still stands?", a: "Wilt Chamberlain" },
            { q: "Which basketball player recorded the NBA's first officially recognized quadruple-double, in a game in October 1974?", a: "Nate Thurmond" },
            { q: "Which basketball player holds the NBA record for most career assists, a mark set largely during his years with the Utah Jazz?", a: "John Stockton" }
          ]
        }
      },
      {
        name: "Football (Soccer)",
        questions: {
          100: [
            { q: "How many players are on a standard soccer team on the field at one time, including the goalkeeper?", a: "Eleven" },
            { q: "What is the standard duration of a soccer match, not including stoppage time, split into two halves?", a: "90 minutes (two 45-minute halves)" },
            { q: "What is the term for the soccer rule that penalizes an attacking player for being nearer the opponent's goal line than the ball and second-to-last defender when the ball is played to them?", a: "Offside" }
          ],
          200: [
            { q: "Which country has won the most FIFA World Cup titles, with five championships?", a: "Brazil" },
            { q: "Which European country won the FIFA World Cup in 2018, defeating Croatia in the final?", a: "France" },
            { q: "Which Portuguese football superstar has won multiple Ballon d'Or awards and is famous for his rivalry with Lionel Messi?", a: "Cristiano Ronaldo" }
          ],
          300: [
            { q: "Which Argentine football star won the 2022 FIFA World Cup with Argentina and has won a record eight Ballon d'Or awards?", a: "Lionel Messi" },
            { q: "Which German football club has won the most Bundesliga titles and is one of the most successful clubs in European football?", a: "Bayern Munich" },
            { q: "Which Brazilian football legend, widely regarded as one of the greatest players of all time, won three FIFA World Cups with Brazil in 1958, 1962, and 1970?", a: "Pelé" }
          ],
          400: [
            { q: "Which international club competition, organized by UEFA, is Europe's top-tier club football tournament?", a: "The UEFA Champions League" },
            { q: "Which international soccer tournament, held every four years and contested by European national teams, is UEFA's equivalent to the World Cup?", a: "The UEFA European Championship (Euro)" },
            { q: "Which club competition is South America's equivalent to the UEFA Champions League, contested annually by top South American clubs?", a: "Copa Libertadores" }
          ],
          500: [
            { q: "Which country hosted and won the first-ever FIFA World Cup in 1930?", a: "Uruguay" },
            { q: "Which national team, coached by Rinus Michels in the 1970s, popularized the influential tactical system known as 'Total Football'?", a: "The Netherlands" },
            { q: "Which country's national team, known as the 'Golden Team' (Aranycsapat), famously ended England's unbeaten home record in 1953 with a 6-3 win at Wembley?", a: "Hungary" }
          ]
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
          100: [
            { q: "Who is the national hero of the Philippines, known for writing 'Noli Me Tángere' and 'El Filibusterismo'?", a: "José Rizal" },
            { q: "What is the name of the historic 1896 uprising against Spanish colonial rule in the Philippines, led by the Katipunan secret society?", a: "The Philippine Revolution" },
            { q: "Who was the Filipino revolutionary who founded the Katipunan, the secret society that sparked the Philippine Revolution?", a: "Andrés Bonifacio" }
          ],
          200: [
            { q: "In what year did the Philippines declare independence from Spain, an event now celebrated as Independence Day?", a: "1898" },
            { q: "In what year did the Philippines gain full independence from the United States, an event once celebrated as its Independence Day?", a: "1946" },
            { q: "Which walled district within Manila served as the seat of Spanish colonial government throughout most of the Spanish colonial period?", a: "Intramuros" }
          ],
          300: [
            { q: "Which Filipino revolutionary leader became the first President of the Philippines in 1899?", a: "Emilio Aguinaldo" },
            { q: "Which Philippine president led the country during Martial Law, declared in 1972, and was ousted by the 1986 People Power Revolution?", a: "Ferdinand Marcos Sr." },
            { q: "What is the collective name for the three Filipino priests — Mariano Gómez, José Burgos, and Jacinto Zamora — who were executed by Spanish colonial authorities in 1872?", a: "Gomburza" }
          ],
          400: [
            { q: "Which Portuguese explorer, sailing for Spain, arrived in the Philippines in 1521 and was later killed in the Battle of Mactan?", a: "Ferdinand Magellan" },
            { q: "Which Spanish explorer completed the first circumnavigation of the globe by leading Magellan's expedition to its conclusion after Magellan's death in the Philippines?", a: "Juan Sebastián Elcano" },
            { q: "Which 1899-1902 conflict was fought between Filipino revolutionaries and American forces after the United States annexed the Philippines following the Spanish-American War?", a: "The Philippine-American War" }
          ],
          500: [
            { q: "Who was the Filipino chieftain of Mactan who defeated and killed Ferdinand Magellan in 1521?", a: "Lapu-Lapu" },
            { q: "Which Filipino revolutionary, known as the 'Brains of the Katipunan' and a close associate of Andrés Bonifacio, wrote the 'Kartilya ng Katipunan'?", a: "Emilio Jacinto" },
            { q: "Which 1898 naval battle, fought in Manila Bay between the United States and Spain, resulted in a decisive American victory led by Commodore George Dewey?", a: "The Battle of Manila Bay" }
          ]
        }
      },
      {
        name: "Philippine Culture",
        questions: {
          100: [
            { q: "What is the national language of the Philippines, based largely on Tagalog?", a: "Filipino" },
            { q: "What is the name of the traditional Filipino formal dress for women, distinguished by its structured 'butterfly sleeves'?", a: "The Terno" },
            { q: "What are the light, brightly colored wooden boats with bamboo outriggers commonly used for fishing and travel between Philippine islands?", a: "Bangka (outrigger boat)" }
          ],
          200: [
            { q: "What bamboo dance, performed by stepping between clapping bamboo poles, is a well-known traditional Philippine folk dance?", a: "Tinikling" },
            { q: "What is the name of the traditional Filipino martial art that uses sticks, blades, and empty-hand techniques, also known as Arnis?", a: "Eskrima (Arnis)" },
            { q: "What is the term for a Philippine town or barrio festival, usually held annually to honor a patron saint, featuring parades, food, and celebrations?", a: "Fiesta" }
          ],
          300: [
            { q: "What is the term for a traditional Filipino community spirit of helping neighbors with work, such as building a house?", a: "Bayanihan" },
            { q: "What is the term for the Filipino value of reciprocal favors and social debt, often described as a deep sense of gratitude owed to another?", a: "Utang na loob" },
            { q: "What is the name of the pre-colonial Filipino writing system, an alphasyllabary used before the widespread adoption of the Latin alphabet under Spanish rule?", a: "Baybayin" }
          ],
          400: [
            { q: "The iconic Philippine jeepney was originally created after World War II by modifying which vehicles left behind by American soldiers?", a: "U.S. military jeeps" },
            { q: "What is the name of the traditional Filipino stringed instrument, shaped somewhat like a guitar, commonly used to accompany the Rondalla ensemble?", a: "The bandurria" },
            { q: "What Filipino courtship tradition involves a suitor singing romantic songs beneath a woman's window at night, often accompanied by a guitar?", a: "Harana" }
          ],
          500: [
            { q: "What UNESCO-recognized Philippine rice terraces, carved into the mountains over 2,000 years ago by the Ifugao people, are often called the 'Eighth Wonder of the World'?", a: "The Banaue Rice Terraces" },
            { q: "What is the name of the Ifugao chant tradition, recognized by UNESCO as a Masterpiece of Oral and Intangible Heritage, which narrates ancestral heroes during harvest and mourning rituals?", a: "Hudhud (the Hudhud chants)" },
            { q: "What is the name of one of the world's longest folk epics, originating from the Sulod people of Panay, chronicling the heroic adventures of the warrior Labaw Donggon?", a: "Hinilawod" }
          ]
        }
      },
      {
        name: "Philippine Facts",
        questions: {
          100: [
            { q: "What is the capital city of the Philippines?", a: "Manila" },
            { q: "What is the most widely spoken second language in the Philippines, used extensively in business, government, and education?", a: "English" },
            { q: "What is the largest island in the Philippine archipelago by land area, home to Manila?", a: "Luzon" }
          ],
          200: [
            { q: "Approximately how many islands make up the Philippine archipelago?", a: "About 7,641 islands" },
            { q: "What is the second-largest island in the Philippines, known for cities like Davao and Cagayan de Oro?", a: "Mindanao" },
            { q: "What is the collective name for the central island group of the Philippines, which includes Cebu, Bohol, and Panay?", a: "The Visayas" }
          ],
          300: [
            { q: "What is the official currency of the Philippines?", a: "The Philippine peso" },
            { q: "What is the name of the central bank of the Philippines, responsible for monetary policy and issuing currency?", a: "Bangko Sentral ng Pilipinas (BSP)" },
            { q: "The Philippines is one of the world's largest producers and exporters of which tropical crop, used to make oil, milk, and copra?", a: "Coconut" }
          ],
          400: [
            { q: "Which Philippine volcano, known for its near-perfect cone shape, is located in Albay province?", a: "Mayon Volcano" },
            { q: "What is the name of the Philippines' most active volcano, located in Batangas province and known for its small size and crater lake?", a: "Taal Volcano" },
            { q: "What is the highest mountain in the Philippines, located on the island of Mindanao?", a: "Mount Apo" }
          ],
          500: [
            { q: "What is the name of the deepest point in the Philippine Sea, one of the deepest points in all of Earth's oceans, located east of the Philippines?", a: "The Philippine Trench (the Emden Deep)" },
            { q: "What is the name of the underground river in Puerto Princesa, Palawan, recognized as one of the New7Wonders of Nature and a UNESCO World Heritage Site?", a: "The Puerto Princesa Subterranean River" },
            { q: "What is the name of the UNESCO World Heritage marine sanctuary off Palawan, a remote coral atoll famous for its rich biodiversity in the Sulu Sea?", a: "Tubbataha Reefs Natural Park" }
          ]
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
          100: [
            { q: "What is the tallest mountain in the world, located in the Himalayas?", a: "Mount Everest" },
            { q: "What is the largest country in the world by land area?", a: "Russia" },
            { q: "What is the largest mammal in the world?", a: "The blue whale" }
          ],
          200: [
            { q: "What is the largest ocean on Earth by surface area?", a: "The Pacific Ocean" },
            { q: "What is the largest continent on Earth by both area and population?", a: "Asia" },
            { q: "What is the tallest living animal in the world?", a: "The giraffe" }
          ],
          300: [
            { q: "What is the longest river in the world, located in Africa?", a: "The Nile River" },
            { q: "What is the largest lake in the world by surface area?", a: "The Caspian Sea" },
            { q: "What is the deepest known point in the world's oceans, located in the Pacific?", a: "The Mariana Trench" }
          ],
          400: [
            { q: "What is the smallest country in the world by land area?", a: "Vatican City" },
            { q: "What is the coldest permanently inhabited place on Earth, located in Siberia, Russia?", a: "Oymyakon" },
            { q: "What is the largest desert in the world when both hot and cold deserts are considered?", a: "Antarctica" }
          ],
          500: [
            { q: "What is the largest hot desert in the world, covering much of North Africa?", a: "The Sahara Desert" },
            { q: "What is the longest mountain range in the world, running mostly along the ocean floor?", a: "The Mid-Ocean Ridge" },
            { q: "What is the most remote inhabited island in the world, located in the South Atlantic Ocean?", a: "Tristan da Cunha" }
          ]
        }
      },
      {
        name: "World Cultures",
        questions: {
          100: [
            { q: "In Japan, what is the traditional art of paper folding called?", a: "Origami" },
            { q: "What is the traditional draped garment worn by women in India?", a: "The sari (saree)" },
            { q: "What is the traditional knee-length garment worn by men in Scotland?", a: "The kilt" }
          ],
          200: [
            { q: "What is the traditional Indian greeting, performed by pressing one's palms together and slightly bowing?", a: "Namaste" },
            { q: "What Mexican holiday, held on November 1st and 2nd, honors and celebrates deceased loved ones?", a: "Día de los Muertos (Day of the Dead)" },
            { q: "What Hawaiian word is used as both a greeting and a farewell, and also means love?", a: "Aloha" }
          ],
          300: [
            { q: "Which country is credited as the birthplace of pizza, specifically the city of Naples?", a: "Italy" },
            { q: "Which country is considered the birthplace of yoga as a spiritual and physical practice?", a: "India" },
            { q: "What is the name of the traditional Maori greeting in New Zealand, involving pressing noses together?", a: "The hongi" }
          ],
          400: [
            { q: "What is the term for the traditional Japanese tea ceremony, emphasizing mindfulness and ritual?", a: "Chanoyu (the Way of Tea, Sado)" },
            { q: "What is the name of the traditional Japanese art of flower arranging?", a: "Ikebana" },
            { q: "What is the name of the traditional Indonesian and Malay dagger, considered a spiritual and cultural symbol?", a: "The kris (keris)" }
          ],
          500: [
            { q: "What is the name of the Jewish New Year celebration, typically occurring in September or October?", a: "Rosh Hashanah" },
            { q: "What is the term for the Aboriginal Australian belief system explaining the spiritual creation of the world?", a: "The Dreamtime (the Dreaming)" },
            { q: "What is the name of the traditional Bhutanese robe worn by men, tied at the waist with a belt?", a: "The gho" }
          ]
        }
      },
      {
        name: "World Events",
        questions: {
          100: [
            { q: "In what year did World War II end?", a: "1945" },
            { q: "In what year did World War I begin?", a: "1914" },
            { q: "In what year did the September 11 terrorist attacks occur in the United States?", a: "2001" }
          ],
          200: [
            { q: "What historic 1989 event, involving the destruction of a section of a Berlin barrier, symbolized the end of the Cold War divide?", a: "The Fall of the Berlin Wall" },
            { q: "In what year did the Soviet Union officially dissolve?", a: "1991" },
            { q: "Which city hosted the 2008 Summer Olympics, marking China's emergence on the world stage?", a: "Beijing" }
          ],
          300: [
            { q: "Which international organization, founded in 1945 to maintain global peace and security, currently has 193 member states?", a: "The United Nations" },
            { q: "Which political and economic union of European countries, formally established in 1993, uses a shared set of institutions and, for most members, a common currency?", a: "The European Union" },
            { q: "In what year did Hong Kong's sovereignty transfer from the United Kingdom back to China?", a: "1997" }
          ],
          400: [
            { q: "What global health crisis, caused by a novel coronavirus, was declared a pandemic by the WHO in March 2020?", a: "The COVID-19 pandemic" },
            { q: "In what year did the Rwandan genocide take place, resulting in the deaths of an estimated 800,000 people?", a: "1994" },
            { q: "What name is given to the wave of pro-democracy uprisings that swept across the Middle East and North Africa beginning in 2011?", a: "The Arab Spring" }
          ],
          500: [
            { q: "In what year did the Chernobyl nuclear disaster occur in present-day Ukraine, then part of the Soviet Union?", a: "1986" },
            { q: "In what year did the Cuban Missile Crisis bring the United States and the Soviet Union to the brink of nuclear war?", a: "1962" },
            { q: "What year was the Treaty of Tordesillas signed, dividing newly discovered lands outside Europe between Spain and Portugal?", a: "1494" }
          ]
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
          100: [
            { q: "Which ancient Egyptian structures, built as tombs for pharaohs, are among the Seven Wonders of the Ancient World?", a: "The Pyramids (of Giza)" },
            { q: "Which ancient civilization built the mountaintop citadel of Machu Picchu in present-day Peru?", a: "The Inca (Inca Empire)" },
            { q: "Which ancient civilization worshipped gods like Zeus and Athena and built the Parthenon?", a: "Ancient Greece (the Greeks)" }
          ],
          200: [
            { q: "Which ancient civilization built the Colosseum, a large amphitheater used for gladiator contests?", a: "The Roman Empire (Ancient Rome)" },
            { q: "Which ancient Mesoamerican civilization built the pyramid city of Chichen Itza in present-day Mexico?", a: "The Maya (Maya civilization)" },
            { q: "Which ancient civilization, centered in South Asia, built well-planned cities like Mohenjo-daro and Harappa?", a: "The Indus Valley Civilization (Harappan Civilization)" }
          ],
          300: [
            { q: "Which Chinese dynasty began construction of an early version of the Great Wall of China to protect against northern invasions?", a: "The Qin Dynasty" },
            { q: "Which ancient Egyptian queen, famous for her relationships with Julius Caesar and Mark Antony, was the last active ruler of the Ptolemaic Kingdom?", a: "Cleopatra (Cleopatra VII)" },
            { q: "Which ancient Greek city-state was known for its military discipline and warrior culture, exemplified by the Battle of Thermopylae?", a: "Sparta" }
          ],
          400: [
            { q: "Which Macedonian king created one of the largest empires of the ancient world by the age of 30, stretching from Greece to India?", a: "Alexander the Great" },
            { q: "Which Roman emperor built the defensive wall across northern Britain that bears his name?", a: "Hadrian (Hadrian's Wall)" },
            { q: "Which ancient wonder of the world was a giant bronze statue of the sun god Helios that stood at the harbor entrance of Rhodes?", a: "The Colossus of Rhodes" }
          ],
          500: [
            { q: "Which ancient Mesopotamian king created one of the earliest known written law codes, inscribed on a stone stele around 1754 BCE?", a: "Hammurabi" },
            { q: "Which ancient Persian king founded the Achaemenid Empire, the largest empire the ancient world had yet seen?", a: "Cyrus the Great" },
            { q: "What was the name of the renowned ancient Egyptian library, believed to be one of the largest and most significant libraries of the ancient world before its destruction?", a: "The Library of Alexandria" }
          ]
        }
      },
      {
        name: "Modern History",
        questions: {
          100: [
            { q: "Which U.S. president delivered the Gettysburg Address in 1863 during the American Civil War?", a: "Abraham Lincoln" },
            { q: "Which country was divided into East and West until its 1990 reunification?", a: "Germany" },
            { q: "In what year did the United States declare independence from Great Britain?", a: "1776" }
          ],
          200: [
            { q: "In what year did the Titanic sink after hitting an iceberg on its maiden voyage?", a: "1912" },
            { q: "Which country was the first in the world to grant women the right to vote nationally, in 1893?", a: "New Zealand" },
            { q: "Which empire, at its height in the early 20th century, was the largest empire in history by land area, covering about a quarter of the globe?", a: "The British Empire" }
          ],
          300: [
            { q: "Astronauts from which country were the first humans to walk on the Moon in 1969, aboard Apollo 11?", a: "The United States" },
            { q: "Which country launched Sputnik 1, the first artificial satellite, into orbit in 1957?", a: "The Soviet Union" },
            { q: "What 1994 trade agreement created a free trade zone between the United States, Canada, and Mexico?", a: "NAFTA (North American Free Trade Agreement)" }
          ],
          400: [
            { q: "Which Indian leader is famous for leading India to independence from British rule through nonviolent civil disobedience?", a: "Mahatma Gandhi" },
            { q: "Which Chinese Communist leader founded the People's Republic of China in 1949?", a: "Mao Zedong" },
            { q: "What South African system of institutionalized racial segregation officially ended in the early 1990s?", a: "Apartheid" }
          ],
          500: [
            { q: "Which 1919 treaty formally ended World War I and imposed heavy reparations on Germany?", a: "The Treaty of Versailles" },
            { q: "What was the name of the secret 1916 agreement between Britain and France that divided Ottoman territories in the Middle East into spheres of influence?", a: "The Sykes-Picot Agreement" },
            { q: "In what year was the Marshall Plan enacted to help rebuild Western European economies after World War II?", a: "1948" }
          ]
        }
      },
      {
        name: "Wars & Revolutions",
        questions: {
          100: [
            { q: "Which war, fought from 1861 to 1865, was fought between the northern and southern United States, largely over slavery?", a: "The American Civil War" },
            { q: "Which war, fought from 1939 to 1945, involved most of the world's nations divided into Allied and Axis powers?", a: "World War II" },
            { q: "Which war, fought between 1775 and 1783, resulted in the American colonies gaining independence from Great Britain?", a: "The American Revolutionary War" }
          ],
          200: [
            { q: "Which 1789 revolution led to the overthrow of the French monarchy and the eventual rise of Napoleon Bonaparte?", a: "The French Revolution" },
            { q: "Which war, fought from 1914 to 1918, was known at the time as 'the Great War'?", a: "World War I" },
            { q: "Which conflict, ending in 1949 with the Communist Party's victory, resulted in Mao Zedong taking control of mainland China?", a: "The Chinese Civil War" }
          ],
          300: [
            { q: "Which war, lasting from 1955 to 1975, was fought in Southeast Asia between North and South Vietnam, with heavy U.S. involvement?", a: "The Vietnam War" },
            { q: "Which war, fought between 1980 and 1988, was one of the longest conventional wars of the 20th century, fought between two Middle Eastern nations?", a: "The Iran-Iraq War" },
            { q: "Which 1991 conflict saw a U.S.-led coalition force Iraqi troops to withdraw from Kuwait?", a: "The Gulf War (Persian Gulf War)" }
          ],
          400: [
            { q: "Which 1917 revolution led to the overthrow of the Russian monarchy and the eventual rise of the Soviet Union?", a: "The Russian Revolution" },
            { q: "Which 1911 revolution overthrew China's last imperial dynasty, the Qing, and established a republic?", a: "The Xinhai Revolution" },
            { q: "Which revolution, led by Fidel Castro, overthrew the Cuban government of Fulgencio Batista in 1959?", a: "The Cuban Revolution" }
          ],
          500: [
            { q: "Which war, fought between 1950 and 1953, ended in an armistice that still technically leaves North and South Korea in a state of war?", a: "The Korean War" },
            { q: "Which war, fought from 1899 to 1902, saw the British Empire fight against two Boer republics in South Africa?", a: "The Second Boer War" },
            { q: "Which conflict, fought from 1936 to 1939 in Spain, became a proxy battleground for fascist and communist ideologies before World War II?", a: "The Spanish Civil War" }
          ]
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
          100: [
            { q: "What does 'WWW' stand for, the system that lets users navigate linked web pages?", a: "World Wide Web" },
            { q: "What does the 'URL' in a website address stand for?", a: "Uniform Resource Locator" },
            { q: "What is the common term for unwanted junk email sent out in bulk?", a: "Spam" }
          ],
          200: [
            { q: "What social media platform, launched in 2004 by Mark Zuckerberg, was originally created for Harvard students?", a: "Facebook" },
            { q: "What social media platform, known for short posts and rebranded to 'X' in 2023, was originally called Twitter?", a: "Twitter (X)" },
            { q: "What is the common short name for the wireless technology that lets devices connect to a network without cables?", a: "Wi-Fi" }
          ],
          300: [
            { q: "What term describes unwanted or malicious software designed to damage, disrupt, or gain unauthorized access to a computer system?", a: "Malware" },
            { q: "What term describes a network of infected computers controlled remotely to carry out cyberattacks, often without their owners' knowledge?", a: "A botnet" },
            { q: "What term describes tricking people into revealing sensitive information like passwords through fake emails or websites?", a: "Phishing" }
          ],
          400: [
            { q: "What is the term for storing and accessing data and programs over the internet instead of a computer's hard drive?", a: "Cloud computing" },
            { q: "What networking protocol suite, developed in the 1970s, forms the basic communication language of the internet?", a: "TCP/IP" },
            { q: "What decentralized ledger technology underlies cryptocurrencies like Bitcoin?", a: "Blockchain" }
          ],
          500: [
            { q: "What programming language, created by Brendan Eich in just 10 days in 1995, is the primary scripting language used to make websites interactive?", a: "JavaScript" },
            { q: "What was the name of the first computer worm to spread widely via the internet, released in 1988 and named after its creator?", a: "The Morris Worm" },
            { q: "Who is widely credited as the inventor of the World Wide Web while working at CERN in 1989?", a: "Tim Berners-Lee" }
          ]
        }
      },
      {
        name: "Gadgets",
        questions: {
          100: [
            { q: "Which company created the iPhone, first released in 2007?", a: "Apple" },
            { q: "Which company created the PlayStation gaming console?", a: "Sony" },
            { q: "What term describes a phone that combines mobile calling with computer-like features such as apps and internet browsing?", a: "A smartphone" }
          ],
          200: [
            { q: "What wearable device, popularized by companies like Fitbit and Apple, tracks steps, heart rate, and other health metrics?", a: "A fitness tracker (smartwatch)" },
            { q: "Which company created the Echo smart speaker featuring the voice assistant Alexa?", a: "Amazon" },
            { q: "What handheld gaming device, released by Nintendo in 2017, can be used both as a portable device and connected to a TV?", a: "The Nintendo Switch" }
          ],
          300: [
            { q: "What term describes glasses or headsets that overlay digital information onto the real world, as opposed to fully immersive virtual reality?", a: "Augmented reality (AR)" },
            { q: "What term describes a fully computer-generated, immersive environment experienced through a headset that blocks out the real world?", a: "Virtual reality (VR)" },
            { q: "What wireless technology, named after a 10th-century Scandinavian king, allows short-range data exchange between devices like headphones and phones?", a: "Bluetooth" }
          ],
          400: [
            { q: "Which company released the first mass-market e-reader, the Kindle, in 2007?", a: "Amazon" },
            { q: "Which company released the first commercially successful tablet computer, the iPad, in 2010?", a: "Apple" },
            { q: "What was the name of the first portable mobile phone, released by Motorola in 1983 and nicknamed 'the brick'?", a: "The Motorola DynaTAC 8000X" }
          ],
          500: [
            { q: "What was the name of the first commercially successful portable music player, released by Apple in 2001, which helped popularize digital music?", a: "The iPod" },
            { q: "What was the world's first commercially available smartphone, released by IBM in 1994, featuring a touchscreen and built-in apps?", a: "The IBM Simon (Simon Personal Communicator)" },
            { q: "Which company released the first mass-market portable computer, the Osborne 1, in 1981?", a: "Osborne Computer Corporation" }
          ]
        }
      },
      {
        name: "Tech Companies",
        questions: {
          100: [
            { q: "Which company, founded by Bill Gates and Paul Allen in 1975, created the Windows operating system?", a: "Microsoft" },
            { q: "Which company, founded by Mark Zuckerberg, owns Facebook, Instagram, and WhatsApp?", a: "Meta (Meta Platforms)" },
            { q: "Which company, founded by Jeff Bezos, is the world's largest online retailer?", a: "Amazon" }
          ],
          200: [
            { q: "Which search engine company, founded by Larry Page and Sergey Brin in 1998, is now part of the parent company Alphabet?", a: "Google" },
            { q: "Which company, founded in 1997, began as a DVD-by-mail rental service before becoming a global streaming giant?", a: "Netflix" },
            { q: "Which Chinese technology company owns the popular short-video app TikTok?", a: "ByteDance" }
          ],
          300: [
            { q: "Which electric car and clean energy company was founded and is led by Elon Musk?", a: "Tesla" },
            { q: "Which ride-hailing company, founded in 2009, pioneered the modern app-based rideshare industry?", a: "Uber" },
            { q: "Which company, founded by Jack Dorsey and others in 2006, created the microblogging platform now known as X?", a: "Twitter" }
          ],
          400: [
            { q: "Which South Korean company is the world's largest manufacturer of smartphones and semiconductors, alongside making TVs and appliances?", a: "Samsung" },
            { q: "Which Taiwanese company is the world's largest contract manufacturer of semiconductor chips, producing chips for companies like Apple and Nvidia?", a: "TSMC (Taiwan Semiconductor Manufacturing Company)" },
            { q: "Which Japanese company, founded in 1889 originally as a playing card maker, now produces the Nintendo Switch and other gaming consoles?", a: "Nintendo" }
          ],
          500: [
            { q: "Which company did Steve Jobs, Steve Wozniak, and Ronald Wayne co-found in a garage in 1976?", a: "Apple" },
            { q: "Which company did Larry Ellison co-found in 1977, which became one of the world's largest database software companies?", a: "Oracle" },
            { q: "What was the original name of the search engine project at Stanford that would later be renamed Google?", a: "BackRub" }
          ]
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
          100: [
            { q: "What Italian dish consists of a flat, round base topped with tomato sauce, cheese, and various toppings, then baked?", a: "Pizza" },
            { q: "What Mexican dish consists of a folded tortilla filled with meat, cheese, and other toppings?", a: "A taco" },
            { q: "What Indian dish consists of a spiced, simmered sauce, often made with meat, and eaten with rice or bread?", a: "Curry" }
          ],
          200: [
            { q: "What Japanese dish consists of vinegared rice combined with raw fish or other ingredients?", a: "Sushi" },
            { q: "What Thai noodle dish, stir-fried with eggs, tofu or shrimp, and peanuts, is one of the country's most famous exports?", a: "Pad Thai" },
            { q: "What Spanish rice dish, typically made with saffron and seafood or meat, originated in Valencia?", a: "Paella" }
          ],
          300: [
            { q: "What spicy Korean side dish, made from fermented vegetables (usually napa cabbage), is a staple of Korean cuisine?", a: "Kimchi" },
            { q: "What Hungarian dish is a rich stew made with meat and vegetables, heavily seasoned with paprika?", a: "Goulash" },
            { q: "What Middle Eastern dish consists of ground chickpeas blended with tahini, lemon, and garlic into a creamy dip?", a: "Hummus" }
          ],
          400: [
            { q: "What French cooking technique involves slowly cooking food in its own fat at a low temperature, often used for duck?", a: "Confit" },
            { q: "What Moroccan dish, and the cone-shaped clay pot it's cooked in, refers to a slow-cooked stew?", a: "Tagine" },
            { q: "What Japanese cooking technique involves deep-frying battered seafood or vegetables until light and crispy?", a: "Tempura" }
          ],
          500: [
            { q: "What is the name of the fermented soybean paste used as a base for miso soup in Japanese cuisine?", a: "Miso" },
            { q: "What is the name of the fermented, pungent Icelandic dish made from cured shark meat, considered a national delicacy?", a: "Hákarl" },
            { q: "What is the name of the traditional cheese-filled bread from the country of Georgia, shaped like a boat with an egg in the center?", a: "Khachapuri" }
          ]
        }
      },
      {
        name: "Filipino Food",
        questions: {
          100: [
            { q: "What popular Filipino dish is made by marinating meat in vinegar, soy sauce, and garlic, then stewing it?", a: "Adobo" },
            { q: "What popular Filipino sour soup is commonly flavored with tamarind and cooked with pork, shrimp, or fish?", a: "Sinigang" },
            { q: "What is the Filipino version of spring rolls, filled with vegetables and/or meat and then deep-fried?", a: "Lumpia" }
          ],
          200: [
            { q: "What is the name of the Filipino dish of stir-fried rice, often made using leftover rice from the previous day's meal?", a: "Sinangag (garlic fried rice)" },
            { q: "What Filipino dish consists of chicken or pork cooked in coconut milk with chili peppers, popular in the Bicol region?", a: "Bicol Express" },
            { q: "What popular Filipino dish, made from chopped and seasoned pig face and liver, is often served sizzling on a hot plate?", a: "Sisig" }
          ],
          300: [
            { q: "What Filipino noodle dish, brought by Chinese immigrants, is commonly served at birthday celebrations to symbolize long life?", a: "Pancit" },
            { q: "What Filipino stew, often made for special occasions, features beef or goat meat cooked in tomato sauce with liver spread, potatoes, and bell peppers?", a: "Kaldereta" },
            { q: "What Filipino dish consists of pork cooked until tender then deep-fried until crispy, usually served with a vinegar dipping sauce?", a: "Lechon Kawali" }
          ],
          400: [
            { q: "What Filipino dessert consists of layered shaved ice, evaporated milk, and sweetened fruits, beans, and jellies?", a: "Halo-halo" },
            { q: "What Filipino rice cake, made from glutinous rice and coconut milk, is wrapped in banana leaves and often eaten with sugar or mangoes?", a: "Suman" },
            { q: "What Filipino dish is a savory stew made from pork blood, vinegar, and spices?", a: "Dinuguan" }
          ],
          500: [
            { q: "What Visayan roasted pig dish, famous in Cebu, was once named the 'Best Dish in the World' by chef Anthony Bourdain?", a: "Lechon (Cebu lechon)" },
            { q: "What is the name of the traditional Filipino fermented fish or shrimp paste, used as a condiment in dishes like kare-kare?", a: "Bagoong" },
            { q: "What is the name of the traditional fermented rice wine made by the Cordilleran (Igorot) peoples of the Philippine highlands?", a: "Tapuy" }
          ]
        }
      },
      {
        name: "Desserts & Drinks",
        questions: {
          100: [
            { q: "What frozen dessert, typically made from dairy, sugar, and flavorings, is a popular treat worldwide?", a: "Ice cream" },
            { q: "What sweet, carbonated soft drink, invented in 1886 by pharmacist John Pemberton, is one of the world's best-selling beverages?", a: "Coca-Cola" },
            { q: "What warm beverage, made by brewing dried leaves in hot water, is one of the most widely consumed drinks in the world?", a: "Tea" }
          ],
          200: [
            { q: "What Italian coffee drink is made by forcing hot water through finely-ground coffee beans, forming a concentrated shot?", a: "Espresso" },
            { q: "What espresso-based Italian coffee drink, named after a religious order's brown robes, combines espresso with steamed milk and foam?", a: "Cappuccino" },
            { q: "What layered Italian dessert combines coffee-soaked ladyfinger biscuits with mascarpone cheese and cocoa powder?", a: "Tiramisu" }
          ],
          300: [
            { q: "What French dessert consists of a rich custard base topped with a layer of hardened caramelized sugar?", a: "Crème brûlée" },
            { q: "What French pastry consists of delicate almond meringue cookies sandwiched together with a filling like ganache or buttercream?", a: "Macarons" },
            { q: "What Spanish dessert consists of a rich caramel custard, similar to crème brûlée but topped with a soft caramel sauce instead of a hardened crust?", a: "Flan" }
          ],
          400: [
            { q: "What Mexican beverage, made from the fermented agave plant, is the base spirit for margaritas?", a: "Tequila" },
            { q: "What Japanese rice wine, brewed rather than distilled, is traditionally served warm or cold alongside sushi?", a: "Sake" },
            { q: "What Caribbean spirit, distilled from sugarcane byproducts like molasses, is the base for cocktails like the mojito and daiquiri?", a: "Rum" }
          ],
          500: [
            { q: "What is the term for the traditional Ethiopian coffee ceremony, an important social ritual involving roasting beans in front of guests?", a: "The Ethiopian coffee ceremony (Buna)" },
            { q: "What traditional Mexican fermented alcoholic beverage, made from the sap of the maguey (agave) plant, predates tequila and mezcal?", a: "Pulque" },
            { q: "What Scandinavian spiced, mulled wine is traditionally served during the Christmas season, especially in Sweden and Norway?", a: "Glögg" }
          ]
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
          100: [
            { q: "Which physicist developed the theory of general relativity and famously came up with the equation E=mc²?", a: "Albert Einstein" },
            { q: "Which Serbian-American inventor is known for his contributions to the design of the modern alternating current (AC) electricity system?", a: "Nikola Tesla" },
            { q: "Which inventor is credited with developing the practical light bulb and phonograph, holding over 1,000 patents?", a: "Thomas Edison" }
          ],
          200: [
            { q: "Which British scientist proposed the theory of evolution by natural selection in his 1859 book 'On the Origin of Species'?", a: "Charles Darwin" },
            { q: "Which Scottish scientist discovered penicillin in 1928, revolutionizing the treatment of bacterial infections?", a: "Alexander Fleming" },
            { q: "Which Italian astronomer improved the telescope and made key observations supporting the heliocentric model of the solar system?", a: "Galileo Galilei" }
          ],
          300: [
            { q: "Which Polish-French scientist was the first person to win Nobel Prizes in two different scientific fields (Physics and Chemistry)?", a: "Marie Curie" },
            { q: "Which Austrian physicist is known for a famous thought experiment involving a cat that is simultaneously alive and dead?", a: "Erwin Schrödinger" },
            { q: "Which German physicist discovered X-rays in 1895, earning the first-ever Nobel Prize in Physics?", a: "Wilhelm Röntgen" }
          ],
          400: [
            { q: "Which English scientist formulated the laws of motion and universal gravitation, publishing them in his 1687 work 'Principia Mathematica'?", a: "Sir Isaac Newton" },
            { q: "Which French chemist and microbiologist developed the process of pasteurization and pioneered vaccines for rabies and anthrax?", a: "Louis Pasteur" },
            { q: "Which Scottish-born scientist invented and patented the telephone in 1876?", a: "Alexander Graham Bell" }
          ],
          500: [
            { q: "Which British theoretical physicist, known for his work on black holes and the book 'A Brief History of Time', lived most of his life with ALS (motor neurone disease)?", a: "Stephen Hawking" },
            { q: "Which Austrian monk is considered the father of modern genetics for his experiments on pea plant inheritance in the 1860s?", a: "Gregor Mendel" },
            { q: "Which reclusive English scientist is credited with discovering hydrogen and calculating the density of the Earth?", a: "Henry Cavendish" }
          ]
        }
      },
      {
        name: "Leaders & Politicians",
        questions: {
          100: [
            { q: "Who was the first President of the United States?", a: "George Washington" },
            { q: "Who was the first President of the Philippines, credited with proclaiming the country's independence from Spain in 1898?", a: "Emilio Aguinaldo" },
            { q: "Who is the current King of the United Kingdom, having ascended the throne in 2022 after the death of his mother?", a: "King Charles III" }
          ],
          200: [
            { q: "Which South African leader, imprisoned for 27 years for his anti-apartheid activism, became the country's first Black president in 1994?", a: "Nelson Mandela" },
            { q: "Who was the first Black President of the United States, serving two terms from 2009 to 2017?", a: "Barack Obama" },
            { q: "Who was the longest-reigning monarch in British history, reigning for over 70 years until her death in 2022?", a: "Queen Elizabeth II" }
          ],
          300: [
            { q: "Who was the Prime Minister of the United Kingdom during most of World War II, known for his defiant wartime speeches?", a: "Winston Churchill" },
            { q: "Who was the first Prime Minister of independent India, serving from 1947 to 1964?", a: "Jawaharlal Nehru" },
            { q: "Which French general and statesman led the Free French Forces during World War II and later became President of France?", a: "Charles de Gaulle" }
          ],
          400: [
            { q: "Which Filipino president, the 5th President of the Philippines, declared Martial Law in 1972 and ruled for over two decades?", a: "Ferdinand Marcos Sr." },
            { q: "Who was the Philippine senator assassinated at Manila International Airport in 1983, whose death helped spark the People Power Revolution?", a: "Benigno 'Ninoy' Aquino Jr." },
            { q: "Who served as the first Chancellor of a reunified Germany after leading West Germany through reunification in 1990?", a: "Helmut Kohl" }
          ],
          500: [
            { q: "Who was the first female Prime Minister of the United Kingdom, serving from 1979 to 1990 and nicknamed the 'Iron Lady'?", a: "Margaret Thatcher" },
            { q: "Who was the first female President of the Philippines, taking office after the 1986 People Power Revolution?", a: "Corazon Aquino" },
            { q: "Who was the President of Yugoslavia from 1953 until his death in 1980, known for maintaining independence from both NATO and the Soviet bloc?", a: "Josip Broz Tito" }
          ]
        }
      },
      {
        name: "Icons & Innovators",
        questions: {
          100: [
            { q: "Which entrepreneur co-founded Apple and is credited with revolutionizing personal computers, phones, and music players?", a: "Steve Jobs" },
            { q: "Which entrepreneur founded Amazon in 1994 and later founded the aerospace company Blue Origin?", a: "Jeff Bezos" },
            { q: "Which entrepreneur and engineer leads Tesla and SpaceX, and briefly became the world's richest person?", a: "Elon Musk" }
          ],
          200: [
            { q: "Which American civil rights leader delivered the famous 'I Have a Dream' speech in 1963?", a: "Martin Luther King Jr." },
            { q: "Which American entrepreneur co-founded Microsoft and has since become one of the world's leading philanthropists through his foundation?", a: "Bill Gates" },
            { q: "Which world-renowned primatologist is famous for her decades-long study of wild chimpanzees in Tanzania?", a: "Jane Goodall" }
          ],
          300: [
            { q: "Which Filipino boxer became the only eight-division world champion in boxing history and later served as a Philippine senator?", a: "Manny Pacquiao" },
            { q: "Which Brazilian football (soccer) player, widely regarded as one of the greatest of all time, won three FIFA World Cups?", a: "Pelé" },
            { q: "Which Argentine footballer led his country to World Cup victory in 2022 and is considered one of the greatest players in history?", a: "Lionel Messi" }
          ],
          400: [
            { q: "Which media mogul and philanthropist became the first Black woman billionaire, known for her long-running talk show?", a: "Oprah Winfrey" },
            { q: "Which American inventor and businessman is credited with mass-producing the automobile via the moving assembly line, founding a company bearing his name?", a: "Henry Ford" },
            { q: "Which American animator and entrepreneur founded the company known for creating Mickey Mouse and building the first Disneyland theme park?", a: "Walt Disney" }
          ],
          500: [
            { q: "Which women's rights activist and Pakistani education advocate survived a Taliban assassination attempt in 2012 and became the youngest-ever Nobel Prize laureate at age 17?", a: "Malala Yousafzai" },
            { q: "Which Kenyan environmental and political activist became the first African woman to win the Nobel Peace Prize, in 2004, for her work with the Green Belt Movement?", a: "Wangari Maathai" },
            { q: "Which Bangladeshi economist founded the Grameen Bank and pioneered the concept of microcredit, winning the Nobel Peace Prize in 2006?", a: "Muhammad Yunus" }
          ]
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
          100: [
            { q: "What does the term 'E-Commerce' refer to?", a: "Electronic Commerce — buying and selling goods or services online" },
            { q: "What abbreviation refers to buying and selling products through mobile devices like smartphones?", a: "M-Commerce (Mobile Commerce)" },
            { q: "What term describes an online business's digital storefront where customers browse and buy products?", a: "An online store (e-store)" }
          ],
          200: [
            { q: "What abbreviation describes an online business that sells directly to individual customers, like an online clothing store selling to shoppers?", a: "B2C (Business-to-Consumer)" },
            { q: "What abbreviation describes an online transaction between a business and a government agency, such as a company bidding on a government contract online?", a: "B2G (Business-to-Government)" },
            { q: "What term describes the percentage of website visitors who complete a desired action, like making a purchase?", a: "Conversion rate" }
          ],
          300: [
            { q: "What abbreviation describes an online transaction between two businesses, such as a supplier selling materials to a manufacturer?", a: "B2B (Business-to-Business)" },
            { q: "What term describes a business selling products directly to consumers, cutting out traditional retail middlemen?", a: "DTC / D2C (Direct-to-Consumer)" },
            { q: "What term describes the fee an online marketplace charges sellers for each item sold on its platform?", a: "A commission (seller fee)" }
          ],
          400: [
            { q: "What abbreviation describes an online transaction where individual consumers sell directly to other consumers, such as on Facebook Marketplace?", a: "C2C (Consumer-to-Consumer)" },
            { q: "What term describes software that lets businesses build and manage their own online stores, such as Shopify or WooCommerce?", a: "An E-Commerce platform" },
            { q: "What term describes a shopper adding items to an online cart but leaving the site without completing the purchase?", a: "Cart abandonment" }
          ],
          500: [
            { q: "What term describes a retail approach where a business sells to customers through multiple integrated channels at once, such as its website, app, and physical store?", a: "Omnichannel retailing" },
            { q: "What term describes the E-Commerce practice of adjusting product prices in real time based on demand, competition, or other market factors?", a: "Dynamic pricing" },
            { q: "What legal term describes the level of business presence in a state that requires an online retailer to collect that state's sales tax, even without a physical store there?", a: "Economic nexus" }
          ]
        }
      },
      {
        name: "Online Shopping",
        questions: {
          100: [
            { q: "What is the term for the virtual list where online shoppers place items before checking out?", a: "The shopping cart" },
            { q: "What is the term for the final step in online shopping where a customer confirms their order and payment?", a: "Checkout" },
            { q: "What is the term for a saved list of items an online shopper wants to buy later, without adding them to the cart?", a: "A wishlist" }
          ],
          200: [
            { q: "Which Southeast Asian E-Commerce app, recognizable by its orange branding, is one of the most popular online shopping platforms in the Philippines?", a: "Shopee" },
            { q: "Which American E-Commerce giant offers a membership program called Prime, providing free shipping and streaming perks?", a: "Amazon" },
            { q: "What term describes shipping offered at no extra cost to encourage customers to complete an online purchase?", a: "Free shipping" }
          ],
          300: [
            { q: "What term describes a code shoppers enter at checkout to receive a discount on their online order?", a: "A promo code (voucher code)" },
            { q: "What annual U.S. online shopping event, held the Monday after Thanksgiving, is known for major E-Commerce discounts?", a: "Cyber Monday" },
            { q: "What term describes the star ratings and written feedback shoppers leave on a product page to help build trust?", a: "Product reviews (ratings)" }
          ],
          400: [
            { q: "What term describes the E-Commerce practice of showing customers products similar to ones they've viewed or bought, to encourage more sales?", a: "Product recommendations" },
            { q: "What term describes technology that lets online shoppers preview how furniture or products would look in their own space using their phone camera?", a: "Augmented reality (AR) shopping" },
            { q: "What term describes a browser tool that automatically searches for and applies the best available discount codes at online checkout?", a: "A coupon extension" }
          ],
          500: [
            { q: "What annual online shopping event, held every November 11th and popularized by Alibaba, has become one of the world's largest single-day sales events?", a: "11.11 (Singles' Day sale)" },
            { q: "What annual mid-year online shopping festival, held on June 18th and led by JD.com, is one of China's largest E-Commerce sales events?", a: "618 (the Mid-Year Shopping Festival)" },
            { q: "What term describes the E-Commerce practice of using scarcity cues, like 'Only 2 left in stock,' to pressure shoppers into faster purchase decisions?", a: "Scarcity marketing (FOMO marketing)" }
          ]
        }
      },
      {
        name: "Digital Payments",
        questions: {
          100: [
            { q: "What is the general term for a mobile app that lets users store money digitally and pay for purchases using their phone?", a: "A digital wallet (e-wallet)" },
            { q: "What is the general term for a plastic card linked directly to a bank account, deducting funds immediately when used to pay?", a: "A debit card" },
            { q: "What is the general term for a card that lets users borrow money up to a limit to make purchases, paid back later?", a: "A credit card" }
          ],
          200: [
            { q: "Which popular Philippine mobile wallet app, often used for paying bills and online purchases, has a blue-colored logo?", a: "GCash" },
            { q: "Which American digital payment company, founded in 1998 and once part of eBay, is one of the most widely used online payment services worldwide?", a: "PayPal" },
            { q: "Which mobile payment service, built into iPhones, lets users pay by tapping their device at a contactless terminal?", a: "Apple Pay" }
          ],
          300: [
            { q: "What three-letter code do shoppers enter when paying online with a credit or debit card, usually found on the back of the card?", a: "CVV (Card Verification Value)" },
            { q: "What term describes the process by which a bank verifies that a customer has sufficient funds or credit before approving an online transaction?", a: "Authorization" },
            { q: "What term describes a company that processes credit and debit card transactions between merchants, banks, and card networks?", a: "A payment gateway (payment processor)" }
          ],
          400: [
            { q: "What technology allows contactless payments by tapping a card or phone near a payment terminal?", a: "NFC (Near-Field Communication)" },
            { q: "What term describes short-term financing that lets online shoppers split a purchase into smaller installment payments, often interest-free?", a: "BNPL (Buy Now, Pay Later)" },
            { q: "What security standard is widely used to protect sensitive payment card data during online transactions?", a: "PCI DSS (Payment Card Industry Data Security Standard)" }
          ],
          500: [
            { q: "What decentralized digital currency, created in 2009 by the pseudonymous Satoshi Nakamoto, is sometimes accepted as an alternative online payment method?", a: "Bitcoin" },
            { q: "What term describes a digital currency issued and regulated directly by a country's central bank, distinct from decentralized cryptocurrencies?", a: "CBDC (Central Bank Digital Currency)" },
            { q: "What Philippine instant payment system, launched by the central bank in 2018, enables real-time fund transfers between different banks and e-wallets?", a: "InstaPay" }
          ]
        }
      },
      {
        name: "E-Commerce Platforms",
        questions: {
          100: [
            { q: "Which American company, founded by Jeff Bezos in 1994, is the world's largest online marketplace and started out selling only books?", a: "Amazon" },
            { q: "Which Southeast Asian E-Commerce app, recognizable by its orange branding, is one of the region's most popular online shopping platforms?", a: "Shopee" },
            { q: "Which online marketplace, known for handmade, vintage, and craft goods, was founded in 2005?", a: "Etsy" }
          ],
          200: [
            { q: "Which E-Commerce platform, known for its blue branding and popular across the Philippines and Southeast Asia, was originally founded by Rocket Internet in 2012?", a: "Lazada" },
            { q: "Which Chinese E-Commerce company, launched in 2022 and known for ultra-low prices, rapidly expanded across global markets?", a: "Temu" },
            { q: "Which Japanese E-Commerce and internet company, founded in 1997, operates one of Japan's largest online shopping malls?", a: "Rakuten" }
          ],
          300: [
            { q: "Which Chinese E-Commerce company, founded by Jack Ma in 1999, operates platforms like Taobao and AliExpress?", a: "Alibaba" },
            { q: "Which Indian E-Commerce company, founded in 2007 and acquired by Walmart in 2018, is one of India's largest online marketplaces?", a: "Flipkart" },
            { q: "Which South Korean E-Commerce company, listed on the NYSE in 2021, is one of South Korea's largest online retail and delivery platforms?", a: "Coupang" }
          ],
          400: [
            { q: "Which online marketplace, founded in 1995, was one of the first major platforms to popularize consumer-to-consumer online auctions?", a: "eBay" },
            { q: "Which fast-fashion E-Commerce company, founded in China in 2008, became known for ultra-cheap trendy clothing and heavy social media marketing?", a: "Shein" },
            { q: "Which Dutch E-Commerce company is one of Europe's largest online marketplaces, particularly dominant in the Benelux region?", a: "Bol.com" }
          ],
          500: [
            { q: "Which Canadian company provides the software platform that lets businesses set up their own independent online stores, powering brands like Gymshark and Allbirds?", a: "Shopify" },
            { q: "Which Japanese technology conglomerate, founded by Masayoshi Son, has made major investments in E-Commerce and tech companies worldwide through its Vision Fund?", a: "SoftBank" },
            { q: "Which German E-Commerce company, spun off from Rocket Internet in 2008, is one of Europe's leading online fashion platforms?", a: "Zalando" }
          ]
        }
      },
      {
        name: "Online Business",
        questions: {
          100: [
            { q: "What term describes a business that operates entirely online without any physical retail store?", a: "An online store (online-only business)" },
            { q: "What term describes the total money a business earns from sales before subtracting any expenses?", a: "Revenue" },
            { q: "What term describes a unique code assigned to each product a business sells, used to track inventory?", a: "SKU (Stock Keeping Unit)" }
          ],
          200: [
            { q: "What term describes the service that brings an online order from the seller's warehouse to the customer's doorstep?", a: "Delivery (logistics / courier service)" },
            { q: "What term describes the process of storing, packing, and shipping inventory on behalf of an online seller, often outsourced to a third party?", a: "Fulfillment (order fulfillment)" },
            { q: "What term describes the number a customer uses to monitor their package's journey from warehouse to doorstep?", a: "A tracking number" }
          ],
          300: [
            { q: "What term describes online advertising strategies, such as social media ads and influencer marketing, used to promote products and drive sales?", a: "Digital marketing" },
            { q: "What term describes paying social media personalities to promote a brand's products to their followers?", a: "Influencer marketing" },
            { q: "What term describes online advertising where a business pays a fee each time someone clicks its ad?", a: "PPC (Pay-Per-Click) advertising" }
          ],
          400: [
            { q: "What term describes a customer's overall satisfaction throughout the process of browsing, purchasing, and receiving an online order?", a: "Customer experience (CX)" },
            { q: "What term describes the total revenue a business expects to earn from a single customer over the entire span of their relationship?", a: "Customer lifetime value (CLV)" },
            { q: "What term describes the percentage of customers who stop doing business with a company over a given period?", a: "Churn rate" }
          ],
          500: [
            { q: "What business model lets entrepreneurs sell products online without holding any inventory themselves, since the supplier ships directly to the customer?", a: "Dropshipping" },
            { q: "What term describes selling generic products under a company's own brand name as if they were uniquely manufactured for it?", a: "Private labeling (white labeling)" },
            { q: "What metric measures how much a business spends on marketing to acquire a single new customer?", a: "CAC (Customer Acquisition Cost)" }
          ]
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

// Quiz Night bonus tile events. Adding a new event here is enough to put it
// into rotation — no other code needs to change. `requiresOpponent: true`
// excludes an event from the draw when fewer than 2 teams are playing, so a
// solo board never rolls something it can't resolve.
const QUIZ_BONUS_EVENTS = [
  { type: "points", icon: "⭐", name: "Bonus Points", desc: "A burst of good luck — free points, no question required." },
  { type: "double", icon: "✌️", name: "Double Points", desc: "This team's next correct answer is worth double points." },
  { type: "steal", icon: "🥷", name: "Steal", desc: "Take points from a rival team.", requiresOpponent: true },
  { type: "risk", icon: "🎲", name: "Risk It", desc: "Wager points on a coin flip — double or nothing.", requiresOpponent: true },
  { type: "freepass", icon: "🎟️", name: "Free Pass", desc: "Bank a one-time pass to claim credit for a missed question later." },
  { type: "lucky", icon: "🍀", name: "Lucky Draw", desc: "The fates decide — could be a windfall, could be nothing." }
];
