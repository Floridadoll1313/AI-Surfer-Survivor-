import React from 'react';

const MapPage = () => {
  return (
    <div className="map-container" style={{ padding: '20px', textAlign: 'center' }}>
      <h1 style={{ color: '#00ff00', textShadow: '0 0 10px #00ff00' }}>
        [ SIGNAL_DECODED: THE_NEVER_ENDING_REALM ]
      </h1>
      
      <div className="map-wrapper" style={{ border: '2px solid #00ff00', padding: '10px', backgroundColor: '#000' }}>
        {/* Using the image from your root directory */}
        <img 
          src="/AI%20Surfer%20Survivor%20Island%20Map.png" 
          alt="Island Map" 
          style={{ width: '100%', height: 'auto', filter: 'sepia(100%) hue-rotate(80deg) brightness(0.8) contrast(1.2)' }} 
        />
      </div>

      <div className="map-overlay" style={{ marginTop: '20px', color: '#00ff00', fontFamily: 'monospace' }}>
        <p>>>> COORDINATES: 13.13N, 101.5W</p>
        <p>>>> STATUS: EXPLORATION_ACTIVE</p>
      </div>
    </div>
  );
};

export default MapPage;
