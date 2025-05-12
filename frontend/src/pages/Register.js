import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerDoctor, registerPatient } from '../services/api';
import './AuthForms.css';

const Register = ({ setUser }) => {
  const [userType, setUserType] = useState('patient');
  const [loading, setLoading] = useState(false);
  
  const [patientData, setPatientData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    gender: 'Male',
    medicalHistory: ''
  });
  
  const [doctorData, setDoctorData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    specialization: '',
    experience: ''
  });
  
  const navigate = useNavigate();

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handlePatientChange = (e) => {
    setPatientData({
      ...patientData,
      [e.target.name]: e.target.value
    });
  };

  const handleDoctorChange = (e) => {
    setDoctorData({
      ...doctorData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (userType === 'patient') {
        // Validate patient data
        if (patientData.password !== patientData.confirmPassword) {
          toast.error('Passwords do not match');
          setLoading(false);
          return;
        }
        
        // Register patient
        const userData = await registerPatient({
          name: patientData.name,
          email: patientData.email,
          password: patientData.password,
          age: parseInt(patientData.age),
          gender: patientData.gender,
          medicalHistory: patientData.medicalHistory
        });
        
        // Save user to localStorage
        userData.userType = 'patient';
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Update user state
        setUser(userData);
        
        // Show success message
        toast.success('Registration successful!');
        
        // Redirect to dashboard
        navigate('/patient/dashboard');
      } else {
        // Validate doctor data
        if (doctorData.password !== doctorData.confirmPassword) {
          toast.error('Passwords do not match');
          setLoading(false);
          return;
        }
        
        // Register doctor
        const userData = await registerDoctor({
          name: doctorData.name,
          email: doctorData.email,
          password: doctorData.password,
          specialization: doctorData.specialization,
          experience: parseInt(doctorData.experience)
        });
        
        // Save user to localStorage
        userData.userType = 'doctor';
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Update user state
        setUser(userData);
        
        // Show success message
        toast.success('Registration successful!');
        
        // Redirect to dashboard
        navigate('/doctor/dashboard');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Register</h2>
        <div className="form-group">
          <label>I want to register as a:</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="userType"
                value="patient"
                checked={userType === 'patient'}
                onChange={handleUserTypeChange}
              />
              Patient
            </label>
            <label>
              <input
                type="radio"
                name="userType"
                value="doctor"
                checked={userType === 'doctor'}
                onChange={handleUserTypeChange}
              />
              Doctor
            </label>
          </div>
        </div>
        
        {userType === 'patient' ? (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={patientData.name}
                onChange={handlePatientChange}
                required
                className="form-control"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={patientData.email}
                onChange={handlePatientChange}
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
                value={patientData.password}
                onChange={handlePatientChange}
                required
                className="form-control"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={patientData.confirmPassword}
                onChange={handlePatientChange}
                required
                className="form-control"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                id="age"
                name="age"
                value={patientData.age}
                onChange={handlePatientChange}
                required
                min="1"
                max="120"
                className="form-control"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={patientData.gender}
                onChange={handlePatientChange}
                required
                className="form-control"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="medicalHistory">Medical History (Optional)</label>
              <textarea
                id="medicalHistory"
                name="medicalHistory"
                value={patientData.medicalHistory}
                onChange={handlePatientChange}
                className="form-control"
                rows="3"
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary btn-block" 
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register as Patient'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={doctorData.name}
                onChange={handleDoctorChange}
                required
                className="form-control"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={doctorData.email}
                onChange={handleDoctorChange}
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
                value={doctorData.password}
                onChange={handleDoctorChange}
                required
                className="form-control"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={doctorData.confirmPassword}
                onChange={handleDoctorChange}
                required
                className="form-control"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="specialization">Specialization</label>
              <input
                type="text"
                id="specialization"
                name="specialization"
                value={doctorData.specialization}
                onChange={handleDoctorChange}
                required
                className="form-control"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="experience">Years of Experience</label>
              <input
                type="number"
                id="experience"
                name="experience"
                value={doctorData.experience}
                onChange={handleDoctorChange}
                required
                min="0"
                max="70"
                className="form-control"
              />
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary btn-block" 
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register as Doctor'}
            </button>
          </form>
        )}
        
        <div className="auth-footer">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;