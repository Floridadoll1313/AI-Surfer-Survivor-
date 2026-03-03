import React from "react";

export default function Island({ title, children }) {
  return (
    <div className="island-container">
      <h2 className="island-title">{title}</h2>
      <div className="island-content">
        {children}
      </div>
    </div>
  );
}
