import React from "react";

export default function SurvivorWorld() {
  return (
    <div className="world-root">
      <style>{`
        :root {
          --ocean-blue: #35c9ff;
          --deep-blue: #020818;
          --sunset-orange: #ff9f40;
          --glow-cyan: #4ef3ff;
        }
        .world-root {
          min-height: 100vh;
          background: radial-gradient(circle at top, #06213a 0%, #020818 55%, #000000 100%);
          color: #e6f7ff;
          font-family: 'Inter', sans-serif;
          padding: 40px 20px;
        }
        .world-shell {
          max-width: 1100px;
          margin: 0 auto;
        }
        .world-header {
          text-align: center;
          margin-bottom: 60px;
        }
        .world-title {
          font-size: 3rem;
          color: var(--ocean-blue);
          text-transform: uppercase;
          letter-spacing: 4px;
          text-shadow: 0 0 20px rgba(53, 201, 255, 0.6);
        }
        .map-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }
        .map-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(78, 203, 255, 0.3);
          border-radius: 12px;
          padding: 15px;
          transition: 0.3s ease;
        }
        .map-card:hover {
          transform: scale(1.02);
          border-color: var(--sunset-orange);
          box-shadow: 0 0 20px rgba(255, 159, 64, 0.2);
        }
        .map-image {
          width: 100%;
          border-radius: 8px;
          margin-bottom: 15px;
        }
        .card-label {
          color: var(--sunset-orange);
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
      `}</style>

      <div className="world-shell">
        <header className="world-header">
          <h1 className="world-title">The Digital Island</h1>
          <p>Explore the territories of the Never Ending Realm.</p>
        </header>

        <div className="map-grid">
          {/* Territory 1 */}
          <div className="map-card">
            <img src="/AI Surfer Survivor Island Map.png" alt="Island Map" className="map-image" />
            <div className="card-label">Sector Alpha</div>
            <h3>Mainland Surf</h3>
          </div>

          {/* Territory 2 */}
          <div className="map-card">
            <img src="/Mapping the Never Ending Realm.png" alt="Realm Map" className="map-image" />
            <div className="card-label">Sector Beta</div>
            <h3>Never Ending Realm</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
