import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import spellingData from '../data/spellingData';
import shuffleArray from '../utils/shuffleArray';
import '../styles/Spelling.css';

const Spelling = ({ updateProgress }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null); // null, 'correct', 'incorrect'
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  
  const inputRef = useRef(null);

  // Initialize game with shuffled questions
  useEffect(() => {
    setQuestions(shuffleArray(spellingData).slice(0, 10)); // Get 10 random questions
  }, []);

  // Focus input when question changes
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentQuestionIndex]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (feedback !== null) {
      // If already submitted, move to next question
      moveToNextQuestion();
      return;
    }
    
    // Compare user answer with correct spelling (case insensitive)
    const isCorrect = userAnswer.trim().toLowerCase() === currentQuestion.word.toLowerCase();
    
    if (isCorrect) {
      setFeedback('correct');
      setScore(score + 1);
    } else {
      setFeedback('incorrect');
      setShowCorrectAnswer(true);
    }
    
    // Wait before moving to next question
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        moveToNextQuestion();
      } else {
        finishGame();
      }
    }, isCorrect ? 1500 : 3000); // Longer delay if incorrect to see the correct answer
  };

  const moveToNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setUserAnswer('');
    setFeedback(null);
    setShowCorrectAnswer(false);
  };

  const finishGame = () => {
    setShowResults(true);
    
    // Update progress if perfect score
    if (score === questions.length) {
      // Check if daily challenge should be completed
      const dailyChallenge = JSON.parse(localStorage.getItem('dailyChallenge') || '{}');
      if (!dailyChallenge.completed) {
        const updatedChallenge = { ...dailyChallenge, completed: true };
        localStorage.setItem('dailyChallenge', JSON.stringify(updatedChallenge));
      }
    }
    
    // Update overall progress
    updateProgress(score);
  };

  const restartGame = () => {
    setQuestions(shuffleArray(spellingData).slice(0, 10));
    setCurrentQuestionIndex(0);
    setUserAnswer('');
    setFeedback(null);
    setShowCorrectAnswer(false);
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
      <div className="game-page spelling-game">
        <Navbar />
        <div className="container loading-container">
          <div className="loading">Loading questions...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="game-page spelling-game">
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
              <h1>Spelling Bee</h1>
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
                <div className="hint-container">
                  <span className="hint-label">Hint:</span>
                  <h2 className="hint">{currentQuestion.hint}</h2>
                </div>
                
                <form onSubmit={handleSubmit} className="spelling-form">
                  <div className={`input-container ${feedback ? feedback : ''}`}>
                    <input
                      type="text"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder="Type the word..."
                      disabled={feedback !== null}
                      ref={inputRef}
                      className="spelling-input"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    variant={feedback === null ? 'primary' : (feedback === 'correct' ? 'secondary' : 'primary')}
                    className="submit-btn"
                  >
                    {feedback === null ? 'Check' : 'Next'}
                  </Button>
                </form>
                
                {feedback && (
                  <motion.div 
                    className={`feedback-message ${feedback}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {feedback === 'correct' ? 
                      <span>Correct! 🎉</span> : 
                      <span>Incorrect! 😕</span>
                    }
                    
                    {showCorrectAnswer && (
                      <div className="correct-answer">
                        The correct spelling is: <span>{currentQuestion.word}</span>
                      </div>
                    )}
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

export default Spelling; 