import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
<<<<<<< HEAD
import Free from './pages/free.jsx';
import Members from './pages/members.jsx';
=======
import Free from './pages/free.jsx';       // The Pink Surfboard
import Members from './pages/members.jsx'; // The Blue Surfboard
>>>>>>> 064f0f3391a6a75a152fe7a81b96c72465a1f367

function App() {
  return (
    <Router>
      <Routes>
<<<<<<< HEAD
=======
        {/* These paths MUST match the sources in vercel.json exactly */}
>>>>>>> 064f0f3391a6a75a152fe7a81b96c72465a1f367
        <Route path="/dashboard-pink" element={<Free />} />
        <Route path="/dashboard-blue" element={<Members />} />
      </Routes>
    </Router>
  );
<<<<<<< HEAD
}
=======
}

export default App;
>>>>>>> 064f0f3391a6a75a152fe7a81b96c72465a1f367
