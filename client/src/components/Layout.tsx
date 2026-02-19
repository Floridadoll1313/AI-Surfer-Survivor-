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
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        .otd-shell { 
          min-height: 100vh; 
          display: flex; 
          flex-direction: column; 
        }

        .otd-main { 
          flex: 1; 
          padding: 40px 20px; 
          max-width: 1200px; 
          margin: 0 auto; 
          width: 100%;
          box-sizing: border-box;
        }

        /* Trial Progress Bar HUD */
        .progress-hud {
          position: fixed;
          top: 90px;
          right: 30px;
          width: 220px;
          background: rgba(10, 25, 47, 0.9);
          border: 1px solid #35c9ff;
          padding: 15px;
          border-radius: 8px;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
          z-index: 1000;
        }

        .progress-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .progress-title {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #35c9ff;
          font-weight: bold;
        }

        .progress-percent {
          font-size: 0.75rem;
          color: #ffffff;
          font-family: monospace;
        }

        .progress-bar-container {
          width: 100%;
          height: 8px;
          background: #061426;
          border-radius: 4px;
          overflow: hidden;
          border: 1px solid rgba(53, 201, 255, 0.2);
        }

        .progress-bar-fill {
          width: 45%; /* This represents current progress */
          height: 100%;
          background: linear-gradient(90deg, #35c9ff, #4ef3ff);
          box-shadow: 0 0 10px rgba(53, 201, 255, 0.6);
        }

        .progress-status {
          margin-top: 8px;
          font-size: 0.65rem;
          color: #ff9f40;
          text-transform: uppercase;
          text-align: right;
        }
      `}</style>

      <div className="otd-shell">
        <NavBar />

        {/* Persistent Trial Progress HUD */}
        <div className="progress-hud">
          <div className="progress-header">
            <span className="progress-title">Trial Sync</span>
            <span className="progress-percent">45%</span>
          </div>
          <div className="progress-bar-container">
            <div className="progress-bar-fill"></div>
          </div>
          <div className="progress-status">Sector Alpha: Active</div>
        </div>

        <main className="otd-main">
          <Outlet /> 
        </main>

        <SiteFooter />
      </div>
    </>
  );
}
