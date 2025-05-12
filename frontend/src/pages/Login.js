import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginDoctor, loginPatient } from '../services/api';
import './AuthForms.css';

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'patient' // Default to patient
  });
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      let userData;
      
      if (formData.userType === 'doctor') {
        userData = await loginDoctor({ email: formData.email, password: formData.password });
      } else {
        userData = await loginPatient({ email: formData.email, password: formData.password });
      }
      
      // Save user to localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Update user state
      setUser(userData);
      
      // Show success message
      toast.success(`Welcome back, ${userData.name}!`);
      
      // Redirect to dashboard
      navigate(userData.userType === 'doctor' ? '/doctor/dashboard' : '/patient/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>I am a:</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="userType"
                  value="patient"
                  checked={formData.userType === 'patient'}
                  onChange={handleChange}
                />
                Patient
              </label>
              <label>
                <input
                  type="radio"
                  name="userType"
                  value="doctor"
                  checked={formData.userType === 'doctor'}
                  onChange={handleChange}
                />
                Doctor
              </label>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary btn-block" 
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="auth-footer">
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;