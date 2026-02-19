import React, { useState, useEffect, useCallback } from 'react';
import { useAvatar } from '../context/AvatarContext';
import { playSound } from '../utils/audio';

const SurvivorWorld = () => {
  const { selectedAvatar } = useAvatar();
  const THEME_COLOR = '#64ffda';

  // --- PERSISTENCE, MODIFIERS & PERKS ---
  const [highScore, setHighScore] = useState(Number(localStorage.getItem('survivor_high_score') || 0));
  const [dataShards, setDataShards] = useState(Number(localStorage.getItem('survivor_shards') || 0));
  const [perks, setPerks] = useState({
    magnetRange: Number(localStorage.getItem('perk_magnet') || 0),
    neuralShield: Number(localStorage.getItem('perk_shield') || 0),
    dataEfficiency: Number(localStorage.getItem('perk_efficiency') || 0),
  });
  const [modifiers, setModifiers] = useState({ hardcore: false, turbo: false });
  const [showArchive, setShowArchive] = useState(false);

  // --- ENGINE STATE ---
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [enemyPosition, setEnemyPosition] = useState({ x: 9, y: 9 });
  const [fragments, setFragments] = useState<{ x: number, y: number }[]>([]);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [bossActive, setBossActive] = useState(false);

  const perkCosts = { magnetRange: 100, neuralShield: 250, dataEfficiency: 200 };

  // --- SHOP LOGIC ---
  const buyPerk = (perkName: keyof typeof perks) => {
    const cost = perkCosts[perkName];
    if (dataShards >= cost) {
      const newShards = dataShards - cost;
      const newLevel = perks[perkName] + 1;
      setDataShards(newShards);
      setPerks(prev => ({ ...prev, [perkName]: newLevel }));
      localStorage.setItem('survivor_shards', newShards.toString());
      localStorage.setItem(`perk_${perkName.replace(/[A-Z]/g, l => `_${l.toLowerCase()}`)}`, newLevel.toString());
      playSound('upgrade');
    }
  };

  // --- PERSISTENCE ON DEATH ---
  useEffect(() => {
    if (isGameOver) {
      const earned = Math.floor(score / 10);
      setDataShards(s => {
        const total = s + earned;
        localStorage.setItem('survivor_shards', total.toString());
        return total;
      });
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem('survivor_high_score', score.toString());
      }
    }
  }, [isGameOver]);

  // --- FRAGMENT SPAWNER ---
  useEffect(() => {
    if (isGameOver || showArchive) return;
    const spawner = setInterval(() => {
      if (fragments.length < 8) {
        setFragments(p => [...p, { x: Math.floor(Math.random() * 10), y: Math.floor(Math.random() * 10) }]);
      }
    }, modifiers.turbo ? 1500 : 3000);
    return () => clearInterval(spawner);
  }, [fragments.length, isGameOver, showArchive, modifiers.turbo]);

  // --- MOVEMENT & DATA LOGGING ---
  const handleMove = useCallback((dx: number, dy: number) => {
    if (isGameOver || showArchive) return;
    setPlayerPosition(prev => {
      const nX = Math.max(0, Math.min(9, prev.x + dx));
      const nY = Math.max(0, Math.min(9, prev.y + dy));
      
      const reach = perks.magnetRange;
      const multiplier = (modifiers.hardcore ? 2 : 1) * (modifiers.turbo ? 1.5 : 1);

      setFragments(f => f.filter(frag => {
        if (Math.abs(frag.x - nX) <= reach && Math.abs(frag.y - nY) <= reach) {
          setScore(s => s + (10 + perks.dataEfficiency * 2) * multiplier);
          playSound('collect');
          return false;
        }
        return true;
      }));

      if (nX === enemyPosition.x && nY === enemyPosition.y) {
        if (Math.random() < (perks.neuralShield * 0.15)) {
          setEnemyPosition({ x: 9, y: 9 });
          playSound('shieldHit');
        } else {
          setIsGameOver(true);
        }
      }
      return { x: nX, y: nY };
    });
  }, [enemyPosition, isGameOver, showArchive, perks, modifiers]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const keys: Record<string, [number, number]> = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0] };
      if (keys[e.key]) { e.preventDefault(); handleMove(...keys[e.key]); }
      if (e.key.toLowerCase() === 'a') setShowArchive(p => !p);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleMove]);

  return (
    <div className={`survivor-world ${modifiers.hardcore ? 'hardcore-active' : ''}`}>
      <style>{`
        .survivor-world { background: #000; color: ${THEME_COLOR}; padding: 20px; display: flex; gap: 20px; font-family: 'Courier New', monospace; }
        .grid-container { display: grid; grid-template-columns: repeat(10, 40px); gap: 4px; border: 1px solid #222; padding: 4px; }
        .cell { width: 40px; height: 40px; border: 1px solid #111; display: flex; align-items: center; justify-content: center; }
        .neural-log { width: 200px; font-size: 0.7rem; border-left: 1px solid #333; padding-left: 15px; }
        .log-entry { margin-bottom: 5px; color: #888; }
        .log-val { color: ${THEME_COLOR}; }
        .btn-ui { background: ${THEME_COLOR}; color: #000; border: none; padding: 5px 10px; cursor: pointer; font-size: 0.7rem; }
        .hardcore-active { border: 2px solid #ff0055; box-shadow: 0 0 15px #ff0055; }
        .overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.95); z-index: 100; padding: 20px; }
      `}</style>

      <div className="main-game">
        <div className="game-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <button className="btn-ui" onClick={() => setShowArchive(true)}>UPGRADES [A]</button>
          <div>SCORE: {Math.floor(score)}</div>
        </div>

        <div className="grid-container">
          {[...Array(100)].map((_, i) => {
            const x = i % 10, y = Math.floor(i / 10);
            return (
              <div key={i} className="cell">
                {playerPosition.x === x && playerPosition.y === y && <span style={{fontSize: '1.2rem'}}>❖</span>}
                {enemyPosition.x === x && enemyPosition.y === y && <span style={{color: '#ff0055'}}>⚡</span>}
                {fragments.some(f => f.x === x && f.y === y) && <span>✦</span>}
              </div>
            );
          })}
        </div>
      </div>

      <div className="neural-log">
        <h4 style={{margin: '0 0 10px 0'}}>NEURAL_TELEMETRY</h4>
        <div className="log-entry">PLAYER_POS: <span className="log-val">[{playerPosition.x}, {playerPosition.y}]</span></div>
        <div className="log-entry">ENEMY_POS: <span className="log-val" style={{color: '#ff0055'}}>[{enemyPosition.x}, {enemyPosition.y}]</span></div>
        <div className="log-entry">FRAG_COUNT: <span className="log-val">{fragments.length}</span></div>
        <div className="log-entry">ACTIVE_MODS: <span className="log-val">{modifiers.hardcore ? 'HARDCORE' : 'NONE'}</span></div>
      </div>

      {showArchive && (
        <div className="overlay">
          <h3>HARDWARE_OPTIMIZATION</h3>
          <p>SHARDS available: {dataShards}</p>
          <div style={{margin: '10px 0'}} onClick={() => setModifiers(m => ({...m, hardcore: !m.hardcore}))}>
            <button className="btn-ui">MOD: HARDCORE {modifiers.hardcore ? '[ACTIVE]' : '[OFF]'}</button>
          </div>
          <div style={{border: '1px solid #222', padding: '10px'}}>
             <div>MAGNET_RANGE (LVL {perks.magnetRange})</div>
             <button className="btn-ui" onClick={() => buyPerk('magnetRange')}>UPGRADE (100 S)</button>
          </div>
          <button className="btn-ui" style={{marginTop: '20px'}} onClick={() => setShowArchive(false)}>BACK_TO_GRID</button>
        </div>
      )}

      {isGameOver && (
        <div className="overlay" style={{textAlign: 'center', justifyContent: 'center'}}>
          <h2 style={{color: '#ff0055'}}>SYSTEM_CRITICAL</h2>
          <p>Score: {score}</p>
          <button className="btn-ui" onClick={() => window.location.reload()}>REBOOT</button>
        </div>
      )}
    </div>
  );
};

export default SurvivorWorld;
