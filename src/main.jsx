import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./Routes.jsx";   // <-- This is the critical line

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
);