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
      borderBottom: '1px solid rgba(53, 201, 255, 0.3)',
      color: '#ffffff'
    }}>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#35c9ff' }}>
        AI SURFER
      </div>
      
      <div style={{ display: 'flex', gap: '25px' }}>
        <Link to="/" style={navItemStyle}>Home</Link>
        <Link to="/world" style={navItemStyle}>The Island</Link>
        <Link to="/challenges" style={navItemStyle}>Challenges</Link>
        <Link to="/lessons" style={navItemStyle}>Mastery</Link>
      </div>
    </nav>
  );
}

const navItemStyle = {
  color: '#ffffff',
  textDecoration: 'none',
  fontSize: '0.9rem',
  textTransform: 'uppercase' as const,
  letterSpacing: '1px',
  fontWeight: '500'
};
