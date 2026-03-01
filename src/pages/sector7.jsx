import React, { useEffect, useState } from "react";

export default function LoadingWrapper({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200); // adjust for your cinematic timing

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#00111a] text-cyan-300">
        <div className="animate-pulse text-3xl tracking-widest">
          LOADING...
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

