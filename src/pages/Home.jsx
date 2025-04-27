import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import ProgressBar from '../components/ProgressBar';
import Button from '../components/Button';
import '../styles/Home.css';

const Home = ({ progress }) => {
  const [dailyChallenge, setDailyChallenge] = useState({
    completed: false,
    expiresAt: null
  });

  // Check if daily challenge is completed or expired
  useEffect(() => {
    const storedDailyChallenge = localStorage.getItem('dailyChallenge');
    
    if (storedDailyChallenge) {
      const parsedChallenge = JSON.parse(storedDailyChallenge);
      const now = new Date().getTime();
      
      // If the challenge has expired, reset it
      if (parsedChallenge.expiresAt && parsedChallenge.expiresAt < now) {
        setDailyChallenge({
          completed: false,
          expiresAt: getEndOfDay()
        });
      } else {
        setDailyChallenge(parsedChallenge);
      }
    } else {
      // If no challenge exists, create a new one
      setDailyChallenge({
        completed: false,
        expiresAt: getEndOfDay()
      });
    }
  }, []);

  // Save daily challenge status to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('dailyChallenge', JSON.stringify(dailyChallenge));
  }, [dailyChallenge]);

  // Helper function to get end of current day
  const getEndOfDay = () => {
    const now = new Date();
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
    return endOfDay.getTime();
  };

  const gameCards = [
    {
      title: 'Vocabulary',
      description: 'Match words with pictures and improve your vocabulary',
      icon: '📚',
      to: '/vocabulary',
      color: 'primary'
    },
    {
      title: 'Grammar',
      description: 'Complete sentences and master English grammar',
      icon: '📝',
      to: '/grammar',
      color: 'secondary'
    },
    {
      title: 'Spelling',
      description: 'Practice spelling English words correctly',
      icon: '✏️',
      to: '/spelling',
      color: 'accent'
    },
    {
      title: 'Listening',
      description: 'Improve your listening comprehension skills',
      icon: '🎧',
      to: '/listening',
      color: 'primary'
    }
  ];

  const resetProgress = () => {
    if (window.confirm('Are you sure you want to reset all your progress? This cannot be undone.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="home-page">
      <Navbar />
      
      <div className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title fade-in">Play & Learn English!</h1>
            <p className="hero-subtitle">Fun mini-games to improve your English skills</p>
            <Button to="/vocabulary" size="large" className="get-started-btn">
              Get Started
            </Button>
          </div>
        </div>
      </div>
      
      <div className="user-progress-section">
        <div className="container">
          <div className="user-progress-content">
            <div className="progress-info">
              <h2>Your Progress</h2>
              <div className="progress-stats">
                <div className="stat-item">
                  <span className="stat-value">{progress.totalPoints}</span>
                  <span className="stat-label">Total Points</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{progress.gamesPlayed}</span>
                  <span className="stat-label">Games Played</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{progress.level}</span>
                  <span className="stat-label">Level</span>
                </div>
              </div>
              <div className="progress-bar-wrapper">
                <ProgressBar 
                  progress={(progress.totalPoints % 100)} 
                  total={100} 
                  label={`Level Progress (${progress.totalPoints % 100}/100)`} 
                />
              </div>
            </div>
            
            <div className="daily-challenge">
              <h3>Daily Challenge</h3>
              <div className={`challenge-card ${dailyChallenge.completed ? 'completed' : ''}`}>
                <div className="challenge-icon">🏆</div>
                <div className="challenge-content">
                  <h4>Today's Challenge</h4>
                  <p>{dailyChallenge.completed ? 'You completed today\'s challenge!' : 'Complete any game with a perfect score'}</p>
                </div>
                <Button 
                  to={dailyChallenge.completed ? null : '/vocabulary'} 
                  variant={dailyChallenge.completed ? 'outline' : 'accent'}
                  disabled={dailyChallenge.completed}
                >
                  {dailyChallenge.completed ? 'Completed' : 'Start'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="games-section">
        <div className="container">
          <h2 className="section-title">Choose a Game</h2>
          <div className="games-grid">
            {gameCards.map((card, index) => (
              <Card
                key={index}
                title={card.title}
                description={card.description}
                icon={card.icon}
                to={card.to}
                color={card.color}
              />
            ))}
          </div>
        </div>
      </div>
      
      <div className="reset-section">
        <div className="container">
          <Button 
            onClick={resetProgress}
            variant="outline"
            size="small"
          >
            Reset Progress
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Home; 