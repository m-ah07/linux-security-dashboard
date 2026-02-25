import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import SystemDashboard from './components/SystemDashboard';
import PortList from './components/PortList';
import VulnerabilityScanner from './components/VulnerabilityScanner';
import LogsView from './components/LogsView';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';

function NavBar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login', { replace: true });
    window.location.reload();
  };

  if (!token) return null;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">Linux Security Dashboard</Link>
        <div className="d-flex align-items-center">
          <Link to="/" className="btn btn-outline-light me-2">Dashboard</Link>
          <Link to="/ports" className="btn btn-outline-light me-2">Open Ports</Link>
          <Link to="/vulnerabilities" className="btn btn-outline-light me-2">Scanner</Link>
          <Link to="/logs" className="btn btn-outline-light me-2">Logs</Link>
          <span className="text-light me-2">{user}</span>
          <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><SystemDashboard /></ProtectedRoute>} />
          <Route path="/ports" element={<ProtectedRoute><PortList /></ProtectedRoute>} />
          <Route path="/vulnerabilities" element={<ProtectedRoute><VulnerabilityScanner /></ProtectedRoute>} />
          <Route path="/logs" element={<ProtectedRoute><LogsView /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
