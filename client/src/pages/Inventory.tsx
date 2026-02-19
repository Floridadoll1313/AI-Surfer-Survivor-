import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Inventory = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState({
    energy: 0,
    speed: 0,
    hasShield: false,
    wallet: 0
  });

  useEffect(() => {
    setItems({
      energy: (Number(localStorage.getItem('upgrade_energy')) || 100),
      speed: (Number(localStorage.getItem('upgrade_speed')) || 0),
      hasShield: localStorage.getItem('survivor_shield_active') === 'true', // Optional: if you want shield to persist
      wallet: Number(localStorage.getItem('survivor_wallet')) || 0
    });
  }, []);

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'monospace', color: '#64ffda' }}>
      <header style={{ borderBottom: '1px solid #35c9ff', paddingBottom: '10px', marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0 }}>&gt; HARDWARE_INVENTORY</h1>
        <button onClick={() => navigate('/')} style={{ background: 'none', border: '1px solid #64ffda', color: '#64ffda', cursor: 'pointer', padding: '5px 15px' }}>BACK</button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        
        {/* ENERGY CORE */}
        <div style={{ border: '1px solid #112240', padding: '20px', background: 'rgba(17, 34, 64, 0.4)' }}>
          <h3 style={{ color: '#35c9ff' }}>[ CORE_CELL ]</h3>
          <p style={{ color: '#8892b0' }}>Max Capacity: <span style={{ color: '#fff' }}>{items.energy}u</span></p>
          <div style={{ width: '100%', height: '10px', background: '#0a192f', marginTop: '10px' }}>
            <div style={{ width: `${Math.min((items.energy / 300) * 100, 100)}%`, height: '100%', background: '#64ffda' }}></div>
          </div>
        </div>

        {/* REGEN TURBINE */}
        <div style={{ border: '1px solid #112240', padding: '20px', background: 'rgba(17, 34, 64, 0.4)' }}>
          <h3 style={{ color: '#35c9ff' }}>[ REGEN_MOD ]</h3>
          <p style={{ color: '#8892b0' }}>Efficiency Level: <span style={{ color: '#fff' }}>+{items.speed}</span></p>
          <p style={{ fontSize: '0.8rem', color: '#4e566d' }}>Impact: {items.speed * 5} units/sec</p>
        </div>

        {/* SHIELD PROTOCOL */}
        <div style={{ border: '1px solid #112240', padding: '20px', background: 'rgba(17, 34, 64, 0.4)' }}>
          <h3 style={{ color: '#35c9ff' }}>[ DEFENSE_HEX ]</h3>
          <p style={{ color: '#8892b0' }}>Shield Status: <span style={{ color: items.hasShield ? '#64ffda' : '#ff5f5f' }}>{items.hasShield ? 'ACTIVE' : 'OFFLINE'}</span></p>
          <p style={{ fontSize: '0.8rem', color: '#4e566d' }}>Auto-recharges on run start.</p>
        </div>

      </div>

      <div style={{ marginTop: '40px', padding: '20px', border: '1px dashed #4e566d', textAlign: 'center' }}>
        <p style={{ color: '#8892b0' }}>Available Credits: <span style={{ color: '#64ffda' }}>{items.wallet} XP</span></p>
        <button onClick={() => navigate('/survivor')} style={{ marginTop: '10px', padding: '10px 20px', background: '#35c9ff', color: '#0a192f', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>VISIT_UPGRADE_SHOP</button>
      </div>
    </div>
  );
};

export default Inventory;
