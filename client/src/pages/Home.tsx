import React from 'react';

/**
 * Home Component
 * Features dynamic glitch text and a high-tech terminal log feed.
 */
const Home = () => {
  const logs = [
    { id: 1, date: "2026.02.19", msg: "Sector Alpha synchronization stable." },
    { id: 2, date: "2026.02.18", msg: "Pulse Animation module integrated." },
    { id: 3, date: "2026.02.15", msg: "Warning: Digital tide levels rising." },
    { id: 4, date: "2026.02.10", msg: "Neural link established with unknown node." }
  ];

  return (
    <div style={{ padding: '60px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* GLITCH TITLE */}
      <div className="glitch-wrapper">
        <h1 className="glitch-text" data-text="OCEAN TIDE DROP">
          OCEAN TIDE DROP
        </h1>
      </div>
      
      <p style={{ color: '#8892b0', marginTop: '10px', fontSize: '1.1rem', letterSpacing: '2px', fontFamily: 'monospace' }}>
        SYSTEM_STATUS: <span style={{ color: '#64ffda' }}>OPERATIONAL</span>
      </p>

      {/* TERMINAL LOG FEED */}
      <div style={{ 
        maxWidth: '800px', 
        width: '100%', 
        margin: '50px auto',
        padding: '30px',
        background: 'rgba(17, 34, 64, 0.4)',
        borderRadius: '10px',
        border: '1px solid rgba(53, 201, 255, 0.2)',
        boxShadow: '0 10px 30px rgba(2, 12, 27, 0.5)'
      }}>
        <h2 style={{ 
          color: '#ffffff', 
          fontSize: '1.2rem', 
          borderBottom: '1px solid #35c9ff', 
          paddingBottom: '15px', 
          marginBottom: '20px',
          fontFamily: 'monospace'
        }}>
          > RECENT_SURVIVAL_LOGS
        </h2>
        
        {logs.map(log => (
          <div key={log.id} style={{ 
            background: 'rgba(53, 201, 255, 0.03)', 
            padding: '15px', 
            marginBottom: '10px', 
            borderLeft: '4px solid #35c9ff', 
            color: '#ffffff',
            fontFamily: 'monospace'
          }}>
            <span style={{ color: '#35c9ff', fontWeight: 'bold', marginRight: '10px' }}>
              [{log.date}]
            </span> 
            {log.msg}
          </div>
        ))}
      </div>

      <style>{`
        .glitch-wrapper { position: relative; }
        .glitch-text {
          font-size: 4rem;
          font-weight: 900;
          color: #ffffff;
          text-transform: uppercase;
          position: relative;
          text-shadow: 0 0 15px rgba(53, 201, 255, 0.6);
        }
        .glitch-text::before, .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.8;
        }
        .glitch-text::before {
          color: #35c9ff;
          z-index: -1;
          animation: glitch 3s cubic-bezier(.25, .46, .45, .94) both infinite;
        }
        .glitch-text::after {
          color: #ff4d4d;
          z-index: -2;
          animation: glitch 3s cubic-bezier(.25, .46, .45, .94) reverse both infinite;
        }
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-3px, 3px); }
          40% { transform: translate(-3px, -3px); }
          60% { transform: translate(3px, 3px); }
          80% { transform: translate(3px, -3px); }
          100% { transform: translate(0); }
        }
      `}</style>
    </div>
  );
};

export default Home;
