import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Members from './pages/Members';
import SurvivorWorld from './pages/SurvivorWorld';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/members" element={<Members />} />
        
        {/* The Game is now Protected */}
        <Route 
          path="/survivor" 
          element={
            <ProtectedRoute>
              <SurvivorWorld />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}
