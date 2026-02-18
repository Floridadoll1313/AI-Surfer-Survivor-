import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function NavBar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <style>{`
        .otd-nav {
          position: sticky;
          top: 0;
          z-index: 20;
          backdrop-filter: blur(14px);
          background: linear-gradient(
            to right,
            rgba(2, 8, 24, 0.96),
            rgba(2, 8, 24, 0.9),
            rgba(2, 8, 24, 0.96)
          );
          border-bottom: 1px solid rgba(78, 203, 255, 0.4);
          box-shadow: 0 0 24px rgba(0, 0, 0, 0.9);
        }

        .otd-nav-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 10px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .otd-nav-brand {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .otd-nav-orb {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 20%, #ffe9b8 0%, #ff9f40 30%, #ff5b2e 55%, #1b4bff 100%);
          box-shadow:
            0 0 16px rgba(255, 159, 64, 0.9),
            0 0 26px rgba(53, 201, 255, 0.7);
        }

        .otd-nav-title {
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.22em;
          color: #35c9ff;
        }

        .otd-nav-sub {
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: #ffddb3;
          opacity: 0.9;
        }

        .otd-nav-links {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .otd-nav-link {
          text-decoration: none;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          padding: 6px 12px;
          border-radius: 999px;
          border: 1px solid transparent;
          color: #e6f7ff;
          opacity: 0.8;
          transition: all 0.2s ease;
        }

        .otd-nav-link:hover {
          opacity: 1;
          border-color: rgba(78, 203, 255, 0.7);
          box-shadow: 0 0 14px rgba(53, 201, 255, 0.7);
        }

        .otd-nav-link-active {
          border-color: rgba(255, 159, 64, 0.9);
          background: radial-gradient(circle at top left, rgba(255, 159, 64, 0.3), rgba(0, 0, 0, 0.9));
          color: #ffddb3;
          opacity: 1;
          box-shadow:
            0 0 18px rgba(255, 159, 64, 0.9),
            0 0 30px rgba(0, 0, 0, 1);
        }

        @media (max-width: 640px) {
          .otd-nav-inner {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>

      <nav className="otd-nav">
        <div className="otd-nav-inner">
          <div className="otd-nav-brand">
            <div className="otd-nav-orb" />
            <div>
              <div className="otd-nav-title">Ocean Tide Drop</div>
              <div className="otd-nav-sub">AI Surfer Console</div>
            </div>
          </div>

          <div className="otd-nav-links">
            <Link
              to="/"
              className={
                "otd-nav-link" + (isActive("/") ? " otd-nav-link-active" : "")
              }
            >
              Home
            </Link>
            <Link
              to="/world"
              className={
                "otd-nav-link" + (isActive("/world") ? " otd-nav-link-active" : "")
              }
            >
              Survivor World
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}