import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Free from './pages/free.jsx';       // Pink Surfboard
import Members from './pages/members.jsx'; // Blue Surfboard

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard-pink" element={<Free />} />
        <Route path="/dashboard-blue" element={<Members />} />
      </Routes>
    </Router>
  );
}

export default App;
