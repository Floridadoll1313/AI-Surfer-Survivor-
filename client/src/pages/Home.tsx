import { getDailyMission } from '../data/missions';

const Home = () => {
  const daily = getDailyMission();import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDailyMission } from '../data/missions';

const Home = () => {
  const navigate = useNavigate();
  
  // --- HARD MODE STATE ---
  const [isHardMode, setIsHardMode] = useState(localStorage.getItem('hard_mode_enabled') === 'true');

  // --- DAILY MISSION LOGIC ---
  const daily = getDailyMission();
  const isCompleted = localStorage.getItem(`mission_${daily.id}_${new Date().toDateString()}`) === 'true';

  const toggleHardMode = () => {
    const newState = !isHardMode;
    setIsHardMode(newState);
    localStorage.setItem('hard_mode_enabled', newState.toString());
  };

  return (
    <div style={{ 
      padding: '40px', 
      maxWidth: '600px', 
      margin: '0 auto', 
      fontFamily: 'monospace', 
      color: '#64ffda', 
      backgroundColor: '#0a192f', 
      minHeight: '100vh',
      textAlign: 'center' 
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>&gt; SURFER_HUB</h1>
      <p style={{ color: '#8892b0', marginBottom: '40px' }}>LOGGED_IN_AS: OPERATOR_01</p>

      {/* DAILY MISSION CARD */}
      <div style={{ 
        border: `1px solid ${isCompleted ? '#64ffda' : '#35c9ff'}`, 
        padding: '20px', 
        marginBottom: '30px', 
        background: 'rgba(17, 34, 64, 0.5)',
        textAlign: 'left'
      }}>
        <h3 style={{ margin: 0, fontSize: '0.8rem', color: '#8892b0' }}>&gt; DAILY_OBJECTIVE</h3>
        <p style={{ margin: '10px 0', fontSize: '1.1rem', color: isCompleted ? '#64ffda' : '#fff' }}>
          {isCompleted ? '✓ ' : ''}{daily.description}
        </p>
        <div style={{ fontSize: '0.8rem', color: '#35c9ff' }}>REWARD: {daily.reward} XP</div>
      </div>

      {/* HARD MODE TOGGLE */}
      <div style={{ 
        margin: '20px 0', 
        padding: '15px', 
        border: `1px solid ${isHardMode ? '#ff5f5f' : '#233554'}`,
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span style={{ color: isHardMode ? '#ff5f5f' : '#8892b0' }}>
          {isHardMode ? 'OVERCLOCK_ACTIVE (3x XP)' : 'STANDARD_PROTOCOL'}
        </span>
        <button 
          onClick={toggleHardMode}
          style={{
            background: isHardMode ? '#ff5f5f' : '#112240',
            color: isHardMode ? '#0a192f' : '#64ffda',
            border: 'none',
            padding: '8px 20px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          {isHardMode ? 'ON' : 'OFF'}
        </button>
      </div>

      {/* MAIN NAVIGATION */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '40px' }}>
        <button 
          onClick={() => navigate('/survivor')} 
          style={{ padding: '20px', fontSize: '1.2rem', background: '#64ffda', color: '#0a192f', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
        >
          LAUNCH_SIMULATION
        </button>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <button onClick={() => navigate('/profile')} style={secondaryBtnStyle}>USER_PROFILE</button>
          <button onClick={() => navigate('/achievements')} style={secondaryBtnStyle}>MEDAL_VAULT</button>
          <button onClick={() => navigate('/leaderboard')} style={secondaryBtnStyle}>RANKINGS</button>
          <button onClick={() => navigate('/credits')} style={secondaryBtnStyle}>SYSTEM_INFO</button>
        </div>
      </div>
    </div>
  );
};

const secondaryBtnStyle = {
  padding: '15px',
  background: 'transparent',
  border: '1px solid #64ffda',
  color: '#64ffda',
  cursor: 'pointer',
  fontFamily: 'monospace'
};

export default Home;
  const isCompleted = localStorage.getItem(`mission_${daily.id}_${new Date().toDateString()}`) === 'true';

  return (
    <div style={{ border: '1px solid #64ffda', padding: '15px', marginTop: '20px', background: '#112240' }}>
      <h3 style={{ margin: 0, fontSize: '0.8rem', color: '#8892b0' }}>&gt; DAILY_OBJECTIVE</h3>
      <p style={{ margin: '10px 0', color: isCompleted ? '#64ffda' : '#fff' }}>
        {isCompleted ? '[COMPLETED] ' : ''}{daily.description}
      </p>
      <div style={{ fontSize: '0.7rem', color: '#35c9ff' }}>REWARD: {daily.reward} XP</div>
    </div>
  );
};
