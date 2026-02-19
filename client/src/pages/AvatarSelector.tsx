import React from 'react';
import { useAvatar } from '../context/AvatarContext';

const AvatarSelector = () => {
  const { selectedAvatar, setAvatar } = useAvatar();

  const avatars = [
    { id: 'ghost', icon: '◈', label: 'NEURAL_GHOST' },
    { id: 'runner', icon: '❖', label: 'TIDE_RUNNER' },
    { id: 'void', icon: '⬢', label: 'VOID_WALKER' },
    { id: 'surfer', icon: '🌀', label: 'AI_SURFER' }
  ];

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '40px auto', 
      padding: '20px', 
      color: '#ffffff', 
      fontFamily: 'monospace' 
    }}>
      <h1 style={{ color: '#35c9ff', letterSpacing: '2px' }}>&gt; IDENTITY_ENCRYPTION</h1>
      <p style={{ color: '#8892b0', marginBottom: '30px' }}>SELECT YOUR DIGITAL SIGNATURE TO SYNC WITH THE GRID:</p>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
        gap: '20px' 
      }}>
        {avatars.map((a) => (
          <div 
            key={a.id} 
            onClick={() => setAvatar(a.id)}
            style={{
              padding: '30px',
              textAlign: 'center',
              background: selectedAvatar === a.id ? 'rgba(100, 255, 218, 0.1)' : 'rgba(17, 34, 64, 0.4)',
              border: `2px solid ${selectedAvatar === a.id ? '#64ffda' : '#35c9ff'}`,
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.2s ease-in-out',
              transform: selectedAvatar === a.id ? 'scale(1.05)' : 'scale(1)',
              boxShadow: selectedAvatar === a.id ? '0 0 20px rgba(100, 255, 218, 0.2)' : 'none'
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '10px' }}>{a.icon}</div>
            <div style={{ 
              color: selectedAvatar === a.id ? '#64ffda' : '#35c9ff', 
              fontSize: '0.8rem',
              fontWeight: 'bold' 
            }}>
              {a.label}
            </div>
            {selectedAvatar === a.id && (
              <div style={{ color: '#64ffda', fontSize: '0.6rem', marginTop: '10px' }}>[ ACTIVE_SESSION ]</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvatarSelector;
