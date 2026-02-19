import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

// Replace with your actual Publishable Key from Stripe Dashboard
const stripePromise = loadStripe('pk_test_your_key_here');

const Members = () => {
  const handleCheckout = async () => {
    // In a real app, you would fetch a Session ID from your backend here
    // For now, this directs them to your Stripe-hosted checkout link
    window.location.href = 'https://buy.stripe.com/test_your_actual_link';
  };

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'monospace', color: '#64ffda' }}>
      <h1 style={{ borderBottom: '2px solid #35c9ff', paddingBottom: '10px' }}>&gt; ACCESS_GATEWAY</h1>
      
      <div style={{ background: 'rgba(17, 34, 64, 0.8)', padding: '30px', border: '1px solid #35c9ff', marginTop: '20px' }}>
        <h3>LEVEL: PRO_SURFER_MEMBERSHIP</h3>
        <ul style={{ color: '#8892b0', lineHeight: '2' }}>
          <li>[+] UNLIMITED_DATA_MINING (Survivor World Access)</li>
          <li>[+] EXCLUSIVE_AVATAR_COSMETICS</li>
          <li>[+] AD-FREE_INTERFACE</li>
          <li>[+] PRIORITY_SERVER_SYNC</li>
        </ul>
        
        <div style={{ marginTop: '30px' }}>
          <p style={{ fontSize: '1.2rem' }}>COST: <span style={{ color: '#fff' }}>$10.00 / MONTH</span></p>
          <button 
            onClick={handleCheckout}
            style={{
              background: '#64ffda', color: '#0a192f', padding: '15px 30px', 
              border: 'none', fontWeight: 'bold', cursor: 'pointer', width: '100%'
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
