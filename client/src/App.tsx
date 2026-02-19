import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AvatarProvider } from './context/AvatarContext';
import AvatarSelector from './pages/AvatarSelector';
// Import your other components/pages here

function App() {
  return (
    <AvatarProvider>
      <Router>
        <div className="min-h-screen bg-[#0a192f]">
          {/* If you have a Header, place it here and it will now update automatically */}
          <Routes>
            <Route path="/avatar" element={<AvatarSelector />} />
            {/* Add your other routes here */}
          </Routes>
        </div>
      </Router>
    </AvatarProvider>
  );
}

export default App;
