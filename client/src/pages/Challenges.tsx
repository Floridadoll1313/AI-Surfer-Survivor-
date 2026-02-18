import React from "react";

export default function Challenges() {
  return (
    <>
      <style>{`
        .challenges-container {
          padding: 40px;
          max-width: 900px;
          color: #e0f7ff;
          font-family: 'Inter', sans-serif;
          animation: fadeIn 1.2s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .title {
          text-align: center;
          font-size: 3rem;
          margin-bottom: 40px;
          color: #4ecbff;
          text-shadow: 0 0 20px #009dff;
          letter-spacing: 2px;
        }

        .challenge-card {
          background: rgba(0, 20, 40, 0.6);
          border: 1px solid #4ecbff;
          border-radius: 12px;
          padding: 25px;
          margin-bottom: 30px;
          box-shadow: 0 0 25px rgba(0, 150, 255, 0.4);
          backdrop-filter: blur(6px);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .challenge-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 0 35px rgba(0, 180, 255, 0.7);
        }

        .challenge-card h2 {
          color: #ff9f40;
          text-shadow: 0 0 12px #ff7a00;
          margin-bottom: 10px;
          font-size: 1.8rem;
        }

        .challenge-card p {
          margin: 6px 0;
          font-size: 1.1rem;
        }

        .desc {
          margin-top: 12px;
          opacity: 0.9;
          font-style: italic;
        }
      `}</style>

      <div className="challenges-container">
        <h1 className="title">Survivor Challenges</h1>

        <section className="challenge-card">
          <h2>Endurance Ritual</h2>
          <p><strong>Physical:</strong> Pole‑balancing endurance trial</p>
          <p><strong>Digital:</strong> Stabilization of Digital Grail Icons.</p>
          <p className="desc">
            A dual‑layer stamina test where physical balance affects digital instability.
          </p>
        </section>

        <section className="challenge-card">
          <h2>Galleon Ascent</h2>
          <p><strong>Physical:</strong> Scaling a vertical mast</p>
          <p><strong>Digital:</strong> Extraction of the Digital Crest from the masthead.</p>
          <p className="desc">
            Contestants climb a towering mast and complete a digital crest‑unlock puzzle at the top.
          </p>
        </section>

        <section className="challenge-card">
          <h2>Logic Tethers</h2>
          <p><strong>Physical:</strong> Coordinated rope navigation</p>
          <p><strong>Digital:</strong> Manipulation of 3D Volumetric Puzzle Cubes.</p>
          <p className="desc">
            A rope maze that unlocks layers of a rotating volumetric cube puzzle.
          </p>
        </section>

        <section className="challenge-card">
          <h2>Jungle Scavenging</h2>
          <p><strong>Physical:</strong> Navigation of dense jungle terrain</p>
          <p><strong>Digital:</strong> Identification of “Night Scans” (hidden light‑markers).</p>
          <p className="desc">
            A nighttime scavenger hunt blending physical searching with digital light‑scan detection.
          </p>
        </section>
      </div>
    </>
  );
}