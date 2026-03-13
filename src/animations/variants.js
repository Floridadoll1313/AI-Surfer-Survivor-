export const animation2 = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  },
  item: {
    hidden: { y: 30, opacity: 0, filter: "brightness(0)" },
    show: { 
      y: 0, 
      opacity: 1, 
      filter: "brightness(1)",
      transition: { type: "spring", stiffness: 80, damping: 12 } 
    }
  },
  glow: {
    initial: { boxShadow: "0 0 0px var(--neon-blue)" },
    animate: {
      boxShadow: ["0 0 5px var(--neon-blue)", "0 0 20px var(--neon-blue)", "0 0 5px var(--neon-blue)"],
      transition: { duration: 2, repeat: Infinity }
    }
  },
  float: {
    animate: {
      y: [0, -15, 0],
      rotate: [0, 1, -1, 0],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
    }
  }
};
--------------------------------------------------------------------------------
2. Shared Layout & Navigation Architecture
2.1 Central Router (src/App.jsx)
The application is indexed through a centralized router configuration.
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Island from './pages/Island';
import Challenges from './pages/Challenges';
import Progression from './pages/Progression';
import Community from './pages/Community';
import Members from './pages/Members';
import Blog from './pages/Blog';
import Free from './pages/Free';
import Founders from './pages/Founders';
import Campfire from './pages/Campfire';
import Arena from './pages/Arena';
import Dashboard from './pages/Dashboard';
import Ceremony from './pages/Ceremony';
import ThirdPartyTools from './pages/ThirdPartyTools';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="island" element={<Island />} />
          <Route path="challenges" element={<Challenges />} />
          <Route path="progression" element={<Progression />} />
          <Route path="community" element={<Community />} />
          <Route path="members" element={<Members />} />
          <Route path="blog" element={<Blog />} />
          <Route path="free" element={<Free />} />
          <Route path="founders" element={<Founders />} />
          <Route path="campfire" element={<Campfire />} />
          <Route path="arena" element={<Arena />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="ceremony" element={<Ceremony />} />
          <Route path="tools" element={<ThirdPartyTools />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
2.2 Global Wrapper (src/components/Layout.jsx)
A high-fidelity navigation bar with neon borders and liquid responsiveness.
import { Link, Outlet } from 'react-router-dom';

const Layout = () => (
  <div className="min-h-screen bg-[#030303] text-white">
    <nav className="sticky top-0 z-50 px-6 py-4 bg-black/90 border-b border-[var(--neon-blue)] neon-glow-blue flex items-center justify-between overflow-x-auto">
      <div className="text-[var(--neon-blue)] font-black text-xl tracking-tighter mr-8 whitespace-nowrap">AI SURFER</div>
      <div className="flex gap-6 uppercase text-[10px] font-bold tracking-widest">
        {['Home', 'Island', 'Challenges', 'Progression', 'Community', 'Members', 'Blog', 'Free', 'Founders', 'Campfire', 'Arena', 'Dashboard', 'Ceremony', 'Tools'].map(page => (
          <Link key={page} to={page === 'Home' ? '/' : `/${page.toLowerCase()}`} className="hover:text-[var(--neon-pink)] transition-colors whitespace-nowrap">
            {page}
          </Link>
        ))}
      </div>
    </nav>
    <main className="p-8"><Outlet /></main>
  </div>
);
export default Layout;
--------------------------------------------------------------------------------
3. Core Pages (Pages 1-5)
3.1 Home Page (src/pages/Home.jsx)
import { motion } from 'framer-motion';
import { animation2 } from '../animations/variants';

const Home = () => (
  <motion.div variants={animation2.container} initial="hidden" animate="show" className="flex flex-col items-center justify-center min-h-[70vh]">
    <motion.h1 variants={animation2.item} className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[var(--neon-blue)] to-white leading-none text-center">
      SURVIVE THE <br/>NEURAL WAVE
    </motion.h1>
    <motion.p variants={animation2.item} className="mt-6 text-[var(--neon-blue)] tracking-[0.3em] uppercase font-light">
      The Ultimate AI Competitive Protocol
    </motion.p>
    <motion.button 
      variants={animation2.float} animate="animate"
      className="mt-12 px-12 py-4 border-2 border-[var(--neon-pink)] text-[var(--neon-pink)] font-black hover:bg-[var(--neon-pink)] hover:text-black transition-all neon-glow-pink"
    >
      ENTER THE GRID
    </motion.button>
  </motion.div>
);
export default Home;
3.2 Island Page (src/pages/Island.jsx)
const Island = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {['Alpha Sector', 'Neural Reef', 'Logic Lagoon'].map(zone => (
      <div key={zone} className="h-64 border-2 border-[var(--neon-green)] p-6 bg-[var(--neon-green)]/5 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-2 text-[var(--neon-green)] opacity-20">ZONE_04</div>
        <h3 className="text-[var(--neon-green)] font-black text-2xl uppercase mt-auto">{zone}</h3>
        <p className="text-xs text-[var(--neon-green)]/80 mt-2">SAFE ZONE: ACTIVE</p>
        <div className="mt-4 h-1 w-full bg-[var(--neon-green)]/20 overflow-hidden">
          <div className="h-full bg-[var(--neon-green)] w-1/3 neon-glow-green" />
        </div>
      </div>
    ))}
  </div>
);
export default Island;
3.3 Challenges Page (src/pages/Challenges.jsx)
import { motion } from 'framer-motion';
import { animation2 } from '../animations/variants';

const Challenges = () => (
  <motion.div variants={animation2.container} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {[1,2,3,4,5,6,7,8].map(i => (
      <motion.div 
        key={i} variants={animation2.item}
        whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,0,229,0.1)' }}
        className="p-8 border border-[var(--neon-pink)] text-[var(--neon-pink)] cursor-pointer transition-all"
      >
        <div className="text-4xl font-black mb-4 opacity-50">0{i}</div>
        <h4 className="font-bold tracking-tighter">SYNTAX OVERLOAD</h4>
        <p className="text-[10px] mt-2 opacity-80 uppercase">Difficulty: Ultra</p>
      </motion.div>
    ))}
  </motion.div>
);
export default Challenges;
3.4 Progression Page (src/pages/Progression.jsx)
import { motion } from 'framer-motion';
import { animation2 } from '../animations/variants';

const Progression = () => (
  <motion.div variants={animation2.container} initial="hidden" animate="show" className="max-w-4xl mx-auto space-y-12">
    <h2 className="text-[var(--neon-blue)] text-4xl font-black italic">USER_PROGRESSION_LOG</h2>
    {['LLM Mastery', 'Prompt Engineering', 'Vector Memory', 'Creative Flow'].map((skill, index) => (
      <motion.div key={skill} variants={animation2.item} className="space-y-2">
        <div className="flex justify-between text-[var(--neon-blue)] text-xs font-bold uppercase tracking-widest">
          <span>{skill}</span>
          <span>{40 + (index * 15)}%</span>
        </div>
        <div className="h-4 bg-white/5 border border-[var(--neon-blue)]/30 rounded-full overflow-hidden p-1">
          <motion.div 
            initial={{ width: 0 }} 
            animate={{ width: `${40 + (index * 15)}%` }} 
            transition={{ duration: 1.5, delay: index * 0.2, ease: "circOut" }}
            className="h-full bg-[var(--neon-blue)] neon-glow-blue rounded-full" 
          />
        </div>
      </motion.div>
    ))}
  </motion.div>
);
export default Progression;
3.5 Community Page (src/pages/Community.jsx)
const Community = () => (
  <div className="max-w-3xl mx-auto space-y-6">
    {[1, 2, 3].map(i => (
      <div key={i} className="p-6 border border-[var(--neon-blue)]/50 bg-black flex gap-4">
        <div className="w-12 h-12 bg-[var(--neon-blue)]/20 border border-[var(--neon-blue)]" />
        <div>
          <h5 className="text-[var(--neon-blue)] font-bold text-sm">SURFER_ID_0x{i}F</h5>
          <p className="text-white/70 mt-1">Found a shortcut through the Logic Lagoon using recursive prompt chains.</p>
        </div>
      </div>
    ))}
  </div>
);
export default Community;
--------------------------------------------------------------------------------
4. Member & Resource Pages (Pages 6-9)
4.1 Members Page (src/pages/Members.jsx)
const Members = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
    {[...Array(10)].map((_, i) => (
      <div key={i} className="p-4 border border-[var(--neon-blue)]/30 group hover:border-[var(--neon-pink)] transition-colors">
        <div className="aspect-square bg-gradient-to-br from-black to-zinc-900 mb-4 border border-white/10" />
        <p className="text-[var(--neon-blue)] font-bold text-[10px] group-hover:text-[var(--neon-pink)]">ARCHITECT_{i+100}</p>
        <p className="text-[8px] opacity-50 text-white uppercase">Specialist: Neural Core</p>
      </div>
    ))}
  </div>
);
export default Members;
4.2 Blog Page (src/pages/Blog.jsx)
const Blog = () => (
  <div className="max-w-2xl mx-auto space-y-16">
    {[1, 2].map(i => (
      <article key={i} className="border-l-2 border-[var(--neon-pink)] pl-8 py-4">
        <span className="text-[var(--neon-pink)] text-[10px] font-bold uppercase tracking-widest">Article_00{i} // 2024</span>
        <h2 className="text-3xl font-black text-white mt-2 leading-tight">DECODING THE FUTURE OF AGENTIC WORKFLOWS</h2>
        <p className="text-white/60 mt-4 leading-relaxed italic">"The transition from static prompts to dynamic agents is the single largest wave we will ever ride..."</p>
        <button className="mt-6 text-[var(--neon-pink)] text-xs font-black hover:underline tracking-tighter uppercase">READ_DEEP_DIVE &gt;</button>
      </article>
    ))}
  </div>
);
export default Blog;
4.3 Free Page (src/pages/Free.jsx)
import { motion } from 'framer-motion';
import { animation2 } from '../animations/variants';

const Free = () => (
  <div className="flex flex-col items-center gap-8 py-20">
    <h2 className="text-5xl font-black text-[var(--neon-green)] uppercase">The Vault</h2>
    <motion.button 
      variants={animation2.glow} initial="initial" animate="animate"
      style={{ '--neon-blue': 'var(--neon-green)' }}
      className="px-12 py-6 bg-[var(--neon-green)] text-black font-black text-xl hover:scale-105 transition-transform"
    >
      DOWNLOAD STARTER KIT
    </motion.button>
    <p className="text-[var(--neon-green)]/50 font-mono text-xs">FREEWARE_VER_1.0.4 // NO_LICENSE_REQUIRED</p>
  </div>
);
export default Free;
4.4 Founders Page (src/pages/Founders.jsx)
const Founders = () => (
  <div className="py-20 flex flex-col items-center">
    <h1 className="text-7xl font-black text-[var(--neon-gold)] tracking-tighter neon-glow-gold">HALL OF ARCHITECTS</h1>
    <div className="grid grid-cols-2 mt-20 gap-20">
      {['THE VISIONARY', 'THE CODER'].map(role => (
        <div key={role} className="flex flex-col items-center">
          <div className="w-48 h-64 border-4 border-[var(--neon-gold)] p-2">
            <div className="w-full h-full bg-zinc-900" />
          </div>
          <p className="mt-6 text-[var(--neon-gold)] font-bold tracking-widest uppercase">{role}</p>
        </div>
      ))}
    </div>
  </div>
);
export default Founders;
--------------------------------------------------------------------------------
5. Interactive & Competitive Zones (Pages 10-14)
5.1 Campfire Page (src/pages/Campfire.jsx)
const Campfire = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
    <div className="relative">
      <div className="w-32 h-32 rounded-full bg-[var(--neon-pink)]/20 blur-3xl absolute -top-10" />
      <div className="text-[var(--neon-pink)] animate-[flicker_0.3s_infinite] text-6xl">🔥</div>
    </div>
    <h2 className="text-[var(--neon-pink)] font-black text-4xl mt-8">SURVIVOR CAMPFIRE</h2>
    <p className="max-w-md mt-4 text-white/70 italic">Rest here. Share your prompt strings. The machine can't hear us over the crackle of the neon.</p>
    <div className="mt-12 grid grid-cols-1 gap-4 w-full max-w-lg">
      <div className="p-4 bg-zinc-900 border-l-4 border-[var(--neon-pink)] text-left font-mono text-xs">
        "I found that using few-shot prompting in the Arena triples your success rate."
      </div>
    </div>
  </div>
);
export default Campfire;
5.2 Arena Page (src/pages/Arena.jsx)
import { motion } from 'framer-motion';

const Arena = () => (
  <div className="relative h-[80vh] border-4 border-[var(--neon-pink)] overflow-hidden flex items-center justify-center">
    <motion.div 
      animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
      transition={{ repeat: Infinity, duration: 0.1 }}
      className="absolute inset-0 bg-[var(--neon-pink)]/10"
    />
    <div className="z-10 text-center">
      <h1 className="text-9xl font-black text-[var(--neon-pink)] italic tracking-tighter neon-glow-pink">LIVE COMBAT</h1>
      <div className="flex justify-center gap-10 mt-8">
        <div className="text-right">
          <p className="text-[var(--neon-blue)] font-bold uppercase">Surfer_X</p>
          <p className="text-5xl font-black text-white">420</p>
        </div>
        <div className="text-4xl font-black text-white self-center">VS</div>
        <div className="text-left">
          <p className="text-[var(--neon-green)] font-bold uppercase">Bot_Prime</p>
          <p className="text-5xl font-black text-white">385</p>
        </div>
      </div>
    </div>
  </div>
);
export default Arena;
5.3 Dashboard Page (src/pages/Dashboard.jsx)
const Dashboard = () => (
  <div className="grid grid-cols-12 gap-6">
    <div className="col-span-12 lg:col-span-8 p-6 border border-[var(--neon-blue)] bg-black h-96">
      <h3 className="text-[var(--neon-blue)] font-bold mb-4">SYSTEM_OUTPUT_MAIN</h3>
      <div className="font-mono text-[10px] text-[var(--neon-blue)]/60 leading-tight space-y-1">
        {Array(20).fill("> CALIBRATING_NEURAL_NODES... [OK]").map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
    </div>
    <div className="col-span-12 lg:col-span-4 space-y-6">
      <div className="p-6 border border-[var(--neon-green)] bg-black">
        <h4 className="text-[var(--neon-green)] font-bold uppercase text-xs">Connectivity</h4>
        <p className="text-3xl font-black text-white">99.8%</p>
      </div>
      <div className="p-6 border border-[var(--neon-pink)] bg-black">
        <h4 className="text-[var(--neon-pink)] font-bold uppercase text-xs">Threat Level</h4>
        <p className="text-3xl font-black text-white">MINIMAL</p>
      </div>
    </div>
  </div>
);
export default Dashboard;
5.4 Ceremony Page (src/pages/Ceremony.jsx)
const Ceremony = () => (
  <div className="relative h-[70vh] flex flex-col items-center justify-center">
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(10)].map((_, i) => (
        <div 
          key={i} 
          className="absolute w-2 h-full bg-[var(--neon-blue)] animate-[light-beam_2s_infinite]"
          style={{ left: `${i * 10}%`, animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
    <div className="p-12 border-8 border-[var(--neon-gold)] text-center bg-black z-10">
      <h1 className="text-6xl font-black text-[var(--neon-gold)] mb-4">VICTORY ASCENSION</h1>
      <p className="text-[var(--neon-gold)] tracking-[0.5em] uppercase font-bold">Protocol Complete</p>
    </div>
  </div>
);
export default Ceremony;
5.5 ThirdPartyTools Page (src/pages/ThirdPartyTools.jsx)
import { motion } from 'framer-motion';
import { animation2 } from '../animations/variants';

const ThirdPartyTools = () => (
  <motion.div variants={animation2.container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {['OpenAI', 'Anthropic', 'LangChain', 'Pinecone', 'HuggingFace', 'Stability'].map(tool => (
      <motion.div 
        key={tool} variants={animation2.item}
        whileHover={{ x: 10, borderColor: 'var(--neon-blue)' }}
        className="p-8 border border-white/10 bg-zinc-900 flex items-center justify-between group cursor-pointer"
      >
        <span className="font-black text-xl group-hover:text-[var(--neon-blue)] transition-colors">{tool}</span>
        <div className="w-2 h-2 rounded-full bg-[var(--neon-blue)] neon-glow-blue" />
      </motion.div>
    ))}
  </motion.div>
);
export default ThirdPartyTools;
--------------------------------------------------------------------------------
6. Implementation Instructions for the Developer
6.1 File Structure Mapping
The project must be structured precisely to maintain architectural integrity:
/src/main.jsx - Application entry.
/src/App.jsx - Routing configuration.
/src/index.css - Global design tokens.
/src/animations/variants.js - Animation 2 definitions.
/src/components/Layout.jsx - Global navigation wrapper.
/src/pages/ - Directory for all 14 functional components.
6.2 Animation 2 Integration Guide
To maintain high-fidelity motion, follow these active steps:
Initialization: Wrap the top-level element of every page in <motion.div variants={animation2.container} initial="hidden" animate="show">.
Trigger Sequence: Apply variants={animation2.item} to any text or card block to enable the spring-staggered entry.
High-Fidelity Smoothing: Use the animation2.float or animation2.glow variants on interactive buttons to provide a "living" UI feedback loop.
6.3 Styling Enforcement
Strict Policy: No colors outside the specified palette are allowed for UI elements.
--neon-blue (#00f2ff) for data, primary navigation, and connectivity.
--neon-pink (#ff00e5) for combat, intensity, and CTA buttons.
--neon-green (#00ff66) for safe zones, progression, and success states.
--neon-gold (#ffae00) for high-tier achievements and founders.
NotebookLM can be inaccurate; please double check its responses.
