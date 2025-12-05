import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import PredictionForm from './components/PredictionForm';
import History from './pages/History';
import Analytics from './pages/Analytics';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<PredictionForm />} />
          <Route path="/history" element={<History />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
