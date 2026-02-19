import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import NavBar from './components/NavBar';
import SiteFooter from './components/SiteFooter';

// Page Imports
import Home from './pages/Home';
import MapPage from './pages/MapPage';
import FloundersPage from './pages/FloundersPage'; 

// KEEP THESE COMMENTED OUT until you create the files in the /pages folder!
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
            
            {/* This handles any links that don't have pages yet */}
            <Route path="*" element={<div style={{color: '#00ff00', padding: '20px'}}>[ SIGNAL_LOST: Component Under Construction ]</div>} />
          </Routes>
        </Layout>
        <SiteFooter />
      </div>
    </Router>
  );
}

export default App;
