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
  const [highScore, setHighScore] = useState(Number(localStorage.getItem('survivor_high_score')) || 0);
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
        if (e.key === 'ArrowRight' && prev.x < GRID_SIZE - 1) newPos.
