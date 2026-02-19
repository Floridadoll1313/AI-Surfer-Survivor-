import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAvatar } from '../context/AvatarContext';

// Sub-component for the typewriter effect
const Typewriter = ({ text, speed = 50 }: { text: string; speed?: number }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return <span>{displayedText}<span className="cursor">_</span></span>;
};

const Home = () => {
  const { selectedAvatar } = useAvatar();

  const avatarData: Record<string, { icon: string; label: string; description: string }> = {
    ghost: { icon: '◈', label: 'NEURAL_GHOST', description: 'Invisibility within the data streams. Stealth-optimized.' },
    runner: { icon: '❖', label: 'TIDE_RUNNER', description: 'High-velocity traversal across the digital surf.' },
    void: { icon: '⬢', label: 'VOID_WALKER', description: 'Stable existence within non-space. Entropy resistant.' },
    surfer: { icon: '🌀', label: 'AI_SURFER', description: 'The original architect of the wave. Balanced performance.' }
  };

  const current = avatarData[selectedAvatar] || avatarData.ghost;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px', fontFamily: 'monospace' }}>
      <section style={{ 
        border: '1px solid #35c9ff', 
        padding: '40px', 
        borderRadius: '8px', 
        background: 'rgba(17, 34, 64, 0.5)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative background "scanline" */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '2px', background: 'rgba(53, 201, 255, 0.1)', animation: 'scan 4s linear infinite' }} />

        <div style={{ fontSize: '4rem', marginBottom: '20px', textShadow: '0 0 20px #64ffda' }}>
          {current.icon}
        </div>

        <h1 style={{ color: '#64ffda', letterSpacing: '4px', minHeight: '1.2em' }}>
          &gt; <Typewriter text={`WELCOME_BACK_${current.label}`} />
        </h1>

        <p style={{ color: '#8892b0', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 30px', minHeight: '3em' }}>
          <Typewriter text={current.description} speed={30} />
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <Link to="/game" style={{
            padding: '12px 30px',
            backgroundColor: '#35c9ff',
            color: '#0a192f',
            textDecoration: 'none',
            fontWeight: 'bold',
            borderRadius: '4px',
            boxShadow: '0 0 15px rgba(53, 201, 255, 0.3)'
          }}>
            INITIALIZE_GRID_SYNC
          </Link>
          <Link to="/avatar" style={{
            padding: '12px 30px',
            border: '1px solid #35c9ff',
            color: '#35c9ff',
            textDecoration: 'none',
            borderRadius: '4px'
          }}>
            DECRYPT_NEW_ID
          </Link>
        </div>
      </section>

      <div style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div style={{ border: '1px solid rgba(136, 146, 176, 0.3)', padding: '20px', borderRadius: '4px' }}>
          <h3 style={{ color: '#35c9ff' }}>&gt; SYSTEM_STATUS</h3>
          <p style={{ color: '#64ffda', fontSize: '0.9rem' }}>STATUS: STABLE</p>
          <p style={{ color: '#8892b0', fontSize: '0.9rem' }}>UPTIME: {Math.floor(performance.now() / 1000)}s</p>
        </div>
        <div style={{ border: '1px solid rgba(136, 146, 176, 0.3)', padding: '20px', borderRadius: '4px' }}>
          <h3 style={{ color: '#35c9ff' }}>&gt; LAST_KNOWN_SYNC</h3>
          <p style={{ color: '#8892b0', fontSize: '0.9rem' }}>
            RECORD: <span style={{ color: '#64ffda' }}>{localStorage.getItem('survivor_high_score') || '0'} XP</span>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { top: -10%; }
          100% { top: 110%; }
        }
        .cursor {
          animation: blink 1s infinite;
          color: #64ffda;
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default Home;
