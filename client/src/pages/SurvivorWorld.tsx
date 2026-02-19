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
  const [energy, setEnergy] = useState(100);
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
  const triggerAbility = () => {
    if (energy < 40 || isGameOver) return;

    setEnergy(prev => prev - 40);

    if (selectedAvatar === 'runner') {
      // Dash: Move 2 spaces forward in current direction (Defaulting to right for simplicity)
      setPlayerPosition(prev => ({ ...prev, x: Math.min(prev.x + 2, GRID_SIZE - 1) }));
    } 
    else if (selectedAvatar === 'ghost') {
      // Invisibility: Virus can't kill you for 3 seconds
      setIsInvisible(true);
      setTimeout(() => setIsInvisible(false), 3000);
    }
    else if (selectedAvatar === 'void') {
      // Phase: Teleport to a random safe spot
      setPlayerPosition({
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      });
    }
    else if (
