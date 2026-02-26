import React, { createContext, useContext, useState } from "react";

const ProgressionContext = createContext();

export function ProgressionProvider({ children }) {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [unlockedSectors, setUnlockedSectors] = useState([1]);

  const gainXP = amount => {
    const newXP = xp + amount;
    setXp(newXP);

    if (newXP >= level * 100) {
      setLevel(level + 1);
    }
  };

  const unlockSector = sector => {
    if (!unlockedSectors.includes(sector)) {
      setUnlockedSectors([...unlockedSectors, sector]);
    }
  };

  const isUnlocked = unlockedSectors.length > 0;

  return (
    <ProgressionContext.Provider
      value={{
        xp,
        level,
        unlockedSectors,
        gainXP,
        unlockSector,
        isUnlocked
      }}
    >
      {children}
    </ProgressionContext.Provider>
  );
}

export function useProgression() {
  return useContext(ProgressionContext);
}
