`tsx
import React from "react";
import { Link } from "react-router-dom";

export const FoundersNav: React.FC = () => {
  return (
    <nav className="founders-nav">
      <Link to="/founders/sailor-ann">Sailor Ann</Link>
      <Link to="/founders/stormy-gray">Stormy Gray</Link>
      <Link to="/founders/sky-marlin">Sky Marlin</Link>
      <Link to="/founders/shannon">Shannon</Link>
    </nav>
  );
};
`

