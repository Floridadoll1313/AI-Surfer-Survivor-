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
    ghost: '◈', 
    runner: '❖', 
    void: '⬢', 
    surfer: '🌀' 
  };

  // --- SESSION STATE ---
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [fragments, setFragments] = useState<{ x: number, y: number }[]>([]);
  const [enemyPosition, setEnemyPosition] = useState({ x: 9, y: 9 });
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(Number(localStorage.getItem('survivor_highscore')) || 0);
  const [combo, setCombo] = useState(1);
  const [lastCollectTime, setLastCollectTime] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [logs, setLogs] = useState<string[]>(['> SIMULATION_LOADED']);
  const [copyFeedback, setCopyFeedback] = useState('SHARE_SCORE');

  // --- TUTORIAL & ABILITY STATE ---
  const [abilityActive, setAbilityActive] = useState(false);
  const [onCooldown, setOnCooldown] = useState(false);
  const [cooldownPercent, setCooldownPercent] = useState(0);

  const addLog = (msg: string) => setLogs(prev => [`> ${msg}`, ...prev].slice(0, 6));

  // --- GAME LOGIC ---
  const spawnFragment = useCallback(() => {
    const newFrag = {
      x: Math.floor(Math.random() * 10),
      y: Math.floor(Math.random() * 10)
    };
    setFragments(prev => [...prev, newFrag]);
  }, []);

  useEffect(() => {
    if (fragments.length < 3 && !isGameOver) {
      const timer = setTimeout(spawnFragment, 2000);
      return () => clearTimeout(timer);
    }
  }, [fragments, spawnFragment, isGameOver]);

  const handleMove = useCallback((dx: number, dy: number) => {
    if (isGameOver) return;

    setPlayerPosition(prev => {
      const newX = Math.max(0, Math.min(9, prev.x + dx));
      const newY = Math.max(0, Math.min(9, prev.y + dy));
      
      const hitIndex = fragments.findIndex(f => f.x === newX && f.y === newY);
      if (hitIndex !== -1) {
        const now = Date.now();
        const newCombo = (now - lastCollectTime < 2000) ? combo + 1 : 1;
        const points = 10 * newCombo;
        
        setScore(s => s + points);
        setCombo(newCombo);
        setLastCollectTime(now);
        setFragments(prevFrags => prevFrags.filter((_, i) => i !== hitIndex));
        playSound('collect');
        addLog(`DATA_FRAGMENT_RECOVERED (x${newCombo})`);
      }

      setEnemyPosition(ep => {
        const edx = newX > ep.x ? 1 : newX < ep.x ? -1 : 0;
        const edy = newY > ep.y ? 1 : newY < ep.y ? -1 : 0;
        const nextE = { x: ep.x + edx, y: ep.y + edy };

        if (nextE.x === newX && nextE.y === newY && !abilityActive) {
          setIsGameOver(true);
          playSound('death');
          addLog('CRITICAL_FAILURE: CONNECTION_LOST');
        }
        return nextE;
      });

      return { x: newX, y: newY };
    });
  }, [fragments, isGameOver, lastCollectTime, combo, abilityActive]);

  const triggerAbility = useCallback(() => {
    if (onCooldown || isGameOver) return;
    
    setAbilityActive(true);
    setOnCooldown(true);
    setCooldownPercent(100);
    addLog(`ABILITY_ACTIVATED: ${currentSkill.name.toUpperCase()}`);

    setTimeout(() => setAbilityActive(false), 3000);

    const cdInterval = setInterval(() => {
      setCooldownPercent(prev => {
        if (prev <= 0) {
          clearInterval(cdInterval);
          setOnCooldown(false);
          return 0;
        }
        return prev - 2;
      });
    }, 200);
  }, [onCooldown, isGameOver, currentSkill.name]);

  // --- HIGH SCORE PERSISTENCE ---
  useEffect(() => {
    if (isGameOver && score > highScore) {
      setHighScore(score);
      localStorage.setItem('survivor_highscore', score.toString());
      addLog('NEW_PERSONAL_BEST_RECORDS_UPDATED');
    }
  }, [isGameOver, score, highScore]);

  // --- KEYBOARD SUPPORT ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch(e.key) {
        case 'ArrowUp': handleMove(0, -1); break;
        case 'ArrowDown': handleMove(0, 1); break;
        case 'ArrowLeft': handleMove(-1, 0); break;
        case 'ArrowRight': handleMove(1, 0); break;
        case ' ': triggerAbility(); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleMove, triggerAbility]);

  const shareStats = () => {
    const card = generateCyberCard(selectedAvatar, score);
    navigator.clipboard.writeText(card);
    setCopyFeedback('COPIED!');
    setTimeout(() => setCopyFeedback('SHARE_SCORE'), 2000);
  };

  return (
    <div className="survivor-world" style={{ borderColor: THEME_COLOR }}>
      <style>{`
        .overlay {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 10;
          text-align: center;
          backdrop-filter: blur(6px);
        }
        .overlay h2 { color: #ff4444; margin-bottom: 5px; text-shadow: 0 0 10px #ff0000; }
        .overlay .high-score-msg { color: #ffcc00; font-size: 0.8rem; margin-bottom: 15px; }
        .overlay button {
          margin: 5px;
          padding: 10px 20px;
          background: transparent;
          color: ${THEME_COLOR};
          border: 1px solid ${THEME_COLOR};
          cursor: pointer;
          min-width: 140px;
        }
        .overlay button:hover { background: ${THEME_COLOR}33; }
      `}</style>

      <div className="game-header">
        <div className="stat">SCORE: {score.toString().padStart(5, '0')}</div>
        <div className="stat">BEST: {highScore.toString().padStart(5, '0')}</div>
      </div>

      <div className="grid-container">
        {[...Array(100)].map((_, i) => {
          const x = i % 10;
          const y = Math.floor(i / 10);
          const isPlayer = playerPosition.x === x && playerPosition.y === y;
          const isEnemy = enemyPosition.x === x && enemyPosition.y === y;
          const isFrag = fragments.some(f => f.x === x && f.y === y);

          return (
            <div key={i} className={`cell ${abilityActive ? 'glitch-bg' : ''}`}>
              {isPlayer && <span className="avatar-icon" style={{ color: THEME_COLOR }}>{avatarIcons[selectedAvatar]}</span>}
              {isEnemy && <span className="enemy-icon">⚡</span>}
              {isFrag && <span className="frag-icon">✦</span>}
            </div>
          );
        })}
      </div>

      <div className="controls">
        <button onClick={() => handleMove(0, -1)}>▲</button>
        <div className="mid-row">
          <button onClick={() => handleMove(-1, 0)}>◀</button>
          <button 
            className={`ability-btn ${onCooldown ? 'disabled' : ''}`}
            onClick={triggerAbility}
            style={{ '--cd': `${cooldownPercent}%` } as any}
          >
            {onCooldown ? '...' : '⚡'}
          </button>
          <button onClick={() => handleMove(1, 0)}>▶</button>
        </div>
        <button onClick={() => handleMove(0, 1)}>▼</button>
      </div>

      <div className="console-logs">
        {logs.map((log, i) => <div key={i} className="log-line">{log}</div>)}
      </div>

      {isGameOver && (
        <div className="overlay">
          <h2>SYSTEM_HALTED</h2>
          {score >= highScore && score > 0 && <p className="high-score-msg">★ NEW RECORD LOCALIZED ★</p>}
          <p>FINAL_SCORE: {score}</p>
          <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>BEST_SESSION: {highScore}</p>
          <button onClick={() => window.location.reload()}>REBOOT</button>
          <button onClick={shareStats}>{copyFeedback}</button>
        </div>
      )}
    </div>
  );
};

export default SurvivorWorld;
