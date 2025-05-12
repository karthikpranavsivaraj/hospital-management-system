import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getDoctorAppointments, acceptAppointment, rejectAppointment } from '../services/api';
import AppointmentCard from '../components/AppointmentCard';
import './Dashboard.css';

const DoctorDashboard = ({ user }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'accepted', 'rejected'

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const data = await getDoctorAppointments(user._id);
      setAppointments(data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch appointments');
      setLoading(false);
    }
  };

  const handleAcceptAppointment = async (appointmentId) => {
    try {
      await acceptAppointment(user._id, appointmentId);
      toast.success('Appointment accepted successfully');
      
      // Update the appointment in the state
      setAppointments(appointments.map(appointment => 
        appointment._id === appointmentId 
          ? { ...appointment, status: 'accepted' } 
          : appointment
      ));
    } catch (error) {
      toast.error('Failed to accept appointment');
    }
  };

  const handleRejectAppointment = async (appointmentId) => {
    try {
      await rejectAppointment(user._id, appointmentId);
      toast.success('Appointment rejected successfully');
      
      // Update the appointment in the state
      setAppointments(appointments.map(appointment => 
        appointment._id === appointmentId 
          ? { ...appointment, status: 'rejected' } 
          : appointment
      ));
    } catch (error) {
      toast.error('Failed to reject appointment');
    }
  };

  // Filter appointments based on status
  const filteredAppointments = filter === 'all' 
    ? appointments 
    : appointments.filter(appointment => appointment.status === filter);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Doctor Dashboard</h2>
        <p>Welcome, Dr. {user.name}</p>
      </div>
      
      <div className="dashboard-filters">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
          onClick={() => setFilter('pending')}
        >
          Pending
        </button>
        <button 
          className={`filter-btn ${filter === 'accepted' ? 'active' : ''}`}
          onClick={() => setFilter('accepted')}
        >
          Accepted
        </button>
        <button 
          className={`filter-btn ${filter === 'rejected' ? 'active' : ''}`}
          onClick={() => setFilter('rejected')}
        >
          Rejected
        </button>
      </div>
      
      <div className="dashboard-content">
        <h3>Your Appointments</h3>
        
        {loading ? (
          <p>Loading appointments...</p>
        ) : filteredAppointments.length === 0 ? (
          <p>No {filter !== 'all' ? filter : ''} appointments found.</p>
        ) : (
          <div className="appointments-grid">
            {filteredAppointments.map(appointment => (
              <AppointmentCard 
                key={appointment._id}
                appointment={appointment}
                userType="doctor"
                onAccept={handleAcceptAppointment}
                onReject={handleRejectAppointment}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;