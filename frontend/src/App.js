import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
<<<<<<< HEAD
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';

=======
>>>>>>> parent of 5d8a774 (Fixed Navbar.jsx casing issue)

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
    path="/profile" 
    element={
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    } 
  />
        </Routes>
      </Router>
      <ToastContainer position="top-right" />
    </>
  );
}

export default App;