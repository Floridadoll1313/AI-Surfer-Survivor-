import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Upgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  icon: string;
  storageKey: string;
}

const Shop = () => {
  const navigate = useNavigate();
  const [wallet, setWallet] = useState(Number(localStorage.getItem('survivor_wallet')) || 0);

  const upgrades: Upgrade[] = [
    { 
      id: 'u1', 
      name: 'INITIAL_SHIELD', 
      description: 'Start every run with an active data shield.', 
      cost: 5000, 
      icon: '🛡️', 
      storageKey: 'perm_shield_unlocked' 
    },
    { 
      id: 'u2', 
      name: 'MAGNET_CORE', 
      description: 'Fragments are pulled from 1 extra tile away.', 
      cost: 8000, 
      icon: '🧲', 
      storageKey: 'perm_magnet_boost' 
    },
    { 
      id: 'u3', 
      name: 'NEURAL_OVERCLOCK', 
      description: 'Increases base movement speed by 10%.', 
      cost: 12000, 
      icon: '⚡', 
      storageKey: 'perm_speed_boost' 
    },
    { 
      id: 'u4', 
      name: 'XP_EXTRACTOR', 
      description: 'Permanent 1.2x multiplier on all XP gained.', 
      cost: 20000, 
      icon: '💎', 
      storageKey: 'perm_xp_boost' 
    }
  ];

  const buyUpgrade = (upgrade: Upgrade) => {
    if (wallet >= upgrade.cost && localStorage.getItem(upgrade.storageKey) !== 'true') {
      const newBalance = wallet - upgrade.cost;
      setWallet(newBalance);
      localStorage.setItem('survivor_wallet', newBalance.toString());
      localStorage.setItem(upgrade.storageKey, 'true');
      alert(`SYSTEM_UPDATE: ${upgrade.name} INSTALLED`);
    } else if (wallet < upgrade.cost) {
      alert('INSUFFICIENT_CREDITS');
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '900px', margin: '0 auto', fontFamily: 'monospace', color: '#64ffda', backgroundColor: '#0a192f', minHeight: '100vh' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', borderBottom: '1px solid #112240', paddingBottom: '20px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '2rem' }}>&gt; BLACK_MARKET</h1>
          <p style={{ color: '#8892b0' }}>HARDWARE_UPGRADES // REWIRING_REALITY</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.8rem', color: '#8892b0' }}>AVAILABLE_CREDITS</div>
          <div style={{ fontSize: '1.8rem', color: '#35c9ff' }}>{wallet.toLocaleString()} XP</div>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {upgrades.map((item) => {
          const isOwned = localStorage.getItem(item.storageKey) === 'true';
          
          return (
            <div key={item.id} style={{ 
              background: '#112240', 
              padding: '25px', 
              border: `1px solid ${isOwned ? '#64ffda' : '#233554'}`,
              opacity: isOwned ? 0.7 : 1,
              transition: 'all 0.3s ease'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '15px' }}>{item.icon}</div>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '1.1rem' }}>{item.name}</h3>
              <p style={{ fontSize: '0.8rem', color: '#8892b0', height: '40px' }}>{item.description}</p>
              
              <button 
                onClick={() => buyUpgrade(item)}
                disabled={isOwned}
                style={{
                  width: '100%',
                  marginTop: '20px',
                  padding: '12px',
                  background: isOwned ? '#233554' : (wallet >= item.cost ? '#64ffda' : '#0a192f'),
                  color: isOwned ? '#4e566d' : (wallet >= item.cost ? '#0a192f' : '#ff5f5f'),
                  border: isOwned ? 'none' : `1px solid ${wallet >= item.cost ? '#64ffda' : '#ff5f5f'}`,
                  fontWeight: 'bold',
                  cursor: isOwned ? 'default' : 'pointer',
                  fontFamily: 'monospace'
                }}
              >
                {isOwned ? 'INSTALLED' : `${item.cost} XP`}
              </button>
            </div>
          );
        })}
      </div>

      <button 
        onClick={() => navigate('/')} 
        style={{ marginTop: '50px', background: 'none', border: 'none', color: '#8892b0', cursor: 'pointer', textDecoration: 'underline' }}
      >
        &lt; RETURN_TO_HUB
      </button>
    </div>
  );
};

export default Shop;
