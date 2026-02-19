import React from 'react';

const SiteFooter = () => {
  const handleReset = () => {
    if (window.confirm("WARNING: This will wipe all survival progress and biometric data. Proceed?")) {
      localStorage.removeItem('survivor_progress');
      // Refresh the page to reset the state in Layout.tsx
      window.location.reload();
    }
  };

  return (
    <footer style={{
      padding: '40px 20px',
      marginTop: '50px',
      borderTop: '1px solid rgba(53, 201, 255, 0.1)',
      textAlign: 'center',
      background: 'rgba(2, 12, 27, 0.8)'
    }}>
      <div style={{ marginBottom: '20px' }}>
        <p style={{ color: '#8892b0', fontSize: '0.9rem' }}>
          &copy; 2026 AI SURFER SURVIVOR | SECTOR ALPHA TERMINAL
        </p>
      </div>

      {/* EMERGENCY RESET BUTTON */}
      <button 
        onClick={handleReset}
        style={{
          background: 'transparent',
          border: '1px solid #ff4d4d',
          color: '#ff4d4d',
          padding: '8px 16px',
          fontSize: '0.7rem',
          borderRadius: '4px',
          cursor: 'pointer',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          transition: 'all 0.3s ease'
        }}
        onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 77, 77, 0.1)'}
        onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
      >
        Wipe Neural Data (Reset)
      </button>
    </footer>
  );
};

export default SiteFooter;
