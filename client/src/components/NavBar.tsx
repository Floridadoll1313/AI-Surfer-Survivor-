import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '25px 50px',
      background: '#0a192f',
      borderBottom: '1px solid rgba(53, 201, 255, 0.2)',
      position: 'sticky',
      top: 0,
      zIndex: 1100
    }}>
      <div style={{ 
        fontSize: '1.6rem', 
        fontWeight: '900', 
        color: '#35c9ff', 
        letterSpacing: '3px',
        textTransform: 'uppercase'
      }}>
        AI SURFER
      </div>
      
      <div style={{ display: 'flex', gap: '40px' }}>
        <Link to="/" style={navLinkStyle}>Console</Link>
        <Link to="/world" style={navLinkStyle}>The Island</Link>
        <Link to="/challenges" style={navLinkStyle}>Trials</Link>
      </div>
    </nav>
  );
}

const navLinkStyle = {
  color: '#ffffff',
  textDecoration: 'none',
  fontSize: '0.8rem',
  textTransform: 'uppercase' as const,
  letterSpacing: '2px',
  fontWeight: '700',
  transition: 'color 0.3s ease'
};
