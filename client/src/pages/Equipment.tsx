import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

/**
 * Equipment Component
 * Allows users to equip gear that increases their global Sync Level.
 */
const Equipment = () => {
  const { setProgress } = useOutletContext<{ setProgress: React.Dispatch<React.SetStateAction<number>> }>();
  const [flash, setFlash] = useState(false);

  const items = [
    { id: 'bio_link', name: "Biometric Link", desc: "Syncs your pulse to the Realm.", rarity: "Essential", boost: 25 },
    { id: 'dig_comp', name: "Digital Compass", desc: "Points toward stable nodes.", rarity: "Common", boost: 15 },
    { id: 'neu_over', name: "Neural Overdrive", desc: "Instantly boosts sync levels.", rarity: "Rare", boost: 50 }
  ];

  const collectItem = (boost: number) => {
    // Trigger visual feedback flash
    setFlash(true);
    setTimeout(() => setFlash(false), 300);

    // Update global progress state
    setProgress(prev => {
      const nextValue = Math.min(prev + boost, 100);
      localStorage.setItem('survivor_progress', nextValue.toString());
      return nextValue;
    });
  };

  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px', minHeight: '80vh' }}>
      {/* HUD FLASH EFFECT */}
      {flash && (
        <div style={{ 
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', 
          backgroundColor: 'rgba(53, 201, 255, 0.2)', zIndex: 1000, pointerEvents: 'none' 
        }} />
      )}

      <h1 style={{ color: '#35c9ff', fontSize: '2.5rem', fontFamily: 'monospace' }}>
        > SURVIVAL_GEAR_MANIFEST
      </h1>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '25px', 
        marginTop: '30px' 
      }}>
        {items.map((item) => (
          <div key={item.id} style={{ 
            background: '#112240', 
            padding: '25px', 
            borderRadius: '12px', 
            border: '1px solid #35c9ff', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between',
            boxShadow: '0 10px 20px rgba(0,0,0,0.3)'
          }}>
            <div>
              <h3 style={{ color: '#35c9ff', margin: '0 0 10px 0', fontFamily: 'monospace' }}>{item.name}</h3>
              <p style={{ color: '#8892b0', fontSize: '0.9rem', lineHeight: '1.4' }}>{item.desc}</p>
              <span style={{ 
                fontSize: '0.7rem', 
                color: item.rarity === 'Rare' ? '#ff4d4d' : '#64ffda', 
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                [{item.rarity}]
              </span>
            </div>
            
            <button 
              onClick={() => collectItem(item.boost)} 
              style={{ 
                marginTop: '25px', 
                background: 'rgba(53, 201, 255, 0.1)', 
                border: '1px solid #35c9ff', 
                color: '#35c9ff', 
                padding: '12px', 
                cursor: 'pointer', 
                borderRadius: '4px',
                fontWeight: 'bold',
                fontFamily: 'monospace',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(53, 201, 255, 0.2)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'rgba(53, 201, 255, 0.1)'}
            >
              EQUIP_COMPONENT (+{item.boost}%)
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Equipment;
