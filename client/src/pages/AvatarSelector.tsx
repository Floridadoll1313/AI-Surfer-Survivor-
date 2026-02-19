import React, { useState } from 'react';

const AvatarSelector = () => {
  const avatars = [
    { id: 'ghost', icon: '◈', label: 'NEURAL_GHOST' },
    { id: 'runner', icon: '❖', label: 'TIDE_RUNNER' },
    { id: 'void', icon: '⬢', label: 'VOID_WALKER' },
    { id: 'surfer', icon: '🌀', label: 'AI_SURFER' }
  ];

  const [selected, setSelected] = useState(localStorage.getItem('survivor_avatar') || 'ghost');

  const selectAvatar = (id: string) => {
    setSelected(id);
    localStorage.setItem('survivor_avatar', id);
    // Reload to update the Layout header immediately
    window.location.reload();
  };

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', color: '#ffffff', fontFamily: 'monospace' }}>
      <h1 style={{ color: '#35c9ff' }}>&gt; IDENTITY_ENCRYPTION</h1>
      <p style={{ color: '#8892b0' }}>CHOOSE YOUR DIGITAL SIGNATURE:</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px', marginTop: '30px' }}>
        {avatars.map((a) => (
          <div 
            key={a.id}
            onClick={() => selectAvatar(a.id)}
            style={{
              padding: '30px',
              textAlign: 'center',
              background: selected === a.id ? 'rgba(100, 255, 218, 0.1)' : 'rgba(17, 34, 64, 0.6)',
              border: `2px solid ${selected === a.id ? '#64ffda' : '#35c9ff'}`,
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '10px' }}>{a.icon}</div>
            <div style={{ color: selected === a.id ? '#64ffda' : '#35c9ff', fontSize: '0.8rem' }}>{a.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvatarSelector;
