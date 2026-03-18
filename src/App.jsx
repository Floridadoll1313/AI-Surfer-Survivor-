import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Free from './free.jsx';       // Pink Surfboard
import Members from './members.jsx'; // Blue Surfboard

function App() {
  return (
    <Router>
      <Routes>
        {/* React handles the display when the URL matches */}
        <Route path="/dashboard-pink" element={<Free />} />
        <Route path="/dashboard-blue" element={<Members />} />
      </Routes>
    </Router>
  );
}

export default App;
