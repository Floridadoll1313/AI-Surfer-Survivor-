import React from 'react';

const Archive = () => {
  const sections = [
    { title: "01_SYNC_PROTOCOL", content: "Sync Levels represent your data integrity. At 0%, you are a Ghost. At 100%, you are Ascended." },
    { title: "02_SECTOR_MAP", content: "The island map tracks real-time coordinates. Avoid the red Gamma Void unless equipped with High-Tier gear." },
    { title: "03_MISSION_LOGS", content: "The Terminal allows you to export your journey. Use the EXPORT_DATA tool on the Home page regularly." }
  ];

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', color: '#ffffff', fontFamily: 'monospace' }}>
      <h1 style={{ color: '#35c9ff' }}>&gt; NEURAL_ARCHIVE_DATA</h1>
      <div style={{ display: 'grid', gap: '20px', marginTop: '30px' }}>
        {sections.map((s, i) => (
          <div key={i} style={{ padding: '20px', border: '1px solid #35c9ff', background: 'rgba(17,34,64,0.6)', borderRadius: '8px' }}>
            <h3 style={{ color: '#64ffda', marginTop: 0 }}>{s.title}</h3>
            <p style={{ color: '#ccd6f6', lineHeight: '1.6' }}>{s.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Archive;
