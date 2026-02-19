import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

// Temporary "Placeholder" pages so the app doesn't crash
const Home = () => <div><h1>Home Page</h1><p>Welcome to the tide.</p></div>;
const Challenges = () => <div><h1>Challenges</h1><p>Trials loading...</p></div>;

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="challenges" element={<Challenges />} />
        </Route>
      </Routes>
    </Router>
  );
}
