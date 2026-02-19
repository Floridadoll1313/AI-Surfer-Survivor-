import React, { useState, useEffect, useCallback } from 'react';
import { useAvatar } from '../context/AvatarContext';
import { playSound } from '../utils/audio';

// --- SUB-COMPONENT: LEADERBOARD ---
const Leaderboard = ({ userScore, userMoves }) => {
  const entries = [
    { name: "Bot_Delta_v2", score: 4500, moves: 120, type: "NEURAL_NET" },
    { name: "Logic_Gate_Alpha", score: 3800, moves: 98, type: "HEURISTIC" },
    { name: "YOU (CURRENT)", score: userScore, moves: userMoves, type: "STUDENT_SCRIPT" }
  ].sort((a, b) => b.score - a.score);

  return (
    <div style={{ marginTop: '20px', border: '1px solid #333', padding: '10px', fontSize: '0.8rem' }}>
      <div style={{ color: '#64ffda', borderBottom: '1px solid #64ffda', marginBottom: '5px' }}>GLOBAL_LEADERBOARD</div>
      {entries.map((e, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', color: e.name.includes('YOU') ? '#64ffda' : '#888' }}>
          <span>{i + 1}. {e.name}</span>
          <span>{e.score} pts</span>
        </div>
      ))}
    </div>
  );
};

const SurvivorWorld = () => {
  const { selectedAvatar } = useAvatar();
  const THEME_COLOR = '#64ffda';

  // --- STATE: PERSISTENCE & PERKS ---
  const [dataShards, setDataShards] = useState(Number(localStorage.getItem('survivor_shards') || 0));
  const [perks, setPerks] = useState({
    magnetRange: Number(localStorage.getItem('perk_magnet') || 0),
    dataEfficiency: Number(localStorage.getItem('perk_efficiency') || 0),
  });
  const [showArchive, setShowArchive] = useState(false);

  // --- STATE: ENGINE ---
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [enemyPosition, setEnemyPosition] = useState({ x: 9, y: 9 });
  const [fragments, setFragments] = useState<{ x: number, y: number }[]>([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [autoPilot, setAutoPilot] = useState(false);

  // --- AI BRAIN (The Gatherer Challenge) ---
  const runAIBrain = useCallback(() => {
    if (fragments.length === 0) return;
    const target = fragments[0];
    let dx = 0, dy = 0;
    if (target.x > playerPosition.x) dx = 1;
    else if (target.x < playerPosition.x) dx = -1;
    else if (target.y > playerPosition.y) dy = 1;
    else if (target.y < playerPosition.y) dy = -1;
    handleMove(dx, dy);
  }, [playerPosition, fragments]);

  useEffect(() => {
    if (autoPilot && !isGameOver) {
      const tick = setInterval(runAIBrain, 300);
      return () => clearInterval(tick);
    }
  }, [autoPilot, isGameOver, runAIBrain]);

  // --- FRAGMENT SPAWNER ---
  useEffect(() => {
    const spawner = setInterval(() => {
      if (fragments.length < 5 && !isGameOver) {
        setFragments(p => [...p, { x: Math.floor(Math.random() * 10), y: Math.floor(Math.random() * 10) }]);
      }
    }, 2000);
    return () => clearInterval(spawner);
  }, [fragments.length, isGameOver]);

  // --- CORE MOVEMENT ---
  const handleMove = (dx: number, dy: number) => {
    if (isGameOver || showArchive) return;
    setMoves(m => m + 1);
    setPlayerPosition(prev => {
      const nX = Math.max(0, Math.min(9, prev.x + dx));
      const nY = Math.max(0, Math.min(9, prev.y + dy));
      
      // Collection
      setFragments(f => f.filter(frag => {
        if (Math.abs(frag.x - nX) <= perks.magnetRange && Math.abs(frag.y - nY) <= perks.magnetRange) {
          setScore(s => s + 10 + (perks.dataEfficiency * 5));
          return false;
        }
        return true;
      }));

      if (nX === enemyPosition.x && nY === enemyPosition.y) setIsGameOver(true);
      return { x: nX, y: nY };
    });
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const keys: any = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0] };
      if (keys[e.key]) handleMove(...keys[e.key]);
      if (e.key.toLowerCase() === 'a') setShowArchive(p => !p);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleMove]);

  return (
    <div style={{ background: '#000', color: THEME_COLOR, padding: '20px', display: 'flex', gap: '20px', fontFamily: 'monospace' }}>
      <div className="simulation-core">
        <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
          <span>MODE: {autoPilot ? 'AUTO' : 'MANUAL'}</span>
          <button onClick={() => setAutoPilot(!autoPilot)} style={{ background: THEME_COLOR }}>TOGGLE_AI</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 40px)', gap: '4px' }}>
          {[...Array(100)].map((_, i) => {
            const x = i % 10, y = Math.floor(i / 10);
            return (
              <div key={i} style={{ width: '40px', height: '40px', border: '1px solid #111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {playerPosition.x === x && playerPosition.y === y && <span>❖</span>}
                {enemyPosition.x === x && enemyPosition.y === y && <span style={{color: '#ff0055'}}>⚡</span>}
                {fragments.some(f => f.x === x && f.y === y) && <span>✦</span>}
              </div>
            );
          })}
        </div>
      </div>

      <div className="telemetry-panel" style={{ width: '220px', borderLeft: '1px solid #222', paddingLeft: '20px' }}>
        <h3 style={{ fontSize: '0.9rem' }}>NEURAL_TELEMETRY</h3>
        <div style={{ fontSize: '0.7rem', color: '#888' }}>
          <p>PLAYER: [{playerPosition.x}, {playerPosition.y}]</p>
          <p>ENEMY: [{enemyPosition.x}, {enemyPosition.y}]</p>
          <p>SCORE: {score}</p>
          <p>MOVES: {moves}</p>
        </div>
        <Leaderboard userScore={score} userMoves={moves} />
      </div>

      {isGameOver && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h2 style={{ color: '#ff0055' }}>SYSTEM_FAILURE</h2>
          <button onClick={() => window.location.reload()} style={{ padding: '10px 20px', background: THEME_COLOR }}>REBOOT</button>
        </div>
      )}
    </div>
  );
};

export default SurvivorWorld;
