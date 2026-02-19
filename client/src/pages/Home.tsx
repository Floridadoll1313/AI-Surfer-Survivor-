import React, { useState, useEffect } from 'react';

/**
 * Home Component
 * Features: Glitch Title, Automated System Logs, and User Submission Logs.
 */
const Home = () => {
  // 1. Initial State for Logs (combining system defaults with user-saved logs)
  const [userLogs, setUserLogs] = useState<{ id: number, date: string, msg: string }[]>(() => {
    const saved = localStorage.getItem('survivor_user_logs');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [inputMsg, setInputMsg] = useState('');

  const systemLogs = [
    { id: 's1', date: "2026.02.19", msg: "Sector Alpha synchronization stable." },
    { id: 's2', date: "2026.02.18", msg: "Pulse Animation module integrated." }
  ];

  // 2. Save logs to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('survivor_user_logs', JSON.stringify(userLogs));
  }, [userLogs]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const newLog = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0].replace(/-/g, '.'),
      msg: inputMsg
    };

    setUserLogs([newLog, ...userLogs]);
    setInputMsg('');
  };

  return (
    <div style={{ padding: '60px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* GLITCH TITLE */}
      <div className="glitch-wrapper">
        <h1 className="glitch-text" data-text="OCEAN TIDE DROP">OCEAN TIDE DROP</h1>
      </div>
      
      <p style={{ color: '#8892b0', marginTop: '10px', fontSize: '1.1rem', letterSpacing: '2px', fontFamily: 'monospace' }}>
        SYSTEM_STATUS: <span style={{ color: '#64ffda' }}>OPERATIONAL</span>
      </p>

      {/* NEW: LOG SUBMISSION TERMINAL */}
      <div style={{ 
        maxWidth: '800px', width: '100%', margin: '40px auto 0',
        padding: '20px', background: 'rgba(2, 12, 27, 0.6)',
        border: '1px solid #64ffda', borderRadius: '8px'
      }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px' }}>
          <span style={{ color: '#64ffda', fontFamily: 'monospace', paddingTop: '10px' }}>&gt;</span>
          <input 
            type="text"
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            placeholder="ENTER_SURVIVAL_LOG_ENTRY..."
            style={{
              flex: 1, background: 'transparent', border: 'none',
              outline: 'none', color: '#64ffda', fontFamily: 'monospace',
              fontSize: '1rem', padding: '10px'
            }}
          />
          <button type="submit" style={{
            background: '#64ffda', color: '#020c1b', border: 'none',
            padding: '0 20px', cursor: 'pointer', fontFamily: 'monospace',
            fontWeight: 'bold', borderRadius: '4px'
          }}>
            SUBMIT
          </button>
        </form>
      </div>

      {/* DYNAMIC LOG FEED */}
      <div style={{ 
        maxWidth: '800px', width: '100%', margin: '30px auto',
        padding: '30px', background: 'rgba(17, 34, 64, 0.4)',
        borderRadius: '10px', border: '1px solid rgba(53, 201, 255, 0.2)'
      }}>
        <h2 style={{ color: '#ffffff', fontSize: '1.2rem', borderBottom: '1px solid #35c9ff', paddingBottom: '15px', marginBottom: '20px', fontFamily: 'monospace' }}>
          &gt; RECENT_SURVIVAL_LOGS
        </h2>
        
        {/* User Logs Appear First */}
        {userLogs.map(log => (
          <div key={log.id} style={{ background: 'rgba(100, 255, 218, 0.05)', padding: '15px', marginBottom: '10px', borderLeft: '4px solid #64ffda', color: '#ffffff', fontFamily: 'monospace' }}>
            <span style={{ color: '#64ffda', fontWeight: 'bold', marginRight: '10px' }}>[{log.date}]</span> {log.msg}
          </div>
        ))}

        {/* System Logs */}
        {systemLogs.map(log => (
          <div key={log.id} style={{ background: 'rgba(53, 201, 255, 0.03)', padding: '15px', marginBottom: '10px', borderLeft: '4px solid #35c9ff', color: '#ffffff', fontFamily: 'monospace' }}>
            <span style={{ color: '#35c9ff', fontWeight: 'bold', marginRight: '10px' }}>[{log.date}]</span> {log.msg}
          </div>
        ))}
      </div>

      <style>{`
        .glitch-wrapper { position: relative; }
        .glitch-text {
          font-size: 4rem; font-weight: 900; color: #ffffff;
          text-transform: uppercase; position: relative;
          text-shadow: 0 0 15px rgba(53, 201, 255, 0.6);
        }
        .glitch-text::before, .glitch-text::after {
          content: attr(data-text); position: absolute;
          top: 0; left: 0; width: 100%; height: 100%; opacity: 0.8;
        }
        .glitch-text::before { color: #35c9ff; z-index: -1; animation: glitch 3s cubic-bezier(.25, .46, .45, .94) both infinite; }
        .glitch-text::after { color: #ff4d4d; z-index: -2; animation: glitch 3s cubic-bezier(.25, .46, .45, .94) reverse both infinite; }
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
