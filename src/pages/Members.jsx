import React from 'react';

const Members = () => {
  const handleCheckout = () => {
    // 1. Set the membership flag (Simulation for local testing)
    localStorage.setItem('membership_active', 'true');
    
    // 2. Redirect to Stripe (Replace with your actual Stripe Payment Link)
    window.location.href = 'https://buy.stripe.com/test_your_actual_link';
  };

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'monospace', color: '#64ffda' }}>
      <h1 style={{ borderBottom: '2px solid #35c9ff', paddingBottom: '10px' }}>&gt; ACCESS_GATEWAY</h1>
      <div style={{ background: 'rgba(17, 34, 64, 0.8)', padding: '30px', border: '1px solid #35c9ff', marginTop: '20px' }}>
        <h3>LEVEL: PRO_SURFER_MEMBERSHIP</h3>
        <p style={{ color: '#8892b0' }}>Status: <span style={{ color: '#ff5f5f' }}>LOCKED</span></p>
        <ul style={{ color: '#8892b0', lineHeight: '2', marginTop: '20px' }}>
          <li>[+] UNLIMITED_ACCESS: SURVIVOR_WORLD</li>
          <li>[+] MULTIPLIER_UNLOCKED: COMBO_SYSTEM</li>
          <li>[+] AD_FREE_DATA_MINING</li>
        </ul>
        <div style={{ marginTop: '30px' }}>
          <p style={{ fontSize: '1.2rem' }}>COST: <span style={{ color: '#fff' }}>$10.00 / MONTH</span></p>
          <button 
            onClick={handleCheckout}
            style={{
              background: '#64ffda', color: '#0a192f', padding: '15px 30px', 
              border: 'none', fontWeight: 'bold', cursor: 'pointer', width: '100%',
              boxShadow: '0 0 15px rgba(100, 255, 218, 0.4)'
            }}
          >
            INITIATE_PAYMENT_PROTOCOL
          </button>
        </div>
      </div>
    </div>
  );
};

export default Members;
