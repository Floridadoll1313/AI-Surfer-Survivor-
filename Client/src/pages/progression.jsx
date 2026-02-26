import React from "react";
import Layout from "../components/Layout";
import ProgressRing from "../components/progression/ProgressRing";
import SectorProgressCard from "../components/progression/SectorProgressCard";
import AchievementBadge from "../components/progression/AchievementBadge";
import NextStepCard from "../components/progression/NextStepCard";
import "../styles/animations.css";

const Progression: React.FC = () => {
  // Temporary placeholder data — will be replaced with real progression later
  const sectors = [
    { id: 1, name: "Arrival Beach", completed: true },
    { id: 2, name: "Training Grounds", completed: true },
    { id: 3, name: "The Tideforge", completed: false },
    { id: 4, name: "The Observatory", completed: false },
    { id: 5, name: "The Deep Archives", completed: false },
    { id: 6, name: "The Challenge Arena", completed: false },
    { id: 7, name: "Access Portal", completed: false },
    { id: 8, name: "The Core", completed: false },
    { id: 9, name: "Vault of Storms", completed: false },
    { id: 10, name: "Final Ascent", completed: false },
  ];

  const achievements = [
    { id: 1, label: "First Steps", earned: true },
    { id: 2, label: "Tide‑Forged", earned: false },
    { id: 3, label: "Stormwalker", earned: false },
  ];

  return (
    <Layout>
      <div className="page-container fade-in">
        <section className="hero-section">
          <h1 className="hero-title glow-pulse">Progression Dashboard</h1>
          <p className="hero-subtitle">
            Track your journey across the island. Every step shapes your legend.
          </p>
        </section>

        {/* PROGRESS RING */}
        <div style={{ marginBottom: "3rem" }}>
          <ProgressRing
            completed={sectors.filter((s) => s.completed).length}
            total={sectors.length}
          />
        </div>

        {/* SECTOR PROGRESS */}
        <h2 className="section-title">Sector Progress</h2>
        <div className="sector-grid">
          {sectors.map((sector) => (
            <SectorProgressCard key={sector.id} sector={sector} />
          ))}
        </div>

        {/* ACHIEVEMENTS */}
        <h2 className="section-title">Achievements</h2>
        <div className="achievement-grid">
          {achievements.map((ach) => (
            <AchievementBadge key={ach.id} achievement={ach} />
          ))}
        </div>

        {/* NEXT STEP */}
        <NextStepCard />
      </div>

      <style jsx>{`
        .page-container {
          padding: 3rem 2rem;
          text-align: center;
        }

        .section-title {
          margin-top: 3rem;
          margin-bottom: 1rem;
          font-size: 1.8rem;
          color: #7dd3fc;
        }

        .sector-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .achievement-grid {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          flex-wrap: wrap;
          margin-bottom: 3rem;
        }
      `}</style>
    </Layout>
  );
};

export default Progression;
