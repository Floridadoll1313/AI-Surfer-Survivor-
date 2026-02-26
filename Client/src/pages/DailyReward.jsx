import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

/**
 * DailyReward Component
 * Grants a +5% Sync Boost once every 24 hours.
 */
const DailyReward = () => {
  const { setProgress } = useOutletContext<{ setProgress: React.Dispatch<React.SetStateAction<number>> }>();
  const [canClaim, setCanClaim] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");

  const REWARD_MS = 24 * 60 * 60 * 1000; // 24 Hours

  useEffect(() => {
    const checkTimer = () => {
      const lastClaim = localStorage.getItem('survivor_last_claim');
      if (!lastClaim) {
        setCanClaim(true);
        return;
      }

      const nextClaimTime = parseInt(lastClaim) + REWARD_MS;
      const now = Date.now();

      if (now >= nextClaimTime) {
        setCanClaim(true);
      } else {
        setCanClaim(false);
        const diff = nextClaimTime - now;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        setTimeLeft(`${hours}h ${mins}m`);
      }
    };

    checkTimer();
    const interval = setInterval(checkTimer, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleClaim = () => {
    if (!canClaim) return;

    setProgress(prev => {
      const nextValue = Math.min(prev + 5, 100);
      localStorage.setItem('survivor_progress', nextValue.toString());
      return nextValue;
    });

    localStorage.setItem('survivor_last_claim', Date.now().toString());
    setCanClaim(false);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '60px auto', textAlign: 'center', fontFamily: 'monospace' }}>
      <h1 style={{ color: '#35c9ff' }}>&gt; NEURAL_RECHARGE</h1>
      <div style={{ 
        padding: '40px', background: 'rgba(17, 34, 64, 0.6)', 
        border: `1px solid ${canClaim ? '#64ffda' : '#8892b0'}`, borderRadius: '15px' 
      }}>
        {canClaim ? (
          <>
            <p style={{ color: '#ffffff', marginBottom: '25px' }}>SYSTEM READY: COLLECT DAILY SYNC BOOST</p>
            <button 
              onClick={handleClaim}
              style={{
                background: '#64ffda', color: '#020c1b', border: 'none',
                padding: '15px 30px', fontWeight: 'bold', cursor: 'pointer', borderRadius: '4px'
              }}
            >
              CLAIM +5% SYNC
            </button>
          </>
        ) : (
          <>
            <p style={{ color: '#8892b0' }}>RECHARGE IN PROGRESS...</p>
            <h2 style={{ color: '#35c9ff' }}>{timeLeft}</h2>
            <p style={{ fontSize: '0.8rem', color: 'rgba(53, 201, 255, 0.5)' }}>NEXT UPLINK AVAILABLE SOON</p>
          </>
        )}
      </div>
    </div>
  );
};

export default DailyReward;
