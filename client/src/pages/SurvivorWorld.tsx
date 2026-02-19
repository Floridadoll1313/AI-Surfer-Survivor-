import React, { useState, useEffect, useCallback } from 'react';
import { useAvatar } from '../context/AvatarContext';
import { getLevelInfo } from '../data/leveling';
import { playSound } from '../utils/audio';
import { SKILLS } from '../data/skills';
import { generateCyberCard } from '../utils/sharing';

const SurvivorWorld = () => {
  const { selectedAvatar } = useAvatar();
  const THEME_COLOR = '#64ffda';

  // --- HAZARD STATE ---
  const [lasers, setLasers] = useState<{ axis: 'x' | 'y', pos: number, active: boolean }[]>([]);
  const [voids, setVoids] = useState<{ x: number, y: number }[]>([]);

  // --- SESSION STATE ---
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [enemyPosition, setEnemyPosition] = useState({ x: 9, y: 9 });
  const [fragments, setFragments] = useState<{ x: number, y: number }[]>([]);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [logs, setLogs] = useState<string[]>(['> HAZARD_PROTOCOLS_LOADED']);

  const addLog = (msg: string) => setLogs(prev => [`> ${msg}`, ...prev].slice(0, 5));

  // --- HAZARD GENERATOR ---
  useEffect(() => {
    if (isGameOver || score < 100) return;

    const hazardTimer = setInterval(() => {
      const roll = Math.random();
      
      if (roll > 0.7) {
        // Spawn Laser Warning
        const newLaser = { axis: Math.random() > 0.5 ? 'x' : 'y' as 'x' | 'y', pos: Math.floor(Math.random() * 10), active: false };
        setLasers(prev => [...prev, newLaser]);
        addLog('WARNING: LASER_GRID_CALIBRATING');

        // Activate Laser after 1.5s
        setTimeout(() => {
          setLasers(prev => prev.map(l => l.pos === newLaser.pos && l.axis === newLaser.axis ? { ...l, active: true } : l));
          // Clear Laser after 2s
          setTimeout(() => {
            setLasers(prev => prev.filter(l => l !== newLaser));
          }, 2000);
        }, 15000);
      } else if (roll < 0.2) {
        // Create Data Void
        const newVoid = { x: Math.floor(Math.random() * 10), y: Math.floor(Math.random() * 10) };
        setVoids(prev => [...prev, newVoid]);
        addLog('CRITICAL: TILE_COLLAPSE');
        setTimeout(() => setVoids(prev => prev.filter(v => v !== newVoid)), 4000);
      }
    }, 5000);

    return () => clearInterval(hazardTimer);
  }, [score, isGameOver]);

  // --- COLLISION CHECK (HAZARDS) ---
  useEffect(() => {
    const hitLaser = lasers.some(l => l.active && (l.axis === 'x' ? playerPosition.x === l.pos : playerPosition.y === l.pos));
    if (hitLaser) {
      setIsGameOver(true);
      addLog('TERMINATED: LASER_CONTACT');
    }
  }, [playerPosition, lasers]);

  // --- MOVEMENT ---
  const handleMove = useCallback((dx: number, dy: number) => {
    if (isGameOver) return;
    setPlayerPosition(prev => {
      const nextX = Math.max(0, Math.min(9, prev.x + dx));
      const nextY = Math.max(0, Math.min(9, prev.y + dy));
      
      // Blocked by Data Void
      if (voids.some(v => v.x === nextX && v.y === nextY)) return prev;

      const fragIdx = fragments.findIndex(f => f.x === nextX && f.y === nextY);
      if (fragIdx !== -1) {
        setScore(s => s + 10);
        setFragments(f => f.filter((_, i) => i !== fragIdx));
        playSound('collect');
      }

      if (nextX === enemyPosition.x && nextY === enemyPosition.y) setIsGameOver(true);
      return { x: nextX, y: nextY };
    });
  }, [fragments, enemyPosition, isGameOver, voids]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') handleMove(0, -1);
      if (e.key === 'ArrowDown') handleMove(0, 1);
      if (e.key === 'ArrowLeft') handleMove(-1, 0);
      if (e.key === 'ArrowRight') handleMove(1, 0);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleMove]);

  return (
    <div className="survivor-world" style={{ borderColor: THEME_COLOR }}>
      <style>{`
        .laser-warning { background: rgba(255, 0, 0, 0.2) !important; border: 1px solid red; }
        .laser-active { background: rgba(255, 0, 0, 0.8) !important; box-shadow: 0 0 20px red; z-index: 5; }
        .data-void { background: #000 !important; border: 1px solid #333; transform: scale(0.8); }
      `}</style>

      <div className="game-header">
        <div className="stat">SCORE: {score}</div>
        <div className="stat" style={{ color: '#ff4444' }}>{lasers.length > 0 ? '!!! HAZARD_ACTIVE !!!' : 'STABLE'}</div>
      </div>

      <div className="grid-container">
        {[...Array(100)].map((_, i) => {
          const x = i % 10; const y = Math.floor(i / 10);
          const isPlayer = playerPosition.x === x && playerPosition.y === y;
          const isEnemy = enemyPosition.x === x && enemyPosition.y === y;
          const isVoid = voids.some(v => v.x === x && v.y === y);
          
          const laser = lasers.find(l => (l.axis === 'x' ? x === l.pos : y === l.pos));
          const laserClass = laser ? (laser.active ? 'laser-active' : 'laser-warning') : '';

          return (
            <div key={i} className={`cell ${laserClass} ${isVoid ? 'data-void' : ''}`}>
              {isPlayer && <span style={{ color: THEME_COLOR }}>❖</span>}
              {isEnemy && !isVoid && <span>⚡</span>}
              {fragments.some(f => f.x === x && f.y === y) && !isVoid && <span>✦</span>}
            </div>
          );
        })}
      </div>

      <div className="console-logs">{logs.map((l, i) => <div key={i}>{l}</div>)}</div>

      {isGameOver && (
        <div className="overlay">
          <h2>INTEGRITY_COMPROMISED</h2>
          <button onClick={() => window.location.reload()}>RE-INITIALIZE</button>
        </div>
      )}
    </div>
  );
};

export default SurvivorWorld;
