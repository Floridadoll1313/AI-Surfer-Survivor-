import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Challenges from './pages/Challenges';
import SurvivorWorld from './pages/SurvivorWorld';
import LessonList from './pages/LessonList';
import LessonPage from './pages/LessonPage';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/world" element={<SurvivorWorld />} />
          <Route path="/lessons" element={<LessonList />} />
          <Route path="/lessons/:id" element={<LessonPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}
