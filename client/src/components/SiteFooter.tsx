import React from "react";

export default function SiteFooter() {
  return (
    <>
      <style>{`
        .otd-footer {
          border-top: 1px solid rgba(78, 203, 255, 0.3);
          background: radial-gradient(circle at top, rgba(2, 8, 24, 0.96), rgba(0, 0, 0, 1));
          padding: 10px 18px 14px;
          box-shadow: 0 -10px 24px rgba(0, 0, 0, 0.9);
        }

        .otd-footer-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          font-size: 0.7rem;
          opacity: 0.85;
        }

        .otd-footer-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: rgba(0, 0, 0, 0.6);
          text-transform: uppercase;
          letter-spacing: 0.18em;
        }

        .otd-footer-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #35c9ff;
          box-shadow: 0 0 10px rgba(53, 201, 255, 0.9);
        }

        @media (max-width: 640px) {
          .otd-footer-inner {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>

      <footer className="otd-footer">
        <div className="otd-footer-inner">
          <div className="otd-footer-pill">
            <span className="otd-footer-dot" />
            <span>Choose your tools as you do</span>
          </div>
          <div>© {new Date().getFullYear()} Ocean Tide Drop · AI Surfer Survivor</div>
        </div>
      </footer>
    </>
  );
}