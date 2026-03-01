import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// Global Systems (only include these if the files actually exist)
import { ProgressionProvider } from "./source/hooks/ProgressionContext";
import { LoreProvider } from "./source/hooks/LoreContext";
import { AnimationProvider } from "./source/hooks/AnimationContext";

// App Root
import App from "./App.jsx";

// Global Styles (Tailwind + your custom CSS)
import "./index.css";

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
