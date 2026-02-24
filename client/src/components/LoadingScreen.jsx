import React from "react";

export default function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div>
        <h2 style={{ textAlign: "center", marginBottom: "0.5rem" }}>
          Initializing Realm...
        </h2>
        <p style={{ textAlign: "center", opacity: 0.7 }}>
          The tide is preparing your path.
        </p>
      </div>
    </div>
  );
}