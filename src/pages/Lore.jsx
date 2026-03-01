import React from "react";
import { useLore } from "../source/hooks/LoreContext";

export default function Lore() {
  const { currentChapter, entries } = useLore();

  return (
    <div className="lore-page" data-reveal>
      <h1>Lore Archive</h1>
      <h2>Current Chapter: {currentChapter}</h2>

      <div className="lore-entries">
        {entries.map((entry, i) => (
          <article key={i} className="lore-entry">
            <h3>{entry.title}</h3>
            <p>{entry.text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
