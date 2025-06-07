import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faInfoCircle, faUser, faSignInAlt, faSignOutAlt, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navbar() {
  const { currentUser, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{
      backgroundColor: '#ffffff',
      padding: '15px 20px',
      marginBottom: '20px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <FontAwesomeIcon icon={faHome} className="me-2" style={{ color: '#5e72e4' }} />
          <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>AI Learning Platform</span>
        </Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link">About</Link>
            </li>
            
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link to="/profile" className="nav-link d-flex align-items-center">
                    <FontAwesomeIcon icon={faUser} className="me-2" />
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/schedule" className="nav-link d-flex align-items-center">
                    <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
                    Schedule
                  </Link>
                </li>
                <li className="nav-item">
                  <button 
                    onClick={handleLogout} 
                    className="nav-link btn btn-link"
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className="me-1" /> Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">Login</Link>
                </li>
                <li className="nav-item">
                  <Link to="/signup" className="nav-link btn btn-primary text-white px-3 py-1 ms-2">Sign Up</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
