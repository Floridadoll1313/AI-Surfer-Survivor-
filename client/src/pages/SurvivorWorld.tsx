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

  // --- QUEST SYSTEM ---
  const [currentQuest, setCurrentQuest] = useState<{ desc: string, target: number, progress: number, reward: number } | null>({
    desc: "RECOVER_5_FRAGMENTS",
    target: 5,
    progress: 0,
    reward: 50
  });

  // --- UPGRADES & LIVES ---
  const [hasAutoShield, setHasAutoShield] = useState(false);
  const [extraLives, setExtraLives] = useState(0);

  const addLog = (msg: string) => setLogs(prev => [`> ${msg}`, ...prev].slice(0, 6));

  // --- QUEST LOGIC ---
  const updateQuest = useCallback(() => {
    if (!currentQuest) return;
    
    const newProgress = currentQuest.progress + 1;
    if (newProgress >= currentQuest.target) {
      setCredits(c => c + currentQuest.reward);
      addLog(`QUEST_COMPLETE: +${currentQuest.reward} CREDITS`);
      playSound('questComplete');
      
      // Generate next quest
      const quests = [
        { desc: "RECOVER_10_FRAGMENTS", target: 10, reward: 120 },
        { desc: "ELITE_RECOVERY_15", target: 15, reward: 250 }
      ];
      setCurrentQuest({ ...quests[Math.floor(Math.random() * quests.length)], progress: 0 });
    } else {
      setCurrentQuest({ ...currentQuest, progress: newProgress });
    }
  }, [currentQuest]);

  // --- SHOP LOGIC ---
  const buyUpgrade = (type: 'SHIELD' | 'LIFE') => {
    if (type === 'SHIELD' && credits >= 50) {
      setHasAutoShield(true);
      setCredits(c => c - 50);
      addLog('SHIELD_EQUIPPED');
    } else if (type === 'LIFE' && credits >= 100) {
      setExtraLives(l => l + 1);
      setCredits(c => c - 100);
      addLog('LIFE_EXTENDED');
    } else {
      addLog('INSUFFICIENT_DATA_CREDITS');
    }
  };

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
        updateQuest();
        playSound('collect');
      }

      if (newX === enemyPosition.x && newY === enemyPosition.y) {
        if (hasAutoShield) {
          setHasAutoShield(false);
          addLog('SHIELD_DEPLETED');
        } else if (extraLives > 0) {
          setExtraLives(l => l - 1);
          setPlayerPosition({ x: 0, y: 0 });
          addLog('INTEGRITY_RECOVERED: -1 LIFE');
        } else {
          setIsGameOver(true);
          addLog('SYSTEM_CRITICAL: SHUTDOWN');
        }
      }
      return { x: newX, y: newY };
    });
  }, [fragments, enemyPosition, hasAutoShield, extraLives, isGameOver, isShopOpen, updateQuest]);

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
        .quest-banner { background: rgba(100, 255, 218, 0.1); padding: 5px 15px; border-bottom: 1px solid ${THEME_COLOR}; font-size: 0.75rem; width: 100%; display: flex; justify-content: space-between; }
        .progress-bar { width: 50px; height: 6px; background: #222; border: 1px solid ${THEME_COLOR}; position: relative; }
        .progress-fill { height: 100%; background: ${THEME_COLOR}; transition: width 0.3s; }
        .shop-overlay { position: absolute; top: 15%; left: 10%; width: 80%; background: #000; border: 2px solid ${THEME_COLOR}; z-index: 20; padding: 20px; box-shadow: 0 0 20px #000; }
      `}</style>

      {currentQuest && (
        <div className="quest-banner">
          <span>QUEST: {currentQuest.desc}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>{currentQuest.progress}/{currentQuest.target}</span>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${(currentQuest.progress / currentQuest.target) * 100}%` }} />
            </div>
          </div>
        </div>
      )}

      <div className="game-header">
        <div className="stat">CREDITS: {credits}</div>
        <div className="stat" style={{ color: extraLives > 0 ? THEME_COLOR : '#ff4444' }}>LIVES: {extraLives}</div>
      </div>

      {isShopOpen && (
        <div className="shop-overlay">
          <h3 style={{ margin: '0 0 15px 0' }}>UPGRADE_TERMINAL</h3>
          <div style={{ borderBottom: `1px solid ${THEME_COLOR}`, marginBottom: '10px' }} />
          <div className="shop-item" onClick={() => buyUpgrade('SHIELD')} style={{ cursor: 'pointer', padding: '10px', border: '1px solid #333', marginBottom: '5px' }}>
            AUTO_SHIELD [50c] {hasAutoShield ? '(ACTIVE)' : ''}
          </div>
          <div className="shop-item" onClick={() => buyUpgrade('LIFE')} style={{ cursor: 'pointer', padding: '10px', border: '1px solid #333' }}>
            EXTRA_LIFE [100c]
          </div>
          <p style={{ fontSize: '0.7rem', marginTop: '10px' }}>PRESS 'S' TO RESUME SIMULATION</p>
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

      <div className="console-logs">{logs.map((l, i) => <div key={i} style={{ fontSize: '0.7rem', opacity: 1 - (i * 0.15) }}>{l}</div>)}</div>
    </div>
  );
};

export default SurvivorWorld;
