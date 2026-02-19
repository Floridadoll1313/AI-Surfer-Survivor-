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
  const [credits, setCredits] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [logs, setLogs] = useState<string[]>(['> SIMULATION_LOADED']);

  // --- LEADERBOARD STATE ---
  const [leaderboard, setLeaderboard] = useState([
    { name: 'X_Æ_A-12', score: 2500 },
    { name: 'NEO_SURFER', score: 1850 },
    { name: 'CYBER_PUNK', score: 1200 },
    { name: 'ZERO_COOL', score: 950 },
    { name: 'GHOST_IN_SHELL', score: 600 }
  ]);

  // --- QUEST & UPGRADES ---
  const [currentQuest, setCurrentQuest] = useState({ desc: "COLLECT_5_DATA", target: 5, progress: 0, reward: 50 });
  const [hasAutoShield, setHasAutoShield] = useState(false);
  const [extraLives, setExtraLives] = useState(0);

  const addLog = (msg: string) => setLogs(prev => [`> ${msg}`, ...prev].slice(0, 6));

  // --- LEADERBOARD LOGIC ---
  const updateLeaderboard = useCallback(() => {
    const newEntry = { name: 'YOU (YOU)', score: score };
    const updated = [...leaderboard, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
    setLeaderboard(updated);
  }, [score, leaderboard]);

  useEffect(() => {
    if (isGameOver) updateLeaderboard();
  }, [isGameOver]);

  // --- MOVEMENT ---
  const handleMove = useCallback((dx: number, dy: number) => {
    if (isGameOver || isShopOpen) return;
    setPlayerPosition(prev => {
      const newX = Math.max(0, Math.min(9, prev.x + dx));
      const newY = Math.max(0, Math.min(9, prev.y + dy));
      
      const fragIdx = fragments.findIndex(f => f.x === newX && f.y === newY);
      if (fragIdx !== -1) {
        setScore(s => s + 10);
        setCredits(c => c + 5);
        setFragments(f => f.filter((_, i) => i !== fragIdx));
        if (currentQuest.progress + 1 >= currentQuest.target) {
          setCredits(c => c + currentQuest.reward);
          addLog(`QUEST_COMPLETE: +${currentQuest.reward}c`);
          setCurrentQuest(q => ({ ...q, progress: 0, target: q.target + 5 }));
        } else {
          setCurrentQuest(q => ({ ...q, progress: q.progress + 1 }));
        }
        playSound('collect');
      }

      if (newX === enemyPosition.x && newY === enemyPosition.y) {
        if (hasAutoShield) {
          setHasAutoShield(false);
          addLog('SHIELD_DOWN');
        } else if (extraLives > 0) {
          setExtraLives(l => l - 1);
          setPlayerPosition({ x: 0, y: 0 });
          addLog('REBOOTING...');
        } else {
          setIsGameOver(true);
        }
      }
      return { x: newX, y: newY };
    });
  }, [fragments, enemyPosition, hasAutoShield, extraLives, isGameOver, isShopOpen, currentQuest]);

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
        .leaderboard-table { width: 100%; font-size: 0.8rem; border-collapse: collapse; margin-top: 15px; }
        .leaderboard-table td { padding: 5px; border-bottom: 1px solid #222; }
        .leaderboard-table .highlight { color: ${THEME_COLOR}; font-weight: bold; }
        .rank-num { width: 30px; opacity: 0.5; }
      `}</style>

      <div className="game-header">
        <div className="stat">SCORE: {score}</div>
        <div className="stat">CREDITS: {credits}</div>
      </div>

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

      {isGameOver && (
        <div className="overlay">
          <h2 style={{ color: '#ff4444' }}>GLOBAL_RANKINGS</h2>
          <table className="leaderboard-table">
            <tbody>
              {leaderboard.map((entry, i) => (
                <tr key={i} className={entry.name === 'YOU (YOU)' ? 'highlight' : ''}>
                  <td className="rank-num">#{i+1}</td>
                  <td>{entry.name}</td>
                  <td style={{ textAlign: 'right' }}>{entry.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={() => window.location.reload()} style={{ marginTop: '20px' }}>RELOAD_SESSION</button>
        </div>
      )}

      <div className="console-logs">{logs.map((l, i) => <div key={i}>{l}</div>)}</div>
    </div>
  );
};

export default SurvivorWorld;
