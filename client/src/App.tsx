import { BrowserRouter, Routes, Route } from "react-router-dom";

import FoundersPage from "./pages/FoundersPage";
import SailorAnn from "./pages/founders/SailorAnn";
import StormyGray from "./pages/founders/StormyGray";
import SkyMarlin from "./pages/founders/SkyMarlin";
import ShannonFounder from "./pages/founders/ShannonFounder";
import ShannonLore from "./pages/lore/ShannonLore";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/founders" element={<FoundersPage />} />
        <Route path="/founders/sailor-ann" element={<SailorAnn />} />
        <Route path="/founders/stormy-gray" element={<StormyGray />} />
        <Route path="/founders/sky-marlin" element={<SkyMarlin />} />
        <Route path="/founders/shannon" element={<ShannonFounder />} />
        <Route path="/lore/shannon" element={<ShannonLore />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
