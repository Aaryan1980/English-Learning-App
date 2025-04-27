import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import listeningData from '../data/listeningData';
import shuffleArray from '../utils/shuffleArray';
import '../styles/Listening.css';

const Listening = ({ updateProgress }) => {
  const [questions, setQuestions] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [audioPlayed, setAudioPlayed] = useState(false);
  const [showText, setShowText] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedDifficulties, setSelectedDifficulties] = useState({
    easy: true,
    medium: true,
    hard: true
  });

  // Initialize all available questions
  useEffect(() => {
    setAllQuestions(shuffleArray(listeningData));
  }, []);

  // Filter questions based on selected difficulties
  useEffect(() => {
    if (allQuestions.length > 0) {
      const filteredQuestions = allQuestions.filter(
        question => selectedDifficulties[question.difficulty]
      );
      
      // Get 10 random questions from filtered questions
      setQuestions(filteredQuestions.slice(0, 10));
      
      // Reset game state when filters change
      setCurrentQuestionIndex(0);
      setSelectedOption(null);
      setIsCorrect(null);
      setScore(0);
      setShowResults(false);
      setAudioPlayed(false);
      setShowText(false);
    }
  }, [allQuestions, selectedDifficulties]);

  // Reset audio played state when question changes
  useEffect(() => {
    setAudioPlayed(false);
    setShowText(false);
  }, [currentQuestionIndex]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleDifficultyChange = (difficulty) => {
    setSelectedDifficulties(prev => ({
      ...prev,
      [difficulty]: !prev[difficulty]
    }));
  };

  // Function to speak text using Web Speech API
  const speakText = (text, difficulty) => {
    // Check if speech synthesis is available
    if (!window.speechSynthesis) {
      console.error("Speech synthesis not supported");
      setAudioPlayed(true);
      return;
    }
    
    // Create a new SpeechSynthesisUtterance instance
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Configure speech based on difficulty
    switch(difficulty) {
      case 'easy':
        utterance.rate = 0.8; // Slower speech for easy
        utterance.pitch = 1.0;
        break;
      case 'medium':
        utterance.rate = 1.0; // Normal speech for medium
        utterance.pitch = 1.0;
        break;
      case 'hard':
        utterance.rate = 1.2; // Faster speech for hard
        utterance.pitch = 1.1;
        break;
      default:
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
    }
    
    // Set language to English
    utterance.lang = 'en-US';
    
    // Event listeners for speech synthesis
    utterance.onstart = () => {
      setIsPlaying(true);
    };
    
    utterance.onend = () => {
      setIsPlaying(false);
      setAudioPlayed(true);
    };
    
    utterance.onerror = (event) => {
      console.error("Speech synthesis error:", event);
      setIsPlaying(false);
      setAudioPlayed(true);
    };
    
    // Speak the text
    window.speechSynthesis.speak(utterance);
  };

  // Fallback to beep sounds if speech synthesis fails
  const generateBeep = (difficulty) => {
    try {
      // Create audio context
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioContext = new AudioContext();
      
      // Create oscillator
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      // Configure oscillator based on difficulty
      switch(difficulty) {
        case 'easy':
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // A4 note
          break;
        case 'medium':
          oscillator.type = 'triangle';
          oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5 note
          break;
        case 'hard':
          oscillator.type = 'sawtooth';
          oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime); // E5 note
          break;
        default:
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
      }
      
      // Set volume
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      
      // Connect nodes
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Start and stop the oscillator
      oscillator.start();
      
      // Play for 1 second
      setTimeout(() => {
        oscillator.stop();
        setAudioPlayed(true);
      }, 1000);
    } catch (error) {
      console.error("Error generating beep:", error);
      setAudioPlayed(true);
    }
  };

  const handlePlayAudio = () => {
    if (!currentQuestion || isPlaying) return;
    
    try {
      speakText(currentQuestion.audio, currentQuestion.difficulty);
    } catch (error) {
      console.error("Error with speech synthesis:", error);
      // Fallback to beep if speech synthesis fails
      generateBeep(currentQuestion.difficulty);
    }
  };

  const toggleTranscript = () => {
    setShowText(!showText);
  };

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
    // Cancel any ongoing speech
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    
    setAllQuestions(shuffleArray(listeningData));
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsCorrect(null);
    setScore(0);
    setShowResults(false);
    setAudioPlayed(false);
    setShowText(false);
    setIsPlaying(false);
  };

  // Page animations
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  // Cleanup speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (questions.length === 0) {
    return (
      <div className="game-page listening-game">
        <Navbar />
        <div className="container loading-container">
          <div className="loading">Loading questions...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="game-page listening-game">
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
              <h1>Listening Challenge</h1>
              
              <div className="difficulty-filters">
                <p>Select difficulty:</p>
                <div className="filter-buttons">
                  <button 
                    className={`filter-btn ${selectedDifficulties.easy ? 'active' : ''}`}
                    onClick={() => handleDifficultyChange('easy')}
                  >
                    Easy
                  </button>
                  <button 
                    className={`filter-btn ${selectedDifficulties.medium ? 'active' : ''}`}
                    onClick={() => handleDifficultyChange('medium')}
                  >
                    Medium
                  </button>
                  <button 
                    className={`filter-btn ${selectedDifficulties.hard ? 'active' : ''}`}
                    onClick={() => handleDifficultyChange('hard')}
                  >
                    Hard
                  </button>
                </div>
              </div>
              
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
                <div className="audio-section">
                  <div className="audio-player">
                    <button 
                      className={`play-button ${audioPlayed ? 'played' : ''} ${isPlaying ? 'playing' : ''}`} 
                      onClick={handlePlayAudio}
                      disabled={audioPlayed || isPlaying}
                    >
                      {isPlaying ? 'Playing...' : (audioPlayed ? '✓ Played' : 'Play Audio')}
                    </button>
                    
                    <button 
                      className={`transcript-button ${showText ? 'active' : ''}`} 
                      onClick={toggleTranscript}
                    >
                      {showText ? 'Hide Text' : 'Show Text'}
                    </button>
                  </div>
                  
                  {showText && (
                    <motion.div 
                      className="transcript"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                    >
                      <p>{currentQuestion.audio}</p>
                    </motion.div>
                  )}
                </div>
                
                <div className="question-instruction">
                  <p>Choose the correct sentence you heard:</p>
                </div>
                
                <div className="options-list">
                  {currentQuestion.options.map((option) => (
                    <motion.div
                      key={option.id}
                      className={`option ${selectedOption === option ? (isCorrect ? 'correct' : 'wrong') : ''}`}
                      onClick={() => audioPlayed && handleOptionSelect(option)}
                      whileHover={{ scale: audioPlayed && selectedOption === null ? 1.02 : 1 }}
                      whileTap={{ scale: audioPlayed && selectedOption === null ? 0.98 : 1 }}
                      style={{ 
                        cursor: audioPlayed ? 'pointer' : 'not-allowed',
                        opacity: audioPlayed ? 1 : 0.7
                      }}
                    >
                      {option.text}
                    </motion.div>
                  ))}
                </div>
                
                {!audioPlayed && (
                  <div className="instruction-message">
                    Please play the audio before selecting an answer
                  </div>
                )}
                
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

export default Listening; 