import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('membership_active', 'true');
  }, []);

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '100px auto', textAlign: 'center', fontFamily: 'monospace', color: '#64ffda', border: '1px solid #64ffda' }}>
      <h1>&gt; PAYMENT_SUCCESSFUL</h1>
      <p style={{ color: '#8892b0' }}>Neural link established. Your Pro access is now permanent.</p>
      <button 
        onClick={() => navigate('/survivor')}
        style={{ padding: '15px 40px', background: '#64ffda', color: '#0a192f', border: 'none', fontWeight: 'bold', cursor: 'pointer', marginTop: '30px' }}
      >
        START_SURVIVAL_RUN
      </button>
    </div>
  );
};

export default Success;
