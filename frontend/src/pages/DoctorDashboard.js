import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getDoctorAppointments, acceptAppointment, rejectAppointment, getDoctorProfile } from '../services/api';
import AppointmentCard from '../components/AppointmentCard';
import AppointmentCalendar from '../components/AppointmentCalendar';
import ProfileCard from '../components/ProfileCard';
import DoctorReviews from '../components/DoctorReviews';
import './Dashboard.css';

const DoctorDashboard = ({ user }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'accepted', 'rejected'
  const [activeTab, setActiveTab] = useState('appointments'); // 'appointments', 'calendar', 'profile', 'reviews'
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateAppointments, setDateAppointments] = useState([]);
  const [doctorProfile, setDoctorProfile] = useState(user);
  const [reviews, setReviews] = useState([
    {
      doctorId: user._id,
      rating: 5,
      comment: "Dr. " + user.name + " is an excellent doctor. Very knowledgeable and caring.",
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
      patientName: "John Smith"
    },
    {
      doctorId: user._id,
      rating: 4,
      comment: "Great experience overall. Would recommend to others.",
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
      patientName: "Emily Johnson"
    }
  ]);

useEffect(() => {
  const loadData = async () => {
    try {
      const appointmentsData = await getDoctorAppointments(user._id);
      setAppointments(appointmentsData);

      const profileData = await getDoctorProfile(user._id);

      const enhancedProfile = {
        ...profileData,
        phone: profileData.phone || "+1 (555) 123-4567",
        address: profileData.address || "123 Medical Center Dr, Healthcare City",
        education: profileData.education || "MD from Medical University",
        bio:
          profileData.bio ||
          `Experienced healthcare professional dedicated to providing exceptional patient care. Specializing in ${profileData.specialization} with ${profileData.experience} years of experience.`,
      };

      setDoctorProfile(enhancedProfile);
    } catch (error) {
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  loadData();
}, [user._id]);

////////////////////////////////////////////////////////////////////////////////////////////      
      setDoctorProfile(enhancedProfile);
    } catch (error) {
      toast.error('Failed to fetch doctor profile');
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

  const handleDateSelect = (date, appointments) => {
    setSelectedDate(date);
    setDateAppointments(appointments);
  };

  const handleUpdateProfile = (updatedProfile) => {
    // In a real app, this would make an API call to update the profile
    setDoctorProfile({
      ...doctorProfile,
      ...updatedProfile
    });
    toast.success('Profile updated successfully');
  };

  const handleAddReview = (newReview) => {
    // In a real app, this would make an API call to add the review
    setReviews([...reviews, newReview]);
    toast.success('Review added successfully');
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
      
      <div className="dashboard-tabs">
        <button 
          className={`tab-btn ${activeTab === 'appointments' ? 'active' : ''}`}
          onClick={() => setActiveTab('appointments')}
        >
          Appointments
        </button>
        <button 
          className={`tab-btn ${activeTab === 'calendar' ? 'active' : ''}`}
          onClick={() => setActiveTab('calendar')}
        >
          Calendar
        </button>
        <button 
          className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          My Profile
        </button>
        <button 
          className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          Reviews
        </button>
      </div>
      
      {activeTab === 'appointments' && (
        <>
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
        </>
      )}
      
      {activeTab === 'calendar' && (
        <div className="dashboard-content">
          <h3>Appointment Calendar</h3>
          
          <div className="calendar-container">
            <div className="calendar-wrapper">
              <AppointmentCalendar 
                appointments={appointments}
                onDateSelect={handleDateSelect}
              />
            </div>
            
            <div className="date-appointments">
              {selectedDate ? (
                <>
                  <h4>
                    Appointments for {selectedDate.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </h4>
                  
                  {dateAppointments.length === 0 ? (
                    <p>No appointments scheduled for this date.</p>
                  ) : (
                    <div className="date-appointments-list">
                      {dateAppointments.map(appointment => (
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
                </>
              ) : (
                <p>Select a date to view appointments.</p>
              )}
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'profile' && (
        <div className="dashboard-content">
          <h3>My Profile</h3>
          
          <ProfileCard 
            user={doctorProfile}
            userType="doctor"
            onUpdateProfile={handleUpdateProfile}
          />
        </div>
      )}
      
      {activeTab === 'reviews' && (
        <div className="dashboard-content">
          <h3>Patient Reviews</h3>
          
          <DoctorReviews 
            doctorId={user._id}
            reviews={reviews}
            onAddReview={handleAddReview}
          />
          
          <div className="reviews-info">
            <h4>About Reviews</h4>
            <p>
              Patient reviews help build trust and credibility with potential patients.
              Respond to reviews professionally to show your commitment to patient care.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;
