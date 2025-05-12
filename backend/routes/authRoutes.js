const express = require('express');
const router = express.Router();
const { 
  registerDoctor, 
  registerPatient, 
  loginDoctor, 
  loginPatient 
} = require('../controllers/authController');

// Doctor routes
router.post('/register/doctor', registerDoctor);
router.post('/login/doctor', loginDoctor);

// Patient routes
router.post('/register/patient', registerPatient);
router.post('/login/patient', loginPatient);

module.exports = router;