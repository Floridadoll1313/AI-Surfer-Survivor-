import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { animation2 } from '../animations/variants';

const Home = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      variants={animation2.container} 
      initial="hidden" 
      animate="show" 
      className="flex flex-col items-center justify-center min-h-[70vh] text-center"
    >
      {/* 🌊 Hero Title */}
      <motion.h1 
        variants={animation2.item} 
        className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[var(--neon-blue)] to-white leading-none px-4"
      >
        SURVIVE THE <br/>NEURAL WAVE
      </motion.h1>
      
      <motion.p 
        variants={animation2.item} 
        className="mt-6 text-[var(--neon-blue)] tracking-[0.3em] uppercase font-light px-4"
      >
        The Ultimate AI Competitive Protocol
      </motion.p>

      {/* 🛡️ Dual Entry Buttons (Pink vs Blue) */}
      <div className="mt-12 flex flex-col md:flex-row gap-6">
        
        {/* PINK TIER - Entry */}
        <motion.button 
          variants={animation2.item}
          onClick={() => navigate('/free')}
          className="px-12 py-4 border-2 border-[var(--neon-pink)] text-[var(--neon-pink)] font-black hover:bg-[var(--neon-pink)] hover:text-black transition-all neon-glow-pink uppercase tracking-widest"
        >
          Enter Pink Grid
        </motion.button>

        {/* BLUE TIER - Pro */}
        <motion.button 
          variants={animation2.float} 
          animate="animate"
          onClick={() => navigate('/founders')}
          className="px-12 py-4 border-2 border-[var(--neon-blue)] text-[var(--neon-blue)] font-black hover:bg-[var(--neon-blue)] hover:text-black transition-all neon-glow-blue uppercase tracking-widest"
        >
          Forge Ahead Blue
        </motion.button>

      </div>

      <motion.p 
        variants={animation2.item}
        className="mt-8 text-xs text-gray-500 uppercase tracking-tighter opacity-50"
      >
        Launch Protocol 04.14.26 // System Online
      </motion.p>
    </motion.div>
  );
};

export default Home;
