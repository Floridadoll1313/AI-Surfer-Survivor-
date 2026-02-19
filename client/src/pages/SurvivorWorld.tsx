import React, { useState, useEffect, useCallback } from 'react';
import { useAvatar } from '../context/AvatarContext';
import { getLevelInfo } from '../data/leveling';
import { playSound } from '../utils/audio';
import { SKILLS } from '../data/skills';

const SurvivorWorld = () => {
  const { selectedAvatar } = useAvatar();
  const THEME_COLOR = '#64ffda';

  // --- BOSS & EVOLUTION STATE ---
  const [evolutionLevel, setEvolutionLevel] = useState(1);
  const [bossActive, setBossActive] = useState(false);
  const [bossProjectiles, setBossProjectiles] = useState<{ x: number, y: number }[]>([]);
  
  // --- SESSION STATE ---
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [enemyPosition, setEnemyPosition] = useState({ x: 9, y: 9 });
  const [fragments, setFragments] = useState<{ x: number, y: number }[]>([]);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [logs, setLogs] = useState(['> SYSTEM_INITIALIZED']);

  const addLog = (msg: string) => setLogs(prev => [`> ${msg}`, ...prev].slice(0, 5));

  // --- FINAL BOSS LOGIC (Bullet Hell) ---
  useEffect(() => {
    if (score >= 1500 && !bossActive) {
      setBossActive(true);
      setEvolutionLevel(4);
      addLog('!!! CRITICAL_THREAT: CORE_EXTRACTOR_AWAKENED !!!');
      playSound('bossSpawn');
    }
  }, [score, bossActive]);

  useEffect(() => {
    if (!bossActive || isGameOver) return;

    const bulletInterval = setInterval(() => {
      // Boss creates a pulse of projectiles from center (4,4) (5,5)
      const newProjectiles = [
        { x: 4, y: 3 }, { x: 4, y: 5 }, { x: 3, y: 4 }, { x: 5, y: 4 },
        { x: 3, y: 3 }, { x: 5, y: 5 }, { x: 3, y: 5 }, { x: 5, y: 3 }
      ];
      setBossProjectiles(newProjectiles);

      // Move projectiles outward after a delay
      setTimeout(() => {
        setBossProjectiles(prev => prev.map(p => ({
          x: p.x + (p.x > 4 ? 1 : -1),
          y: p.y + (p.y > 4 ? 1 : -1)
        })).filter(p => p.x >= 0 && p.x <= 9 && p.y >= 0 && p.y <= 9));
      }, 500);
    }, 2000);

    return () => clearInterval(bulletInterval);
  }, [bossActive, isGameOver]);

  // --- COLLISION CHECK ---
  useEffect(() => {
    const hitProjectile = bossProjectiles.some(p => p.x === playerPosition.x && p.y === playerPosition.y);
    if (hitProjectile) {
      setIsGameOver(true);
      addLog('TERMINATED: CORE_CORRUPTION');
    }
  }, [playerPosition, bossProjectiles]);

  // --- MOVEMENT ---
  const handleMove = useCallback((dx: number, dy: number) => {
    if (isGameOver) return;
    setPlayerPosition(prev => {
      const nextX = Math.max(0, Math.min(9, prev.x + dx));
      const nextY = Math.max(0, Math.min(9, prev.y + dy));
      
      const fragIdx = fragments.findIndex(f => f.x === nextX && f.y === nextY);
      if (fragIdx !== -1) {
        setScore(s => s + (bossActive ? 50 : 10)); // Higher points during boss
        setFragments(f => f.filter((_, i) => i !== fragIdx));
        playSound('collect');
      }

      if (nextX === enemyPosition.x && nextY === enemyPosition.y) setIsGameOver(true);
      return { x: nextX, y: nextY };
    });
  }, [fragments, enemyPosition, isGameOver, bossActive]);

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
    <div className={`survivor-world ${bossActive ? 'boss-mode' : ''}`} style={{ borderColor: bossActive ? '#ff0055' : THEME_COLOR }}>
      <style>{`
        .boss-mode { animation: red-alert 2s infinite; }
        @keyframes red-alert { 0% { box-shadow: 0 0 10px #ff0055; } 50% { box-shadow: 0 0 30px #ff0055; } 100% { box-shadow: 0 0 10px #ff0055; } }
        .boss-core { background: #ff0055 !important; border-radius: 50%; animation: pulse 0.5s infinite; }
        .projectile { background: #ffaa00 !important; transform: scale(0.6); border-radius: 2px; box-shadow: 0 0 8px #ffaa00; }
        @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.1); } 100% { transform: scale(1); } }
      `}</style>

      <div className="game-header">
        <div className="stat" style={{ color: bossActive ? '#ff0055' : THEME_COLOR }}>
          {bossActive ? '!!! EMERGENCY: BOSS_FIGHT !!!' : `SCORE: ${score}`}
        </div>
      </div>

      <div className="grid-container">
        {[...Array(100)].map((_, i) => {
          const x = i % 10; const y = Math.floor(i / 10);
          const isPlayer = playerPosition.x === x && playerPosition.y === y;
          const isEnemy = enemyPosition.x === x && enemyPosition.y === y;
          const isProjectile = bossProjectiles.some(p => p.x === x && p.y === y);
          const isBossCore = bossActive && (x >= 4 && x <= 5 && y >= 4 && y <= 5);

          return (
            <div key={i} className={`cell ${isBossCore ? 'boss-core' : ''} ${isProjectile ? 'projectile' : ''}`}>
              {isPlayer && <span style={{ color: THEME_COLOR }}>🌀</span>}
              {isEnemy && !isBossCore && <span>⚡</span>}
              {fragments.some(f => f.x === x && f.y === y) && !isBossCore && <span>✦</span>}
            </div>
          );
        })}
      </div>

      <div className="console-logs">{logs.map((l, i) => <div key={i} style={{ color: bossActive ? '#ff0055' : 'inherit' }}>{l}</div>)}</div>

      {isGameOver && (
        <div className="overlay">
          <h2 style={{ color: '#ff0055' }}>CORE_EXTRACTED</h2>
          <p>FINAL_SCORE: {score}</p>
          <button onClick={() => window.location.reload()}>RE-SYNC</button>
        </div>
      )}
    </div>
  );
};

export default SurvivorWorld;
