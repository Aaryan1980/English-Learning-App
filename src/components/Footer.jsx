import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-content">
          <div className="footer-logo">
            <span className="logo-text">English Games</span>
            <p>Learn English through fun and interactive games</p>
          </div>
          
          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/vocabulary">Vocabulary</a></li>
              <li><a href="/grammar">Grammar</a></li>
              <li><a href="/spelling">Spelling</a></li>
              <li><a href="/listening">Listening</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-copyright">
          <p>&copy; {currentYear} English Games. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 