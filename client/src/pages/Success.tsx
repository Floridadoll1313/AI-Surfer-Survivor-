import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Lock in membership on successful redirect
    localStorage.setItem('membership_active', 'true');
    
    // Auto-redirect to the game after a short delay
    const timer = setTimeout(() => navigate('/survivor'), 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '100px auto', textAlign: 'center', fontFamily: 'monospace', color: '#64ffda', border: '1px solid #64ffda', background: 'rgba(10, 25, 47, 0.9)' }}>
      <h1 style={{ textShadow: '0 0 10px #64ffda' }}>&gt; PAYMENT_CONFIRMED</h1>
      <p style={{ color: '#8892b0', margin: '20px 0' }}>Neural handshake complete. Elite Surfer status: 100%</p>
      
      <div style={{ padding: '20px', background: '#112240', borderLeft: '4px solid #64ffda', textAlign: 'left', marginBottom: '30px' }}>
        <code style={{ color: '#35c9ff' }}>
          $ decrypting_content... <br />
          $ unlocking_survivor_world... <br />
          $ access_granted.
        </code>
      </div>

      <button 
        onClick={() => navigate('/survivor')}
        style={{ padding: '15px 40px', background: '#64ffda', color: '#0a192f', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.1rem' }}
      >
        INITIALIZE_RUN
      </button>
    </div>
  );
};

export default Success;
