import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useAvatar } from '../context/AvatarContext';

const SurvivorWorld = () => {
  const { selectedAvatar } = useAvatar();
  
  // --- CONFIG ---
  const GRID_SIZE = 10;
  const avatarIcons: Record<string, string> = {
    ghost: '◈', runner: '❖', void: '⬢', surfer: '🌀'
  };

  // --- GAME STATE ---
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [fragments, setFragments] = useState<{x: number, y: number}[]>([]);
  const [enemyPosition, setEnemyPosition] = useState({ x: 9, y: 9 });
  const [bossPosition, setBossPosition] = useState<{x: number, y: number} | null>(null);
  const [score, setScore] = useState(0);
  const [wallet, setWallet] = useState(Number(localStorage.getItem('survivor_wallet')) || 0);
  const [highScore, setHighScore] = useState(Number(localStorage.getItem('survivor_high_score')) || 0);
  
  // --- STATS & UPGRADES ---
  const [energyMax, setEnergyMax] = useState(Number(localStorage.getItem('upgrade_energy')) || 100);
  const [energy, setEnergy] = useState(energyMax);
  const [speedMod, setSpeedMod] = useState(Number(localStorage.getItem('upgrade_speed')) || 0);
  const [hasShield, setHasShield] = useState(false);

  // --- MECHANICS ---
  const [level, setLevel] = useState(1);
  const [combo, setCombo] = useState(1);
  const [comboTimer, setComboTimer] = useState(0);
  const [anomaly, setAnomaly] = useState<{ name: string; type: 'buff' | 'danger' } | null>(null);
  const [anomalyTimer, setAnomalyTimer] = useState(0);
  
  // --- UI STATE ---
  const [isGameOver, setIsGameOver] = useState(false);
  const [isInvisible, setIsInvisible] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const [startTime] = useState(Date.now());

  // --- SOUND ENGINE ---
  const playSound = (type: 'collect' | 'error' | 'ability' | 'boss' | 'shield_break' | 'anomaly') => {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);

    const sounds = {
      collect: () => { osc.type = 'square'; osc.frequency.setValueAtTime(440 + (combo * 50), ctx.currentTime); },
      error: () => { osc.type = 'sawtooth'; osc.frequency.setValueAtTime(100, ctx.currentTime); },
      ability: () => { osc.type = 'sine'; osc.frequency.setValueAtTime(880, ctx.currentTime); },
      boss: () => { osc.type = 'sawtooth'; osc.frequency.setValueAtTime(80, ctx.currentTime); osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 1); },
      shield_break: () => { osc.type = 'sine'; osc.frequency.setValueAtTime(800, ctx.currentTime); osc.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.3); },
      anomaly: () => { osc.type = 'triangle'; osc.frequency.setValueAtTime(200, ctx.currentTime); osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.5); }
    };

    if (sounds[type]) {
      sounds[type]();
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      osc.start(); osc.stop(ctx.currentTime + (type === 'boss' ? 1 : 0.2));
    }
  };

  // --- CORE LOGIC: FRAGMENTS ---
  useEffect(() => {
    setFragments(Array.from({ length: 5 }, () => ({
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    })));
  }, []);

  // --- CORE LOGIC: TIMERS ---
  useEffect(() => {
    const gameTimer = setInterval(() => {
      if (isGameOver || showShop) return;
      // Energy Regen
      setEnergy(prev => Math.min(prev + (5 + speedMod), energyMax));
      // Combo Decay
      setComboTimer(prev => {
        if (prev <= 0) { setCombo(1); return 0; }
        return prev - 1;
      });
      // Anomaly Decay
      setAnomalyTimer(prev => {
        if (prev <= 1 && anomaly) setAnomaly(null);
        return Math.max(prev - 1, 0);
      });
    }, 1000);
    return () => clearInterval(gameTimer);
  }, [isGameOver, showShop, energyMax, speedMod, anomaly]);

  // --- ANOMALY SPINNER ---
  useEffect(() => {
    const triggerAnomaly = setInterval(() => {
      if (isGameOver) return;
      const events: {name: string, type: 'buff' | 'danger'}[] = [
        { name: 'DOUBLE_SYNC', type: 'buff' },
        { name: 'VIRUS_TURBO', type: 'danger' },
        { name: 'ENERGY_SURGE', type: 'buff' },
        { name: 'GRID_FOG', type: 'danger' }
      ];
      setAnomaly(events[Math.floor(Math.random() * events.length)]);
      setAnomalyTimer(15);
      playSound('anomaly');
    }, 45000);
    return () => clearInterval(triggerAnomaly);
  }, [isGameOver]);

  // --- MOVEMENT & ABILITIES ---
  const triggerAbility = useCallback(() => {
    if (energy < 40 || isGameOver || showShop) return;
    playSound('ability');
    setEnergy(prev => prev - 40);
    if (selectedAvatar === 'runner') setPlayerPosition(prev => ({ ...prev, x: Math.min(prev.x + 2, GRID_SIZE - 1) }));
    else if (selectedAvatar === 'ghost') { setIsInvisible(true); setTimeout(() => setIsInvisible(false), 3000); }
    else if (selectedAvatar === 'void') setPlayerPosition({ x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) });
    else if (selectedAvatar === 'surfer') setEnemyPosition({ x: 9, y: 9 });
  }, [energy, isGameOver, selectedAvatar, showShop]);

  useEffect(() => {
    const handleKeys = (e: KeyboardEvent) => {
      if (isGameOver || showShop) return;
      if (e.code === 'Space') triggerAbility();
      setPlayerPosition(prev => {
        const n = { ...prev };
        if (e.key === 'ArrowUp' && prev.y > 0) n.y -= 1;
        if (e.key === 'ArrowDown' && prev.y < GRID_SIZE - 1) n.y += 1;
        if (e.key === 'ArrowLeft' && prev.x > 0) n.x -= 1;
        if (e.key === 'ArrowRight' && prev.x < GRID_SIZE - 1) n.x += 1;
        return n;
      });
    };
    window.addEventListener('keydown', handleKeys);
    return () => window.removeEventListener('keydown', handleKeys);
  }, [isGameOver, showShop, triggerAbility]);

  // --- ENEMY AI ---
  useEffect(() => {
    if (isGameOver || showShop) return;
    const speed = (anomaly?.name === 'VIRUS_TURBO' ? 300 : Math.max(2000 - (level * 200), 500));
    const move = setInterval(() => {
      setEnemyPosition(p => ({
        x: p.x < playerPosition.x ? p.x + 1 : p.x > playerPosition.x ? p.x - 1 : p.x,
        y: p.y < playerPosition.y ? p.y + 1 : p.y > playerPosition.y ? p.y - 1 : p.y
      }));
    }, speed);
    return () => clearInterval(move);
  }, [playerPosition, isGameOver, showShop, level, anomaly]);

  // --- COLLISION & SCORING ---
  useEffect(() => {
    const hitEnemy = playerPosition.x === enemyPosition.x && playerPosition.y === enemyPosition.y;
    if (hitEnemy && !isInvisible) {
      if (hasShield) { setHasShield(false); playSound('shield_break'); setEnemyPosition({ x: 9, y: 9 }); }
      else { 
        setIsGameOver(true); playSound('error'); 
        localStorage.setItem('survivor_wallet', (wallet + score).toString());
      }
      return;
    }

    const fIdx = fragments.findIndex(f => f.x === playerPosition.x && f.y === playerPosition.y);
    if (fIdx !== -1) {
      const mult = (anomaly?.name === 'DOUBLE_SYNC' ? 2 : 1) * combo;
      setScore(s => s + (100 * mult));
      setCombo(c => Math.min(c + 1, 5));
      setComboTimer(3);
      if (anomaly?.name === 'ENERGY_SURGE') setEnergy(energyMax);
      playSound('collect');
      
      const newFrags = [...fragments];
      newFrags.splice(fIdx, 1);
      newFrags.push({ x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) });
      setFragments(newFrags);
      if ((score + 100) % 500 === 0) { setLevel(l => l + 1); setIsGlitching(true); setTimeout(() => setIsGlitching(false), 500); }
    }
  }, [playerPosition, enemyPosition, fragments, hasShield, isInvisible, combo, anomaly]);

  // --- SHOP LOGIC ---
  const buy = (type: 'energy' | 'speed' | 'shield') => {
    const cost = type === 'shield' ? 1500 : 1000;
    if (wallet < cost) return;
    setWallet(w => w - cost);
    if (type === 'energy') setEnergyMax(e => e + 20);
    else if (type === 'speed') setSpeedMod(s => s + 1);
    else setHasShield(true);
    setShowShop(false);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', textAlign: 'center', fontFamily: 'monospace', color: '#64ffda' }}>
      {anomaly && <div style={{ background: anomaly.type === 'buff' ? '#64ffda' : '#ff5f5f', color: '#0a192f', padding: '5px', fontWeight: 'bold' }}>ANOMALY: {anomaly.name}</div>}
      
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0', border: '1px solid #35c9ff', padding: '10px' }}>
        <span>BANK: {wallet}</span>
        <span>X{combo} COMBO</span>
        <span>SYNC: {score}</span>
      </div>

      <div style={{ height: '5px', background: '#112240', marginBottom: '15px' }}>
        <div style={{ width: `${(energy/energyMax)*100}%`, height: '100%', background: '#64ffda' }} />
      </div>

      <div style={{ 
        display: 'grid', gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`, border: '2px solid #35c9ff', 
        background: anomaly?.name === 'GRID_FOG' ? '#000' : '#0a192f', filter: anomaly?.name === 'GRID_FOG' ? 'blur(2px)' : 'none' 
      }}>
        {Array.from({ length: 100 }).map((_, i) => {
          const x = i % 10; const y = Math.floor(i / 10);
          const isP = playerPosition.x === x && playerPosition.y === y;
          const isE = enemyPosition.x === x && enemyPosition.y === y;
          const isF = fragments.some(f => f.x === x && f.y === y);
          return (
            <div key={i} style={{ width: '100%', paddingTop: '100%', position: 'relative', border: '1px solid rgba(53,201,255,0.1)' }}>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '1.2rem' }}>
                {isP ? <span style={{ color: hasShield ? '#35c9ff' : '#64ffda', textShadow: hasShield ? '0 0 10px #35c9ff' : 'none' }}>{avatarIcons[selectedAvatar]}</span> : isE ? '☠' : isF ? '✧' : ''}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        <button onClick={triggerAbility} style={{ flex: 2, padding: '15px', background: 'none', border: '1px solid #64ffda', color: '#64ffda' }}>[ SPACE ] ABILITY</button>
        <button onClick={() => setShowShop(true)} style={{ flex: 1, padding: '15px', background: '#112240', border: '1px solid #35c9ff', color: '#35c9ff' }}>SHOP</button>
      </div>

      {showShop && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(10,25,47,0.95)', padding: '20px', zIndex: 100 }}>
          <h2>SYSTEM_UPGRADES</h2>
          <button onClick={() => buy('energy')} style={{ width: '100%', margin: '10px 0', padding: '10px' }}>+20 ENERGY (1000 XP)</button>
          <button onClick={() => buy('speed')} style={{ width: '100%', margin: '10px 0', padding: '10px' }}>+REGEN_SPEED (1000 XP)</button>
          <button onClick={() => buy('shield')} disabled={hasShield} style={{ width: '100%', margin: '10px 0', padding: '10px' }}>SHIELD_PROTOCOL (1500 XP)</button>
          <button onClick={() => setShowShop(false)} style={{ color: '#ff5f5f', border: 'none', background: 'none', marginTop: '20px' }}>CLOSE</button>
        </div>
      )}

      {isGameOver && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(10,25,47,0.98)', zIndex: 200, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h1 style={{ color: '#ff5f5f' }}>SYSTEM_HALTED</h1>
          <p>SESSION_SYNC: {score}</p>
          <button onClick={() => window.location.reload()} style={{ width: '200px', margin: '20px auto', padding: '15px', background: '#35c9ff', border: 'none' }}>REBOOT</button>
        </div>
      )}
    </div>
  );
};

export default SurvivorWorld;
