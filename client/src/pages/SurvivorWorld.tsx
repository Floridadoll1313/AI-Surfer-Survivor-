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
  const [timer, setTimer] = useState(60);

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
      localStorage.setItem(`perk_${perkName.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)}`, newLevel.toString());
      playSound('upgrade');
    }
  };

  // --- END GAME & REWARDS ---
  useEffect(() => {
    if (isGameOver) {
      const earned = Math.floor(score / 10);
      const total = dataShards + earned;
      setDataShards(total);
      localStorage.setItem('survivor_shards', total.toString());
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem('survivor_high_score', score.toString());
      }
    }
  }, [isGameOver]);

  // --- BOSS & FRAGMENT LOGIC ---
  useEffect(() => {
    if (score >= 1500 && !bossActive) setBossActive(true);
    const spawner = setInterval(() => {
        if (fragments.length < 10 && !isGameOver) {
            setFragments(p => [...p, { x: Math.floor(Math.random() * 10), y: Math.floor(Math.random() * 10) }]);
        }
    }, modifiers.turbo ? 1500 : 3000);
    return () => clearInterval(spawner);
  }, [score, bossActive, fragments.length, isGameOver, modifiers.turbo]);

  // --- MOVEMENT & COLLISION ---
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
            setEnemyPosition({x: 9, y: 9});
            playSound('shieldHit');
        } else {
            setIsGameOver(true);
            playSound('gameOver');
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
    <div className={`survivor-world ${modifiers.hardcore ? 'hardcore-mode' : ''}`}>
      <style>{`
        .survivor-world { background: #000; color: ${THEME_COLOR}; padding: 20px; position: relative; border: 2px solid #1a1a1a; min-height: 550px; }
        .grid-container { display: grid; grid-template-columns: repeat(10, 40px); gap: 4px; margin-top: 10px; }
        .cell { width: 40px; height: 40px; border: 1px solid #111; display: flex; align-items: center; justify-content: center; position: relative; }
        .hardcore-mode { border-color: #ff0055; box-shadow: 0 0 15px #ff0055; }
        .overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.95); z-index: 100; display: flex; flex-direction: column; padding: 20px; }
        .shop-item { border: 1px solid #222; padding: 10px; margin: 5px 0; display: flex; justify-content: space-between; }
        .btn-ui { background: ${THEME_COLOR}; color: #000; border: none; padding: 5px 10px; cursor: pointer; font-family: monospace; }
      `}</style>

      <div className="game-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button className="btn-ui" onClick={() => setShowArchive(true)}>NEURAL_LAB [A]</button>
        <div>SHARDS: <span style={{color: '#ffcc00'}}>{dataShards}</span> | SCORE: {Math.floor(score)}</div>
      </div>

      <div className="grid-container">
        {[...Array(100)].map((_, i) => {
          const x = i % 10, y = Math.floor(i / 10);
          const isBoss = bossActive && x >= 4 && x <= 5 && y >= 4 && y <= 5;
          return (
            <div key={i} className={`cell ${isBoss ? 'boss-cell' : ''}`}>
              {playerPosition.x === x && playerPosition.y === y && <span>❖</span>}
              {enemyPosition.x === x && enemyPosition.y === y && <span>⚡</span>}
              {fragments.some(f => f.x === x && f.y === y) && <span style={{color: '#fff'}}>✦</span>}
            </div>
          );
        })}
      </div>

      {showArchive && (
        <div className="overlay">
          <h2 style={{color: THEME_COLOR}}>NEURAL_ARCHIVE & SHOP</h2>
          <div style={{margin: '10px 0'}}>
            <button className="btn-ui" onClick={() => setModifiers(m => ({...m, hardcore: !m.hardcore}))}>
               HARDCORE_PROTOCOL: {modifiers.hardcore ? 'ACTIVE (2x)' : 'OFF'}
            </button>
          </div>
          <div className="shop-item">
             <div>MAGNET_RANGE (LVL {perks.magnetRange})</div>
             <button className="btn-ui" onClick={() => buyPerk('magnetRange')}>{perkCosts.magnetRange} S</button>
          </div>
          <div className="shop-item">
             <div>NEURAL_SHIELD (LVL {perks.neuralShield})</div>
             <button className="btn-ui" onClick={() => buyPerk('neuralShield')}>{perkCosts.neuralShield} S</button>
          </div>
          <button className="btn-ui" style={{marginTop: 'auto'}} onClick={() => setShowArchive(false)}>RESUME_SIMULATION</button>
        </div>
      )}

      {isGameOver && (
        <div className="overlay" style={{alignItems: 'center', justifyContent: 'center'}}>
          <h2 style={{color: '#ff0055'}}>CONNECTION_LOST</h2>
          <p>EARNED: {Math.floor(score/10)} SHARDS</p>
          <button className="btn-ui" onClick={() => window.location.reload()}>REBOOT_SESSION</button>
        </div>
      )}
    </div>
  );
};

export default SurvivorWorld;
