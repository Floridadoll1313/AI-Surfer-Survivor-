import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import SurvivorWorld from "./pages/SurvivorWorld";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/world" element={<SurvivorWorld />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);