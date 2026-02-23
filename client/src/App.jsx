import React, { useState } from "react";

const PAGES = {
  home: "Welcome to Ocean Tide Drop | AI Surfer Survivor.",
  island: "Island Hub: your sanctuary, storms and all.",
  challenges: "Challenges: tides to ride, not to fear.",
  progression: "Progression: track your journey through the sectors.",
  members: "Members: the ones who walk the realm with you.",
  founders: "Founders: you, the dogs, and the mythic core.",
};

export default function App() {
  const [page, setPage] = useState("home");

  return (
    <div className="app">
      <header className="header">
        <h1>OTD AI SURFER | Sector 7</h1>
        <p className="subtitle">A realm for survivors, surfers, and stormwalkers.</p>
      </header>

      <nav className="nav">
        <button onClick={() => setPage("home")}>Home</button>
        <button onClick={() => setPage("island")}>Island</button>
        <button onClick={() => setPage("challenges")}>Challenges</button>
        <button onClick={() => setPage("progression")}>Progression</button>
        <button onClick={() => setPage("members")}>Members</button>
        <button onClick={() => setPage("founders")}>Founders</button>
      </nav>

      <main className="content">
        <h2>{page.charAt(0).toUpperCase() + page.slice(1)}</h2>
        <p>{PAGES[page]}</p>
      </main>

      <footer className="footer">
        <span>Ocean Tide Drop • AI Surfer Survivor • Sector 7</span>
      </footer>
    </div>
  );
}