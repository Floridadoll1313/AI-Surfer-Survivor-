import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import SiteFooter from './SiteFooter';

/**
 * Layout Component
 * The shell of the application that holds the persistent UI:
 * - NavBar
 * - Global Sync Progress Bar
 * - SiteFooter (with Reset logic)
 */
const Layout = () => {
  // 1. Persistent State: Initialize by checking localStorage
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('survivor_progress');
    return saved ? parseInt(saved, 10) : 0;
  });

  // 2. Keep the state and storage in sync
  useEffect(() => {
    localStorage.setItem('survivor_progress', progress.toString());
  }, [progress]);

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#020c1b', 
      color: '#ffffff',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <NavBar />
      
      {/* GLOBAL HUD: SYNC PROGRESS */}
      <div style={{ 
        position: 'sticky', 
        top: '0', 
        zIndex: 100, 
        background: '#020c1b', 
        padding: '10px 20px',
        borderBottom: '1px solid rgba(53, 201, 255, 0.2)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '5px' }}>
          <span style={{ color: '#35c9ff', letterSpacing: '1px' }}>SYNC LEVEL</span>
          <span style={{ color: '#64ffda' }}>{progress}%</span>
        </div>
        <div style={{ width: '100%', height: '6px', background: '#112240', borderRadius: '3px', overflow: 'hidden' }}>
          <div style={{ 
            width: `${progress}%`, 
            height: '100%', 
            background: 'linear-gradient(90deg, #35c9ff, #64ffda)',
            transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 0 10px rgba(53, 201, 255, 0.5)'
          }} />
        </div>
      </div>

      <main style={{ flex: 1 }}>
        {/* All pages (Home, Map, Equipment) render here */}
        <Outlet context={{ setProgress }} />
      </main>

      <SiteFooter />
    </div>
  );
};

export default Layout;
