import Navigation from "./Navigation";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navigation />
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}
