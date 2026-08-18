// Word pairs per theme. Each pair = { main, spy }.
// The Spy gets `spy`, everyone else gets `main`. Words in a pair are related
// but distinct, so the Spy can bluff without knowing the real word.
const SPY_THEMES = {
  "Profession": [
    { main: "Doctor", spy: "Nurse" },
    { main: "Chef", spy: "Waiter" },
    { main: "Teacher", spy: "Principal" },
    { main: "Police Officer", spy: "Security Guard" },
    { main: "Pilot", spy: "Flight Attendant" },
    { main: "Firefighter", spy: "Paramedic" },
    { main: "Photographer", spy: "Videographer" },
    { main: "Lawyer", spy: "Judge" },
    { main: "Architect", spy: "Engineer" },
    { main: "Farmer", spy: "Gardener" }
  ],
  "Food": [
    { main: "Pizza", spy: "Pasta" },
    { main: "Burger", spy: "Hot Dog" },
    { main: "Sushi", spy: "Ramen" },
    { main: "Taco", spy: "Burrito" },
    { main: "Pancake", spy: "Waffle" },
    { main: "Fried Rice", spy: "Noodles" },
    { main: "Sandwich", spy: "Wrap" },
    { main: "Donut", spy: "Cupcake" },
    { main: "Ice Cream", spy: "Frozen Yogurt" },
    { main: "Dumpling", spy: "Spring Roll" }
  ],
  "Vegetables": [
    { main: "Carrot", spy: "Sweet Potato" },
    { main: "Broccoli", spy: "Cauliflower" },
    { main: "Spinach", spy: "Lettuce" },
    { main: "Potato", spy: "Yam" },
    { main: "Onion", spy: "Garlic" },
    { main: "Cucumber", spy: "Zucchini" },
    { main: "Bell Pepper", spy: "Chili Pepper" },
    { main: "Corn", spy: "Peas" },
    { main: "Cabbage", spy: "Kale" },
    { main: "Eggplant", spy: "Squash" }
  ],
  "Fruit": [
    { main: "Apple", spy: "Pear" },
    { main: "Banana", spy: "Plantain" },
    { main: "Mango", spy: "Papaya" },
    { main: "Orange", spy: "Tangerine" },
    { main: "Strawberry", spy: "Raspberry" },
    { main: "Watermelon", spy: "Cantaloupe" },
    { main: "Grapes", spy: "Cherries" },
    { main: "Pineapple", spy: "Coconut" },
    { main: "Lemon", spy: "Lime" },
    { main: "Peach", spy: "Nectarine" }
  ],
  "Animals": [
    { main: "Lion", spy: "Tiger" },
    { main: "Dog", spy: "Wolf" },
    { main: "Cat", spy: "Leopard" },
    { main: "Elephant", spy: "Rhino" },
    { main: "Dolphin", spy: "Shark" },
    { main: "Eagle", spy: "Hawk" },
    { main: "Horse", spy: "Zebra" },
    { main: "Rabbit", spy: "Hare" },
    { main: "Penguin", spy: "Seal" },
    { main: "Monkey", spy: "Gorilla" }
  ],
  "Famous Places in the Philippines": [
    { main: "Boracay", spy: "Palawan" },
    { main: "Chocolate Hills", spy: "Banaue Rice Terraces" },
    { main: "Mayon Volcano", spy: "Taal Volcano" },
    { main: "Intramuros", spy: "Fort Santiago" },
    { main: "Rizal Park", spy: "Manila Bay" },
    { main: "Vigan", spy: "Sagada" },
    { main: "Siargao", spy: "Bohol" },
    { main: "Mall of Asia", spy: "SM North EDSA" },
    { main: "Divisoria", spy: "Quiapo" },
    { main: "Baguio", spy: "Tagaytay" }
  ]
};

const SPY_THEME_ICONS = {
  "Profession": "💼",
  "Food": "🍕",
  "Vegetables": "🥦",
  "Fruit": "🍉",
  "Animals": "🦁",
  "Famous Places in the Philippines": "🏝️"
};
