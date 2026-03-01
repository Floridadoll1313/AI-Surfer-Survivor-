import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAvatar } from '../context/AvatarContext';

const Header = () => {
  const { selectedAvatar } = useAvatar();
  const location = useLocation();

  const avatarData: Record<string, { icon: string; label: string }> = {
    ghost: { icon: '◈', label: 'NEURAL_GHOST' },
    runner: { icon: '❖', label: 'TIDE_RUNNER' },
    void: { icon: '⬢', label: 'VOID_WALKER' },
    surfer: { icon: '🌀', label: 'AI_SURFER' }
  };

  const current = avatarData[selectedAvatar] || avatarData.ghost;

  const navLinkStyle = (path: string) => ({
    textDecoration: 'none',
    color: location.pathname === path ? '#64ffda' : '#8892b0',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    transition: 'color 0.3s ease',
    borderBottom: location.pathname === path ? '1px solid #64ffda' : 'none',
    paddingBottom: '2px'
  });

  return (
    <header style={{
      padding: '15px 40px',
      background: '#0a192f',
      borderBottom: '1px solid #35c9ff',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontFamily: 'monospace',
      boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      {/* Left: Logo and Nav Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div style={{ 
            color: '#35c9ff', 
            fontWeight: 'bold', 
            fontSize: '1.2rem',
            letterSpacing: '3px' 
          }}>
            AI_SURFER_SURVIVOR
          </div>
        </Link>
        
        <nav style={{ display: 'flex', gap: '20px', marginTop: '5px' }}>
          <Link to="/game" style={navLinkStyle('/game')}>[ GRID ]</Link>
          <Link to="/leaderboard" style={navLinkStyle('/leaderboard')}>[ RANKINGS ]</Link>
        </nav>
      </div>

      {/* Right: User Identity Display */}
      <Link to="/avatar" style={{ textDecoration: 'none' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '15px',
          background: 'rgba(53, 201, 255, 0.1)',
          padding: '5px 15px',
          borderRadius: '20px',
          border: '1px solid rgba(100, 255, 218, 0.3)',
          transition: 'all 0.3s ease'
        }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: '#8892b0', fontSize: '0.6rem' }}>ACTIVE_IDENTITY</div>
            <div style={{ color: '#64ffda', fontSize: '0.8rem', fontWeight: 'bold' }}>{current.label}</div>
          </div>
          <div style={{ 
            fontSize: '1.8rem', 
            textShadow: '0 0 10px #64ffda' 
          }}>
            {current.icon}
          </div>
        </div>
      </Link>
    </header>
  );
};

export default Header;
