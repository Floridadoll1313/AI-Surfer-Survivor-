import { BrowserRouter, Routes, Route } from "react-router-dom";

// HOME
import Home from "./pages/Home";

// FOUNDERS
import FoundersPage from "./pages/FoundersPage";
import SailorAnn from "./pages/founders/SailorAnn";
import StormyGray from "./pages/founders/StormyGray";
import SkyMarlin from "./pages/founders/SkyMarlin";
import ShannonFounder from "./pages/founders/ShannonFounder";

// LORE
import ShannonLore from "./pages/lore/ShannonLore";

// OPTIONAL: You can create a NotFound.tsx later if you want
// For now, we will route unknown pages back to Home

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* HOME ROUTE */}
        <Route path="/" element={<Home />} />

        {/* FOUNDERS */}
        <Route path="/founders" element={<FoundersPage />} />
        <Route path="/founders/sailor-ann" element={<SailorAnn />} />
        <Route path="/founders/stormy-gray" element={<StormyGray />} />
        <Route path="/founders/sky-marlin" element={<SkyMarlin />} />
        <Route path="/founders/shannon" element={<ShannonFounder />} />

        {/* LORE */}
        <Route path="/lore/shannon" element={<ShannonLore />} />

        {/* CATCH‑ALL — sends unknown routes to Home */}
        <Route path="*" element={<Home />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;