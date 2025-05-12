import React from 'react';
import './AppointmentCard.css';

const AppointmentCard = ({ appointment, userType, onAccept, onReject }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="appointment-card">
      <div className="appointment-header">
        <h3>Appointment</h3>
        <span className={`status status-${appointment.status}`}>
          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
        </span>
      </div>
      
      <div className="appointment-details">
        {userType === 'doctor' && (
          <p><strong>Patient:</strong> {appointment.patient.name}</p>
        )}
        
        {userType === 'patient' && (
          <p><strong>Doctor:</strong> {appointment.doctor.name}</p>
        )}
        
        <p><strong>Date:</strong> {formatDate(appointment.date)}</p>
        <p><strong>Time:</strong> {appointment.time}</p>
        <p><strong>Reason:</strong> {appointment.reason}</p>
      </div>
      
      {userType === 'doctor' && appointment.status === 'pending' && (
        <div className="appointment-actions">
          <button 
            className="btn btn-accept" 
            onClick={() => onAccept(appointment._id)}
          >
            Accept
          </button>
          <button 
            className="btn btn-reject" 
            onClick={() => onReject(appointment._id)}
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
};

export default AppointmentCard;