import { Link, Outlet } from 'react-router-dom';

const Layout = () => (
  <div className="min-h-screen bg-[#030303] text-white">
    <nav className="sticky top-0 z-50 px-6 py-4 bg-black/90 border-b border-[var(--neon-blue)] neon-glow-blue flex items-center justify-between overflow-x-auto">
      <div className="text-[var(--neon-blue)] font-black text-xl tracking-tighter mr-8 whitespace-nowrap">AI SURFER</div>
      <div className="flex gap-6 uppercase text-[10px] font-bold tracking-widest">
        {['Home', 'Island', 'Challenges', 'Progression', 'Community', 'Members', 'Blog', 'Free', 'Founders', 'Campfire', 'Arena', 'Dashboard', 'Ceremony', 'Gear'].map(page => (
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
