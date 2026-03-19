import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Free from './pages/free.jsx';
import Members from './pages/members.jsx';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard-pink" element={<Free />} />
        <Route path="/dashboard-blue" element={<Members />} />
      </Routes>
    </Router>
  );
}