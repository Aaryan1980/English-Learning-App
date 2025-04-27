// Listening game data
// In a real app, we would have audio files
// For this demo, we'll display text as if it were played as audio

const listeningData = [
  {
    id: 1,
    audio: "What time is it?",
    options: [
      { id: 1, text: "What time is it?", correct: true },
      { id: 2, text: "What day is it?", correct: false },
      { id: 3, text: "Where is the time?", correct: false },
      { id: 4, text: "When is the time?", correct: false }
    ],
    difficulty: "easy"
  },
  {
    id: 2,
    audio: "She goes to work by bus every morning.",
    options: [
      { id: 1, text: "She goes to school by bus every morning.", correct: false },
      { id: 2, text: "She goes to work by car every morning.", correct: false },
      { id: 3, text: "She goes to work by bus every morning.", correct: true },
      { id: 4, text: "She goes to work by bus every evening.", correct: false }
    ],
    difficulty: "easy"
  },
  {
    id: 3,
    audio: "Where is the nearest supermarket?",
    options: [
      { id: 1, text: "Where is the farthest supermarket?", correct: false },
      { id: 2, text: "Where is the nearest restaurant?", correct: false },
      { id: 3, text: "Where is the nearest supermarket?", correct: true },
      { id: 4, text: "What is the nearest supermarket?", correct: false }
    ],
    difficulty: "easy"
  },
  {
    id: 4,
    audio: "I've been living in this city for three years.",
    options: [
      { id: 1, text: "I've been living in this city for three years.", correct: true },
      { id: 2, text: "I've been living in this city for three months.", correct: false },
      { id: 3, text: "I've been working in this city for three years.", correct: false },
      { id: 4, text: "I'll be living in this city for three years.", correct: false }
    ],
    difficulty: "medium"
  },
  {
    id: 5,
    audio: "Could you please tell me how to get to the train station?",
    options: [
      { id: 1, text: "Could you please tell me where is the train station?", correct: false },
      { id: 2, text: "Could you please tell me how to get to the bus station?", correct: false },
      { id: 3, text: "Could you please tell me how to get to the train station?", correct: true },
      { id: 4, text: "Would you please tell me how to get to the train station?", correct: false }
    ],
    difficulty: "medium"
  },
  {
    id: 6,
    audio: "I'd like a table for two, please.",
    options: [
      { id: 1, text: "I'd like a table for two, please.", correct: true },
      { id: 2, text: "I'd like a table for three, please.", correct: false },
      { id: 3, text: "I'd like a room for two, please.", correct: false },
      { id: 4, text: "I'd like to book for two, please.", correct: false }
    ],
    difficulty: "easy"
  },
  {
    id: 7,
    audio: "If it rains tomorrow, we'll have to cancel the picnic.",
    options: [
      { id: 1, text: "If it snows tomorrow, we'll have to cancel the picnic.", correct: false },
      { id: 2, text: "If it rains tomorrow, we'll have to postpone the picnic.", correct: false },
      { id: 3, text: "If it rains tomorrow, we'll have to cancel the party.", correct: false },
      { id: 4, text: "If it rains tomorrow, we'll have to cancel the picnic.", correct: true }
    ],
    difficulty: "medium"
  },
  {
    id: 8,
    audio: "She's been studying English for five years, but she still finds it difficult.",
    options: [
      { id: 1, text: "She's been studying French for five years, but she still finds it difficult.", correct: false },
      { id: 2, text: "She's been studying English for five years, but she still finds it difficult.", correct: true },
      { id: 3, text: "She's been studying English for five months, but she still finds it difficult.", correct: false },
      { id: 4, text: "She's been studying English for five years, but she now finds it easy.", correct: false }
    ],
    difficulty: "hard"
  },
  {
    id: 9,
    audio: "The flight to London has been delayed due to bad weather conditions.",
    options: [
      { id: 1, text: "The flight to Paris has been delayed due to bad weather conditions.", correct: false },
      { id: 2, text: "The flight to London has been delayed due to technical problems.", correct: false },
      { id: 3, text: "The flight to London has been delayed due to bad weather conditions.", correct: true },
      { id: 4, text: "The flight to London has been cancelled due to bad weather conditions.", correct: false }
    ],
    difficulty: "hard"
  },
  {
    id: 10,
    audio: "Would you mind if I opened the window? It's a bit stuffy in here.",
    options: [
      { id: 1, text: "Would you mind if I closed the window? It's a bit stuffy in here.", correct: false },
      { id: 2, text: "Would you mind if I opened the window? It's a bit cold in here.", correct: false },
      { id: 3, text: "Would you mind if I opened the door? It's a bit stuffy in here.", correct: false },
      { id: 4, text: "Would you mind if I opened the window? It's a bit stuffy in here.", correct: true }
    ],
    difficulty: "hard"
  },
  {
    id: 11,
    audio: "I've been trying to reach you all day. Where have you been?",
    options: [
      { id: 1, text: "I've been trying to reach you all day. Where have you been?", correct: true },
      { id: 2, text: "I've been trying to reach you all week. Where have you been?", correct: false },
      { id: 3, text: "I've been trying to call you all day. Where have you been?", correct: false },
      { id: 4, text: "I've been trying to reach you all day. What have you been doing?", correct: false }
    ],
    difficulty: "medium"
  },
  {
    id: 12,
    audio: "The museum is open from 9 AM to 5 PM, Tuesday through Sunday.",
    options: [
      { id: 1, text: "The museum is open from 9 AM to 5 PM, Monday through Friday.", correct: false },
      { id: 2, text: "The museum is open from 9 AM to 6 PM, Tuesday through Sunday.", correct: false },
      { id: 3, text: "The museum is open from 9 AM to 5 PM, Tuesday through Sunday.", correct: true },
      { id: 4, text: "The museum is open from 10 AM to 5 PM, Tuesday through Sunday.", correct: false }
    ],
    difficulty: "hard"
  },
  {
    id: 13,
    audio: "Can you help me carry these bags to the car?",
    options: [
      { id: 1, text: "Can you help me carry this bag to the car?", correct: false },
      { id: 2, text: "Can you help me carry these bags to the car?", correct: true },
      { id: 3, text: "Can you help me carry these bags to the bus?", correct: false },
      { id: 4, text: "Can you help me take these bags to the car?", correct: false }
    ],
    difficulty: "easy"
  },
  {
    id: 14,
    audio: "We should arrive at the airport at least two hours before our flight.",
    options: [
      { id: 1, text: "We should arrive at the airport at least three hours before our flight.", correct: false },
      { id: 2, text: "We should arrive at the station at least two hours before our flight.", correct: false },
      { id: 3, text: "We should arrive at the airport at least two hours before our flight.", correct: true },
      { id: 4, text: "We should arrive at the airport at least two hours before departure.", correct: false }
    ],
    difficulty: "medium"
  },
  {
    id: 15,
    audio: "I'm sorry, but I don't think I'll be able to make it to your birthday party.",
    options: [
      { id: 1, text: "I'm sorry, but I don't think I'll be able to make it to your wedding.", correct: false },
      { id: 2, text: "I'm sorry, but I don't think I'll be able to make it to your birthday party.", correct: true },
      { id: 3, text: "I'm sorry, but I don't think I can come to your birthday party.", correct: false },
      { id: 4, text: "I'm sorry, but I don't think I want to come to your birthday party.", correct: false }
    ],
    difficulty: "medium"
  },
  {
    id: 16,
    audio: "The conference has been rescheduled for next Thursday at 2 PM.",
    options: [
      { id: 1, text: "The conference has been rescheduled for next Thursday at 2 PM.", correct: true },
      { id: 2, text: "The conference has been rescheduled for next Tuesday at 2 PM.", correct: false },
      { id: 3, text: "The conference has been rescheduled for next Thursday at 3 PM.", correct: false },
      { id: 4, text: "The meeting has been rescheduled for next Thursday at 2 PM.", correct: false }
    ],
    difficulty: "hard"
  },
  {
    id: 17,
    audio: "Could you recommend a good restaurant nearby?",
    options: [
      { id: 1, text: "Could you recommend a good restaurant nearby?", correct: true },
      { id: 2, text: "Could you recommend a good cafe nearby?", correct: false },
      { id: 3, text: "Would you recommend a good restaurant nearby?", correct: false },
      { id: 4, text: "Could you recommend a good restaurant downtown?", correct: false }
    ],
    difficulty: "easy"
  },
  {
    id: 18,
    audio: "I've been thinking about changing careers and moving into the tech industry.",
    options: [
      { id: 1, text: "I've been thinking about changing jobs and moving into the tech industry.", correct: false },
      { id: 2, text: "I've been thinking about changing careers and moving into the tech sector.", correct: false },
      { id: 3, text: "I've been thinking about changing careers and moving into the tech industry.", correct: true },
      { id: 4, text: "I'm thinking about changing careers and moving into the tech industry.", correct: false }
    ],
    difficulty: "hard"
  },
  {
    id: 19,
    audio: "The documentary we watched last night was really interesting.",
    options: [
      { id: 1, text: "The documentary we saw last night was really interesting.", correct: false },
      { id: 2, text: "The movie we watched last night was really interesting.", correct: false },
      { id: 3, text: "The documentary we watched last week was really interesting.", correct: false },
      { id: 4, text: "The documentary we watched last night was really interesting.", correct: true }
    ],
    difficulty: "medium"
  },
  {
    id: 20,
    audio: "Remember to bring your umbrella tomorrow, as there's a chance of rain in the afternoon.",
    options: [
      { id: 1, text: "Remember to bring your umbrella tomorrow, as there's a chance of rain in the evening.", correct: false },
      { id: 2, text: "Remember to bring your umbrella tomorrow, as there's a chance of rain in the afternoon.", correct: true },
      { id: 3, text: "Remember to bring your raincoat tomorrow, as there's a chance of rain in the afternoon.", correct: false },
      { id: 4, text: "Don't forget to bring your umbrella tomorrow, as there's a chance of rain in the afternoon.", correct: false }
    ],
    difficulty: "hard"
  }
];

export default listeningData; 