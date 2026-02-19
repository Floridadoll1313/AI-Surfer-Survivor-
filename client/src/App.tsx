import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import NavBar from './components/NavBar';
import SiteFooter from './components/SiteFooter';

// Page Imports (Make sure these files exist in your /pages folder!)
import Home from './pages/Home';
import MapPage from './pages/MapPage';
import FloundersPage from './pages/FloundersPage'; // Your current filename
// import Challenges from './pages/Challenges'; 
// import Gear from './pages/Gear';

function App() {
  return (
    <Router>
      <div className="app-container">
        <NavBar />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/founders" element={<FloundersPage />} />
            {/* Add more routes here as you create the pages */}
            <Route path="*" element={<div>[ SIGNAL_LOST: Page Not Found ]</div>} />
          </Routes>
        </Layout>
        <SiteFooter />
      </div>
    </Router>
  );
}

export default App;
