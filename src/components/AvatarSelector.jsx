import React from 'react';
import { useAvatar } from '../context/AvatarContext';

const AvatarSelector = () => {
  const { selectedAvatar, setSelectedAvatar } = useAvatar();

  const avatars = [
    { id: 'runner', icon: '❖', label: 'RUNNER', desc: 'Standard agility unit.' },
    { id: 'ghost', icon: '◈', label: 'GHOST', desc: 'Leaves a data trail.' },
    { id: 'void', icon: '⬢', label: 'VOID', desc: 'High-density operative.' },
    { id: 'surfer', icon: '🌀', label: 'SURFER', desc: 'Flow-state specialist.' },
  ];

  return (
    <div style={{ margin: '30px 0', textAlign: 'left' }}>
      <h3 style={{ fontSize: '0.8rem', color: '#8892b0', marginBottom: '15px' }}>&gt; SELECT_AVATAR</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        {avatars.map((av) => (
          <div
            key={av.id}
            onClick={() => setSelectedAvatar(av.id)}
            style={{
              padding: '15px',
              border: `1px solid ${selectedAvatar === av.id ? '#64ffda' : '#233554'}`,
              background: selectedAvatar === av.id ? 'rgba(100, 255, 218, 0.1)' : '#112240',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              transition: 'all 0.2s ease'
            }}
          >
            <span style={{ fontSize: '1.5rem', color: selectedAvatar === av.id ? '#64ffda' : '#8892b0' }}>
              {av.icon}
            </span>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{av.label}</div>
              <div style={{ fontSize: '0.6rem', color: '#4e566d' }}>{av.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvatarSelector;
