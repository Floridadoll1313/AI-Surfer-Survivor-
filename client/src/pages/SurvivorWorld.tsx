import React, { useState, useEffect } from 'react';
import { useAvatar } from '../context/AvatarContext';

const SurvivorWorld = () => {
  const { selectedAvatar } = useAvatar();
  
  // Game Constants
  const GRID_SIZE = 10;
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [fragments, setFragments] = useState<{x: number, y: number}[]>([]);
  const [score, setScore] = useState(0);

  const avatarIcons: Record<string, string> = {
    ghost: '◈',
    runner: '❖',
    void: '⬢',
    surfer: '🌀'
  };

  // 1. Initial Fragment Spawn
  useEffect(() => {
    const initialFragments = Array.from({ length: 5 }, () => ({
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    }));
    setFragments(initialFragments);
  }, []);

  // 2. Movement Logic
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

  // 3. Collection Logic (Check if player is on a fragment)
  useEffect(() => {
    const foundIndex = fragments.findIndex(f => f.x === playerPosition.x && f.y === playerPosition.y);
    if (foundIndex !== -1) {
      // Remove the fragment and increase score
      const newFragments = [...fragments];
      newFragments.splice(foundIndex, 1);
      
      // Spawn a new one so the game doesn't end
      newFragments.push({
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      });
      
      setFragments(newFragments);
      setScore(prev => prev + 100);
    }
  }, [playerPosition, fragments]);

  const renderGrid = () => {
    const cells = [];
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        const isPlayer = playerPosition.x === x && playerPosition.y === y;
        const isFragment = fragments.some(f => f.x === x && f.y === y);
        
        cells.push(
          <div 
            key={`${x}-${y}`}
            style={{
              width: '100%',
              paddingTop: '100%',
              position: 'relative',
              border: '1px solid rgba(53, 201, 255, 0.1)',
              backgroundColor: isPlayer ? 'rgba(100, 255, 218, 0.1)' : 'transparent',
            }}
          >
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '1.5rem',
            }}>
              {isPlayer ? (
                <span style={{ textShadow: '0 0 10px #64ffda' }}>{avatarIcons[selectedAvatar]}</span>
              ) : isFragment ? (
                <span style={{ color: '#64ffda', fontSize: '0.8rem', animation: 'pulse 1.5s infinite' }}>✧</span>
              ) : null}
            </div>
          </div>
        );
      }
    }
    return cells;
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', border: '1px solid #35c9ff', padding: '10px' }}>
        <div style={{ color: '#8892b0' }}>SYS_POS: <span style={{ color: '#64ffda' }}>[{playerPosition.x},{playerPosition.y}]</span></div>
        <div style={{ color: '#8892b0' }}>DATA_SYNC: <span style={{ color: '#64ffda' }}>{score} XP</span></div>
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
        border: '2px solid #35c9ff',
        background: 'rgba(10, 25, 47, 0.8)',
      }}>
        {renderGrid()}
      </div>

      <p style={{ color: '#8892b0', marginTop: '20px', fontSize: '0.7rem' }}>
        [!] LOCATE FLOATING DATA_FRAGMENTS (✧) TO STABILIZE YOUR NEURAL LINK
      </p>

      <style>{`
        @keyframes pulse {
          0% { opacity: 0.3; transform: translate(-50%, -50%) scale(0.8); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
          100% { opacity: 0.3; transform: translate(-50%, -50%) scale(0.8); }
        }
      `}</style>
    </div>
  );
};

export default SurvivorWorld;
