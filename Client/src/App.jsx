import { Routes, Route } from "react-router-dom";

// Layout
import Layout from "./components/Layout";

// Pages
import Home from "./pages/Home";
import Island from "./pages/Island";
import Challenges from "./pages/Challenges";
import Progression from "./pages/Progression";
import Community from "./pages/Community";
import Members from "./pages/Members";
import Blog from "./pages/Blog";
import Free from "./pages/Free";
import Founders from "./pages/Founders";
import Campfire from "./pages/Campfire";
import Arena from "./pages/Arena";
import Dashboard from "./pages/Dashboard";
import Ceremony from "./pages/Ceremony";
import ThirdPartyTools from "./pages/ThirdPartyTools";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/island" element={<Island />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/progression" element={<Progression />} />
        <Route path="/community" element={<Community />} />
        <Route path="/members" element={<Members />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/free" element={<Free />} />
        <Route path="/founders" element={<Founders />} />
        <Route path="/campfire" element={<Campfire />} />
        <Route path="/arena" element={<Arena />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ceremony" element={<Ceremony />} />
        <Route path="/tools" element={<ThirdPartyTools />} />
      </Routes>
    </Layout>
  );
}
