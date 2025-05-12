const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');

// Get all appointments for a doctor
exports.getAppointments = async (req, res) => {
  try {
    const doctorId = req.params.doctorId;
    
    const appointments = await Appointment.find({ doctor: doctorId })
      .populate('patient', 'name age gender')
      .sort({ date: 1 });
    
    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Accept an appointment
exports.acceptAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    
    const appointment = await Appointment.findById(appointmentId);
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    // Check if the doctor is the one assigned to this appointment
    if (appointment.doctor.toString() !== req.params.doctorId) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    appointment.status = 'accepted';
    await appointment.save();
    
    res.json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Reject an appointment
exports.rejectAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    
    const appointment = await Appointment.findById(appointmentId);
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    // Check if the doctor is the one assigned to this appointment
    if (appointment.doctor.toString() !== req.params.doctorId) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    appointment.status = 'rejected';
    await appointment.save();
    
    res.json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get doctor profile
exports.getDoctorProfile = async (req, res) => {
  try {
    const doctorId = req.params.doctorId;
    
    const doctor = await Doctor.findById(doctorId).select('-password');
    
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    
    res.json(doctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};