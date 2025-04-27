import React from 'react';
import '../styles/ProgressBar.css';

const ProgressBar = ({ progress, total = 100, label }) => {
  // Calculate the percentage of progress
  const percentage = Math.min(Math.round((progress / total) * 100), 100);
  
  return (
    <div className="progress-container">
      {label && <div className="progress-label">{label}</div>}
      <div className="progress-bar-container">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${percentage}%` }}
        ></div>
        <span className="progress-text">{percentage}%</span>
      </div>
    </div>
  );
};

export default ProgressBar; 