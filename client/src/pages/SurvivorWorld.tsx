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

  // --- FEATURE: WEATHER & HAZARDS ---
  const [weather, setWeather] = useState<'CLEAR' | 'NEON_FOG' | 'DATA_RAIN'>('CLEAR');
  const [lasers, setLasers] = useState<{ axis: 'x' | 'y', pos: number, active: boolean }[]>([]);

  // --- FEATURE: EVOLUTION & BOSS ---
  const [evoLevel, setEvoLevel] = useState(1);
  const [bossActive, setBossActive] = useState(false);
  const [bossProjectiles, setBossProjectiles] = useState<{ x: number, y: number }[]>([]);
  const [victory, setVictory] = useState(false);
  const [timer, setTimer] = useState(60);

  // --- FEATURE: TIME LOOP ---
  const [history, setHistory] = useState<{ p: any, e: any }[]>([]);
  const [rewindReady, setRewindReady] = useState(true);

  const addLog = (msg: string) => setLogs(prev => [`> ${msg}`, ...prev].slice(0, 5));

  // --- CORE GAME LOOP ---
  useEffect(() => {
    if (isGameOver || victory) return;

    // Handle Weather Changes
    const weatherCycle = setInterval(() => {
      const weathers: ('CLEAR' | 'NEON_FOG' | 'DATA_RAIN')[] = ['CLEAR', 'NEON_FOG', 'DATA_RAIN'];
      setWeather(weathers[Math.floor(Math.random() * weathers.length)]);
    }, 10000);

    // Enemy AI
    const enemyMove = setInterval(() => {
      if (weather === 'DATA_RAIN' && Math.random() > 0.7) return; // Rain slowdown
      setEnemyPosition(prev => ({
        x: prev.x + (playerPosition.x > prev.x ? 1 : playerPosition.x < prev.x ? -1 : 0),
        y: prev.y + (playerPosition.y > prev.y ? 1 : playerPosition.y < prev.y ? -1 : 0)
      }));
    }, 600);

    return () => { clearInterval(weatherCycle); clearInterval(enemyMove); };
  }, [playerPosition, isGameOver, victory, weather]);

  // --- EVOLUTION & BOSS TRIGGER ---
  useEffect(() => {
    if (score >= 500 && evoLevel === 1) { setEvoLevel(2); addLog("EVOLVED: SENTINEL"); }
    if (score >= 1000 && evoLevel === 2) { setEvoLevel(3); addLog("EVOLVED: ARCHON (MAGNET_ON)"); }
    if (score >= 1500 && !bossActive) { 
        setBossActive(true); 
        setEvoLevel(4); 
        addLog("!!! BOSS_DETECTED: CORE_EXTRACTOR !!!"); 
    }
  }, [score, evoLevel, bossActive]);

  // --- MOVEMENT HANDLER ---
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

  // --- RENDER ---
  return (
    <div className={`survivor-world weather-${weather}`} style={{ borderColor: THEME_COLOR }}>
        <style>{`
            .grid-container { display: grid; grid-template-columns: repeat(10, 40px); gap: 4px; }
            .cell { width: 40px; height: 40px; border: 1px solid #1a1a1a; display: flex; align-items: center; justify-content: center; }
            .weather-NEON_FOG .cell { filter: blur(1px); opacity: 0.5; }
            .boss-cell { background: #ff005533; border-color: #ff0055; }
            .overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.85); display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 100; }
        `}</style>

        <div className="game-header">
            <div className="stat">SCORE: {score} | FORM: {evoLevel}</div>
            {bossActive && <div className="timer">OVERLOAD: {timer}s</div>}
        </div>

        <div className="grid-container">
            {[...Array(100)].map((_, i) => {
                const x = i % 10, y = Math.floor(i / 10);
                const isPlayer = playerPosition.x === x && playerPosition.y === y;
                const isEnemy = enemyPosition.x === x && enemyPosition.y === y;
                return (
                    <div key={i} className={`cell ${bossActive && x > 3 && x < 6 && y > 3 && y < 6 ? 'boss-cell' : ''}`}>
                        {isPlayer && <span style={{ color: THEME_COLOR }}>{evoLevel === 4 ? '🌀' : '❖'}</span>}
                        {isEnemy && <span>⚡</span>}
                        {fragments.some(f => f.x === x && f.y === y) && <span>✦</span>}
                    </div>
                );
            })}
        </div>

        <div className="console-logs">{logs.map((l, i) => <div key={i}>{l}</div>)}</div>

        {isGameOver && (
            <div className="overlay">
                <h2 style={{ color: '#ff4444' }}>SYSTEM_FAILURE</h2>
                <button onClick={() => window.location.reload()}>REBOOT</button>
            </div>
        )}

        {victory && (
            <div className="overlay">
                <h2 style={{ color: THEME_COLOR }}>SIGNAL_ASCENDED</h2>
                <p>YOU HAVE SURVIVED THE VOID.</p>
                <button onClick={() => window.location.reload()}>RETURN</button>
            </div>
        )}
    </div>
  );
};

export default SurvivorWorld;
