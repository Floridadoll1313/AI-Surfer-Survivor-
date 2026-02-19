import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Ensure the membership flag is set just in case
    localStorage.setItem('membership_active', 'true');
  }, []);

  return (
    <div style={{ 
      padding: '40px', 
      maxWidth: '600px', 
      margin: '100px auto', 
      textAlign: 'center', 
      fontFamily: 'monospace', 
      color: '#64ffda',
      border: '1px solid #64ffda',
      background: 'rgba(10, 25, 47, 0.9)'
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>&gt; PAYMENT_VERIFIED</h1>
      
      <div style={{ marginBottom: '30px' }}>
        <p style={{ color: '#8892b0', fontSize: '1.1rem' }}>
          Welcome, <span style={{ color: '#fff' }}>ELITE_SURFER</span>. 
          Your neural link has been established and all systems are online.
        </p>
      </div>

      <div style={{ padding: '20px', border: '1px dashed #35c9ff', marginBottom: '30px' }}>
        <p style={{ margin: 0, color: '#35c9ff' }}>[ UNLOCKED: SURVIVOR_WORLD_v2 ]</p>
        <p style={{ margin: 0, color: '#35c9ff' }}>[ UNLOCKED: COMBO_SYSTEM_v1 ]</p>
      </div>

      <button 
        onClick={() => navigate('/survivor')}
        style={{
          padding: '15px 40px',
          background: '#64ffda',
          color: '#0a192f',
          border: 'none',
          fontWeight: 'bold',
          cursor: 'pointer',
          fontSize: '1.2rem',
          boxShadow: '0 0 20px rgba(100, 255, 218, 0.5)'
        }}
      >
        ENTER_THE_VOID
      </button>

      <p style={{ marginTop: '20px', color: '#4e566d' }}>
        Redirecting to main console in 10s...
      </p>
    </div>
  );
};

export default Success;
