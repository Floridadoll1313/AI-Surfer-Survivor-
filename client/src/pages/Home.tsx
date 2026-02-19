import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="home-container">
      <style>{`
        .home-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 80vh;
          text-align: center;
          padding: 20px;
        }

        .hero-title {
          font-size: clamp(2.5rem, 8vw, 5rem);
          font-weight: 900;
          text-transform: uppercase;
          background: linear-gradient(to bottom, #fff 20%, #00c8ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 10px;
        }

        .hero-subtitle {
          font-size: 1.2rem;
          color: #ff8c2f;
          letter-spacing: 4px;
          margin-bottom: 40px;
          text-transform: uppercase;
        }

        .cta-button {
          padding: 18px 48px;
          background: transparent;
          border: 2px solid #00c8ff;
          color: #00c8ff;
          font-weight: bold;
          text-decoration: none;
          border-radius: 4px;
          transition: 0.3s;
          box-shadow: 0 0 15px rgba(0, 200, 255, 0.4);
        }

        .cta-button:hover {
          background: #00c8ff;
          color: #000;
          box-shadow: 0 0 30px #00c8ff;
          transform: translateY(-3px);
        }
      `}</style>

      <h1 className="hero-title">AI SURFER</h1>
      <p className="hero-subtitle">Survive the Digital Tide</p>
      
      <Link to="/challenges" className="cta-button">
        ENTER THE ARENA
      </Link>
    </div>
  );
}
