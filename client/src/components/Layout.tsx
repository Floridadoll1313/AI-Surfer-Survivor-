import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import SiteFooter from './SiteFooter';

const Layout = () => {
  const [progress, setProgress] = useState(Number(localStorage.getItem('survivor_progress')) || 0);
  const avatarId = localStorage.getItem('survivor_avatar') || 'ghost';
  
  // Simple mapping for display
  const avatarMap: Record<string, string> = { ghost: '◈', runner: '❖', void: '⬢', surfer: '🌀' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#020c1b' }}>
      <NavBar />
      
      {/* HUD HEADER */}
      <div style={{ padding: '20px', background: 'rgba(2, 12, 27, 0.8)', borderBottom: '1px solid #35c9ff', display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ fontSize: '2rem', color: '#64ffda' }}>{avatarMap[avatarId]}</div>
        <div style={{ flex: 1 }}>
          <div style={{ color: '#35c9ff', fontSize: '0.7rem', marginBottom: '5px', fontFamily: 'monospace' }}>SYNC_LEVEL: {progress}%</div>
          <div style={{ width: '100%', height: '4px', background: '#112240' }}>
            <div style={{ width: `${progress}%`, height: '100%', background: '#64ffda', boxShadow: '0 0 10px #64ffda' }} />
          </div>
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
