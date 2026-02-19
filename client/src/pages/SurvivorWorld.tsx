import React, { useState, useEffect, useCallback } from 'react';
import { useAvatar } from '../context/AvatarContext';

const SurvivorWorld = () => {
  const { selectedAvatar } = useAvatar();
  
  // Game State
  const GRID_SIZE = 10;
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [fragments, setFragments] = useState<{x: number, y: number}[]>([]);
  const [enemyPosition, setEnemyPosition] = useState({ x: 9, y: 9 });
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(Number(localStorage.getItem('survivor_high_score')) || 0);
  const [energy, setEnergy] = useState(100);
  const [level, setLevel] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isInvisible, setIsInvisible] = useState(false);

  const avatarIcons: Record<string, string> = {
    ghost: '◈', runner: '❖', void: '⬢', surfer: '🌀'
  };

  // --- SOUND ENGINE ---
  const playSound = (type: 'collect' | 'error' | 'ability') => {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'collect') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } else if (type === 'error') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(200, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(50, ctx.currentTime + 0.5);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } else if (type === 'ability') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    }
  };

  // --- GAME LOGIC ---
  useEffect(() => {
    const initialFragments = Array.from({ length: 5 }, () => ({
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    }));
    setFragments(initialFragments);
  }, []);

  const triggerAbility = useCallback(() => {
    if (energy < 40 || isGameOver) return;
    playSound('ability');
    setEnergy(prev => prev - 40);

    if (selectedAvatar === 'runner') {
      setPlayerPosition(prev => ({ ...prev, x: Math.min(prev.x + 2, GRID_SIZE - 1) }));
    } else if (selectedAvatar === 'ghost') {
      setIsInvisible(true);
      setTimeout(() => setIsInvisible(false), 3000);
    } else if (selectedAvatar === 'void') {
      setPlayerPosition({ x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) });
    } else if (selectedAvatar === 'surfer') {
      setEnemyPosition({ x: 9, y: 9 });
    }
  }, [energy, isGameOver, selectedAvatar]);

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

  useEffect(() => {
    if (isGameOver) return;
    const enemySpeed = Math.max(2000 - (level * 200), 400);
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

  useEffect(() => {
    if (playerPosition.x === enemyPosition.x && playerPosition.y === enemyPosition.y && !isInvisible) {
      setIsGameOver(true);
      playSound('error');
      if (score > highScore) {
        localStorage.setItem('survivor_high_score', score.toString());
        setHighScore(score);
      }
      return;
    }

    const foundIndex = fragments.findIndex(f => f.x === playerPosition.x && f.y === playerPosition.y);
    if (foundIndex !== -1) {
      playSound('collect');
      const newScore = score + 100;
      setScore(newScore);
      setEnergy(prev => Math.min(prev + 20, 100));
      if (newScore > 0 && newScore % 500 === 0) setLevel(prev => prev + 1);

      const newFragments = [...fragments];
      newFragments.splice(foundIndex, 1);
      newFragments.push({ x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) });
      setFragments(newFragments);
    }
  }, [playerPosition, enemyPosition, fragments, isInvisible, score, highScore]);

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', textAlign: 'center', fontFamily: 'monospace' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', border: '1px solid #35c9ff', padding: '10px', background: 'rgba(17, 34, 64, 0.8)' }}>
        <div style={{ color: '#8892b0' }}>LVL: <span style={{ color: '#64ffda' }}>{level}</span></div>
        <div style={{ color: '#8892b0' }}>BEST: <span style={{ color:
