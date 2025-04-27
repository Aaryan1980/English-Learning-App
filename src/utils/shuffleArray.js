/**
 * Shuffles array elements using Fisher-Yates algorithm
 * @param {Array} array - The array to shuffle
 * @returns {Array} A new shuffled array
 */
const shuffleArray = (array) => {
  // Create a copy of the original array
  const shuffledArray = [...array];
  
  // Fisher-Yates shuffle algorithm
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    // Generate random index between 0 and i
    const j = Math.floor(Math.random() * (i + 1));
    
    // Swap elements at i and j
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  
  return shuffledArray;
};

export default shuffleArray; 