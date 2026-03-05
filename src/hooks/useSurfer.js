import { useState, useEffect } from 'react';

export const useSurfer = () => {
  const [pos, setPos] = useState({ y: 0, tilt: 0 });

  useEffect(() => {
    let frame;
    const animate = (time) => {
      // Logic for "Animation 2": High-fidelity sine wave physics
      const waveY = Math.sin(time / 800) * 40; 
      setPos({ y: waveY, tilt: Math.cos(time / 800) * 15 });
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return pos;
};
