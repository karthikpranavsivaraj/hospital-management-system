import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-content">
            <div className="footer-about">
              <div className="footer-logo">
                <span className="logo-text">KEC</span>
                <span className="logo-icon">+</span>
                <span className="logo-hospitals">Hospitals</span>
              </div>
              <p className="footer-description">
                Providing exceptional healthcare services with compassion and excellence since 2010.
                Our mission is to improve the health and wellbeing of the communities we serve.
              </p>
              <div className="social-links">
                <a href="#" className="social-link">
                  <i className="fab fa-facebook-f">FB</i>
                </a>
                <a href="#" className="social-link">
                  <i className="fab fa-twitter">TW</i>
                </a>
                <a href="#" className="social-link">
                  <i className="fab fa-instagram">IG</i>
                </a>
                <a href="#" className="social-link">
                  <i className="fab fa-linkedin-in">LI</i>
                </a>
              </div>
            </div>
            
            <div className="footer-links">
              <h3>Quick Links</h3>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/services">Services</Link></li>
                <li><Link to="/doctors">Doctors</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
              </ul>
            </div>
            
            <div className="footer-links">
              <h3>Our Services</h3>
              <ul>
                <li><Link to="/services/cardiology">Cardiology</Link></li>
                <li><Link to="/services/neurology">Neurology</Link></li>
                <li><Link to="/services/orthopedics">Orthopedics</Link></li>
                <li><Link to="/services/pediatrics">Pediatrics</Link></li>
                <li><Link to="/services/all">All Services</Link></li>
              </ul>
            </div>
            
            <div className="footer-contact">
              <h3>Contact Us</h3>
              <p>
                <i className="fas fa-map-marker-alt">📍</i>
                123 Healthcare Blvd, Medical District, City
              </p>
              <p>
                <i className="fas fa-phone">📞</i>
                +1 (555) 123-4567
              </p>
              <p>
                <i className="fas fa-envelope">✉️</i>
                info@kechospitals.com
              </p>
              <p>
                <i className="fas fa-clock">🕒</i>
                Mon-Fri: 8:00 AM - 8:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} KEC Hospitals. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-of-service">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;