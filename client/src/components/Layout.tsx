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
          padding: 0;
          background: radial-gradient(circle at top, #06213a 0%, #020818 55%, #000000 100%);
          color: #e6f7ff;
          font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .otd-shell {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .otd-main {
          flex: 1;
        }
      `}</style>
      <div className="otd-shell">
        <NavBar />
        <main className="otd-main">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </>
  );
}