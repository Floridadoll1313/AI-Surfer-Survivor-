```jsx
import React from 'react';
import { useProgression } from '../hooks/ProgressionContext';
import { useSurfingEngine } from '../hooks/useSurfingEngine';

const GearEquipment = () => {
  const { progression } = useProgression();
  // Animation 2: Physics-based movement for the gear cards
  const { y, tilt } = useSurfingEngine(0.6);

  const gearItems = [
    { id: 'b-01', name: 'NEON_CARVER', type: 'Board', stat: '+15 Speed', color: 'border-neon-blue', level: 1 },
    { id: 's-05', name: 'GLITCH_SHIELD', type: 'Suit', stat: '+20% Recovery', color: 'border-neon-pink', level: 5 },
    { id: 'g-12', name: 'VOID_FINS', type: 'Fin', stat: '+10 Agility', color: 'border-white', level: 3 },
  ];

  return (
    <div className="relative min-h-screen bg-black pt-24 pb-12 px-6 overflow-hidden">
      {/* Background Physics Layer */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ transform: `translateY(${y * 0.5}px) rotate(${tilt / 15}deg)` }}
      >
        <div className="w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(0,234,255,0.05)_50%,transparent_75%)] bg-[length:200%_200%] animate-pulse" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <header className="mb-12">
          <h1 className="text-5xl font-black italic text-white tracking-tighter drop-shadow-[0_0_10px_#00eaff]">
            EQUIPMENT_LOCKER
          </h1>
          <p className="text-neon-blue font-mono text-xs uppercase tracking-[0.5em] mt-2">
            Status: Level {progression.level} // Survivor_Ready
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gearItems.map((item) => {
            const isLocked = progression.level < item.level;
            
            return (
              <div 
                key={item.id}
                className={`relative p-8 border-2 transition-all duration-500 ${item.color} ${
                  isLocked ? 'opacity-30 grayscale' : 'hover:scale-105 hover:shadow-[0_0_30px_rgba(0,234,255,0.3)]'
                }`}
                style={{ transform: `translateY(${y}px) rotate(${tilt / 10}deg)` }}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">{item.type}</span>
                  {isLocked && (
                    <span className="text-[10px] bg-neon-pink text-black px-2 py-0.5 font-bold">LOCKED_LVL_{item.level}</span>
                  )}
                </div>
                
                <h3 className="text-2xl font-black italic text-white mb-2">{item.name}</h3>
                <p className="text-neon-green font-mono text-sm">{item.stat}</p>

                <button 
                  disabled={isLocked}
                  className={`mt-8 w-full py-3 font-black italic transition-all ${
                    isLocked 
                    ? 'bg-white/10 text-white/20 cursor-not-allowed' 
                    : 'bg-white text-black hover:bg-neon-blue hover:shadow-[0_0_15px_#00eaff]'
                  }`}
                >
                  {isLocked ? 'ENCRYPTED' : 'EQUIP_GEAR'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GearEquipment;
