import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx'; // Add your main sales page here
import Free from './pages/free.jsx';       // The Pink Surfboard ($17 App Access)
import Members from './pages/members.jsx'; // The Blue Surfboard (Major Consoles)

function App() {
  return (
    <Router>
      <Routes>
        {/* The "Realm" Entrance */}
        <Route path="/" element={<LandingPage />} />

        {/* These paths MUST match the sources in vercel.json exactly */}
        <Route path="/dashboard-pink" element={<Free />} />
        <Route path="/dashboard-blue" element={<Members />} />
        
        {/* Fallback for broken links */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
