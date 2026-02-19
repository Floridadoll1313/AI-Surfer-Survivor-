import React, { useState, useEffect, useCallback } from 'react';
import { useAvatar } from '../context/AvatarContext';
import { playSound } from '../utils/audio';

const SurvivorWorld = () => {
  const { selectedAvatar } = useAvatar();
  const THEME_COLOR = '#64ffda';

  // --- VICTORY & BOSS STATE ---
  const [bossActive, setBossActive] = useState(false);
  const [victory, setVictory] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [bossProjectiles, setBossProjectiles] = useState<{ x: number, y: number }[]>([]);
  
  // --- SESSION STATE ---
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [enemyPosition, setEnemyPosition] = useState({ x: 9, y: 9 });
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  // --- VICTORY TIMER ---
  useEffect(() => {
    if (bossActive && timeLeft > 0 && !isGameOver) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timer);
    } else if (bossActive && timeLeft === 0) {
      setVictory(true);
      setBossActive(false);
      setBossProjectiles([]);
      playSound('victory'); 
    }
  }, [bossActive, timeLeft, isGameOver]);

  // --- BOSS ACTIVATION (At 1500 points) ---
  useEffect(() => {
    if (score >= 1500 && !bossActive && !victory) {
      setBossActive(true);
    }
  }, [score, bossActive, victory]);

  // --- MOVEMENT ---
  const handleMove = useCallback((dx: number, dy: number) => {
    if (isGameOver || victory) return;
    setPlayerPosition(prev => {
      const nextX = Math.max(0, Math.min(9, prev.x + dx));
      const nextY = Math.max(0, Math.min(9, prev.y + dy));
      if (nextX === enemyPosition.x && nextY === enemyPosition.y) setIsGameOver(true);
      return { x: nextX, y: nextY };
    });
  }, [enemyPosition, isGameOver, victory]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) e.preventDefault();
      if (e.key === 'ArrowUp') handleMove(0, -1);
      if (e.key === 'ArrowDown') handleMove(0, 1);
      if (e.key === 'ArrowLeft') handleMove(-1, 0);
      if (e.key === 'ArrowRight') handleMove(1, 0);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleMove]);

  return (
    <div className={`survivor-world ${victory ? 'victory-glow' : ''}`}>
      <style>{`
        .victory-glow { animation: matrix-flash 2s infinite; background: #000; }
        @keyframes matrix-flash { 0% { box-shadow: 0 0 20px #64ffda; } 50% { box-shadow: 0 0 50px #fff; } 100% { box-shadow: 0 0 20px #64ffda; } }
        .timer-display { font-family: 'Courier New', monospace; font-size: 1.5rem; color: #ff0055; text-align: center; margin-bottom: 10px; }
        .lore-text { color: #64ffda; line-height: 1.6; text-align: center; max-width: 400px; }
      `}</style>

      {bossActive && !victory && (
        <div className="timer-display">OVERLOAD_IN: {timeLeft}s</div>
      )}

      {!victory ? (
        <div className="grid-container">
          {[...Array(100)].map((_, i) => {
            const x = i % 10; const y = Math.floor(i / 10);
            const isPlayer = playerPosition.x === x && playerPosition.y === y;
            const isBoss = bossActive && (x >= 4 && x <= 5 && y >= 4 && y <= 5);
            return (
              <div key={i} className={`cell ${isBoss ? 'boss-core' : ''}`}>
                {isPlayer && <span style={{ color: THEME_COLOR }}>🌀</span>}
                {enemyPosition.x === x && enemyPosition.y === y && <span>⚡</span>}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="overlay">
          <h1 style={{ color: '#64ffda' }}>SIGNAL_ASCENDED</h1>
          <div className="lore-text">
            <p>"The walls of the simulation have dissolved. You are no longer just data; you are the pulse of the network itself."</p>
            <p><strong>YOU HAVE SURVIVED THE VOID.</strong></p>
          </div>
          <button onClick={() => window.location.reload()} style={{ marginTop: '20px' }}>RE-ENTER THE GRID</button>
        </div>
      )}

      {isGameOver && (
        <div className="overlay">
          <h2>CONNECTION_FAILED</h2>
          <button onClick={() => window.location.reload()}>RETRY</button>
        </div>
      )}
    </div>
  );
};

export default SurvivorWorld;
