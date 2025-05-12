const express = require('express');
const router = express.Router();
const { 
  getAppointments, 
  acceptAppointment, 
  rejectAppointment,
  getDoctorProfile
} = require('../controllers/doctorController');

// Get all appointments for a doctor
router.get('/:doctorId/appointments', getAppointments);

// Accept an appointment
router.post('/:doctorId/appointments/accept/:id', acceptAppointment);

// Reject an appointment
router.post('/:doctorId/appointments/reject/:id', rejectAppointment);

// Get doctor profile
router.get('/:doctorId', getDoctorProfile);

module.exports = router;