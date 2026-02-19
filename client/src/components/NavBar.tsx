import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 40px',
      background: '#0a192f',
      borderBottom: '1px solid rgba(53, 201, 255, 0.3)'
    }}>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#35c9ff', letterSpacing: '2px' }}>
        AI SURFER
      </div>
      
      <div style={{ display: 'flex', gap: '30px' }}>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/world" style={linkStyle}>The Island</Link>
        <Link to="/challenges" style={linkStyle}>Challenges</Link>
      </div>
    </nav>
  );
}

const linkStyle = {
  color: '#ffffff',
  textDecoration: 'none',
  fontSize: '0.85rem',
  textTransform: 'uppercase' as const,
  letterSpacing: '1px',
  fontWeight: '600'
};
