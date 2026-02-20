export default function App() {
  return (
    <div className="min-h-screen bg-[#0a192f] text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-cyan-300 drop-shadow-lg">
        Ocean Tide Drop — AI Surfer Survivor
      </h1>
      <p className="text-lg mt-4 text-yellow-300">
        Sector 7 Access Portal
      </p>

      <nav className="mt-8 flex gap-6 text-cyan-200 text-xl">
        <a href="/home.html" className="hover:text-yellow-300">Home</a>
        <a href="/island.html" className="hover:text-yellow-300">Island</a>
        <a href="/challenges.html" className="hover:text-yellow-300">Challenges</a>
        <a href="/progression.html" className="hover:text-yellow-300">Progression</a>
        <a href="/members.html" className="hover:text-yellow-300">Members</a>
        <a href="/founders.html" className="hover:text-yellow-300">Founders</a>
      </nav>
    </div>
  );
}
