import React, { useState, useEffect, useCallback } from 'react';
import { useAvatar } from '../context/AvatarContext';
import { getLevelInfo } from '../data/leveling';
import { playSound } from '../utils/audio';
import { SKILLS } from '../data/skills';
import { generateCyberCard } from '../utils/sharing';

const SurvivorWorld = () => {
  const { selectedAvatar } = useAvatar();
  const THEME_COLOR = '#64ffda';

  // --- EVOLUTION STATE ---
  const [evolutionLevel, setEvolutionLevel] = useState(1);
  const [evolutionBuff, setEvolutionBuff] = useState('NONE');
  
  const evolutionStages: Record<number, { icon: string, name: string, buff: string }> = {
    1: { icon: '❖', name: 'INITIATE', buff: 'NONE' },
    2: { icon: '⬢', name: 'SENTINEL', buff: 'SPEED_BOOST (+15%)' },
    3: { icon: '◈', name: 'ARCHON', buff: 'MAGNET_REACH (Radius +1)' },
    4: { icon: '🌀', name: 'OVERLORD', buff: 'ULTIMATE_INTEGRITY (Auto-Shield)' }
  };

  // --- SESSION STATE ---
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [enemyPosition, setEnemyPosition] = useState({ x: 9, y: 9 });
  const [fragments, setFragments] = useState<{ x: number, y: number }[]>([]);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [logs, setLogs] = useState<string[]>(['> EVOLUTION_PROTOCOL_READY']);

  const addLog = (msg: string) => setLogs(prev => [`> ${msg}`, ...prev].slice(0, 5));

  // --- EVOLUTION LOGIC ---
  useEffect(() => {
    const nextLevel = Math.floor(score / 500) + 1;
    if (nextLevel > evolutionLevel && nextLevel <= 4) {
      setEvolutionLevel(nextLevel);
      setEvolutionBuff(evolutionStages[nextLevel].buff);
      addLog(`ASCENSION_DETECTED: EVOLVED_TO_${evolutionStages[nextLevel].name}`);
      playSound('levelUp'); // Ensure levelUp sound exists
    }
  }, [score, evolutionLevel]);

  // --- MOVEMENT & COLLECTION ---
  const handleMove = useCallback((dx: number, dy: number) => {
    if (isGameOver) return;
    setPlayerPosition(prev => {
      const nextX = Math.max(0, Math.min(9, prev.x + dx));
      const nextY = Math.max(0, Math.min(9, prev.y + dy));
      
      // Collection Logic (With Archon Magnet Buff)
      const reach = evolutionLevel >= 3 ? 1 : 0;
      setFragments(prevFrags => {
        const remaining = prevFrags.filter(f => {
          const isClose = Math.abs(f.x - nextX) <= reach && Math.abs(f.y - nextY) <= reach;
          if (isClose) {
            setScore(s => s + 10);
            playSound('collect');
            return false;
          }
          return true;
        });
        return remaining;
      });

      if (nextX === enemyPosition.x && nextY === enemyPosition.y) {
        // Overlord Shield Buff check
        if (evolutionLevel === 4) {
          addLog('OVERLORD_SHIELD_ABSORBED_IMPACT');
          setScore(s => Math.max(0, s - 100)); // Cost of shield
          return { x: 0, y: 0 }; // Teleport to start instead of death
        }
        setIsGameOver(true);
      }
      return { x: nextX, y: nextY };
    });
  }, [fragments, enemyPosition, isGameOver, evolutionLevel]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) e.preventDefault();
      // Sentinel Speed Buff logic (reduced latency/extra move potential could be added)
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
        .evolution-ui { background: rgba(100, 255, 218, 0.1); padding: 10px; margin-bottom: 10px; border-left: 4px solid ${THEME_COLOR}; }
        .evo-name { font-weight: bold; font-size: 0.9rem; color: ${THEME_COLOR}; }
        .evo-buff { font-size: 0.7rem; opacity: 0.7; font-style: italic; }
        .avatar-evolved { filter: drop-shadow(0 0 8px ${THEME_COLOR}); transform: scale(1.2); transition: all 0.5s ease; }
      `}</style>

      <div className="evolution-ui">
        <div className="evo-name">FORM: {evolutionStages[evolutionLevel].name} (LVL {evolutionLevel})</div>
        <div className="evo-buff">ACTIVE_BUFF: {evolutionBuff}</div>
      </div>

      <div className="game-header">
        <div className="stat">SCORE: {score}</div>
        <div className="stat">NEXT_EVO: {evolutionLevel < 4 ? evolutionLevel * 500 : 'MAX'}</div>
      </div>

      <div className="grid-container">
        {[...Array(100)].map((_, i) => {
          const x = i % 10; const y = Math.floor(i / 10);
          const isPlayer = playerPosition.x === x && playerPosition.y === y;
          const isEnemy = enemyPosition.x === x && enemyPosition.y === y;
          return (
            <div key={i} className="cell">
              {isPlayer && (
                <span className="avatar-evolved" style={{ color: THEME_COLOR }}>
                  {evolutionStages[evolutionLevel].icon}
                </span>
              )}
              {isEnemy && <span>⚡</span>}
              {fragments.some(f => f.x === x && f.y === y) && <span>✦</span>}
            </div>
          );
        })}
      </div>

      <div className="console-logs">{logs.map((l, i) => <div key={i}>{l}</div>)}</div>

      {isGameOver && (
        <div className="overlay">
          <h2>EVOLUTION_CRITICAL_FAILURE</h2>
          <button onClick={() => window.location.reload()}>RE-SYNC</button>
        </div>
      )}
    </div>
  );
};

export default SurvivorWorld;
