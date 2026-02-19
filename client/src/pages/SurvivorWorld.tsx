import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useAvatar } from '../context/AvatarContext';
import { getLevelInfo } from '../data/leveling';
import { playSound } from '../utils/audio';
import { SKILLS } from '../data/skills';
import { generateCyberCard } from '../utils/sharing';

const SurvivorWorld = () => {
  const { selectedAvatar } = useAvatar();
  const { speedBonus } = getLevelInfo(selectedAvatar);
  
  // --- TIME LOOP (CHRONOS) STATE ---
  const [history, setHistory] = useState<{ p: {x:number, y:number}, e: {x:number, y:number} }[]>([]);
  const [rewindAvailable, setRewindAvailable] = useState(true);
  const [isRewinding, setIsRewinding] = useState(false);

  // --- SESSION STATE ---
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [enemyPosition, setEnemyPosition] = useState({ x: 9, y: 9 });
  const [fragments, setFragments] = useState<{ x: number, y: number }[]>([]);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [logs, setLogs] = useState<string[]>(['> TEMPORAL_DRIVE_ONLINE']);

  const THEME_COLOR = '#64ffda';
  const addLog = (msg: string) => setLogs(prev => [`> ${msg}`, ...prev].slice(0, 5));

  // --- HISTORY BUFFER (Records every 500ms) ---
  useEffect(() => {
    if (isGameOver || isRewinding) return;
    const recordInterval = setInterval(() => {
      setHistory(prev => {
        const newHistory = [...prev, { p: playerPosition, e: enemyPosition }];
        return newHistory.slice(-6); // Store last 3 seconds (6 frames * 0.5s)
      });
    }, 500);
    return () => clearInterval(recordInterval);
  }, [playerPosition, enemyPosition, isGameOver, isRewinding]);

  // --- TIME LOOP TRIGGER ---
  const triggerTimeLoop = useCallback(() => {
    if (!rewindAvailable || history.length === 0 || isGameOver) return;
    
    setIsRewinding(true);
    setRewindAvailable(false);
    addLog('CHRONOS_REVERSE_INITIATED');
    playSound('rewind'); // Assuming this exists in your audio utils

    // Visual rewind effect
    let frame = history.length - 1;
    const rewindEffect = setInterval(() => {
      if (frame < 0) {
        clearInterval(rewindEffect);
        setIsRewinding(false);
        setHistory([]);
        addLog('TEMPORAL_STABILITY_RESTORED');
      } else {
        setPlayerPosition(history[frame].p);
        setEnemyPosition(history[frame].e);
        frame--;
      }
    }, 100);
  }, [history, rewindAvailable, isGameOver]);

  // --- MOVEMENT ---
  const handleMove = useCallback((dx: number, dy: number) => {
    if (isGameOver || isRewinding) return;
    setPlayerPosition(prev => {
      const nextX = Math.max(0, Math.min(9, prev.x + dx));
      const nextY = Math.max(0, Math.min(9, prev.y + dy));
      
      const fragIdx = fragments.findIndex(f => f.x === nextX && f.y === nextY);
      if (fragIdx !== -1) {
        setScore(s => s + 10);
        setFragments(f => f.filter((_, i) => i !== fragIdx));
        // Gaining 100 points recharges the Time Loop
        if (score > 0 && (score + 10) % 100 === 0) {
          setRewindAvailable(true);
          addLog('TIME_LOOP_RECHARGED');
        }
      }

      if (nextX === enemyPosition.x && nextY === enemyPosition.y) {
        setIsGameOver(true);
      }
      return { x: nextX, y: nextY };
    });
  }, [fragments, enemyPosition, isGameOver, isRewinding, score]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') handleMove(0, -1);
      if (e.key === 'ArrowDown') handleMove(0, 1);
      if (e.key === 'ArrowLeft') handleMove(-1, 0);
      if (e.key === 'ArrowRight') handleMove(1, 0);
      if (e.key.toLowerCase() === 'r') triggerTimeLoop();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleMove, triggerTimeLoop]);

  return (
    <div className="survivor-world" style={{ borderColor: THEME_COLOR }}>
      <style>{`
        .chronos-bar { width: 100%; height: 4px; background: #222; margin-top: 5px; }
        .chronos-fill { height: 100%; transition: width 0.5s; background: ${rewindAvailable ? '#ff00ff' : '#444'}; box-shadow: ${rewindAvailable ? '0 0 10px #ff00ff' : 'none'}; }
        .rewind-glitch { animation: scanline 0.1s infinite; filter: hue-rotate(90deg) brightness(1.5); }
        @keyframes scanline { 0% { opacity: 0.8; } 50% { opacity: 1; } 100% { opacity: 0.8; } }
      `}</style>

      <div className="game-header">
        <div className="stat">SCORE: {score}</div>
        <div className="stat" style={{ color: rewindAvailable ? '#ff00ff' : '#555' }}>
          TIME_DRIVE: {rewindAvailable ? 'READY [R]' : 'CHARGING'}
        </div>
      </div>
      <div className="chronos-bar">
        <div className="chronos-fill" style={{ width: rewindAvailable ? '100%' : '0%' }} />
      </div>

      <div className={`grid-container ${isRewinding ? 'rewind-glitch' : ''}`}>
        {[...Array(100)].map((_, i) => {
          const x = i % 10; const y = Math.floor(i / 10);
          const isPlayer = playerPosition.x === x && playerPosition.y === y;
          const isEnemy = enemyPosition.x === x && enemyPosition.y === y;
          return (
            <div key={i} className="cell">
              {isPlayer && <span style={{ color: THEME_COLOR }}>❖</span>}
              {isEnemy && <span>⚡</span>}
              {fragments.some(f => f.x === x && f.y === y) && <span>✦</span>}
            </div>
          );
        })}
      </div>

      <div className="console-logs">{logs.map((l, i) => <div key={i}>{l}</div>)}</div>

      {isGameOver && (
        <div className="overlay">
          <h2>TIMELINE_TERMINATED</h2>
          <p>Final Score: {score}</p>
          <button onClick={() => window.location.reload()}>RE-SYNC</button>
        </div>
      )}
    </div>
  );
};

export default SurvivorWorld;
