import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import SiteFooter from './SiteFooter';

const Layout = () => {
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('survivor_progress');
    return saved ? parseInt(saved, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem('survivor_progress', progress.toString());
  }, [progress]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#020c1b', color: '#ffffff', display: 'flex', flexDirection: 'column' }}>
      <NavBar />
      <div style={{ position: 'sticky', top: '0', zIndex: 100, background: '#020c1b', padding: '10px 20px', borderBottom: '1px solid rgba(53, 201, 255, 0.2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '5px' }}>
          <span style={{ color: '#35c9ff' }}>SYNC LEVEL</span>
          <span style={{ color: '#64ffda' }}>{progress}%</span>
        </div>
        <div style={{ width: '100%', height: '6px', background: '#112240', borderRadius: '3px', overflow: 'hidden' }}>
          <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, #35c9ff, #64ffda)', transition: 'width 0.5s ease-out' }} />
        </div>
      </div>
      <main style={{ flex: 1 }}>
        <Outlet context={{ setProgress }} />
      </main>
      <SiteFooter />
    </div>
  );
};

export default Layout;
