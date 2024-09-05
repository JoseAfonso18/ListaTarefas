import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import TaskList from './components/TaskList';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/tasks" element={<ProtectedRoute><TaskList /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
