import React, { useState } from 'react';

/**
 * MapPage Component
 * Features: Interactive island map with coordinate tracking and status HUD.
 */
const MapPage = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    // Calculate coordinates relative to the image container
    setCoords({
      x: Math.floor(e.clientX - bounds.left),
      y: Math.floor(e.clientY - bounds.top)
    });
  };

  return (
    <div style={{ 
      padding: '40px', 
      color: '#ffffff', 
      display: 'flex', 
      gap: '30px', 
      flexWrap: 'wrap', 
      justifyContent: 'center',
      minHeight: '80vh'
    }}>
      
      {/* MAIN NAVIGATION TERMINAL */}
      <div style={{ flex: '2', minWidth: '400px', maxWidth: '900px' }}>
        <h1 style={{ 
          color: '#35c9ff', 
          textShadow: '0 0 10px #35c9ff',
          fontFamily: 'monospace',
          marginBottom: '20px'
        }}>
          > REALM_NAVIGATION_SYSTEM
        </h1>
        
        <div 
          onMouseMove={handleMouseMove}
          style={{ 
            position: 'relative', 
            border: '2px solid #35c9ff',
            borderRadius: '15px',
            overflow: 'hidden',
            cursor: 'crosshair',
            boxShadow: '0 0 30px rgba(53, 201, 255, 0.2)'
          }}
        >
          {/* Using your repository's map asset */}
          <img 
            src="/AI Surfer Survivor Island Map.png" 
            alt="Island Map" 
            style={{ 
              width: '100%', 
              display: 'block', 
              filter: 'brightness(0.7) contrast(1.1) sepia(0.1)' 
            }}
          />
          
          {/* FLOATING COORDINATE HUD */}
          <div style={{
            position: 'absolute', 
            bottom: '20px', 
            right: '20px',
            background: 'rgba(10, 25, 47, 0.9)', 
            padding: '10px 20px',
            borderRadius: '5px', 
            border: '1px solid #35c9ff',
            fontSize: '0.9rem', 
            color: '#64ffda', 
            fontFamily: 'monospace',
            boxShadow: '0 0 15px rgba(100, 255, 218, 0.2)'
          }}>
            X_POS: {coords.x} // Y_POS: {coords.y}
          </div>

          {/* PULSING SECTOR NODE */}
          <div 
            onClick={() => alert("COMMENCING LANDING SEQUENCE...")}
            style={{
              position: 'absolute', top: '45%', left: '52%',
              width: '25px', height: '25px', borderRadius: '50%',
              border: '2px solid #64ffda', background: 'rgba(100, 255, 218, 0.2)',
              cursor: 'pointer', animation: 'map-pulse 2s infinite'
            }}
            title="Sector 7: Hub Terminal"
          />
        </div>
      </div>

      {/* BIOMETRIC SIDEBAR */}
      <div style={{ 
        flex: '1', 
        minWidth: '280px', 
        maxWidth: '350px',
        background: 'rgba(17, 34, 64, 0.6)', 
        padding: '30px', 
        borderRadius: '15px', 
        border: '1px solid #35c9ff',
        height: 'fit-content'
      }}>
        <h3 style={{ 
          color: '#35c9ff', 
          borderBottom: '1px solid #35c9ff', 
          paddingBottom: '10px',
          fontFamily: 'monospace'
        }}>
          LIVE_BIOMETRICS
        </h3>
        
        <div style={{ margin: '25px 0', fontFamily: 'monospace' }}>
          <p style={{ margin: '10px 0' }}>O2_LEVEL: <span style={{ color: '#64ffda' }}>98.4%</span></p>
          <p style={{ margin: '10px 0' }}>HEART_RATE: <span style={{ color: '#64ffda' }}>72 BPM</span></p>
          <p style={{ margin: '10px 0' }}>LINK_STABILITY: <span style={{ color: '#35c9ff' }}>OPTIMAL</span></p>
        </div>

        <h4 style={{ 
          color: '#ffffff', 
          fontSize: '0.8rem', 
          textTransform: 'uppercase', 
          letterSpacing: '1px',
          marginTop: '30px'
        }}>
          ACTIVE_ZONES
        </h4>
        <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.85rem', color: '#8892b0', fontFamily: 'monospace' }}>
          <li style={{ padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>🟢 ALPHA_STATION</li>
          <li style={{ padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>🟡 DELTA_REEF</li>
          <li style={{ padding: '8px 0' }}>🔴 GAMMA_VOID</li>
        </ul>
      </div>

      <style>{`
        @keyframes map-pulse {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(100, 255, 218, 0.7); }
          70% { transform: scale(1.3); box-shadow: 0 0 0 15px rgba(100, 255, 218, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(100, 255, 218, 0); }
        }
      `}</style>
    </div>
  );
};

export default MapPage;
