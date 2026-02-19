import React, { useState, useEffect, useCallback } from 'react';
import { useAvatar } from '../context/AvatarContext';

const SurvivorWorld = () => {
  const { selectedAvatar } = useAvatar();
  const GRID_SIZE = 10;
  const avatarIcons: Record<string, string> = { ghost: '◈', runner: '❖', void: '⬢', surfer: '🌀' };

  // --- PERSISTENT DATA ---
  const [wallet, setWallet] = useState(Number(localStorage.getItem('survivor_wallet')) || 0);
  const [energyMax, setEnergyMax] = useState(Number(localStorage.getItem('upgrade_energy')) || 100);
  const [speedMod, setSpeedMod] = useState(Number(localStorage.getItem('upgrade_speed')) || 0);
  const [hasShield, setHasShield] = useState(localStorage.getItem('survivor_shield_active') === 'true');

  // --- SESSION STATE ---
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [fragments, setFragments] = useState<{x: number, y: number}[]>([]);
  const [enemyPosition, setEnemyPosition] = useState({ x: 9, y: 9 });
  const [score, setScore] = useState(0);
  const [energy, setEnergy] = useState(energyMax);
  const [combo, setCombo] = useState(1);
  const [comboTimer, setComboTimer] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const [isInvisible, setIsInvisible] = useState(false);

  // --- PERSISTENCE WRAPPERS ---
  const saveWallet = (val: number) => {
    setWallet(val);
    localStorage.setItem('survivor_wallet', val.toString());
  };

  const updateShieldStatus = (status: boolean) => {
    setHasShield(status);
    localStorage.setItem('survivor_shield_active', status.toString());
  };

  const updateDailyProgress = () => {
    const current = Number(localStorage.getItem('daily_fragments')) || 0;
    localStorage.setItem('daily_fragments', (current + 1).toString());
  };

  // --- AUDIO ---
  const playSound = (type: string) => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      osc.frequency.setValueAtTime(type === 'collect' ? 440 + (combo * 50) : 150, ctx.currentTime);
      osc.start(); osc.stop(ctx.currentTime + 0.1);
    } catch (e) {}
  };

  // --- GAME LOOP ---
  useEffect(() => {
    setFragments(Array.from({ length: 5 }, () => ({ x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) })));
  }, []);

  useEffect(() => {
    const tick = setInterval(() => {
      if (isGameOver || showShop) return;
      setEnergy(prev => Math.min(prev + (5 + (speedMod * 2)), energyMax));
      setComboTimer(prev => (prev > 0 ? prev - 1 : 0));
      if (comboTimer === 0) setCombo(1);
    }, 1000);
    return () => clearInterval(tick);
  }, [isGameOver, showShop, energyMax, speedMod, comboTimer]);

  const triggerAbility = useCallback(() => {
    if (energy < 40 || isGameOver || showShop) return;
    setEnergy(e => e - 40);
    if (selectedAvatar === 'runner') setPlayerPosition(p => ({ ...p, x: Math.min(p.x + 2, GRID_SIZE - 1) }));
    else if (selectedAvatar === 'ghost') { setIsInvisible(true); setTimeout(() => setIsInvisible(false), 3000); }
    else if (selectedAvatar === 'void') setPlayerPosition({ x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) });
    else setEnemyPosition({ x: 9, y: 9 });
  }, [energy, isGameOver, selectedAvatar, showShop]);

  useEffect(() => {
    const handleKeys = (e: KeyboardEvent) => {
      if (isGameOver || showShop) return;
      if (e.code === 'Space') triggerAbility();
      setPlayerPosition(p => {
        const n = { ...p };
        if (e.key === 'ArrowUp' && p.y > 0) n.y -= 1;
        if (e.key === 'ArrowDown' && p.y < GRID_SIZE - 1) n.y += 1;
        if (e.key === 'ArrowLeft' && p.x > 0) n.x -= 1;
        if (e.key === 'ArrowRight' && p.x < GRID_SIZE - 1) n.x += 1;
        return n;
      });
    };
    window.addEventListener('keydown', handleKeys);
    return () => window.removeEventListener('keydown', handleKeys);
  }, [isGameOver, showShop, triggerAbility]);

  useEffect(() => {
    if (isGameOver || showShop) return;
    const move = setInterval(() => {
      setEnemyPosition(p => ({
        x: p.x < playerPosition.x ? p.x + 1 : p.x > playerPosition.x ? p.x - 1 : p.x,
        y: p.y < playerPosition.y ? p.y + 1 : p.y > playerPosition.y ? p.y - 1 : p.y
      }));
    }, 1000);
    return () => clearInterval(move);
  }, [playerPosition, isGameOver, showShop]);

  useEffect(() => {
    const hit = playerPosition.x === enemyPosition.x && playerPosition.y === enemyPosition.y;
    if (hit && !isInvisible) {
      if (hasShield) { updateShieldStatus(false); setEnemyPosition({ x: 9, y: 9 }); }
      else { 
        setIsGameOver(true); 
        const finalWallet = wallet + score;
        saveWallet(finalWallet);
        if (score > (Number(localStorage.getItem('survivor_high_score')) || 0)) {
          localStorage.setItem('survivor_high_score', score.toString());
        }
      }
    }
    const fIdx = fragments.findIndex(f => f.x === playerPosition.x && f.y === playerPosition.y);
    if (fIdx !== -1) {
      setScore(s => s + (100 * combo));
      setCombo(c => Math.min(c + 1, 5));
      setComboTimer(3);
      playSound('collect');
      updateDailyProgress();
      const n = [...fragments];
      n.splice(fIdx, 1);
      n.push({ x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) });
      setFragments(n);
    }
  }, [playerPosition, enemyPosition, fragments, hasShield, isInvisible, combo, score, wallet]);

  const buy = (type: 'energy' | 'speed' | 'shield') => {
    const cost = type === 'shield' ? 1500 : 1000;
    if (wallet < cost) return;
    saveWallet(wallet - cost);
    if (type === 'energy') { const m = energyMax + 25; setEnergyMax(m); localStorage.setItem('upgrade_energy', m.toString()); }
    else if (type === 'speed') { const s = speedMod + 1; setSpeedMod(s); localStorage.setItem('upgrade_speed', s.toString()); }
    else if (type === 'shield') updateShieldStatus(true);
    setShowShop(false);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', textAlign: 'center', fontFamily: 'monospace', color: '#64ffda' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', border: '1px solid #35c9ff', padding: '10px', background: '#0a192f' }}>
        <span>XP: {wallet}</span>
        <span>X{combo} COMBO</span>
        <span>SCORE: {score}</span>
      </div>
      <div style={{ height: '6px', background: '#112240', margin: '15px 0' }}>
        <div style={{ width: `${(energy/energyMax)*100}%`, height: '100%', background: '#64ffda', transition: 'width 0.3s' }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(10, 1fr)`, border: '2px solid #35c9ff', background: '#0a192f' }}>
        {Array.from({ length: 100 }).map((_, i) => {
          const x = i % 10, y = Math.floor(i / 10);
          const isP = playerPosition.x === x && playerPosition.y === y;
          const isE = enemyPosition.x === x && enemyPosition.y === y;
          const isF = fragments.some(f => f.x === x && f.y === y);
          return (
            <div key={i} style={{ width: '100%', paddingTop: '100%', position: 'relative', border: '1px solid rgba(53,201,255,0.05)' }}>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '1.2rem' }}>
                {isP ? <span style={{ color: hasShield ? '#35c9ff' : '#64ffda' }}>{avatarIcons[selectedAvatar]}</span> : isE ? '☠' : isF ? '✧' : ''}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <button onClick={triggerAbility} style={{ flex: 2, padding: '15px', background: 'none', border: '1px solid #64ffda', color: '#64ffda' }}>[ SPACE ] ABILITY</button>
        <button onClick={() => setShowShop(true)} style={{ flex: 1, padding: '15px', background: '#112240', border: '1px solid #35c9ff', color: '#35c9ff' }}>SHOP</button>
      </div>
      {showShop && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(10,25,47,0.95)', padding: '20px', zIndex: 100, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2>UPGRADES</h2>
          <button onClick={() => buy('energy')} style={{ margin: '10px', padding: '15px' }}>+25 ENERGY (1000 XP)</button>
          <button onClick={() => buy('speed')} style={{ margin: '10px', padding: '15px' }}>+REGEN (1000 XP)</button>
          <button onClick={() => buy('shield')} disabled={hasShield} style={{ margin: '10px', padding: '15px' }}>{hasShield ? 'ACTIVE' : 'SHIELD (1500 XP)'}</button>
          <button onClick={() => setShowShop(false)} style={{ color: '#ff5f5f', border: 'none', background: 'none', cursor: 'pointer', marginTop: '20px' }}>CLOSE</button>
        </div>
      )}
      {isGameOver && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(10,25,47,0.98)', zIndex: 200, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h1 style={{ color: '#ff5f5f' }}>CONNECTION_LOST</h1>
          <p>SYNCED: {score} XP</p>
          <button onClick={() => window.location.reload()} style={{ width: '200px', margin: '20px auto', padding: '15px', background: '#35c9ff', color: '#0a192f', border: 'none', fontWeight: 'bold' }}>REBOOT</button>
        </div>
      )}
    </div>
  );
};

export default SurvivorWorld;
