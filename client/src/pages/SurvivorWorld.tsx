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
  const [lasers, setLasers] = useState<{ axis: 'x' | 'y', pos: number, active: boolean }[]>([]);

  // --- EVOLUTION & BOSS ---
  const [evoLevel, setEvoLevel] = useState(1);
  const [bossActive, setBossActive] = useState(false);
  const [bossProjectiles, setBossProjectiles] = useState<{ x: number, y: number }[]>([]);
  const [victory, setVictory] = useState(false);
  const [timer, setTimer] = useState(60);

  // --- TIME LOOP (CHRONOS) ---
  const [history, setHistory] = useState<{ p: {x:number, y:number}, e: {x:number, y:number} }[]>([]);
  const [rewindReady, setRewindReady] = useState(true);

  const addLog = (msg: string) => setLogs(prev => [`> ${msg}`, ...prev].slice(0, 5));

  // --- CHRONOS BUFFER (Every 500ms) ---
  useEffect(() => {
    if (isGameOver || victory) return;
    const interval = setInterval(() => {
      setHistory(prev => [...prev, { p: playerPosition, e: enemyPosition }].slice(-6));
    }, 500);
    return () => clearInterval(interval);
  }, [playerPosition, enemyPosition, isGameOver, victory]);

  // --- BOSS & VICTORY TIMER ---
  useEffect(() => {
    if (bossActive && timer > 0 && !isGameOver) {
      const countdown = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(countdown);
    } else if (bossActive && timer === 0) {
      setVictory(true);
      setBossActive(false);
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
      
      // Archon Magnet Reach (Evo 3)
      const reach = evoLevel >= 3 ? 1 : 0;
      setFragments(f => f.filter(frag => {
        if (Math.abs(frag.x - nX) <= reach && Math.abs(frag.y - nY) <= reach) {
            setScore(s => s + 10);
            return false;
        }
        return true;
      }));

      if (nX === enemyPosition.x && nY === enemyPosition.y) setIsGameOver(true);
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
      <div className="game-header">
        <div className="stat">SCORE: {score} | LVL: {evoLevel}</div>
        {bossActive && <div className="timer" style={{color: '#ff0055'}}>OVERLOAD: {timer}s</div>}
      </div>

      <div className="grid-container">
        {[...Array(100)].map((_, i) => {
          const x = i % 10, y = Math.floor(i / 10);
          const isPlayer = playerPosition.x === x && playerPosition.y === y;
          const isEnemy = enemyPosition.x === x && enemyPosition.y === y;
          const isBoss = bossActive && x >= 4 && x <= 5 && y >= 4 && y <= 5;
          
          return (
            <div key={i} className={`cell ${isBoss ? 'boss-core' : ''}`}>
              {isPlayer && <span className="avatar-evolved" style={{ color: THEME_COLOR }}>
                {evoLevel === 4 ? '🌀' : '❖'}
              </span>}
              {isEnemy && !isBoss && <span>⚡</span>}
              {fragments.some(f => f.x === x && f.y === y) && !isBoss && <span>✦</span>}
            </div>
          );
        })}
      </div>

      <div className="console-logs">
        {logs.map((l, i) => <div key={i} style={{ opacity: 1 - (i * 0.2) }}>{l}</div>)}
      </div>

      {isGameOver && (
        <div className="overlay">
          <h2 className="glitch-text" style={{ color: '#ff4444' }}>SYSTEM_FAILURE</h2>
          <button onClick={() => window.location.reload()}>REBOOT_SESSION</button>
        </div>
      )}

      {victory && (
        <div className="overlay">
          <h2 style={{ color: '#000' }}>SIGNAL_ASCENDED</h2>
          <p style={{ color: '#000', textAlign: 'center', padding: '0 20px' }}>
            The grid has dissolved. You are now the pulse of the network.
          </p>
          <button onClick={() => window.location.reload()}>RE-ENTER_THE_VOID</button>
        </div>
      )}
    </div>
  );
};

export default SurvivorWorld;
