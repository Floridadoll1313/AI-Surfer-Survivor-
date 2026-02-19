import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '25px 50px', background: '#0a192f', borderBottom: '1px solid rgba(53, 201, 255, 0.2)'
    }}>
      <div style={{ fontSize: '1.6rem', fontWeight: '900', color: '#35c9ff', textTransform: 'uppercase' }}>
        AI SURFER
      </div>
      <div style={{ display: 'flex', gap: '40px' }}>
        <Link to="/" style={linkStyle}>Console</Link>
        <Link to="/world" style={linkStyle}>The Island</Link>
        <Link to="/challenges" style={linkStyle}>Trials</Link>
      </div>
    </nav>
  );
}

const linkStyle = { color: '#ffffff', textDecoration: 'none', fontSize: '0.8rem', textTransform: 'uppercase' as const, fontWeight: '700' };
