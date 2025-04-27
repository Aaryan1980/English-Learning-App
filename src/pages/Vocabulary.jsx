import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import vocabularyData from '../data/vocabularyData';
import shuffleArray from '../utils/shuffleArray';
import '../styles/Vocabulary.css';

const Vocabulary = ({ updateProgress }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  // Initialize game with shuffled questions
  useEffect(() => {
    setQuestions(shuffleArray(vocabularyData).slice(0, 10)); // Get 10 random questions
  }, []);

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionSelect = (option) => {
    if (selectedOption !== null) return; // Prevent multiple selections
    
    setSelectedOption(option);
    const correct = option.correct;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(score + 1);
    }
    
    // Move to next question after delay
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
        setIsCorrect(null);
      } else {
        setShowResults(true);
        setGameCompleted(true);
        
        // Update progress if perfect score
        if (score + (correct ? 1 : 0) === questions.length) {
          // Check if daily challenge should be completed
          const dailyChallenge = JSON.parse(localStorage.getItem('dailyChallenge') || '{}');
          if (!dailyChallenge.completed) {
            const updatedChallenge = { ...dailyChallenge, completed: true };
            localStorage.setItem('dailyChallenge', JSON.stringify(updatedChallenge));
          }
        }
        
        // Update overall progress
        updateProgress(score + (correct ? 1 : 0));
      }
    }, 1500);
  };

  const restartGame = () => {
    setQuestions(shuffleArray(vocabularyData).slice(0, 10));
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsCorrect(null);
    setScore(0);
    setShowResults(false);
  };

  // Page animations
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  if (questions.length === 0) {
    return (
      <div className="game-page vocabulary-game">
        <Navbar />
        <div className="container loading-container">
          <div className="loading">Loading questions...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="game-page vocabulary-game">
      <Navbar />
      
      <motion.div
        className="game-container container"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={{ duration: 0.4 }}
      >
        {!showResults ? (
          <>
            <div className="game-header">
              <h1>Vocabulary Match</h1>
              <div className="game-progress">
                <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="game-content">
              <div className="question-card">
                <h2 className="word-to-match">{currentQuestion.word}</h2>
                <p className="instruction">Select the matching image:</p>
                
                <div className="options-grid">
                  {currentQuestion.options.map((option) => (
                    <motion.div
                      key={option.id}
                      className={`option ${selectedOption === option ? (isCorrect ? 'correct' : 'wrong') : ''}`}
                      onClick={() => handleOptionSelect(option)}
                      whileHover={{ scale: selectedOption === null ? 1.05 : 1 }}
                      whileTap={{ scale: selectedOption === null ? 0.95 : 1 }}
                    >
                      <span className="option-image">{option.image}</span>
                    </motion.div>
                  ))}
                </div>
                
                {isCorrect !== null && (
                  <div className={`feedback ${isCorrect ? 'correct-feedback' : 'wrong-feedback'}`}>
                    {isCorrect ? 'Correct!' : 'Incorrect!'}
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="results-container">
            <h1>Results</h1>
            <div className="score-display">
              <div className="score-circle">
                <span className="score-number">{score}</span>
                <span className="score-total">/ {questions.length}</span>
              </div>
              <h2 className="score-text">
                {score === questions.length
                  ? 'Perfect! 🎉'
                  : score >= questions.length * 0.7
                  ? 'Great job! 👏'
                  : 'Good effort! 👍'}
              </h2>
            </div>
            
            <div className="action-buttons">
              <Button onClick={restartGame} variant="primary">
                Play Again
              </Button>
              <Button to="/" variant="outline">
                Back to Home
              </Button>
            </div>
          </div>
        )}
      </motion.div>
      
      <Footer />
    </div>
  );
};

export default Vocabulary; 