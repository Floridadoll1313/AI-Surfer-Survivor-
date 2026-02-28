
`jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import FoundersPage from "./pages/FoundersPage";
import ShannonLore from "./pages/ShannonLore";
import NotFound from "./pages/NotFound";

import SailorAnn from "./pages/founders/SailorAnn";
import StormyGray from "./pages/founders/StormyGray";
import SkyMarlin from "./pages/founders/SkyMarlin";
import ShannonFounder from "./pages/founders/ShannonFounder";
import PricingPage from "./pages/PricingPage";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/founders" element={<FoundersPage />} />
        <Route path="/founders/sailor-ann" element={<SailorAnn />} />
        <Route path="/founders/stormy-gray" element={<StormyGray />} />
        <Route path="/founders/sky-marlin" element={<SkyMarlin />} />
        <Route path="/founders/shannon" element={<ShannonFounder />} />

        <Route path="/lore" element={<ShannonLore />} />

        <Route path="/pricing" element={<PricingPage />} />

        <Route path="*" element={<NotFound />} /> <Route path="/tools" element={<ThirdPartyTools />} />

      </Routes>
    </Router>
  );
}

export default AppRoutes;
`
