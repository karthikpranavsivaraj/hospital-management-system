import React from 'react';
import './DoctorCard.css';

const DoctorCard = ({ doctor, onBookAppointment }) => {
  return (
    <div className="doctor-card">
      <div className="doctor-info">
        <h3>{doctor.name}</h3>
        <p className="specialization">{doctor.specialization}</p>
        <p><strong>Experience:</strong> {doctor.experience} years</p>
        <p><strong>Available on:</strong> {doctor.availability.join(', ')}</p>
      </div>
      <button 
        className="btn btn-book" 
        onClick={() => onBookAppointment(doctor)}
      >
        Book Appointment
      </button>
    </div>
  );
};

export default DoctorCard;