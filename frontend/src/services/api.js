import axios from 'axios';

const API_URL = 'https://hospital-management-system-tgmj.onrender.com/api';

// Auth Services
export const registerDoctor = async (doctorData) => {
  const response = await axios.post(`${API_URL}/auth/register/doctor`, doctorData);
  return response.data;
};

export const registerPatient = async (patientData) => {
  const response = await axios.post(`${API_URL}/auth/register/patient`, patientData);
  return response.data;
};

export const loginDoctor = async (credentials) => {
  const response = await axios.post(`${API_URL}/auth/login/doctor`, credentials);
  return response.data;
};

export const loginPatient = async (credentials) => {
  const response = await axios.post(`${API_URL}/auth/login/patient`, credentials);
  return response.data;
};

// Doctor Services
export const getDoctorAppointments = async (doctorId) => {
  const response = await axios.get(`${API_URL}/doctors/${doctorId}/appointments`);
  return response.data;
};

export const acceptAppointment = async (doctorId, appointmentId) => {
  const response = await axios.post(`${API_URL}/doctors/${doctorId}/appointments/accept/${appointmentId}`);
  return response.data;
};

export const rejectAppointment = async (doctorId, appointmentId) => {
  const response = await axios.post(`${API_URL}/doctors/${doctorId}/appointments/reject/${appointmentId}`);
  return response.data;
};

export const getDoctorProfile = async (doctorId) => {
  const response = await axios.get(`${API_URL}/doctors/${doctorId}`);
  return response.data;
};

// Patient Services
export const getAllDoctors = async () => {
  const response = await axios.get(`${API_URL}/patients/doctors`);
  return response.data;
};

export const bookAppointment = async (appointmentData) => {
  const response = await axios.post(`${API_URL}/patients/appointments/book`, appointmentData);
  return response.data;
};

export const getPatientAppointments = async (patientId) => {
  const response = await axios.get(`${API_URL}/patients/${patientId}/appointments`);
  return response.data;
};

export const getPatientProfile = async (patientId) => {
  const response = await axios.get(`${API_URL}/patients/${patientId}`);
  return response.data;
};
