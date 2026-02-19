import React from 'react';

/**
 * SiteFooter Component
 * Provides a persistent footer with an emergency reset function to wipe all progress and logs.
 */
const SiteFooter = () => {
  const handleReset = () => {
    // Critical confirmation to prevent accidental data loss
    const confirmed = window.confirm(
      "CRITICAL WARNING: This will permanently wipe all neural synchronization data, user-submitted survival logs, and equipment links. Proceed with system reset?"
    );

    if (confirmed) {
      // 1. Clears the sync progress percentage
      localStorage.removeItem('survivor_progress');
      
      // 2. Clears the custom survival logs created on the Home page
      localStorage.removeItem('survivor_user_logs');
      
      // 3. Reloading ensures the app state is refreshed and the UI reflects the reset
      window.location.reload();
    }
  };

  return (
    <footer style={{
      padding: '40px 20px',
      marginTop: 'auto', 
      borderTop: '1px solid rgba(53, 201, 255, 0.1)',
      textAlign: 'center',
      background: 'rgba(2, 12, 27, 0.95)',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      <div style={{ marginBottom: '20px' }}>
        <p style={{ 
          color: '#8892b0', 
          fontSize: '0.8rem', 
          letterSpacing: '1px', 
          fontFamily: 'monospace' 
        }}>
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
          padding: '10px 22px',
          fontSize: '0.75rem',
          borderRadius: '4px',
          cursor: 'pointer',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          transition: 'all 0.3s ease',
          fontWeight: 'bold',
          fontFamily: 'monospace'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background = 'rgba(255, 77, 77, 0.15)';
          e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 77, 77, 0.4)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.boxShadow = 'none';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        Wipe Neural Data (Reset)
      </button>
    </footer>
  );
};

export default SiteFooter;
