// Vocabulary game data
// Each question has a word and 4 image options (represented by emojis)

const vocabularyData = [
  {
    id: 1,
    word: "Apple",
    options: [
      { id: 1, image: "🍎", correct: true },
      { id: 2, image: "🍌", correct: false },
      { id: 3, image: "🍊", correct: false },
      { id: 4, image: "🍇", correct: false }
    ],
    difficulty: "easy"
  },
  {
    id: 2,
    word: "House",
    options: [
      { id: 1, image: "🏢", correct: false },
      { id: 2, image: "🏠", correct: true },
      { id: 3, image: "🏫", correct: false },
      { id: 4, image: "⛪", correct: false }
    ],
    difficulty: "easy"
  },
  {
    id: 3,
    word: "Dog",
    options: [
      { id: 1, image: "🐱", correct: false },
      { id: 2, image: "🐭", correct: false },
      { id: 3, image: "🐰", correct: false },
      { id: 4, image: "🐶", correct: true }
    ],
    difficulty: "easy"
  },
  {
    id: 4,
    word: "Car",
    options: [
      { id: 1, image: "🚗", correct: true },
      { id: 2, image: "🚲", correct: false },
      { id: 3, image: "✈️", correct: false },
      { id: 4, image: "🚢", correct: false }
    ],
    difficulty: "easy"
  },
  {
    id: 5,
    word: "Book",
    options: [
      { id: 1, image: "📱", correct: false },
      { id: 2, image: "📺", correct: false },
      { id: 3, image: "📚", correct: true },
      { id: 4, image: "💻", correct: false }
    ],
    difficulty: "easy"
  },
  {
    id: 6,
    word: "Moon",
    options: [
      { id: 1, image: "☀️", correct: false },
      { id: 2, image: "🌙", correct: true },
      { id: 3, image: "⭐", correct: false },
      { id: 4, image: "☁️", correct: false }
    ],
    difficulty: "medium"
  },
  {
    id: 7,
    word: "Hospital",
    options: [
      { id: 1, image: "🏫", correct: false },
      { id: 2, image: "🏢", correct: false },
      { id: 3, image: "🏥", correct: true },
      { id: 4, image: "🏨", correct: false }
    ],
    difficulty: "medium"
  },
  {
    id: 8,
    word: "Mountain",
    options: [
      { id: 1, image: "🌋", correct: false },
      { id: 2, image: "⛰️", correct: true },
      { id: 3, image: "🏝️", correct: false },
      { id: 4, image: "🏜️", correct: false }
    ],
    difficulty: "medium"
  },
  {
    id: 9,
    word: "Bicycle",
    options: [
      { id: 1, image: "🚗", correct: false },
      { id: 2, image: "🏍️", correct: false },
      { id: 3, image: "🚲", correct: true },
      { id: 4, image: "🛴", correct: false }
    ],
    difficulty: "medium"
  },
  {
    id: 10,
    word: "Clock",
    options: [
      { id: 1, image: "⏰", correct: true },
      { id: 2, image: "📱", correct: false },
      { id: 3, image: "💻", correct: false },
      { id: 4, image: "📺", correct: false }
    ],
    difficulty: "medium"
  },
  {
    id: 11,
    word: "Umbrella",
    options: [
      { id: 1, image: "🧥", correct: false },
      { id: 2, image: "👒", correct: false },
      { id: 3, image: "☂️", correct: true },
      { id: 4, image: "🧣", correct: false }
    ],
    difficulty: "hard"
  },
  {
    id: 12,
    word: "Vegetables",
    options: [
      { id: 1, image: "🍎", correct: false },
      { id: 2, image: "🥦", correct: true },
      { id: 3, image: "🍗", correct: false },
      { id: 4, image: "🍞", correct: false }
    ],
    difficulty: "hard"
  },
  {
    id: 13,
    word: "Factory",
    options: [
      { id: 1, image: "🏭", correct: true },
      { id: 2, image: "🏢", correct: false },
      { id: 3, image: "🏥", correct: false },
      { id: 4, image: "🏠", correct: false }
    ],
    difficulty: "hard"
  },
  {
    id: 14,
    word: "Camera",
    options: [
      { id: 1, image: "📱", correct: false },
      { id: 2, image: "💻", correct: false },
      { id: 3, image: "📷", correct: true },
      { id: 4, image: "📺", correct: false }
    ],
    difficulty: "hard"
  },
  {
    id: 15,
    word: "Castle",
    options: [
      { id: 1, image: "🏠", correct: false },
      { id: 2, image: "🏰", correct: true },
      { id: 3, image: "🏢", correct: false },
      { id: 4, image: "⛪", correct: false }
    ],
    difficulty: "hard"
  }
];

export default vocabularyData; 