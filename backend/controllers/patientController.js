const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');

// Get all doctors
exports.getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({}).select('-password');
    res.json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Book a new appointment
exports.bookAppointment = async (req, res) => {
  try {
    const { doctorId, patientId, date, time, reason } = req.body;
    
    // Check if doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    
    // Check if patient exists
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    
    // Create new appointment
    const appointment = await Appointment.create({
      doctor: doctorId,
      patient: patientId,
      date,
      time,
      reason,
      status: 'pending'
    });
    
    res.status(201).json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get all appointments for a patient
exports.getAppointments = async (req, res) => {
  try {
    const patientId = req.params.patientId;
    
    const appointments = await Appointment.find({ patient: patientId })
      .populate('doctor', 'name specialization')
      .sort({ date: 1 });
    
    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get patient profile
exports.getPatientProfile = async (req, res) => {
  try {
    const patientId = req.params.patientId;
    
    const patient = await Patient.findById(patientId).select('-password');
    
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    
    res.json(patient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};