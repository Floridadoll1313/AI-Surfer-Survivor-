import React from 'react';

const Gear = () => {
  return (
    <div className="terminal-content" style={{ color: '#00ff00', padding: '20px' }}>
      <h2>[ EQUIPMENT_PROTOCOL_v1.0 ]</h2>
      <div style={{ border: '1px solid #333', padding: '15px' }}>
        <p>>>> NO GEAR DETECTED IN INVENTORY</p>
        <p>>>> VISIT THE SHOP TO UPGRADE NEURAL LINK</p>
      </div>
    </div>
  );
};

export default Gear;
