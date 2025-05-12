import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getAllDoctors, getPatientAppointments, bookAppointment } from '../services/api';
import DoctorCard from '../components/DoctorCard';
import AppointmentCard from '../components/AppointmentCard';
import './Dashboard.css';

const PatientDashboard = ({ user }) => {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('doctors'); // 'doctors' or 'appointments'
  
  // State for booking appointment
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    reason: ''
  });

  useEffect(() => {
    fetchDoctors();
    fetchAppointments();
  }, []);

  const fetchDoctors = async () => {
    try {
      const data = await getAllDoctors();
      setDoctors(data);
    } catch (error) {
      toast.error('Failed to fetch doctors');
    }
  };

  const fetchAppointments = async () => {
    try {
      const data = await getPatientAppointments(user._id);
      setAppointments(data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch appointments');
      setLoading(false);
    }
  };

  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setShowBookingForm(true);
  };

  const handleBookingChange = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value
    });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const appointmentData = {
        doctorId: selectedDoctor._id,
        patientId: user._id,
        date: bookingData.date,
        time: bookingData.time,
        reason: bookingData.reason
      };
      
      const newAppointment = await bookAppointment(appointmentData);
      
      // Add doctor info to the new appointment for display
      newAppointment.doctor = {
        name: selectedDoctor.name,
        specialization: selectedDoctor.specialization
      };
      
      // Update appointments state
      setAppointments([...appointments, newAppointment]);
      
      // Reset form
      setBookingData({
        date: '',
        time: '',
        reason: ''
      });
      
      setShowBookingForm(false);
      setActiveTab('appointments');
      
      toast.success('Appointment booked successfully');
    } catch (error) {
      toast.error('Failed to book appointment');
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Patient Dashboard</h2>
        <p>Welcome, {user.name}</p>
      </div>
      
      <div className="dashboard-tabs">
        <button 
          className={`tab-btn ${activeTab === 'doctors' ? 'active' : ''}`}
          onClick={() => setActiveTab('doctors')}
        >
          Find Doctors
        </button>
        <button 
          className={`tab-btn ${activeTab === 'appointments' ? 'active' : ''}`}
          onClick={() => setActiveTab('appointments')}
        >
          My Appointments
        </button>
      </div>
      
      <div className="dashboard-content">
        {activeTab === 'doctors' ? (
          <>
            <h3>Available Doctors</h3>
            
            {showBookingForm ? (
              <div className="booking-form-container">
                <h3>Book Appointment with Dr. {selectedDoctor.name}</h3>
                <p>Specialization: {selectedDoctor.specialization}</p>
                
                <form onSubmit={handleBookingSubmit} className="booking-form">
                  <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={bookingData.date}
                      onChange={handleBookingChange}
                      required
                      className="form-control"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="time">Time</label>
                    <input
                      type="time"
                      id="time"
                      name="time"
                      value={bookingData.time}
                      onChange={handleBookingChange}
                      required
                      className="form-control"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="reason">Reason for Visit</label>
                    <textarea
                      id="reason"
                      name="reason"
                      value={bookingData.reason}
                      onChange={handleBookingChange}
                      required
                      className="form-control"
                      rows="3"
                    ></textarea>
                  </div>
                  
                  <div className="form-buttons">
                    <button type="submit" className="btn btn-primary">
                      Book Appointment
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-secondary"
                      onClick={() => setShowBookingForm(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="doctors-grid">
                {doctors.length === 0 ? (
                  <p>No doctors available at the moment.</p>
                ) : (
                  doctors.map(doctor => (
                    <DoctorCard 
                      key={doctor._id}
                      doctor={doctor}
                      onBookAppointment={handleBookAppointment}
                    />
                  ))
                )}
              </div>
            )}
          </>
        ) : (
          <>
            <h3>Your Appointments</h3>
            
            {loading ? (
              <p>Loading appointments...</p>
            ) : appointments.length === 0 ? (
              <p>You have no appointments. Book one with a doctor!</p>
            ) : (
              <div className="appointments-grid">
                {appointments.map(appointment => (
                  <AppointmentCard 
                    key={appointment._id}
                    appointment={appointment}
                    userType="patient"
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;