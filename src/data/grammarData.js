// Grammar game data
// Each item has a sentence with a blank, 4 options, and an explanation

const grammarData = [
  {
    id: 1,
    sentence: "I ___ a student.",
    options: [
      { id: 1, text: "am", correct: true },
      { id: 2, text: "is", correct: false },
      { id: 3, text: "are", correct: false },
      { id: 4, text: "be", correct: false }
    ],
    explanation: "Use 'am' with the pronoun 'I' in present tense.",
    difficulty: "easy"
  },
  {
    id: 2,
    sentence: "She ___ to school every day.",
    options: [
      { id: 1, text: "go", correct: false },
      { id: 2, text: "goes", correct: true },
      { id: 3, text: "going", correct: false },
      { id: 4, text: "went", correct: false }
    ],
    explanation: "Use 'goes' with third-person singular subjects (he/she/it) in present simple tense.",
    difficulty: "easy"
  },
  {
    id: 3,
    sentence: "They ___ not like pizza.",
    options: [
      { id: 1, text: "do", correct: true },
      { id: 2, text: "does", correct: false },
      { id: 3, text: "is", correct: false },
      { id: 4, text: "are", correct: false }
    ],
    explanation: "Use 'do' with plural subjects for negative sentences in present simple.",
    difficulty: "easy"
  },
  {
    id: 4,
    sentence: "We ___ dinner when you called.",
    options: [
      { id: 1, text: "are having", correct: false },
      { id: 2, text: "have", correct: false },
      { id: 3, text: "were having", correct: true },
      { id: 4, text: "had", correct: false }
    ],
    explanation: "Use past continuous (were having) to describe an action in progress at a specific time in the past.",
    difficulty: "medium"
  },
  {
    id: 5,
    sentence: "I ___ this book already.",
    options: [
      { id: 1, text: "read", correct: false },
      { id: 2, text: "have read", correct: true },
      { id: 3, text: "am reading", correct: false },
      { id: 4, text: "was reading", correct: false }
    ],
    explanation: "Use present perfect (have read) to talk about experiences that happened at an unspecified time in the past.",
    difficulty: "medium"
  },
  {
    id: 6,
    sentence: "If it rains tomorrow, we ___ at home.",
    options: [
      { id: 1, text: "stay", correct: false },
      { id: 2, text: "will stay", correct: true },
      { id: 3, text: "would stay", correct: false },
      { id: 4, text: "are staying", correct: false }
    ],
    explanation: "In first conditional sentences (for possible future situations), we use 'will + verb' in the main clause.",
    difficulty: "medium"
  },
  {
    id: 7,
    sentence: "You should ___ more water.",
    options: [
      { id: 1, text: "drinking", correct: false },
      { id: 2, text: "drink", correct: true },
      { id: 3, text: "to drink", correct: false },
      { id: 4, text: "drank", correct: false }
    ],
    explanation: "After modal verbs like 'should', use the base form of the verb without 'to'.",
    difficulty: "easy"
  },
  {
    id: 8,
    sentence: "I don't have ___ money.",
    options: [
      { id: 1, text: "some", correct: false },
      { id: 2, text: "a", correct: false },
      { id: 3, text: "any", correct: true },
      { id: 4, text: "many", correct: false }
    ],
    explanation: "Use 'any' in negative sentences with uncountable nouns like 'money'.",
    difficulty: "medium"
  },
  {
    id: 9,
    sentence: "This is the book ___ I told you about.",
    options: [
      { id: 1, text: "who", correct: false },
      { id: 2, text: "what", correct: false },
      { id: 3, text: "that", correct: true },
      { id: 4, text: "where", correct: false }
    ],
    explanation: "Use 'that' as a relative pronoun to refer to things.",
    difficulty: "medium"
  },
  {
    id: 10,
    sentence: "I wish I ___ a doctor.",
    options: [
      { id: 1, text: "am", correct: false },
      { id: 2, text: "was", correct: true },
      { id: 3, text: "were", correct: false },
      { id: 4, text: "will be", correct: false }
    ],
    explanation: "After 'wish', use the past simple to talk about present wishes.",
    difficulty: "hard"
  },
  {
    id: 11,
    sentence: "By the time we arrived, the movie ___.",
    options: [
      { id: 1, text: "started", correct: false },
      { id: 2, text: "has started", correct: false },
      { id: 3, text: "was starting", correct: false },
      { id: 4, text: "had started", correct: true }
    ],
    explanation: "Use past perfect (had started) to describe an action that was completed before another action in the past.",
    difficulty: "hard"
  },
  {
    id: 12,
    sentence: "She ___ be at home, but I'm not sure.",
    options: [
      { id: 1, text: "must", correct: false },
      { id: 2, text: "might", correct: true },
      { id: 3, text: "can", correct: false },
      { id: 4, text: "would", correct: false }
    ],
    explanation: "Use 'might' to express possibility when you're not certain.",
    difficulty: "hard"
  },
  {
    id: 13,
    sentence: "If I ___ rich, I would travel the world.",
    options: [
      { id: 1, text: "am", correct: false },
      { id: 2, text: "was", correct: false },
      { id: 3, text: "were", correct: true },
      { id: 4, text: "would be", correct: false }
    ],
    explanation: "In second conditional sentences (for hypothetical situations), we use 'were' for all subjects in the if-clause.",
    difficulty: "hard"
  },
  {
    id: 14,
    sentence: "They suggested ___ a different restaurant.",
    options: [
      { id: 1, text: "try", correct: false },
      { id: 2, text: "to try", correct: false },
      { id: 3, text: "trying", correct: true },
      { id: 4, text: "tried", correct: false }
    ],
    explanation: "After 'suggest', use the gerund form (verb + ing).",
    difficulty: "hard"
  },
  {
    id: 15,
    sentence: "You ___ to finish your homework before watching TV.",
    options: [
      { id: 1, text: "supposed", correct: false },
      { id: 2, text: "are supposed", correct: true },
      { id: 3, text: "supposing", correct: false },
      { id: 4, text: "suppose", correct: false }
    ],
    explanation: "Use 'are supposed to' to talk about what is expected or required.",
    difficulty: "medium"
  }
];

export default grammarData; 