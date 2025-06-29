// src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; // we'll style this too

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };
//dssd
  return (
    <nav className="navbar">
      <h2>💰 Finance Tracker</h2>
      <div className="nav-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/analytics">Analytics</Link>
        <Link to="/profile">Profile</Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;