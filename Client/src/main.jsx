import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// Global Systems
import App from "./App";
import { ProgressionProvider } from "./source/hooks/ProgressionContext";
import { LoreProvider } from "./source/hooks/LoreContext";
import { AnimationProvider } from "./source/hooks/AnimationContext";

// Global Styles
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AnimationProvider>
        <ProgressionProvider>
          <LoreProvider>
            <App />
          </LoreProvider>
        </ProgressionProvider>
      </AnimationProvider>
    </BrowserRouter>
  </React.StrictMode>
);
