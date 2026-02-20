import React from 'react';

const FounderCard = ({ name, role, tagline, bio, action }) => {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '20px',
      backgroundColor: '#fff',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ margin: '0 0 10px 0', color: '#333' }}>{name}</h2>
      <h4 style={{ color: '#666', fontStyle: 'italic' }}>{role} — {tagline}</h4>
      <hr style={{ border: '0', borderTop: '1px solid #eee', margin: '15px 0' }} />
      <p style={{ lineHeight: '1.6', color: '#444' }}>{bio}</p>
      <div style={{ 
        marginTop: '15px', 
        padding: '10px', 
        backgroundColor: '#f9f9f9', 
        borderRadius: '4px',
        fontSize: '0.9em' 
      }}>
        <strong>Core Philosophy:</strong> {action}
      </div>
    </div>
  );
};

export default FounderCard;
