import React from 'react';

/**
 * SiteFooter Component
 * Contains copyright info and the Emergency Reset for testing progress.
 */
const SiteFooter = () => {
  const handleReset = () => {
    // Confirmation dialog to prevent accidental wipes
    const confirmed = window.confirm(
      "CRITICAL WARNING: This will wipe all neural synchronization data and survival logs. Proceed with reset?"
    );

    if (confirmed) {
      localStorage.removeItem('survivor_progress');
      // Reloading the page ensures the State in Layout.tsx is reset to 0
      window.location.reload();
    }
  };

  return (
    <footer style={{
      padding: '40px 20px',
      marginTop: 'auto', // Pushes footer to bottom if using flex column
      borderTop: '1px solid rgba(53, 201, 255, 0.1)',
      textAlign: 'center',
      background: 'rgba(2, 12, 27, 0.9)',
      width: '100%'
    }}>
      <div style={{ marginBottom: '20px' }}>
        <p style={{ color: '#8892b0', fontSize: '0.85rem', letterSpacing: '0.5px' }}>
          &copy; 2026 AI SURFER SURVIVOR | SECTOR ALPHA TERMINAL v1.0.4
        </p>
      </div>

      {/* EMERGENCY RESET BUTTON */}
      <button 
        onClick={handleReset}
        style={{
          background: 'transparent',
          border: '1px solid #ff4d4d',
          color: '#ff4d4d',
          padding: '8px 18px',
          fontSize: '0.7rem',
          borderRadius: '4px',
          cursor: 'pointer',
          textTransform: 'uppercase',
          letterSpacing: '1.5px',
          transition: 'all 0.3s ease',
          fontWeight: 'bold'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background = 'rgba(255, 77, 77, 0.1)';
          e.currentTarget.style.boxShadow = '0 0 10px rgba(255, 77, 77, 0.3)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        Wipe Neural Data (Reset)
      </button>
    </footer>
