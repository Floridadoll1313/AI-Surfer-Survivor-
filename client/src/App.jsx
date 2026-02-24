import React from "react";
import { Routes, Route } from "react-router-dom";

// Layout + Global UI
import Layout from "./components/Layout";
import LoadingWrapper from "./components/LoadingWrapper";

// Pages / Sectors
import Home from "./pages/Home";
import Sector1 from "./pages/Sector1";
import Sector2 from "./pages/Sector2";
import Sector3 from "./pages/Sector3";
import Dashboard from "./pages/Dashboard";
import Lore from "./pages/Lore";

// Systems
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollReveal from "./components/ScrollReveal";

export default function App() {
  return (
    <LoadingWrapper>
      <ScrollReveal>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/lore" element={<Lore />} />

            {/* Sector Routes */}
            <Route path="/sector/1" element={<Sector1 />} />
            <Route path="/sector/2" element={<Sector2 />} />
            <Route path="/sector/3" element={<Sector3 />} />

            {/* Protected Dashboard */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Catch-all */}
            <Route path="*" element={<Home />} />
          </Routes>
        </Layout>
      </ScrollReveal>
    </LoadingWrapper>
  );
}