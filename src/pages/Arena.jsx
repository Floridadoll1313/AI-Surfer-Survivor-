import { useState, useRef, useEffect } from "react";

// --- Animation Frame Hook ---
function useAnimationFrame(callback) {
  const requestRef = useRef();
  const previousTimeRef = useRef();

  useEffect(() => {
    const animate = (time) => {
      if (previousTimeRef.current !== undefined) {
        callback(time);
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [callback]);
}

// --- Surfer Component ---
const Surfer = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState(0);

  // Player input offset (placeholder for now)
  const playerInputOffset = 0;

  useAnimationFrame((time) => {
    const waveY = Math.sin(time / 800) * 40; // smoother neon wave

    setPosition((prev) => ({
      ...prev,
      y: waveY + playerInputOffset,
    }));

    // Tilt the surfer slightly with the wave
    setTilt(Math.cos(time / 900) * 8);
  });

  return (
    <div
      className="transition-transform duration-75 ease-out"
      style={{
        transform: `translateY(${position.y}px) rotate(${tilt}deg)`,
      }}
    >
      {/* Neon Surfer Sprite */}
      <div className="w-20 h-5 bg-cyan-400 shadow-[0_0_20px_#00eaff] rounded-full" />
    </div>
  );
};

export default Surfer;
