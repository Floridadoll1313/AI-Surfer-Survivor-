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

  // --- PERSISTENT COSMETICS ---
  const [unlockedIcons, setUnlockedIcons] = useState<string[]>(
    JSON.parse(localStorage.getItem('survivor_cosmetics') || '[]')
  );

  // --- THEME & AVATARS ---
  const isWeekend = [0, 6].includes(new Date().getDay());
  const THEME_COLOR = isWeekend ? '#ffcc00' : '#64ffda';
  
  // Use unlocked icon if available, otherwise default
  const getAvatarIcon = () => {
    if (unlockedIcons.includes('ELITE_CROWN')) return '👑';
    const defaults: Record<string, string> = { ghost: '◈', runner: '❖', void: '⬢', surfer: '🌀' };
    return defaults[selectedAvatar];
  };

  // --- DAILY CHALLENGE STATE ---
  const today = new Date().toDateString();
  const [dailyGoal] = useState(500); 
  const [challengeComplete, setChallengeComplete] = useState(
    localStorage.getItem('daily_challenge_done') === today
  );

  // --- SESSION STATE ---
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [fragments, setFragments] = useState<{ x: number, y: number }[]>([]);
  const [enemyPosition, setEnemyPosition] = useState({ x: 9, y: 9 });
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [logs, setLogs] = useState<string[]>(['> SYSTEM_REBOOT_SUCCESS']);

  const addLog = (msg: string) => setLogs(prev => [`> ${msg}`, ...prev].slice(0, 5));

  // --- CHALLENGE LOGIC ---
  useEffect(() => {
    if (score >= dailyGoal && !challengeComplete) {
      setChallengeComplete(true);
      const newCosmetics = [...unlockedIcons, 'ELITE_CROWN'];
      setUnlockedIcons(newCosmetics);
      localStorage.setItem('survivor_cosmetics', JSON.stringify(newCosmetics));
      localStorage.setItem('daily_challenge_done', today);
      addLog('!!! DAILY_CHALLENGE_MET: CROWN_ICON_UNLOCKED !!!');
      playSound('questComplete');
    }
  }, [score, dailyGoal, challengeComplete, unlockedIcons, today]);

  // --- MOVEMENT ---
  const handleMove = useCallback((dx: number, dy: number) => {
    if (isGameOver) return;
    setPlayerPosition(prev => {
      const newX = Math.max(0, Math.min(9, prev.x + dx));
      const newY = Math.max(0, Math.min(9, prev.y + dy));
      
      const fragIdx = fragments.findIndex(f => f.x === newX && f.y === newY);
      if (fragIdx !== -1) {
        setScore(s => s + 10);
        setFragments(f => f.filter((_, i) => i !== fragIdx));
        playSound('collect');
      }

      if (newX === enemyPosition.x && newY === enemyPosition.y) {
        setIsGameOver(true);
        addLog('CRITICAL_ERROR: CORE_BREACH');
      }
      return { x: newX, y: newY };
    });
  }, [fragments, enemyPosition, isGameOver]);

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
        .daily-box { background: rgba(0,0,0,0.4); padding: 8px; border: 1px solid ${challengeComplete ? THEME_COLOR : '#555'}; margin-bottom: 10px; font-size: 0.7rem; }
        .reward-tag { color: ${THEME_COLOR}; font-weight: bold; }
      `}</style>

      <div className="daily-box">
        <div>DAILY_CHALLENGE: Reach {dailyGoal} pts</div>
        <div className="reward-tag">
          {challengeComplete ? '✓ STATUS: REWARD_CLAIMED (👑 ICON)' : `PROGRESS: ${score}/${dailyGoal}`}
        </div>
      </div>

      <div className="game-header">
        <div className="stat">SCORE: {score}</div>
        <div className="stat">AVATAR: {getAvatarIcon()}</div>
      </div>

      <div className="grid-container">
        {[...Array(100)].map((_, i) => {
          const x = i % 10; const y = Math.floor(i / 10);
          const isPlayer = playerPosition.x === x && playerPosition.y === y;
          return (
            <div key={i} className="cell">
              {isPlayer && <span style={{ color: THEME_COLOR, fontSize: '1.2rem' }}>{getAvatarIcon()}</span>}
              {enemyPosition.x === x && enemyPosition.y === y && <span>⚡</span>}
              {fragments.some(f => f.x === x && f.y === y) && <span>✦</span>}
            </div>
          );
        })}
      </div>

      <div className="console-logs">{logs.map((l, i) => <div key={i}>{l}</div>)}</div>

      {isGameOver && (
        <div className="overlay">
          <h2>SIMULATION_ENDED</h2>
          <button onClick={() => window.location.reload()}>RE-SYNC</button>
        </div>
      )}
    </div>
  );
};

export default SurvivorWorld;
