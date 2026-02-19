import React, { useState, useEffect, useCallback } from 'react';
import { useAvatar } from '../context/AvatarContext';

const SurvivorWorld = () => {
  const { selectedAvatar } = useAvatar();
  
  // Game Constants
  const GRID_SIZE = 10;
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [fragments, setFragments] = useState<{x: number, y: number}[]>([]);
  const [enemyPosition, setEnemyPosition] = useState({ x: 9, y: 9 });
  const [score, setScore] = useState(0);
  const [energy, setEnergy] = useState(100);
  const [level, setLevel] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isInvisible, setIsInvisible] = useState(false);

  const avatarIcons: Record<string, string> = {
    ghost: '◈',
    runner: '❖',
    void: '⬢',
    surfer: '🌀'
  };

  // 1. Initial Fragment Spawn
  useEffect(() => {
    const initialFragments = Array.from({ length: 5 }, () => ({
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    }));
    setFragments(initialFragments);
  }, []);

  // 2. Energy Recharge
  useEffect(() => {
    const timer = setInterval(() => {
      setEnergy(prev => Math.min(prev + 5, 100));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 3. Special Ability Logic
  const triggerAbility = useCallback(() => {
    if (energy < 40 || isGameOver) return;
    setEnergy(prev => prev - 40);

    if (selectedAvatar === 'runner') {
      setPlayerPosition(prev => ({ ...prev, x: Math.min(prev.x + 2, GRID_SIZE - 1) }));
    } else if (selectedAvatar === 'ghost') {
      setIsInvisible(true);
      setTimeout(() => setIsInvisible(false), 3000);
    } else if (selectedAvatar === 'void') {
      setPlayerPosition({
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      });
    } else if (selectedAvatar === 'surfer') {
      setEnemyPosition({ x: 9, y: 9 });
    }
  }, [energy, isGameOver, selectedAvatar]);

  // 4. Player Movement
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isGameOver) return;
      if (e.code === 'Space') triggerAbility();
      
      setPlayerPosition(prev => {
        const newPos = { ...prev };
        if (e.key === 'ArrowUp' && prev.y > 0) newPos.y -= 1;
        if (e.key === 'ArrowDown' && prev.y < GRID_SIZE - 1) newPos.y += 1;
        if (e.key === 'ArrowLeft' && prev.x > 0) newPos.x -= 1;
        if (e.key === 'ArrowRight' && prev.x < GRID_SIZE - 1) newPos.x += 1;
        return newPos;
      });
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isGameOver, triggerAbility]);

  // 5. Enemy AI Movement (Speed increases with level)
  useEffect(() => {
    if (isGameOver) return;
    const enemySpeed = Math.max(2000 - (level * 200), 400); // Caps speed at 400ms
    
    const moveEnemy = setInterval(() => {
      setEnemyPosition(prev => {
        const nextPos = { ...prev };
        if (prev.x < playerPosition.x) nextPos.x += 1;
        else if (prev.x > playerPosition.x) nextPos.x -= 1;
        else if (prev.y < playerPosition.y) nextPos.y += 1;
        else if (prev.y > playerPosition.y) nextPos.y -= 1;
        return nextPos;
      });
    }, enemySpeed);

    return () => clearInterval(moveEnemy);
  }, [playerPosition, isGameOver, level]);

  // 6. Collision & Level Up Logic
  useEffect(() => {
    if (playerPosition.x === enemyPosition.x && playerPosition.y === enemyPosition.y && !isInvisible) {
      setIsGameOver(true);
      return;
    }

    const foundIndex = fragments.findIndex(f => f.x === playerPosition.x && f.y === playerPosition.y);
    if (foundIndex !== -1) {
      const newScore = score + 100;
      setScore(newScore);
      setEnergy(prev => Math.min(prev + 20, 100));
      
      // Level Up every 5 fragments (500 points)
      if (newScore > 0 && newScore % 500 === 0) {
        setLevel(prev => prev + 1);
      }

      const newFragments = [...fragments];
      newFragments.splice(foundIndex, 1);
      newFragments.push({
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      });
      setFragments(newFragments);
    }
  }, [playerPosition, enemyPosition, fragments, isInvisible, score]);

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', textAlign: 'center', fontFamily: 'monospace' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', border: '1px solid #35c9ff', padding: '10px', background: 'rgba(17, 34, 64, 0.8)' }}>
        <div style={{ color: '#8892b0' }}>LVL: <span style={{ color: '#64ffda' }}>{level}</span></div>
        <div style={{ color: '#8892b0' }}>SYNC: <span style={{ color: '#64ffda' }}>{score} XP</span></div>
      </div>

      <div style={{ marginBottom: '20px', textAlign: 'left' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#35c9ff', marginBottom: '5px' }}>
          <span>ENERGY_CORE</span>
          <span>{energy}%</span>
        </div>
        <div style={{ width: '100%', height: '8px', background: '#112240', border: '1px solid #35c9ff', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ width: `${energy}%`, height: '100%', background: energy >= 40 ? '#64ffda' : '#ff5f5f', transition: 'width 0.3s ease' }} />
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`, border: '2px solid #35c9ff', background: 'rgba(10, 25, 47, 0.9)', position: 'relative', boxShadow: '0 0 20px rgba(53, 201, 255, 0.2)' }}>
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
          const x = i % GRID_SIZE;
          const y = Math.floor(i / GRID_SIZE);
          const isPlayer = playerPosition.x === x && playerPosition.y === y;
          const isEnemy = enemyPosition.x === x && enemyPosition.y === y;
          const isFragment = fragments.some(f => f.x === x && f.y === y);
          
          return (
            <div key={i} style={{ width: '100%', paddingTop: '100%', position: 'relative', border: '1px solid rgba(53, 201, 255, 0.05)' }}>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '1.5rem' }}>
                {isPlayer ? (
                  <span style={{ textShadow: '0 0 10px #64ffda', opacity: isInvisible ? 0.4 : 1 }}>{avatarIcons[selectedAvatar]}</span>
                ) :
