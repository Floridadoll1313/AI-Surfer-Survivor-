import React, { useState } from "react";

export default function Challenges() {
  const [activeTrial, setActiveTrial] = useState<string | null>(null);

  const trials = [
    { id: "T1", title: "The Great Reef Sync", status: "Available", difficulty: "Low" },
    { id: "T2", title: "Data Stream Breach", status: "Locked", difficulty: "Medium" },
    { id: "T3", title: "Neon Jungle Survival", status: "Locked", difficulty: "High" },
    { id: "T4", title: "The Final Wipeout", status: "Locked", difficulty: "Extreme" },
  ];

  return (
    <div className="challenges-root">
      <style>{`
        .challenges-root {
          padding: 60px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .challenges-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .challenges-title {
          font-size: 2.5rem;
          color: #35c9ff;
          text-transform: uppercase;
          letter-spacing: 3px;
          text-shadow: 0 0 15px rgba(53, 201, 255, 0.5);
        }

        .trial-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          width: 100%;
          max-width: 1000px;
        }

        .trial-card {
          background: rgba(2, 8, 24, 0.6);
          border: 1px solid rgba(78, 203, 255, 0.2);
          padding: 24px;
          border-radius: 8px;
          cursor: pointer;
          transition: 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .trial-card:hover {
          border-color: #ff9f40;
          background: rgba(255, 159, 64, 0.05);
          transform: translateY(-5px);
        }

        .trial-id {
          font-size: 0.7rem;
          color: #35c9ff;
          opacity: 0.6;
          margin-bottom: 10px;
        }

        .trial-status {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #ff9f40;
          margin-top: 15px;
          display: block;
        }

        .trial-difficulty {
          position: absolute;
          top: 15px;
          right: 15px;
          font-size: 0.65rem;
          padding: 2px 8px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 4px;
        }
      `}</style>

      <div className="challenges-header">
        <h1 className="challenges-title">Active Trials</h1>
        <p>Synchronize your biometrics to begin the elimination sequence.</p>
      </div>

      <div className="trial-grid">
        {trials.map((trial) => (
          <div 
            key={trial.id} 
            className="trial-card"
            onClick={() => setActiveTrial(trial.title)}
          >
            <span className="trial-difficulty">{trial.difficulty}</span>
            <div className="trial-id">PROTOCOL // {trial.id}</div>
            <h3>{trial.title}</h3>
            <span className="trial-status">{trial.status}</span>
          </div>
        ))}
      </div>

      {activeTrial && (
        <div style={{ marginTop: '40px', color: '#35c9ff' }}>
          > INITIALIZING: {activeTrial}...
        </div>
      )}
    </div>
  );
}
