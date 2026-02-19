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
