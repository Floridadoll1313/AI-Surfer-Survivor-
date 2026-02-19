import React, { useState, useEffect } from 'react';
import { useAvatar } from '../context/AvatarContext';

const SurvivorWorld = () => {
  const { selectedAvatar } = useAvatar();
  
  // Game Constants
  const GRID_SIZE = 10;
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });

  const avatarIcons: Record<string, string> = {
    ghost: '◈',
    runner: '❖',
    void: '⬢',
    surfer: '🌀'
  };

  // Movement Logic
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setPlayerPosition(prev => {
        const newPos = { ...prev };
        if (e.key === 'ArrowUp' && prev.y > 0) newPos.y -= 1;
        if (e.key === 'ArrowDown' && prev.y < GRID_SIZE - 1) newPos.y += 1;
        if (e.key === 'ArrowLeft' && prev.x > 0) newPos.x -= 1;
        if (e.key === 'ArrowRight' && prev.x < GRID_SIZE - 1) newPos.x += 1;
        return newPos;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Create the Grid Array
  const renderGrid = () => {
    const cells = [];
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        const isPlayer = playerPosition.x === x && playerPosition.y === y;
        cells.push(
          <div 
            key={`${x}-${y}`}
            style={{
              width: '100%',
              paddingTop: '100%', // Makes it a perfect square
              position: 'relative',
              border: '1px solid rgba(53, 201, 255, 0.2)',
              backgroundColor: isPlayer ? 'rgba(100, 255, 218, 0.1)' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '1.5rem',
              textShadow: isPlayer ? '0 0 10px #64ffda' : 'none'
            }}>
              {isPlayer ? avatarIcons[selectedAvatar] : ''}
            </div>
          </div>
        );
      }
    }
    return cells;
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <h2 style={{ color: '#35c9ff', marginBottom: '10px' }}>&gt; GRID_NAVIGATION_ACTIVE</h2>
      <p style={{ color: '#8892b0', fontSize: '0.8rem', marginBottom: '20px' }}>
        USE ARROW KEYS TO TRAVERSE THE NEURAL NET | POSITION: [{playerPosition.x}, {playerPosition.y}]
      </p>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
        border: '2px solid #35c9ff',
        background: 'rgba(10, 25, 47, 0.8)',
        boxShadow: '0 0 30px rgba(53, 201, 255, 0.1)'
      }}>
        {renderGrid()}
      </div>
    </div>
  );
};

export default SurvivorWorld;
