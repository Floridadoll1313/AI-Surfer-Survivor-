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
          font-family: 'Inter', -apple-system, sans-serif;
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

        .progress-hud {
          position: fixed;
          top: 100px;
          right: 30px;
          width: 220px;
          background: rgba(10, 25, 47, 0.95);
          border: 1px solid #35c9ff;
          padding: 15px;
          border-radius: 8px;
          z-index: 1000;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
        }

        .progress-title {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #35c9ff;
          margin-bottom: 10px;
          display: block;
        }

        .bar-container {
          width: 100%;
          height: 8px;
          background: #061426;
          border-radius: 4px;
          border: 1px solid rgba(53, 201, 255, 0.2);
          overflow: hidden;
        }

        .bar-fill {
          width: 45%; 
          height: 100%;
          background: linear-gradient(90deg, #35c9ff, #4ef3ff);
        }
      `}</style>

      <div className="otd-shell">
        <NavBar />

        <div className="progress-hud">
          <span className="progress-title">Trial Sync: 45%</span>
          <div className="bar-container">
            <div className="bar-fill"></div>
          </div>
          <div style={{ fontSize: '0.6rem', marginTop: '8px', color: '#ff9f40' }}>
            STATUS: SECTOR ALPHA ACTIVE
          </div>
        </div>

        <main className="otd-main">
          <Outlet /> 
        </main>

        <SiteFooter />
      </div>
    </>
  );
}
