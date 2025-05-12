import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Hospital Management System</h1>
          <p>Streamlining healthcare appointments for doctors and patients</p>
          <div className="hero-buttons">
            <Link to="/login" className="btn btn-primary">Login</Link>
            <Link to="/register" className="btn btn-secondary">Register</Link>
          </div>
        </div>
      </section>

      <section className="features">
        <h2>Our Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3>Easy Appointment Booking</h3>
            <p>Book appointments with doctors quickly and easily</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👨‍⚕️</div>
            <h3>Doctor Management</h3>
            <p>Doctors can manage their appointments efficiently</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Real-time Updates</h3>
            <p>Get real-time updates on appointment status</p>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Register an Account</h3>
            <p>Create an account as a doctor or patient</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Book or Manage Appointments</h3>
            <p>Patients can book appointments, doctors can manage them</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Get Healthcare Services</h3>
            <p>Receive quality healthcare services on your scheduled time</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;