import React, { createContext, useContext, useState } from "react";

const LoreContext = createContext();

export function LoreProvider({ children }) {
  const [currentChapter, setCurrentChapter] = useState("The Awakening");

  const [entries, setEntries] = useState([
    {
      title: "Arrival",
      text: "You step onto the island as the tide pulls back, revealing the first path."
    },
    {
      title: "The Signal",
      text: "A distant hum vibrates through the air — the AI pulse calling you forward."
    }
  ]);

  const addEntry = (title, text) => {
    setEntries(prev => [...prev, { title, text }]);
  };

  return (
    <LoreContext.Provider
      value={{
        currentChapter,
        setCurrentChapter,
        entries,
        addEntry
      }}
    >
      {children}
    </LoreContext.Provider>
  );
}

export function useLore() {
  return useContext(LoreContext);
}
