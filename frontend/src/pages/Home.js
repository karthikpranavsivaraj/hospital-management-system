import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <div className="hospital-logo">
            <span className="logo-text">KEC</span>
            <span className="logo-icon">+</span>
          </div>
          <h1>Welcome to KEC Hospitals</h1>
          <p className="tagline">Excellence in Healthcare, Compassion in Service</p>
          <div className="hero-buttons">
            <Link to="/login" className="btn btn-primary">Login</Link>
            <Link to="/register" className="btn btn-secondary">Register</Link>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>About KEC Hospitals</h2>
              <p>
                Founded in 2010, KEC Hospitals has been at the forefront of providing exceptional healthcare services to our community. 
                With state-of-the-art facilities and a team of highly skilled medical professionals, we are committed to delivering 
                personalized care that meets the unique needs of each patient.
              </p>
              <p>
                Our mission is to improve the health and wellbeing of the communities we serve through excellence in patient care, 
                education, and research. We strive to be the healthcare provider of choice by delivering compassionate, high-quality, 
                and accessible services.
              </p>
            </div>
            <div className="about-image">
              <div className="image-placeholder">
                <div className="hospital-building">
                  <div className="building-facade"></div>
                  <div className="hospital-entrance"></div>
                  <div className="hospital-windows"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="services-section">
        <div className="container">
          <h2>Our Specialized Departments</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">❤️</div>
              <h3>Cardiology</h3>
              <p>Comprehensive heart care with advanced diagnostic and treatment options</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🧠</div>
              <h3>Neurology</h3>
              <p>Expert care for conditions affecting the brain, spine, and nervous system</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🦴</div>
              <h3>Orthopedics</h3>
              <p>Specialized treatment for bone, joint, and muscle conditions</p>
            </div>
            <div className="service-card">
              <div className="service-icon">👶</div>
              <h3>Pediatrics</h3>
              <p>Compassionate care for infants, children, and adolescents</p>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Our Digital Healthcare Platform</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📅</div>
              <h3>Easy Appointment Booking</h3>
              <p>Book appointments with specialists quickly and easily through our online portal</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👨‍⚕️</div>
              <h3>Expert Doctor Network</h3>
              <p>Access to a network of highly qualified specialists across multiple disciplines</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Real-time Updates</h3>
              <p>Get instant notifications about appointment status and medical reports</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Health Records</h3>
              <p>Secure access to your medical history and treatment plans</p>
            </div>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <div className="container">
          <h2>How Our Platform Works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Create Your Account</h3>
              <p>Register as a patient to access our healthcare services</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Find the Right Specialist</h3>
              <p>Browse our network of doctors and read patient reviews</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Book Your Appointment</h3>
              <p>Select a convenient time slot in our interactive calendar</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Receive Quality Care</h3>
              <p>Visit KEC Hospitals for your appointment and follow-up care</p>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <div className="container">
          <h2>What Our Patients Say</h2>
          <div className="testimonials-slider">
            <div className="testimonial">
              <div className="testimonial-content">
                <p>"The doctors at KEC Hospitals are exceptional. The online appointment system made it so easy to schedule my visits."</p>
                <div className="testimonial-author">- Sarah Johnson</div>
                <div className="testimonial-rating">★★★★★</div>
              </div>
            </div>
            <div className="testimonial">
              <div className="testimonial-content">
                <p>"I've been a patient at KEC for years. The care and attention to detail is unmatched. Highly recommend their cardiology department."</p>
                <div className="testimonial-author">- Michael Chen</div>
                <div className="testimonial-rating">★★★★★</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Ready to Experience Excellence in Healthcare?</h2>
          <p>Join thousands of satisfied patients who trust KEC Hospitals for their healthcare needs</p>
          <div className="cta-buttons">
            <Link to="/register" className="btn btn-primary btn-large">Register Now</Link>
            <Link to="/login" className="btn btn-secondary btn-large">Login</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;