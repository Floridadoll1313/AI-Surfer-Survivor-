import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// --- Global Layout + Animation Shell ---
import AppLayout from "./components/layout/AppLayout";
import PageTransition from "./components/animations/PageTransition";

// --- Sector Pages ---
import Home from "./pages/Home";
import SectorOne from "./pages/sectors/SectorOne";
import SectorTwo from "./pages/sectors/SectorTwo";
import SectorThree from "./pages/sectors/SectorThree";

// --- Lore + Ceremony Pages ---
import LoreIndex from "./pages/lore/LoreIndex";
import SkinUnlockCeremony from "./pages/lore/SkinUnlockCeremony";

// --- System Pages ---
import NotFound from "./pages/system/NotFound";

export default function AppRoutes() {
  return (
    <Router>
      <AppLayout>
        <AnimatePresence mode="wait">
          <Routes>

            {/* --- Home / Landing --- */}
            <Route
              path="/"
              element={
                <PageTransition>
                  <Home />
                </PageTransition>
              }
            />

            {/* --- Sector Progression --- */}
            <Route
              path="/sector-1"
              element={
                <PageTransition>
                  <SectorOne />
                </PageTransition>
              }
            />

            <Route
              path="/sector-2"
              element={
                <PageTransition>
                  <SectorTwo />
                </PageTransition>
              }
            />

            <Route
              path="/sector-3"
              element={
                <PageTransition>
                  <SectorThree />
                </PageTransition>
              }
            />

            {/* --- Lore Engine --- */}
            <Route
              path="/lore"
              element={
                <PageTransition>
                  <LoreIndex />
                </PageTransition>
              }
            />

            {/* --- Ceremonies --- */}
            <Route
              path="/ceremony/skin-unlock"
              element={
                <PageTransition>
                  <SkinUnlockCeremony />
                </PageTransition>
              }
            />

            {/* --- 404 Fallback --- */}
            <Route
              path="*"
              element={
                <PageTransition>
                  <NotFound />
                </PageTransition>
              }
            />

          </Routes>
        </AnimatePresence>
      </AppLayout>
    </Router>
  );
}