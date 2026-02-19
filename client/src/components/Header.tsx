import React from 'react';
import { Link } from 'react-router-dom';
import { useAvatar } from '../context/AvatarContext';

const Header = () => {
  const { selectedAvatar } = useAvatar();

  // Mapping the ID to the specific icon and label for the display
  const avatarData: Record<string, { icon: string; label: string }> = {
    ghost: { icon: '◈', label: 'NEURAL_GHOST' },
    runner: { icon: '❖', label: 'TIDE_RUNNER' },
    void: { icon: '⬢', label: 'VOID_WALKER' },
    surfer: { icon: '🌀', label: 'AI_SURFER' }
  };

  const current = avatarData[selectedAvatar] || avatarData.ghost;

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
      {/* Logo / Title */}
      <Link to="/" style={{ textDecoration: 'none' }}>
        <div style={{ 
          color: '#35c9ff', 
          fontWeight: 'bold', 
          fontSize: '1.2rem',
          letterSpacing: '3px' 
        }}>
          AI_SURFER_SURVIVOR <span style={{ color: '#64ffda', fontSize: '0.8rem' }}>v1.0</span>
        </div>
      </Link>

      {/* User Identity Display */}
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
