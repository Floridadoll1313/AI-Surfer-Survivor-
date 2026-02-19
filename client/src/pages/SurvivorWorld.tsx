import React, { useState, useEffect, useCallback } from 'react';
import { useAvatar } from '../context/AvatarContext';
import { getLevelInfo } from '../data/leveling';
import { playSound } from '../utils/audio';
import { SKILLS } from '../data/skills';
import { generateCyberCard } from '../utils/sharing';

const SurvivorWorld = () => {
  const { selectedAvatar } = useAvatar();
  const { speedBonus } = getLevelInfo(selectedAvatar);
  const currentSkill = SKILLS[selectedAvatar] || SKILLS.runner;

  // --- THEME & PERSISTENT COSMETICS ---
  const [unlockedIcons] = useState<string[]>(JSON.parse(localStorage.getItem('survivor_cosmetics') || '[]'));
  const isWeekend = [0, 6].includes(new Date().getDay());
  const THEME_COLOR = isWeekend ? '#ffcc00' : '#64ffda';

  // --- WEATHER SYSTEM ---
  const weatherTypes = ['CLEAR', 'NEON_FOG', 'DATA_RAIN', 'SOLAR_FLARE'] as const;
  const [weather, setWeather] = useState<typeof weatherTypes[number]>('CLEAR');

  useEffect(() => {
    const weatherInterval = setInterval(() => {
      const nextWeather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
      setWeather(nextWeather);
      addLog(`WEATHER_UPDATE: ${nextWeather}`);
    }, 15000); // Changes every 15 seconds
    return () => clearInterval(weatherInterval);
  }, []);

  // --- SESSION STATE ---
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [fragments, setFragments] = useState<{ x: number, y: number }[]>([]);
  const [enemyPosition, setEnemyPosition] = useState({ x: 9, y: 9 });
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [logs, setLogs] = useState<string[]>(['> SIMULATION_LOADED']);

  const addLog = (msg: string) => setLogs(prev => [`> ${msg}`, ...prev].slice(0, 5));

  // --- MOVEMENT LOGIC (Weather Affected) ---
  const handleMove = useCallback((dx: number, dy: number) => {
    if (isGameOver) return;

    // DATA_RAIN Slowdown: 20% chance to skip a move input to simulate "heavy" air
    if (weather === 'DATA_RAIN' && Math.random() < 0.2) return;

    setPlayerPosition(prev => {
      let nextX = Math.max(0, Math.min(9, prev.x + dx));
      let nextY = Math.max(0, Math.min(9, prev.y + dy));

      // SOLAR_FLARE Glitch: Small chance to jump an extra tile
      if (weather === 'SOLAR_FLARE' && Math.random() < 0.1) {
        nextX = Math.max(0, Math.min(9, nextX + dx));
        nextY = Math.max(0, Math.min(9, nextY + dy));
      }
      
      const fragIdx = fragments.findIndex(f => f.x === nextX && f.y === nextY);
      if (fragIdx !== -1) {
        const points = weather === 'SOLAR_FLARE' ? 20 : 10; // Double points during flares
        setScore(s => s + points);
        setFragments(f => f.filter((_, i) => i !== fragIdx));
        playSound('collect');
      }

      if (nextX === enemyPosition.x && nextY === enemyPosition.y) {
        setIsGameOver(true);
      }
      return { x: nextX, y: nextY };
    });
  }, [fragments, enemyPosition, isGameOver, weather]);

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
    <div className={`survivor-world weather-${weather}`} style={{ borderColor: THEME_COLOR }}>
      <style>{`
        .weather-display { font-size: 0.7rem; letter-spacing: 2px; color: ${THEME_COLOR}; margin-bottom: 5px; opacity: 0.8; }
        .weather-NEON_FOG .cell { filter: blur(1.5px); opacity: 0.4; }
        .weather-NEON_FOG .cell:has(.avatar-icon) { filter: none; opacity: 1; }
        /* Visibility radius in fog */
        .weather-NEON_FOG .cell { transition: opacity 0.3s; }
        
        .weather-DATA_RAIN::before {
          content: ""; position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          background: repeating-linear-gradient(transparent, transparent 20px, rgba(100, 255, 218, 0.05) 20px, rgba(100, 255, 218, 0.05) 40px);
          animation: rain 0.5s linear infinite; pointer-events: none; z-index: 5;
        }
        @keyframes rain { from { transform: translateY(-40px); } to { transform: translateY(0); } }

        .weather-SOLAR_FLARE { animation: flicker 0.2s infinite; }
        @keyframes flicker { 0% { opacity: 1; } 50% { opacity: 0.9; } 100% { opacity: 1; } }
      `}</style>

      <div className="weather-display">ATMOSPHERE: {weather}</div>
      
      <div className="game-header">
        <div className="stat">SCORE: {score}</div>
        <div className="stat">{weather === 'SOLAR_FLARE' ? 'x2 MULTIPLIER' : ''}</div>
      </div>

      <div className="grid-container">
        {[...Array(100)].map((_, i) => {
          const x = i % 10; const y = Math.floor(i / 10);
          const isPlayer = playerPosition.x === x && playerPosition.y === y;
          const isEnemy = enemyPosition.x === x && enemyPosition.y === y;
          
          // Fog visibility logic: only show cells within 2 units of player
          const dist = Math.abs(x - playerPosition.x) + Math.abs(y - playerPosition.y);
          const isVisible = weather !== 'NEON_FOG' || dist <= 2;

          return (
            <div key={i} className="cell" style={{ opacity: isVisible ? 1 : 0.1 }}>
              {isPlayer && <span style={{ color: THEME_COLOR }}>{unlockedIcons.includes('ELITE_CROWN') ? '👑' : '❖'}</span>}
              {isEnemy && isVisible && <span className="enemy-icon">⚡</span>}
              {fragments.some(f => f.x === x && f.y === y) && isVisible && <span>✦</span>}
            </div>
          );
        })}
      </div>

      <div className="console-logs">{logs.map((l, i) => <div key={i}>{l}</div>)}</div>

      {isGameOver && (
        <div className="overlay">
          <h2>CONNECTION_LOST</h2>
          <button onClick={() => window.location.reload()}>RE-INITIALIZE</button>
        </div>
      )}
    </div>
  );
};

export default SurvivorWorld;
