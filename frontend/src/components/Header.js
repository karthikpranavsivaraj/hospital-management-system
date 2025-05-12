import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ user, onLogout }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        <Link to="/" className="logo">
          <div className="logo-container">
            <span className="logo-text">KEC</span>
            <span className="logo-icon">+</span>
            <span className="logo-hospitals">Hospitals</span>
          </div>
        </Link>
        
        <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        
        <nav className={`nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <ul className="nav-links">
            <li>
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            </li>
            <li>
              <Link to="/services" onClick={() => setMobileMenuOpen(false)}>Services</Link>
            </li>
            <li>
              <Link to="/doctors" onClick={() => setMobileMenuOpen(false)}>Doctors</Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link 
                    to={user.userType === 'doctor' ? '/doctor/dashboard' : '/patient/dashboard'}
                    onClick={() => setMobileMenuOpen(false)}
                    className="dashboard-link"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <div className="user-profile">
                    <span className="user-name">{user.name}</span>
                    <button onClick={onLogout} className="btn-logout">
                      Logout
                    </button>
                  </div>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="btn-login">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="btn-register">
                    Register
                  </Link>
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