import React from 'react';

/**
 * Archive Component
 * The tutorial and lore hub for the AI Surfer Survivor project.
 */
const Archive = () => {
  const manualSections = [
    {
      title: "01_SYNC_LEVELS",
      content: "Your Neural Synchronization level represents your connection to the Realm. Reach 100% to achieve full 'Ascension' status. Progress is saved locally to your biometric terminal."
    },
    {
      title: "02_NAVIGATION",
      content: "Use the NAV_MAP to track your location. High-stability sectors are marked in Green. Proceed with caution when entering Gamma (Red) zones."
    },
    {
      title: "03_EQUIPMENT",
      content: "Scavenged gear can be linked to your neural net in the GEAR bay. Each piece of equipment provides a permanent boost to your synchronization stability."
    },
    {
      title: "04_MISSIONS",
      content: "Check the MISSIONS terminal daily. Completing neural tasks is the fastest way to recover lost data and increase your ranking."
    }
  ];

  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px', minHeight: '80vh' }}>
      <h1 style={{ color: '#35c9ff', fontFamily: 'monospace', marginBottom: '10px' }}>
        > NEURAL_ARCHIVE_v1.0
      </h1>
      <p style={{ color: '#8892b0', fontFamily: 'monospace', marginBottom: '40px' }}>
        ACCESSING DATABASE... ENCRYPTED LORE DECRYPTED.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
        {manualSections.map((section, index) => (
          <div key={index} style={{
            background: 'rgba(17, 34, 64, 0.6)',
            border: '1px solid #35c9ff',
            padding: '25px',
            borderRadius: '8px',
            boxShadow: 'inset 0 0 15px rgba(53, 201, 255, 0.1)'
          }}>
            <h3 style={{ color: '#64ffda', fontFamily: 'monospace', marginTop: 0 }}>
              {section.title}
            </h3>
            <p style={{ color: '#ccd6f6', fontSize: '0.95rem', lineHeight: '1.6', fontFamily: 'sans-serif' }}>
              {section.content}
            </p>
          </div>
        ))}
      </div>

      <div style={{ 
        marginTop: '50px', 
        padding: '20px', 
        border: '1px dashed #ff4d4d', 
        color: '#ff4d4d', 
        fontFamily: 'monospace',
        textAlign: 'center'
      }}>
        WARNING: NEURAL OVERLOAD DETECTED IN SECTOR_7. STAY SYNCED.
      </div>
    </div>
  );
};

export default Archive;
