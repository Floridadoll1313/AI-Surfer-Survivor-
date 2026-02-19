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
          color: #ffffff; /* Pure white for maximum readability */
          font-family: sans-serif;
        }
        .otd-shell { min-height: 100vh; display: flex; flex-direction: column; }
        .otd-main { flex: 1; padding: 40px 20px; }
      `}</style>
      <div className="otd-shell">
        <NavBar />
        <main className="otd-main">
          <Outlet /> {/* This is the "window" where your pages will appear */}
        </main>
        <SiteFooter />
      </div>
    </>
  );
}
