import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getAllDoctors, getPatientAppointments, bookAppointment, getPatientProfile } from '../services/api';
import DoctorCard from '../components/DoctorCard';
import AppointmentCard from '../components/AppointmentCard';
import AppointmentCalendar from '../components/AppointmentCalendar';
import ProfileCard from '../components/ProfileCard';
import DoctorReviews from '../components/DoctorReviews';
import './Dashboard.css';

const PatientDashboard = ({ user }) => {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('doctors'); // 'doctors', 'appointments', 'calendar', 'profile'
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDoctorReviews, setSelectedDoctorReviews] = useState([]);
  const [patientProfile, setPatientProfile] = useState(user);
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateAppointments, setDateAppointments] = useState([]);
  
  // State for booking appointment
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    reason: ''
  });

  useEffect(() => {
    fetchDoctors();
    fetchAppointments();
    fetchPatientProfile();
  }, []);

  const fetchDoctors = async () => {
    try {
      const data = await getAllDoctors();
      
      // Add mock reviews for demo purposes
      const enhancedDoctors = data.map(doctor => ({
        ...doctor,
        reviews: generateMockReviews(doctor._id)
      }));
      
      setDoctors(enhancedDoctors);
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

  const fetchPatientProfile = async () => {
    try {
      const data = await getPatientProfile(user._id);
      
      // Merge with additional mock data for demo purposes
      const enhancedProfile = {
        ...data,
        phone: data.phone || "+1 (555) 987-6543",
        address: data.address || "456 Patient Ave, Healthcare City",
        bloodGroup: data.bloodGroup || "O+",
        allergies: data.allergies || "None"
      };
      
      setPatientProfile(enhancedProfile);
    } catch (error) {
      toast.error('Failed to fetch patient profile');
    }
  };

  // Generate mock reviews for demo purposes
  const generateMockReviews = (doctorId) => {
    const reviewCount = Math.floor(Math.random() * 5) + 1; // 1-5 reviews
    const reviews = [];
    
    const reviewTexts = [
      "Great doctor! Very knowledgeable and caring.",
      "Excellent bedside manner. Took time to explain everything.",
      "Very professional and thorough. Highly recommend.",
      "Good experience overall. Wait time was a bit long though.",
      "Helped me understand my condition better. Thank you!",
      "Very attentive and answered all my questions patiently.",
      "The doctor was okay, but the staff was amazing.",
      "Extremely competent and compassionate. Will definitely return."
    ];
    
    const patientNames = [
      "John Smith", "Emily Johnson", "Michael Brown", "Sarah Davis",
      "David Wilson", "Jennifer Martinez", "Robert Taylor", "Lisa Anderson"
    ];
    
    for (let i = 0; i < reviewCount; i++) {
      const daysAgo = Math.floor(Math.random() * 60) + 1; // 1-60 days ago
      const rating = Math.floor(Math.random() * 3) + 3; // 3-5 stars (mostly positive)
      
      reviews.push({
        doctorId,
        rating,
        comment: reviewTexts[Math.floor(Math.random() * reviewTexts.length)],
        date: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString(),
        patientName: patientNames[Math.floor(Math.random() * patientNames.length)]
      });
    }
    
    return reviews;
  };

  const handleViewDoctorDetails = (doctor) => {
    setSelectedDoctor(doctor);
    setSelectedDoctorReviews(doctor.reviews || []);
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
      setSelectedDoctor(null);
      setActiveTab('appointments');
      
      toast.success('Appointment booked successfully');
    } catch (error) {
      toast.error('Failed to book appointment');
    }
  };

  const handleDateSelect = (date, appointments) => {
    setSelectedDate(date);
    setDateAppointments(appointments);
  };

  const handleUpdateProfile = (updatedProfile) => {
    // In a real app, this would make an API call to update the profile
    setPatientProfile({
      ...patientProfile,
      ...updatedProfile
    });
    toast.success('Profile updated successfully');
  };

  const handleAddReview = (newReview) => {
    // In a real app, this would make an API call to add the review
    setSelectedDoctorReviews([...selectedDoctorReviews, newReview]);
    
    // Update the doctor's reviews in the doctors list
    setDoctors(doctors.map(doctor => 
      doctor._id === selectedDoctor._id 
        ? { ...doctor, reviews: [...(doctor.reviews || []), newReview] } 
        : doctor
    ));
    
    toast.success('Review added successfully');
  };

  const handleBackToList = () => {
    setSelectedDoctor(null);
    setShowBookingForm(false);
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
          onClick={() => {
            setActiveTab('doctors');
            setSelectedDoctor(null);
            setShowBookingForm(false);
          }}
        >
          Find Doctors
        </button>
        <button 
          className={`tab-btn ${activeTab === 'appointments' ? 'active' : ''}`}
          onClick={() => setActiveTab('appointments')}
        >
          My Appointments
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
      </div>
      
      <div className="dashboard-content">
        {activeTab === 'doctors' && (
          <>
            {selectedDoctor && !showBookingForm ? (
              <div className="doctor-details">
                <button className="back-btn" onClick={handleBackToList}>
                  &larr; Back to Doctors List
                </button>
                
                <div className="doctor-profile-header">
                  <div className="doctor-avatar">
                    <div className="avatar-placeholder">
                      {selectedDoctor.name.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  
                  <div className="doctor-info">
                    <h3>Dr. {selectedDoctor.name}</h3>
                    <p className="doctor-specialization">{selectedDoctor.specialization}</p>
                    <p className="doctor-experience">{selectedDoctor.experience} years of experience</p>
                    <p className="doctor-availability">
                      Available on: {selectedDoctor.availability?.join(', ') || 'Weekdays'}
                    </p>
                    
                    <button 
                      className="book-appointment-btn"
                      onClick={() => setShowBookingForm(true)}
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>
                
                <div className="doctor-details-tabs">
                  <DoctorReviews 
                    doctorId={selectedDoctor._id}
                    reviews={selectedDoctorReviews}
                    onAddReview={handleAddReview}
                  />
                </div>
              </div>
            ) : showBookingForm ? (
              <div className="booking-form-container">
                <button className="back-btn" onClick={() => setShowBookingForm(false)}>
                  &larr; Back to Doctor Details
                </button>
                
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
                      placeholder="Please describe your symptoms or reason for consultation..."
                    ></textarea>
                  </div>
                  
                  <div className="form-buttons">
                    <button type="submit" className="btn-primary">
                      Confirm Appointment
                    </button>
                    <button 
                      type="button" 
                      className="btn-secondary"
                      onClick={() => setShowBookingForm(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <>
                <h3>Find a Doctor</h3>
                
                <div className="search-filters">
                  <input 
                    type="text" 
                    placeholder="Search by name or specialization..." 
                    className="search-input"
                  />
                  <select className="filter-select">
                    <option value="">All Specializations</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Pediatrics">Pediatrics</option>
                  </select>
                </div>
                
                <div className="doctors-grid">
                  {doctors.length === 0 ? (
                    <p>No doctors available at the moment.</p>
                  ) : (
                    doctors.map(doctor => (
                      <div key={doctor._id} className="doctor-card-container">
                        <DoctorCard 
                          doctor={doctor}
                          onBookAppointment={handleBookAppointment}
                        />
                        <button 
                          className="view-details-btn"
                          onClick={() => handleViewDoctorDetails(doctor)}
                        >
                          View Details & Reviews
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </>
            )}
          </>
        )}
        
        {activeTab === 'appointments' && (
          <>
            <h3>Your Appointments</h3>
            
            <div className="appointment-filters">
              <button className="filter-btn active">All</button>
              <button className="filter-btn">Upcoming</button>
              <button className="filter-btn">Past</button>
              <button className="filter-btn">Pending</button>
            </div>
            
            {loading ? (
              <p>Loading appointments...</p>
            ) : appointments.length === 0 ? (
              <div className="no-appointments">
                <div className="no-data-icon">📅</div>
                <p>You have no appointments. Book one with a doctor!</p>
                <button 
                  className="btn-primary"
                  onClick={() => {
                    setActiveTab('doctors');
                    setSelectedDoctor(null);
                    setShowBookingForm(false);
                  }}
                >
                  Find a Doctor
                </button>
              </div>
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
        
        {activeTab === 'calendar' && (
          <>
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
                            userType="patient"
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
          </>
        )}
        
        {activeTab === 'profile' && (
          <>
            <h3>My Profile</h3>
            
            <ProfileCard 
              user={patientProfile}
              userType="patient"
              onUpdateProfile={handleUpdateProfile}
            />
            
            <div className="medical-records">
              <h3>Medical Records</h3>
              <p className="records-info">
                Your medical records are securely stored and accessible only to you and your authorized healthcare providers.
              </p>
              <button className="btn-primary">View Medical Records</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;