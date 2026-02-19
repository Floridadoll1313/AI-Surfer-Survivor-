import React from 'react';
import { useNavigate } from 'react-router-dom';

const Credits = () => {
  const navigate = useNavigate();

  const creditSections = [
    { title: 'LEAD_ARCHITECT', names: ['Floridadoll1313'] },
    { title: 'SYSTEM_DESIGN', names: ['Neural Link Engines', 'React Framework'] },
    { title: 'VISUAL_INTERFACE', names: ['Cyber-Grid UI v2.0', 'Monospace Font Systems'] },
    { title: 'AUDIO_OPERATIONS', names: ['Silent_Void_Protocol'] },
    { title: 'SPECIAL_THANKS', names: ['The Open Source Community', 'Beta Testers', 'AI Collaboration Units'] },
  ];

  return (
    <div style={{ 
      backgroundColor: '#0a192f', 
      height: '100vh', 
      width: '100vw', 
      overflow: 'hidden', 
      position: 'relative',
      fontFamily: 'monospace',
      color: '#64ffda'
    }}>
      {/* MATRIX BACKGROUND EFFECT (Subtle) */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.05,
        pointerEvents: 'none',
        background: 'linear-gradient(rgba(100, 255, 218, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(100, 255, 218, 0.1) 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }} />

      {/* SCROLLING CONTENT */}
      <div className="credits-scroll" style={{
        position: 'absolute',
        width: '100%',
        textAlign: 'center',
        animation: 'scroll 25s linear infinite'
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '100px', letterSpacing: '10px' }}>&gt; AI_SURFER_SURVIVOR</h1>
        
        {creditSections.map((section, idx) => (
          <div key={idx} style={{ marginBottom: '80px' }}>
            <h2 style={{ color: '#8892b0', fontSize: '1rem', letterSpacing: '5px' }}>[{section.title}]</h2>
            {section.names.map((name, i) => (
              <p key={i} style={{ fontSize: '1.5rem', margin: '10px 0' }}>{name}</p>
            ))}
          </div>
        ))}

        <div style={{ marginTop: '200px', paddingBottom: '100px' }}>
          <p style={{ color: '#ff5f5f' }}>CONNECTION_TERMINATED // 2026</p>
        </div>
      </div>

      {/* RETURN BUTTON */}
      <button 
        onClick={() => navigate('/')}
        style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'none',
          border: '1px solid #64ffda',
          color: '#64ffda',
          padding: '10px 30px',
          cursor: 'pointer',
          zIndex: 10
        }}
      >
        EXIT_CREDITS
      </button>

      {/* INJECTED ANIMATION CSS */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateY(100vh); }
          100% { transform: translateY(-150%); }
        }
      `}</style>
    </div>
  );
};

export default Credits;
