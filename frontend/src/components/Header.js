import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ user, onLogout }) => {
  return (
    <header className="header">
      <div className="container header-container">
        <Link to="/" className="logo">
          <h1>Hospital Management System</h1>
        </Link>
        <nav className="nav">
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link to={user.userType === 'doctor' ? '/doctor/dashboard' : '/patient/dashboard'}>
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button onClick={onLogout} className="btn-logout">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;