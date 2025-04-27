import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';

// Pages
import Home from './pages/Home';
import Vocabulary from './pages/Vocabulary';
import Grammar from './pages/Grammar';
import Spelling from './pages/Spelling';
import Listening from './pages/Listening';

function App() {
  const [userProgress, setUserProgress] = useState({
    totalPoints: 0,
    gamesPlayed: 0,
    level: 1
  });

  // Load progress from localStorage on initial render
  useEffect(() => {
    const savedProgress = localStorage.getItem('userProgress');
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    }
  }, []);

  // Save progress whenever it changes
  useEffect(() => {
    localStorage.setItem('userProgress', JSON.stringify(userProgress));
  }, [userProgress]);

  // Function to update progress
  const updateProgress = (points) => {
    setUserProgress(prev => {
      const newPoints = prev.totalPoints + points;
      const newLevel = Math.floor(newPoints / 100) + 1; // Level up every 100 points
      
      return {
        totalPoints: newPoints,
        gamesPlayed: prev.gamesPlayed + 1,
        level: newLevel
      };
    });
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home progress={userProgress} />} />
          <Route path="/vocabulary" element={<Vocabulary updateProgress={updateProgress} />} />
          <Route path="/grammar" element={<Grammar updateProgress={updateProgress} />} />
          <Route path="/spelling" element={<Spelling updateProgress={updateProgress} />} />
          <Route path="/listening" element={<Listening updateProgress={updateProgress} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
