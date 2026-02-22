import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* PAGES */
import Home from "./pages/Home";
import FoundersPage from "./pages/FoundersPage";
import ShannonLore from "./pages/ShannonLore";
import NotFound from "./pages/NotFound";

/* FOUNDER PROFILES */
import SailorAnn from "./pages/founders/SailorAnn";
import StormyGray from "./pages/founders/StormyGray";
import SkyMarlin from "./pages/founders/SkyMarlin";
import ShannonFounder from "./pages/founders/ShannonFounder";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* FOUNDERS HUB */}
        <Route path="/founders" element={<FoundersPage />} />

        {/* INDIVIDUAL FOUNDERS */}
        <Route path="/founders/sailor-ann" element={<SailorAnn />} />
        <Route path="/founders/stormy-gray" element={<StormyGray />} />
        <Route path="/founders/sky-marlin" element={<SkyMarlin />} />
        <Route path="/founders/shannon" element={<ShannonFounder />} />

        {/* LORE */}
        <Route path="/lore" element={<ShannonLore />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;