const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');

// Doctor Registration
exports.registerDoctor = async (req, res) => {
  try {
    const { name, email, password, specialization, experience } = req.body;

    // Check if doctor already exists
    const doctorExists = await Doctor.findOne({ email });
    if (doctorExists) {
      return res.status(400).json({ message: 'Doctor already exists' });
    }

    // Create new doctor
    const doctor = await Doctor.create({
      name,
      email,
      password, // Note: In a production app, you would hash this password
      specialization,
      experience
    });

    if (doctor) {
      res.status(201).json({
        _id: doctor._id,
        name: doctor.name,
        email: doctor.email,
        specialization: doctor.specialization,
        experience: doctor.experience
      });
    } else {
      res.status(400).json({ message: 'Invalid doctor data' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Patient Registration
exports.registerPatient = async (req, res) => {
  try {
    const { name, email, password, age, gender, medicalHistory } = req.body;

    // Check if patient already exists
    const patientExists = await Patient.findOne({ email });
    if (patientExists) {
      return res.status(400).json({ message: 'Patient already exists' });
    }

    // Create new patient
    const patient = await Patient.create({
      name,
      email,
      password, // Note: In a production app, you would hash this password
      age,
      gender,
      medicalHistory
    });

    if (patient) {
      res.status(201).json({
        _id: patient._id,
        name: patient.name,
        email: patient.email,
        age: patient.age,
        gender: patient.gender
      });
    } else {
      res.status(400).json({ message: 'Invalid patient data' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Doctor Login
exports.loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find doctor by email
    const doctor = await Doctor.findOne({ email });

    // Check if doctor exists and password matches
    if (doctor && doctor.password === password) {
      res.json({
        _id: doctor._id,
        name: doctor.name,
        email: doctor.email,
        specialization: doctor.specialization,
        experience: doctor.experience,
        userType: 'doctor'
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Patient Login
exports.loginPatient = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find patient by email
    const patient = await Patient.findOne({ email });

    // Check if patient exists and password matches
    if (patient && patient.password === password) {
      res.json({
        _id: patient._id,
        name: patient.name,
        email: patient.email,
        age: patient.age,
        gender: patient.gender,
        userType: 'patient'
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};