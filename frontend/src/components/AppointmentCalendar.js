import React, { useState } from 'react';
import './AppointmentCalendar.css';

const AppointmentCalendar = ({ appointments, onDateSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Get current month and year
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  // Get days in month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };
  
  // Format date as YYYY-MM-DD
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  // Check if a date has appointments
  const hasAppointments = (date) => {
    const dateStr = formatDate(date);
    return appointments.some(appointment => {
      const appointmentDate = new Date(appointment.date);
      return formatDate(appointmentDate) === dateStr;
    });
  };
  
  // Get appointments for a specific date
  const getAppointmentsForDate = (date) => {
    const dateStr = formatDate(date);
    return appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.date);
      return formatDate(appointmentDate) === dateStr;
    });
  };
  
  // Handle date click
  const handleDateClick = (date) => {
    setSelectedDate(date);
    onDateSelect(date, getAppointmentsForDate(date));
  };
  
  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  // Navigate to current month
  const goToToday = () => {
    setCurrentMonth(new Date());
    setSelectedDate(new Date());
    onDateSelect(new Date(), getAppointmentsForDate(new Date()));
  };
  
  // Render calendar
  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isToday = new Date().toDateString() === date.toDateString();
      const isSelected = selectedDate.toDateString() === date.toDateString();
      const hasAppts = hasAppointments(date);
      
      days.push(
        <div 
          key={`day-${day}`} 
          className={`calendar-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''} ${hasAppts ? 'has-appointments' : ''}`}
          onClick={() => handleDateClick(date)}
        >
          <span className="day-number">{day}</span>
          {hasAppts && <span className="appointment-indicator"></span>}
        </div>
      );
    }
    
    return days;
  };
  
  return (
    <div className="appointment-calendar">
      <div className="calendar-header">
        <div className="calendar-nav">
          <button className="calendar-nav-btn" onClick={prevMonth}>
            &lt;
          </button>
          <h2 className="calendar-title">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h2>
          <button className="calendar-nav-btn" onClick={nextMonth}>
            &gt;
          </button>
        </div>
        <button className="today-btn" onClick={goToToday}>
          Today
        </button>
      </div>
      
      <div className="calendar-weekdays">
        <div className="weekday">Sun</div>
        <div className="weekday">Mon</div>
        <div className="weekday">Tue</div>
        <div className="weekday">Wed</div>
        <div className="weekday">Thu</div>
        <div className="weekday">Fri</div>
        <div className="weekday">Sat</div>
      </div>
      
      <div className="calendar-days">
        {renderCalendar()}
      </div>
      
      <div className="calendar-legend">
        <div className="legend-item">
          <span className="legend-indicator today"></span>
          <span>Today</span>
        </div>
        <div className="legend-item">
          <span className="legend-indicator selected"></span>
          <span>Selected</span>
        </div>
        <div className="legend-item">
          <span className="legend-indicator has-appointments"></span>
          <span>Has Appointments</span>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCalendar;