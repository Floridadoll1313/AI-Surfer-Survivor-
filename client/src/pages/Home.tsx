import React, { useState } from 'react';

const Home = () => {
  const [audioEnabled, setAudioEnabled] = useState(localStorage.getItem('survivor_audio_enabled') !== 'false');

  const toggleAudio = () => {
    const newState = !audioEnabled;
    setAudioEnabled(newState);
    localStorage.setItem('survivor_audio_enabled', newState.toString());
  };

  return (
    <div style={{ position: 'relative' /* ... your other styles */ }}>
      {/* MUTE TOGGLE BUTTON */}
      <button 
        onClick={toggleAudio}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          background: 'none',
          border: `1px solid ${audioEnabled ? '#64ffda' : '#ff5f5f'}`,
          color: audioEnabled ? '#64ffda' : '#ff5f5f',
          cursor: 'pointer',
          padding: '5px 10px',
          fontFamily: 'monospace',
          fontSize: '0.7rem'
        }}
      >
        {audioEnabled ? '🔊 AUDIO_ON' : '🔇 AUDIO_MUTED'}
      </button>

      {/* ... Rest of your Home.tsx content */}
    </div>
  );
};
