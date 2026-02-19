import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = () => {
  // 1. Initialize state by checking localStorage first
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('survivor_progress');
    return saved ? parseInt(saved, 10) : 0;
  });

  // 2. Optional: Keep the bar synced if progress changes elsewhere
  useEffect(() => {
    localStorage.setItem('survivor_progress', progress.toString());
  }, [progress]);

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#020c1b', 
      color: '#ffffff',
      fontFamily: '"Segoe UI", Roboto, sans-serif' 
    }}>
      <NavBar />
      
      {/* GLOBAL SYNC BAR */}
      <div style={{ 
        position: 'sticky', 
        top: '70px', 
        zIndex: 100, 
        background: '#020c1b', 
        padding: '10px 20px',
        borderBottom: '1px solid rgba(53, 201, 255, 0.2)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '5px' }}>
          <span style={{ color: '#35c9ff' }}>SYNC LEVEL</span>
          <span style={{ color: '#64ffda' }}>{progress}%</span>
        </div>
        <div style={{ width: '100%', height: '8px', background: '#112240', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ 
            width: `${progress}%`, 
            height: '100%', 
            background: 'linear-gradient(90deg, #35c9ff, #64ffda)',
            transition: 'width 0.5s ease-out',
            boxShadow: '0 0 10px #35c9ff'
          }} />
        </div>
      </div>

      <main>
        {/* We pass setProgress through the Outlet context so all pages can use it */}
        <Outlet context={{ setProgress }} />
      </main>
    </div>
  );
};

export default Layout;
