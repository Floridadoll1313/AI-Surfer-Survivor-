import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <style>{`
        .home-root {
          min-height: calc(100vh - 120px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
        }

        .home-shell {
          text-align: center;
          max-width: 640px;
        }

        .home-title {
          font-size: 2.6rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #35c9ff;
          text-shadow:
            0 0 18px rgba(53, 201, 255, 0.9),
            0 0 40px rgba(0, 180, 255, 0.7);
          margin-bottom: 10px;
        }

        .home-subtitle {
          font-size: 0.95rem;
          text-transform: uppercase;
          letter-spacing: 0.28em;
          color: #ffddb3;
          text-shadow: 0 0 10px rgba(255, 159, 64, 0.7);
          margin-bottom: 26px;
        }

        .home-tagline {
          font-size: 0.95rem;
          opacity: 0.85;
          margin-bottom: 30px;
        }

        .home-actions {
          display: flex;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        .home-link-card {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 12px 22px;
          border-radius: 999px;
          border: 1px solid rgba(78, 203, 255, 0.7);
          background: radial-gradient(circle at top left, rgba(53, 201, 255, 0.2), rgba(0, 0, 0, 0.9));
          color: #e6f7ff;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          font-size: 0.75rem;
          box-shadow:
            0 0 24px rgba(53, 201, 255, 0.7),
            0 0 60px rgba(0, 0, 0, 0.9);
          transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
        }

        .home-link-card:hover {
          transform: translateY(-4px);
          box-shadow:
            0 0 32px rgba(53, 201, 255, 0.9),
            0 0 80px rgba(0, 0, 0, 1);
          background: radial-gradient(circle at top left, rgba(255, 159, 64, 0.25), rgba(0, 0, 0, 0.95));
        }
      `}</style>

      <div className="home-root">
        <div className="home-shell">
          <h1 className="home-title">Ocean Tide Drop</h1>
          <div className="home-subtitle">AI Surfer Console</div>
          <p className="home-tagline">
            Step into the Survivor World — one island, four trials, and a living digital surf that remembers every move.
          </p>
          <div className="home-actions">
            <Link to="/world" className="home-link-card">
              Enter Survivor World
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
