import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDailyMission } from '../data/leveling'; // Updated path
import AvatarSelector from '../components/AvatarSelector';

const Home = () => {
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);

  // --- SETTINGS STATE ---
  const [audioEnabled, setAudioEnabled] = useState(localStorage.getItem('survivor_audio_enabled') !== 'false');
  const [isHardMode, setIsHardMode] = useState(localStorage.getItem('hard_mode_enabled') === 'true');

  const daily = getDailyMission();
  const isCompleted = localStorage.getItem(`mission_${daily.id}_${new Date().toDateString()}`) === 'true';

  const toggleAudio = () => {
    const newState = !audioEnabled;
    setAudioEnabled(newState);
    localStorage.setItem('survivor_audio_enabled', newState.toString());
  };

  const toggleHardMode = () => {
    const newState = !isHardMode;
    setIsHardMode(newState);
    localStorage.setItem('hard_mode_enabled', newState.toString());
  };

  const handleReset = () => {
    if (window.confirm("CRITICAL: THIS WILL ERASE ALL PROGRESS. CONTINUE?")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto', fontFamily: 'monospace', color: '#64ffda', backgroundColor: '#0a192f', minHeight: '100vh', textAlign: 'center', position: 'relative' }}>
      
      {/* SETTINGS GEAR ICON */}
      <button 
        onClick={() => setShowSettings(true)}
        style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: '1px solid #64ffda', color: '#64ffda', cursor: 'pointer', padding: '10px' }}
      >
        ⚙️ SYSTEM_CONFIG
      </button>

      <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>&gt; SURFER_HUB</h1>
      
      {/* MISSION CARD */}
      <div style={{ border: `1px solid ${isCompleted ? '#64ffda' : '#35c9ff'}`, padding: '20px', margin: '20px 0', background: 'rgba(17, 34, 64, 0.5)', textAlign: 'left' }}>
        <h3 style={{ margin: 0, fontSize: '0.8rem', color: '#8892b0' }}>&gt; DAILY_OBJECTIVE</h3>
        <p style={{ margin: '10px 0', color: isCompleted ? '#64ffda' : '#fff' }}>{daily.description}</p>
      </div>

      <AvatarSelector />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '30px' }}>
        <button onClick={() => navigate('/survivor')} style={{ padding: '20px', background: '#64ffda', color: '#0a192f', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.2rem' }}>
          LAUNCH_SIMULATION
        </button>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <button onClick={() => navigate('/shop')} style={subBtnStyle}>BLACK_MARKET</button>
          <button onClick={() => navigate('/achievements')} style={subBtnStyle}>VAULT</button>
        </div>
      </div>

      {/* --- SETTINGS MODAL --- */}
      {showSettings && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(10, 25, 47, 0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: '#112240', padding: '40px', border: '1px solid #64ffda', width: '80%', maxWidth: '400px' }}>
            <h2 style={{ marginTop: 0 }}>SYSTEM_SETTINGS</h2>
            
            <div style={settingRow}>
              <span>AUDIO_OUTPUT</span>
              <button onClick={toggleAudio} style={toggleBtn(audioEnabled)}>{audioEnabled ? 'ON' : 'OFF'}</button>
            </div>

            <div style={settingRow}>
              <span>HARD_MODE (3x XP)</span>
              <button onClick={toggleHardMode} style={toggleBtn(isHardMode)}>{isHardMode ? 'ACTIVE' : 'INACTIVE'}</button>
            </div>

            <button onClick={handleReset} style={{ width: '100%', padding: '10px', marginTop: '30px', background: 'none', border: '1px solid #ff5f5f', color: '#ff5f5f', cursor: 'pointer' }}>
              FACTORY_RESET
            </button>

            <button onClick={() => setShowSettings(false)} style={{ marginTop: '20px', color: '#8892b0', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
              CLOSE_CONFIG
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const subBtnStyle = { padding: '15px', background: 'transparent', border: '1px solid #64ffda', color: '#64ffda', cursor: 'pointer' };
const settingRow = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px 0' };
const toggleBtn = (active: boolean) => ({
  background: active ? '#64ffda' : '#0a192f',
  color: active ? '#0a192f' : '#64ffda',
  border: '1px solid #64ffda',
  padding: '5px 15px',
  cursor: 'pointer',
  fontWeight: 'bold' as const
});

export default Home;
