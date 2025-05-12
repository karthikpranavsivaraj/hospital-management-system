import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import DoctorDashboard from './pages/DoctorDashboard';
import PatientDashboard from './pages/PatientDashboard';
import NotFound from './pages/NotFound';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <Router>
      <div className="App">
        <Header user={user} onLogout={handleLogout} />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/login" 
              element={user ? (
                user.userType === 'doctor' ? 
                <Navigate to="/doctor/dashboard" /> : 
                <Navigate to="/patient/dashboard" />
              ) : (
                <Login setUser={setUser} />
              )} 
            />
            <Route 
              path="/register" 
              element={user ? (
                user.userType === 'doctor' ? 
                <Navigate to="/doctor/dashboard" /> : 
                <Navigate to="/patient/dashboard" />
              ) : (
                <Register setUser={setUser} />
              )} 
            />
            <Route 
              path="/doctor/dashboard" 
              element={user && user.userType === 'doctor' ? 
                <DoctorDashboard user={user} /> : 
                <Navigate to="/login" />
              } 
            />
            <Route 
              path="/patient/dashboard" 
              element={user && user.userType === 'patient' ? 
                <PatientDashboard user={user} /> : 
                <Navigate to="/login" />
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer position="bottom-right" />
      </div>
    </Router>
  );
}

export default App;