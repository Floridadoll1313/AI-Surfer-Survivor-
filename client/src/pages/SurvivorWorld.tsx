import React, { useState, useEffect } from 'react';
import { useAvatar } from '../context/AvatarContext';

const SurvivorWorld = () => {
  const { selectedAvatar } = useAvatar();
  
  // Game Constants
  const GRID_SIZE = 10;
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [fragments, setFragments] = useState<{x: number, y: number}[]>([]);
  const [enemyPosition, setEnemyPosition] = useState({ x: 9, y: 9 });
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

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

  // 2. Player Movement
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isGameOver) return;
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
  }, [isGameOver]);

  // 3. Enemy AI Movement (Moves every 2 seconds)
  useEffect(() => {
    if (isGameOver) return;
    const moveEnemy = setInterval(() => {
      setEnemyPosition(prev => {
        const nextPos = { ...prev };
        if (prev.x < playerPosition.x) nextPos.x += 1;
        else if (prev.x > playerPosition.x) nextPos.x -= 1;
        else if (prev.y < playerPosition.y) nextPos.y += 1;
        else if (prev.y > playerPosition.y) nextPos.y -= 1;
        return nextPos;
      });
    }, 2000);

    return () => clearInterval(moveEnemy);
  }, [playerPosition, isGameOver]);

  // 4. Collision Logic (Fragments and Enemy)
  useEffect(() => {
    // Check Enemy Collision
    if (playerPosition.x === enemyPosition.x && playerPosition.y === enemyPosition.y) {
      setIsGameOver(true);
      return;
    }

    // Check Fragment Collection
    const foundIndex = fragments.findIndex(f => f.x === playerPosition.x && f.y === playerPosition.y);
    if (foundIndex !== -1) {
      const newFragments = [...fragments];
      newFragments.splice(foundIndex, 1);
      newFragments.push({
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      });
      setFragments(newFragments);
      setScore(prev => prev + 100);
    }
  }, [playerPosition, enemyPosition, fragments]);

  const resetGame = () => {
    setPlayerPosition({ x: 0, y: 0 });
    setEnemyPosition({ x: 9, y: 9 });
    setScore(0);
    setIsGameOver(false);
  };

  const renderGrid = () => {
    const cells = [];
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        const isPlayer = playerPosition.x === x && playerPosition.y === y;
        const isEnemy = enemyPosition.x === x && enemyPosition.y === y;
        const isFragment = fragments.some(f => f.x === x && f.y === y);
        
        cells.push(
          <div key={`${x}-${y}`} style={{
            width: '100%', paddingTop: '100%', position: 'relative',
            border: '1px solid rgba(53, 201, 255, 0.1)',
            backgroundColor: isPlayer ? 'rgba(100, 255, 218, 0.1)' : isEnemy ? 'rgba(255, 100, 100, 0.1)' : 'transparent',
          }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '1.5rem' }}>
              {isPlayer ? (
                <span style={{ textShadow: '0 0 10px #64ffda' }}>{avatarIcons[selectedAvatar]}</span>
              ) : isEnemy ? (
                <span style={{ color: '#ff5f5f', textShadow: '0 0 10px #ff5f5f' }}>☠</span>
              ) : isFragment ? (
                <span style={{ color: '#64ffda', fontSize: '0.8rem', animation: 'pulse 1.5s infinite' }}>✧</span>
              ) : null}
            </div>
          </div>
        );
      }
    }
    return cells;
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', border: '1px solid #35c9ff', padding: '10px' }}>
        <div style={{ color: '#8892b0' }}>STATUS: <span style={{ color: isGameOver ? '#ff5f5f' : '#64ffda' }}>{isGameOver ? 'SYSTEM_FAILURE' : 'ACTIVE'}</span></div>
        <div style={{ color: '#64ffda' }}>XP: {score}</div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`, border: '2px solid #35c9ff', background: 'rgba(10, 25, 47, 0.8)', position: 'relative' }}>
        {renderGrid()}
        
        {isGameOver && (
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(10, 25, 47, 0.9)', display: 'flex', flexDirection: 'column',
            justifyContent: 'center', alignItems: 'center', zIndex: 10
          }}>
            <h2 style={{ color: '#ff5f5f' }}>CRITICAL_ERROR</h2>
            <p style={{ color: '#8892b0' }}>NEURAL_LINK_SEVERED_BY_VIRUS</p>
            <button onClick={resetGame} style={{
              marginTop: '20px', padding: '10px 20px', background: '#35c9ff', color: '#0a192f',
              border: 'none', cursor: 'pointer', fontWeight: 'bold
