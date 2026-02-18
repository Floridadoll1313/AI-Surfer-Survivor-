import React from "react";

export default function SurvivorWorld() {
  return (
    <>
      <style>{`
        :root {
          --ocean-blue: #35c9ff;
          --deep-blue: #020818;
          --sunset-orange: #ff9f40;
          --glow-cyan: #4ef3ff;
        }

        .world-root {
          min-height: 100vh;
          margin: 0;
          padding: 0;
          background: radial-gradient(circle at top, #06213a 0%, #020818 55%, #000000 100%);
          color: #e6f7ff;
          font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
          overflow-x: hidden;
        }

        .world-shell {
          max-width: 1200px;
          margin: 0 auto;
          padding: 32px 20px 60px;
        }

        .world-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-bottom: 40px;
        }

        .world-logo-orb {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 20%, #ffe9b8 0%, #ff9f40 30%, #ff5b2e 55%, #1b4bff 100%);
          box-shadow:
            0 0 40px rgba(255, 159, 64, 0.9),
            0 0 80px rgba(53, 201, 255, 0.7);
          position: relative;
          margin-bottom: 18px;
          overflow: hidden;
        }

        .world-logo-orb::after {
          content: "";
          position: absolute;
          inset: 52% 0 0 0;
          background: linear-gradient(to bottom, rgba(0, 40, 90, 0.1), rgba(0, 10, 30, 0.9));
        }

        .world-title {
          font-size: 2.8rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--ocean-blue);
          text-shadow:
            0 0 18px rgba(53, 201, 255, 0.9),
            0 0 40px rgba(0, 180, 255, 0.7);
          margin: 0 0 6px;
        }

        .world-subtitle {
          font-size: 1.1rem;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          color: #ffddb3;
          text-shadow: 0 0 10px rgba(255, 159, 64, 0.7);
          margin-bottom: 10px;
        }

        .world-tagline {
          font-size: 0.95rem;
          opacity: 0.85;
          max-width: 520px;
        }

        .world-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
          gap: 26px;
          align-items: flex-start;
        }

        @media (max-width: 900px) {
          .world-grid {
            grid-template-columns: minmax(0, 1fr);
          }
        }

        .world-map-card {
          background: radial-gradient(circle at top left, rgba(53, 201, 255, 0.18), rgba(0, 0, 0, 0.9));
          border-radius: 18px;
          border: 1px solid rgba(78, 203, 255, 0.6);
          padding: 20px 20px 24px;
          box-shadow:
            0 0 30px rgba(0, 180, 255, 0.4),
            0 0 80px rgba(0, 0, 0, 0.9);
          position: relative;
          overflow: hidden;
        }

        .world-map-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
        }

        .world-map-title {
          font-size: 1.2rem;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: var(--glow-cyan);
        }

        .world-map-pill {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          padding: 4px 10px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          background: rgba(0, 0, 0, 0.4);
        }

        .world-map-body {
          position: relative;
          border-radius: 14px;
          overflow: hidden;
          background: radial-gradient(circle at 20% 0%, #1a6cff 0%, #020818 55%, #000000 100%);
          padding: 18px 16px 16px;
        }

        .world-island {
          position: relative;
          height: 260px;
          border-radius: 12px;
          background:
            radial-gradient(circle at 50% 10%, rgba(255, 255, 255, 0.25) 0%, transparent 45%),
            radial-gradient(circle at 50% 80%, #0a3b1f 0%, #04140b 40%, transparent 70%);
          box-shadow: inset 0 0 40px rgba(0, 0, 0, 0.9);
        }

        .world-island-ring {
          position: absolute;
          inset: 12% 10%;
          border-radius: 50%;
          border: 1px dashed rgba(78, 243, 255, 0.4);
          box-shadow: 0 0 18px rgba(78, 243, 255, 0.6);
        }

        .world-node {
          position: absolute;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: radial-gradient(circle, #ffffff 0%, #ff9f40 40%, #ff5b2e 100%);
          box-shadow:
            0 0 18px rgba(255, 159, 64, 0.9),
            0 0 30px rgba(255, 91, 46, 0.8);
          cursor: default;
        }

        .world-node-label {
          position: absolute;
          transform: translate(-50%, -50%);
          top: -10px;
          left: 50%;
          white-space: nowrap;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: #ffe9c7;
          text-shadow: 0 0 8px rgba(0, 0, 0, 0.9);
        }

        .node-endurance {
          top: 26%;
          left: 26%;
        }

        .node-galleon {
          top: 22%;
          left: 72%;
        }

        .node-logic {
          top: 64%;
          left: 32%;
        }

        .node-jungle {
          top: 68%;
          left: 72%;
        }

        .world-node-orbit {
          position: absolute;
          inset: -10px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.12);
          opacity: 0.7;
        }

        .world-node-path {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 26% 26%, rgba(255, 255, 255, 0.08) 0%, transparent 30%),
            radial-gradient(circle at 72% 22%, rgba(255, 255, 255, 0.08) 0%, transparent 30%),
            radial-gradient(circle at 32% 64%, rgba(255, 255, 255, 0.08) 0%, transparent 30%),
            radial-gradient(circle at 72% 68%, rgba(255, 255, 255, 0.08) 0%, transparent 30%);
          mix-blend-mode: screen;
          opacity: 0.6;
        }

        .world-map-footer {
          margin-top: 10px;
          font-size: 0.8rem;
          opacity: 0.8;
          display: flex;
          justify-content: space-between;
          gap: 10px;
          flex-wrap: wrap;
        }

        .world-map-footer span {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .world-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--sunset-orange);
          box-shadow: 0 0 8px rgba(255, 159, 64, 0.9);
        }

        .world-panel {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .world-panel-card {
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(6, 40, 70, 0.9));
          border-radius: 16px;
          border: 1px solid rgba(78, 203, 255, 0.5);
          padding: 16px 18px 18px;
          box-shadow: 0 0 26px rgba(0, 0, 0, 0.9);
        }

        .world-panel-title {
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: var(--glow-cyan);
          margin-bottom: 6px;
        }

        .world-panel-body {
          font-size: 0.9rem;
          opacity: 0.9;
        }

        .world-panel-body strong {
          color: #ffddb3;
        }

        .world-challenge-list {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          gap: 14px;
          margin-top: 10px;
        }

        .world-challenge-card {
          border-radius: 12px;
          padding: 12px 12px 14px;
          background: radial-gradient(circle at top left, rgba(255, 159, 64, 0.16), rgba(0, 0, 0, 0.9));
          border: 1px solid rgba(255, 159, 64, 0.6);
          box-shadow: 0 0 18px rgba(255, 159, 64, 0.4);
        }

        .world-challenge-name {
          font-size: 1rem;
          color: var(--sunset-orange);
          text-transform: uppercase;
          letter-spacing: 0.16em;
          margin-bottom: 4px;
        }

        .world-challenge-meta {
          font-size: 0.8rem;
          opacity: 0.9;
          margin-bottom: 4px;
        }

        .world-challenge-meta span {
          display: inline-block;
          margin-right: 10px;
        }

        .world-challenge-desc {
          font-size: 0.9rem;
          opacity: 0.9;
        }

        .world-footer {
          margin-top: 40px;
          text-align: center;
          font-size: 0.85rem;
          opacity: 0.8;
        }

        .world-footer-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.25);
          background: rgba(0, 0, 0, 0.6);
          box-shadow: 0 0 18px rgba(53, 201, 255, 0.5);
          text-transform: uppercase;
          letter-spacing: 0.18em;
          font-size: 0.7rem;
        }

        .world-footer-pill-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: var(--ocean-blue);
          box-shadow: 0 0 10px rgba(53, 201, 255, 0.9);
        }
      `}</style>

      <div className="world-root">
        <div className="world-shell">
          <header className="world-header">
            <div className="world-logo-orb" />
            <h1 className="world-title">Ocean Tide Drop</h1>
            <div className="world-subtitle">AI Surfer · Survivor World</div>
            <p className="world-tagline">
              One island. Four trials. Every choice echoes across the digital surf—physical grit braided with mythic code.
            </p>
          </header>

          <main className="world-grid">
            <section className="world-map-card">
              <div className="world-map-header">
                <div className="world-map-title">Island Overview</div>
                <div className="world-map-pill">Realm Selection Grid</div>
              </div>

              <div className="world-map-body">
                <div className="world-island">
                  <div className="world-island-ring" />
                  <div className="world-node node-endurance">
                    <div className="world-node-orbit" />
                    <div className="world-node-label">Endurance Ritual</div>
                  </div>
                  <div className="world-node node-galleon">
                    <div className="world-node-orbit" />
                    <div className="world-node-label">Galleon Ascent</div>
                  </div>
                  <div className="world-node node-logic">
                    <div className="world-node-orbit" />
                    <div className="world-node-label">Logic Tethers</div>
                  </div>
                  <div className="world-node node-jungle">
                    <div className="world-node-orbit" />
                    <div className="world-node-label">Jungle Scavenging</div>
                  </div>
                  <div className="world-node-path" />
                </div>

                <div className="world-map-footer">
                  <span>
                    <span className="world-dot" /> Physical Trials
                  </span>
                  <span>
                    <span className="world-dot" style={{ background: "#35c9ff", boxShadow: "0 0 8px rgba(53,201,255,0.9)" }} /> Digital Layer
                  </span>
                  <span>
                    <span className="world-dot" style={{ background: "#9b6bff", boxShadow: "0 0 8px rgba(155,107,255,0.9)" }} /> Ritual Path
                  </span>
                </div>
              </div>
            </section>

            <section className="world-panel">
              <div className="world-panel-card">
                <div className="world-panel-title">World Logic</div>
                <div className="world-panel-body">
                  Each challenge binds a <strong>physical requirement</strong> to a <strong>digital ritual</strong>.  
                  The AI Surfer console tracks how steady, precise, or daring the player is—and the island responds.
                </div>
              </div>

              <div className="world-panel-card">
                <div className="world-panel-title">Challenge Realms</div>
                <div className="world-challenge-list">
                  <article className="world-challenge-card">
                    <div className="world-challenge-name">Endurance Ritual</div>
                    <div className="world-challenge-meta">
                      <span>Physical: Pole‑balancing endurance</span>
                      <span>Digital: Stabilization of Digital Grail Icons</span>
                    </div>
                    <p className="world-challenge-desc">
                      Contestants hold balance on narrow poles while a constellation of Grail Icons flickers on the console.  
                      Every tremor in the body ripples into the grid—too much sway, and the icons destabilize and shatter.
                    </p>
                  </article>

                  <article className="world-challenge-card">
                    <div className="world-challenge-name">Galleon Ascent</div>
                    <div className="world-challenge-meta">
                      <span>Physical: Vertical mast climb</span>
                      <span>Digital: Extraction of the Digital Crest</span>
                    </div>
                    <p className="world-challenge-desc">
                      Players scale a storm‑lit galleon mast while the AI Surfer renders a locked crest at the top.  
                      Only by syncing grip, timing, and digital inputs can they unseal the ship&apos;s luminous emblem.
                    </p>
                  </article>

                  <article className="world-challenge-card">
                    <div className="world-challenge-name">Logic Tethers</div>
                    <div className="world-challenge-meta">
                      <span>Physical: Coordinated rope navigation</span>
                      <span>Digital: 3D Volumetric Puzzle Cubes</span>
                    </div>
                    <p className="world-challenge-desc">
                      A web of ropes forces players to move in rhythm, tethered to one another.  
                      Each successful crossing unlocks a new rotation of a volumetric cube—missteps scramble the entire structure.
                    </p>
                  </article>

                  <article className="world-challenge-card">
                    <div className="world-challenge-name">Jungle Scavenging</div>
                    <div className="world-challenge-meta">
                      <span>Physical: Dense jungle navigation</span>
                      <span>Digital: “Night Scans” light‑markers</span>
                    </div>
                    <p className="world-challenge-desc">
                      At night, the jungle hides its secrets. The console reveals Night Scans—ghost‑light markers only visible through the AI lens.  
                      Players must trust their instincts in the dark while following signals that flicker in and out of existence.
                    </p>
                  </article>
                </div>
              </div>
            </section>
          </main>

          <footer className="world-footer">
            <div className="world-footer-pill">
              <span className="world-footer-pill-dot" />
              <span>Choose your tools as you do</span>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}