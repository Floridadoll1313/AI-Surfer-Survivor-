import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
// Import other pages as you create them

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Add more routes here, like /island or /challenges */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
