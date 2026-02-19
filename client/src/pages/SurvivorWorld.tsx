import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useAvatar } from '../context/AvatarContext';
import { getLevelInfo } from '../data/leveling';
import { playSound } from '../utils/audio';
import { SKILLS } from '../data/skills';

const SurvivorWorld = () => {
  const { selectedAvatar } = useAvatar();
  const THEME_COLOR = '#64ffda';

  // --- ENGINE & STATE ---
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [enemyPosition, setEnemyPosition] = useState({ x: 9, y: 9 });
  const [fragments, setFragments] = useState<{ x: number, y: number }[]>([]);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [logs, setLogs] = useState<string[]>(['> SIMULATION_LOADED']);

  // --- WEATHER & HAZARDS ---
  const [weather, setWeather] = useState<'CLEAR' | 'NEON_FOG' | 'DATA_RAIN'>('CLEAR');

  // --- EVOLUTION & BOSS ---
  const [evoLevel, setEvoLevel] = useState(1);
  const [bossActive, setBossActive] = useState(false);
  const [victory, setVictory] = useState(false);
  const [timer, setTimer] = useState(60);

  const addLog = (msg: string) => setLogs(prev => [`> ${msg}`, ...prev].slice(0, 5));

  // --- FRAGMENT SPAWNER ---
  useEffect(() => {
    if (isGameOver || victory) return;
    const spawnInterval = setInterval(() => {
      if (fragments.length < 8) {
        const newFrag = { x: Math.floor(Math.random() * 10), y: Math.floor(Math.random() * 10) };
        setFragments(prev => [...prev, newFrag]);
      }
    }, 3000);
    return () => clearInterval(spawnInterval);
  }, [fragments, isGameOver, victory]);

  // --- BOSS & VICTORY TIMER ---
  useEffect(() => {
    if (bossActive && timer > 0 && !isGameOver) {
      const countdown = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(countdown);
    } else if (bossActive && timer === 0) {
      setVictory(true);
      setBossActive(false);
      playSound('victory');
    }
  }, [bossActive, timer, isGameOver]);

  // --- EVOLUTION LOGIC ---
  useEffect(() => {
    if (score >= 500 && evoLevel === 1) { setEvoLevel(2); addLog("EVOLVED: SENTINEL"); }
    if (score >= 1000 && evoLevel === 2) { setEvoLevel(3); addLog("EVOLVED: ARCHON (MAGNET_ON)"); }
    if (score >= 1500 && !bossActive) { 
        setBossActive(true); 
        setEvoLevel(4); 
        addLog("!!! BOSS_DETECTED: CORE_EXTRACTOR !!!"); 
    }
  }, [score, evoLevel, bossActive]);

  // --- MOVEMENT & COLLISION ---
  const handleMove = useCallback((dx: number, dy: number) => {
    if (isGameOver || victory) return;
    setPlayerPosition(prev => {
      const nX = Math.max(0, Math.min(9, prev.x + dx));
      const nY = Math.max(0, Math.min(9, prev.y + dy));
      
      const reach = evoLevel >= 3 ? 1 : 0;
      setFragments(f => f.filter(frag => {
        if (Math.abs(frag.x - nX) <= reach && Math.abs(frag.y - nY) <= reach) {
            setScore(s => s + 10);
            playSound('collect');
            return false;
        }
        return true;
      }));

      if (nX === enemyPosition.x && nY === enemyPosition.y) {
        setIsGameOver(true);
        playSound('gameOver');
      }
      return { x: nX, y: nY };
    });
  }, [enemyPosition, isGameOver, victory, evoLevel]);

  // --- KEYBOARD LISTENERS ---
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        if (e.key === 'ArrowUp') handleMove(0, -1);
        if (e.key === 'ArrowDown') handleMove(0, 1);
        if (e.key === 'ArrowLeft') handleMove(-1, 0);
        if (e.key === 'ArrowRight') handleMove(1, 0);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleMove]);

  return (
    <div className={`survivor-world weather-${weather} ${bossActive ? 'boss-mode' : ''} ${victory ? 'victory-glow' : ''}`}>
      <div className="game-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <div className="stat">SCORE: {score} | LVL: {evoLevel}</div>
        {bossActive && <div className="timer" style={{color: '#ff0055', fontWeight: 'bold'}}>OVERLOAD: {timer}s</div>}
      </div>

      <div className="grid-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 40px)', gap: '4px' }}>
        {[...Array(100)].map((_, i) => {
          const x = i % 10, y = Math.floor(i / 10);
          const isPlayer = playerPosition.x === x && playerPosition.y === y;
          const isEnemy = enemyPosition.x === x && enemyPosition.y === y;
          const isBoss = bossActive && x >= 4 && x <= 5 && y >= 4 && y <= 5;
          
          return (
            <div key={i} className={`cell ${isBoss ? 'boss-core' : ''}`} style={{ width: '40px', height: '40px', border: '1px solid #1a1a1a', display: 'flex', alignItems: 'center', justify-content: 'center' }}>
              {isPlayer && <span className="avatar-evolved" style={{ color: THEME_COLOR, fontSize: '1.5rem' }}>
                {evoLevel === 4 ? '🌀' : '❖'}
              </span>}
              {isEnemy && !isBoss && <span style={{ fontSize: '1.2rem' }}>⚡</span>}
              {fragments.some(f => f.x === x && f.y === y) && !isBoss && <span style={{ color: '#fff' }}>✦</span>}
            </div>
          );
        })}
      </div>

      <div className="console-logs" style={{ marginTop: '15px', fontSize: '0.8rem', fontFamily: 'monospace' }}>
        {logs.map((l, i) => <div key={i} style={{ opacity: 1 - (i * 0.2), color: THEME_COLOR }}>{l}</div>)}
      </div>

      {(isGameOver || victory) && (
        <div className="overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.9)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', z-index: 100 }}>
          <h2 style={{ color: victory ? THEME_COLOR : '#ff4444' }}>{victory ? 'SIGNAL_ASCENDED' : 'SYSTEM_FAILURE'}</h2>
          <p style={{ color: '#fff' }}>Final Score: {score}</p>
          <button onClick={() => window.location.reload()} style={{ background: 'transparent', border: `1px solid ${THEME_COLOR}`, color: THEME_COLOR, padding: '10px 20px', cursor: 'pointer', marginTop: '10px' }}>
            {victory ? 'RE-ENTER_VOID' : 'REBOOT_SESSION'}
          </button>
        </div>
      )}
    </div>
  );
};

export default SurvivorWorld;
