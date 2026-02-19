import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import SiteFooter from "./SiteFooter";

export default function Layout() {
  return (
    <>
      <style>{`
        body { margin: 0; background: #020817; color: #ffffff; font-family: 'Inter', sans-serif; }
        .otd-shell { min-height: 100vh; display: flex; flex-direction: column; }
        .otd-main { flex: 1; padding: 60px 20px; max-width: 1200px; margin: 0 auto; width: 100%; box-sizing: border-box; }
        .progress-hud {
          position: fixed; top: 100px; right: 30px; width: 240px;
          background: rgba(10, 25, 47, 0.98); border: 1px solid #35c9ff;
          padding: 20px; border-radius: 12px; z-index: 1000;
        }
        .hud-label { font-size: 0.75rem; text-transform: uppercase; color: #35c9ff; font-weight: 800; display: block; margin-bottom: 10px; }
        .bar-outer { width: 100%; height: 10px; background: #061426; border-radius: 5px; overflow: hidden; }
        .bar-inner { width: 45%; height: 100%; background: #35c9ff; }
      `}</style>
      <div className="otd-shell">
        <NavBar />
        <div className="progress-hud">
          <span className="hud-label">Sync Progress: 45%</span>
          <div className="bar-outer"><div className="bar-inner"></div></div>
        </div>
        <main className="otd-main"><Outlet /></main>
        <SiteFooter />
      </div>
    </>
  );
}
