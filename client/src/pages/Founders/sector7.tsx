import React from "react";
import Layout from "../components/Layout";
import "../components/Home.css"; // gives you your neon‑ocean glow + typography

const Sector7: React.FC = () => {
  return (
    <Layout>
      <div className="page-container">
        {/* HERO */}
        <section className="hero-section">
          <h1 className="hero-title">Sector 7 Access Portal</h1>
          <p className="hero-subtitle">
            Cross the threshold into the deeper layers of Ocean Tide Drop.
          </p>
        </section>

        {/* PORTAL CARD */}
        <div className="portal-card">
          <h2 className="portal-title">Welcome, Realmwalker</h2>
          <p className="portal-text">
            Sector 7 is a restricted zone where only initiated survivors may
            enter. This gateway unlocks advanced challenges, lore fragments,
            and hidden pathways across the island.
          </p>

          <div className="portal-glow" />

          <button className="portal-button">
            Enter Sector 7
          </button>
        </div>

        {/* LORE STRIP */}
        <section className="lore-strip">
          <p>
            “Beyond the seventh tide lies the truth of the island. Only those
            who walk with intention may proceed.”
          </p>
        </section>
      </div>

      <style jsx>{`
        .page-container {
          padding: 4rem 2rem;
          text-align: center;
          animation: fadeIn 1.2s ease;
        }

        .hero-section {
          margin-bottom: 3rem;
        }

        .hero-title {
          font-size: 3rem;
          color: #7dd3fc;
          text-shadow: 0 0 20px rgba(56, 189, 248, 0.6);
        }

        .hero-subtitle {
          font-size: 1.2rem;
          color: #e0f2fe;
          opacity: 0.8;
        }

        .portal-card {
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(56, 189, 248, 0.4);
          border-radius: 16px;
          padding: 2rem;
          max-width: 600px;
          margin: 0 auto 3rem auto;
          position: relative;
          backdrop-filter: blur(12px);
          box-shadow: 0 0 25px rgba(56, 189, 248, 0.3);
        }

        .portal-title {
          font-size: 2rem;
          color: #bae6fd;
          margin-bottom: 1rem;
        }

        .portal-text {
          color: #e0f2fe;
          opacity: 0.9;
          margin-bottom: 2rem;
        }

        .portal-glow {
          position: absolute;
          top: -20px;
          left: 50%;
          transform: translateX(-50%);
          width: 120px;
          height: 120px;
          background: radial-gradient(
            circle,
            rgba(56, 189, 248, 0.6),
            rgba(56, 189, 248, 0) 70%
          );
          filter: blur(30px);
          z-index: -1;
        }

        .portal-button {
          background: linear-gradient(
            90deg,
            #38bdf8,
            #0ea5e9,
            #38bdf8
          );
          background-size: 200% 200%;
          animation: glowShift 4s ease infinite;
          padding: 0.8rem 2rem;
          border-radius: 12px;
          border: none;
          color: white;
          font-size: 1.1rem;
          cursor: pointer;
          box-shadow: 0 0 20px rgba(56, 189, 248, 0.5);
        }

        .lore-strip {
          margin-top: 2rem;
          font-style: italic;
          color: #7dd3fc;
          opacity: 0.8;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes glowShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </Layout>
  );
};

export default Sector7;
