import React, { createContext, useContext, useState } from "react";

const AnimationContext = createContext();

export function AnimationProvider({ children }) {
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  const toggleAnimations = () => {
    setAnimationsEnabled(prev => !prev);
  };

  return (
    <AnimationContext.Provider
      value={{
        animationsEnabled,
        toggleAnimations
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimation() {
  return useContext(AnimationContext);
}
