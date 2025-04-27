import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Card.css';

const Card = ({ 
  title, 
  description, 
  icon, 
  to, 
  onClick, 
  className = '',
  color = 'primary'
}) => {
  const cardContent = (
    <>
      <div className="card-icon" style={{ backgroundColor: `var(--${color}-color)` }}>
        {icon}
      </div>
      <h3 className="card-title">{title}</h3>
      {description && <p className="card-description">{description}</p>}
    </>
  );
  
  const cardClasses = `game-card ${className} card-${color}`;
  
  if (to) {
    return (
      <Link to={to} className={cardClasses}>
        {cardContent}
      </Link>
    );
  }
  
  return (
    <div className={cardClasses} onClick={onClick}>
      {cardContent}
    </div>
  );
};

export default Card; 