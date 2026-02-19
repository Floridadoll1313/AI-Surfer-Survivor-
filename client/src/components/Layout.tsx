import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import SiteFooter from "./SiteFooter";

export default function Layout() {
  return (
    <>
      <style>{`
        body {
          margin: 0;
          background: #020817; 
          color: #ffffff; 
          font-family: 'Inter', sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        .otd-shell { 
          min-height: 100vh; 
          display: flex; 
          flex-direction: column; 
        }

        .otd-main { 
          flex: 1; 
          padding: 60px 20px; 
          max-width: 1200px; 
          margin: 0 auto; 
          width: 100%;
          box-sizing: border-box;
        }

        /* Persistent Survival HUD */
        .progress-hud {
          position: fixed;
          top: 100px;
          right: 30px;
          width: 240px;
          background: rgba(10, 25, 47, 0.98);
          border: 1px solid #35c9ff;
          padding: 20px;
          border-radius: 12px;
          z-index: 1000;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.7);
        }

        .hud-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #35c9ff;
          margin-bottom: 12px;
          display: block;
          font-weight: 800;
        }

        .bar-outer {
          width: 100%;
          height: 10px;
          background: #061426;
          border-radius: 5px;
          border: 1px solid rgba(53, 201, 255, 0.3);
          overflow: hidden;
        }

        .bar-inner {
          width: 45%; 
          height: 100%;
          background: linear-gradient(90deg, #35c9ff, #4ef3ff);
          box-shadow: 0 0 15px rgba(53, 201, 255, 0.5);
        }

        .status-text {
          font-size: 0.65rem;
          margin-top: 10px;
          color: #ff9f40;
          font-family: monospace;
          text-align: right;
        }
      `}</style>

      <div className="otd-shell">
        <NavBar />

        {/* Global Progress Widget */}
        <div className="progress-hud">
          <span className="hud-label">SYNC PROGRESS: 45%</span>
          <div className="bar-outer">
            <div className="bar-inner"></div>
          </div>
          <div className="status-text">» SECTOR_ALPHA: STABLE</div>
        </div>

        <main className="otd-main">
          <Outlet /> 
        </main>

        <SiteFooter />
      </div>
    </>
  );
}
