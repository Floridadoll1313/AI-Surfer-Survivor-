import React from "react";

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Global Header */}
      <header className="p-4 border-b border-white/10">
        <h1 className="text-xl font-bold tracking-wide">Ocean Tide Drop</h1>
      </header>

      {/* Page Content */}
      <main className="flex-1 p-6">
        {children}
      </main>

      {/* Global Footer */}
      <footer className="p-4 border-t border-white/10 text-center text-sm opacity-70">
        © {new Date().getFullYear()} Ocean Tide Drop
      </footer>
    </div>
  );
}