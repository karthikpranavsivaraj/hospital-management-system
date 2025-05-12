const express = require('express');
const router = express.Router();
const { 
  getDoctors, 
  bookAppointment, 
  getAppointments,
  getPatientProfile
} = require('../controllers/patientController');

// Get all doctors
router.get('/doctors', getDoctors);

// Book a new appointment
router.post('/appointments/book', bookAppointment);

// Get all appointments for a patient
router.get('/:patientId/appointments', getAppointments);

// Get patient profile
router.get('/:patientId', getPatientProfile);

module.exports = router;