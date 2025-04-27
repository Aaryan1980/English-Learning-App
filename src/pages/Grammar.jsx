import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import grammarData from '../data/grammarData';
import shuffleArray from '../utils/shuffleArray';
import '../styles/Grammar.css';

const Grammar = ({ updateProgress }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  // Initialize game with shuffled questions
  useEffect(() => {
    setQuestions(shuffleArray(grammarData).slice(0, 10)); // Get 10 random questions
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
    
    // Show explanation immediately
    setShowExplanation(true);
    
    // Move to next question after delay
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
        setIsCorrect(null);
        setShowExplanation(false);
      } else {
        setShowResults(true);
        
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
    }, 3000); // Longer delay to allow reading the explanation
  };

  const formatSentence = (sentence, selectedOption) => {
    if (!selectedOption) {
      return sentence;
    }
    
    return sentence.replace('___', `<span class="selected-answer ${isCorrect ? 'correct' : 'wrong'}">${selectedOption.text}</span>`);
  };

  const restartGame = () => {
    setQuestions(shuffleArray(grammarData).slice(0, 10));
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsCorrect(null);
    setScore(0);
    setShowResults(false);
    setShowExplanation(false);
  };

  // Page animations
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  if (questions.length === 0) {
    return (
      <div className="game-page grammar-game">
        <Navbar />
        <div className="container loading-container">
          <div className="loading">Loading questions...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="game-page grammar-game">
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
              <h1>Grammar Quiz</h1>
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
                <div 
                  className="sentence" 
                  dangerouslySetInnerHTML={{ 
                    __html: formatSentence(currentQuestion.sentence, selectedOption) 
                  }}
                ></div>
                
                <div className="options-list">
                  {currentQuestion.options.map((option) => (
                    <motion.div
                      key={option.id}
                      className={`option ${selectedOption === option ? (isCorrect ? 'correct' : 'wrong') : ''}`}
                      onClick={() => handleOptionSelect(option)}
                      whileHover={{ scale: selectedOption === null ? 1.03 : 1 }}
                      whileTap={{ scale: selectedOption === null ? 0.98 : 1 }}
                    >
                      {option.text}
                    </motion.div>
                  ))}
                </div>
                
                {showExplanation && (
                  <motion.div 
                    className="explanation"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3>Explanation:</h3>
                    <p>{currentQuestion.explanation}</p>
                  </motion.div>
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

export default Grammar; 