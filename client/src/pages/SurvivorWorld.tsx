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

  // --- THEME & PERSISTENCE ---
  const isWeekend = [0, 6].includes(new Date().getDay());
  const THEME_COLOR = isWeekend ? '#ffcc00' : '#64ffda';
  const avatarIcons: Record<string, string> = { 
    ghost: '◈', runner: '❖', void: '⬢', surfer: '🌀' 
  };

  // --- SESSION STATE ---
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [fragments, setFragments] = useState<{ x: number, y: number }[]>([]);
  const [enemyPosition, setEnemyPosition] = useState({ x: 9, y: 9 });
  const [score, setScore] = useState(0);
  const [credits, setCredits] = useState(0); // New Currency
  const [isGameOver, setIsGameOver] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [logs, setLogs] = useState<string[]>(['> SIMULATION_LOADED']);

  // --- UPGRADES ---
  const [hasAutoShield, setHasAutoShield] = useState(false);
  const [extraLives, setExtraLives] = useState(0);

  const addLog = (msg: string) => setLogs(prev => [`> ${msg}`, ...prev].slice(0, 6));

  // --- SHOP LOGIC ---
  const buyUpgrade = (type: 'SHIELD' | 'LIFE' | 'ENERGY') => {
    if (type === 'SHIELD' && credits >= 50) {
      setHasAutoShield(true);
      setCredits(c => c - 50);
      addLog('PURCHASED: AUTO_SHIELD_V1');
    } else if (type === 'LIFE' && credits >= 100) {
      setExtraLives(l => l + 1);
      setCredits(c => c - 100);
      addLog('PURCHASED: EXTRA_LIFE');
    } else if (type === 'ENERGY' && credits >= 20) {
      // Logic for instant energy refill
      setCredits(c => c - 20);
      addLog('PURCHASED: ENERGY_REFILL');
    } else {
      addLog('INSUFFICIENT_CREDITS');
    }
  };

  // --- MOVEMENT & COLLISION ---
  const handleMove = useCallback((dx: number, dy: number) => {
    if (isGameOver || isShopOpen) return;
    setPlayerPosition(prev => {
      const newX = Math.max(0, Math.min(9, prev.x + dx));
      const newY = Math.max(0, Math.min(9, prev.y + dy));
      
      const fragIdx = fragments.findIndex(f => f.x === newX && f.y === newY);
      if (fragIdx !== -1) {
        setScore(s => s + 10);
        setCredits(c => c + 5); // Gain credits per fragment
        setFragments(f => f.filter((_, i) => i !== fragIdx));
        playSound('collect');
      }

      // Check Enemy Collision
      if (newX === enemyPosition.x && newY === enemyPosition.y) {
        if (hasAutoShield) {
          setHasAutoShield(false);
          addLog('SHIELD_BROKEN');
        } else if (extraLives > 0) {
          setExtraLives(l => l - 1);
          setPlayerPosition({ x: 0, y: 0 }); // Respawn at start
          addLog('LIFE_LOST: RESPAWNING');
        } else {
          setIsGameOver(true);
        }
      }
      return { x: newX, y: newY };
    });
  }, [fragments, enemyPosition, hasAutoShield, extraLives, isGameOver, isShopOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 's') setIsShopOpen(!isShopOpen);
      if (!isShopOpen) {
        if (e.key === 'ArrowUp') handleMove(0, -1);
        if (e.key === 'ArrowDown') handleMove(0, 1);
        if (e.key === 'ArrowLeft') handleMove(-1, 0);
        if (e.key === 'ArrowRight') handleMove(1, 0);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleMove, isShopOpen]);

  return (
    <div className="survivor-world" style={{ borderColor: THEME_COLOR }}>
      <style>{`
        .shop-overlay { position: absolute; top: 10%; left: 10%; width: 80%; height: 80%; background: #000; border: 2px solid ${THEME_COLOR}; z-index: 20; padding: 20px; color: ${THEME_COLOR}; }
        .shop-item { display: flex; justify-content: space-between; margin: 10px 0; padding: 5px; border: 1px solid #333; cursor: pointer; }
        .shop-item:hover { background: #222; }
        .player-shield { border: 2px solid #00f0ff !important; box-shadow: 0 0 10px #00f0ff; }
      `}</style>

      <div className="game-header">
        <div className="stat">CREDITS: {credits}</div>
        <div className="stat">LIVES: {extraLives}</div>
      </div>

      {isShopOpen && (
        <div className="shop-overlay">
          <h3>UPGRADE_TERMINAL [S to Close]</h3>
          <p>Available Credits: {credits}</p>
          <div className="shop-item" onClick={() => buyUpgrade('SHIELD')}>
            <span>AUTO_SHIELD (1 Use)</span> <span>50c</span>
          </div>
          <div className="shop-item" onClick={() => buyUpgrade('LIFE')}>
            <span>EXTRA_LIFE</span> <span>100c</span>
          </div>
          <div className="shop-item" onClick={() => buyUpgrade('ENERGY')}>
            <span>ENERGY_PACK</span> <span>20c</span>
          </div>
        </div>
      )}

      <div className="grid-container">
        {[...Array(100)].map((_, i) => {
          const x = i % 10; const y = Math.floor(i / 10);
          const isPlayer = playerPosition.x === x && playerPosition.y === y;
          return (
            <div key={i} className={`cell ${isPlayer && hasAutoShield ? 'player-shield' : ''}`}>
              {isPlayer && <span style={{ color: THEME_COLOR }}>{avatarIcons[selectedAvatar]}</span>}
              {enemyPosition.x === x && enemyPosition.y === y && <span>⚡</span>}
              {fragments.some(f => f.x === x && f.y === y) && <span>✦</span>}
            </div>
          );
        })}
      </div>

      <div className="console-logs">{logs.map((l, i) => <div key={i}>{l}</div>)}</div>
    </div>
  );
};

export default SurvivorWorld;
