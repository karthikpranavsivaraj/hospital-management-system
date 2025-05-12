# Hospital Management System

A Doctor-Patient Appointment Management System built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

- **Authentication System**
  - Separate login for doctors and patients
  - Registration for new doctors and patients

- **Doctor Dashboard**
  - View all appointment requests
  - Accept or reject appointments
  - Track appointment history

- **Patient Dashboard**
  - View all available doctors
  - Book appointments with doctors
  - Track appointment status

## Tech Stack

- **Frontend**: React.js with Axios for HTTP requests
- **Backend**: Node.js with Express.js (MVC pattern)
- **Database**: MongoDB (local instance)

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally on port 27017)

## Installation and Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd hospital-management-system
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Install frontend dependencies

```bash
cd ../frontend
npm install
```

### 4. Start MongoDB

Make sure MongoDB is running on your local machine.

### 5. Start the backend server

```bash
cd ../backend
npm run dev
```

The backend server will run on http://localhost:5000

### 6. Start the frontend development server

```bash
cd ../frontend
npm start
```

The frontend development server will run on http://localhost:3000

## API Endpoints

### Auth Routes

- `POST /api/auth/register/doctor` - Register a new doctor
- `POST /api/auth/register/patient` - Register a new patient
- `POST /api/auth/login/doctor` - Doctor login
- `POST /api/auth/login/patient` - Patient login

### Doctor Routes

- `GET /api/doctors/:doctorId/appointments` - Get all appointments for a doctor
- `POST /api/doctors/:doctorId/appointments/accept/:id` - Accept an appointment
- `POST /api/doctors/:doctorId/appointments/reject/:id` - Reject an appointment
- `GET /api/doctors/:doctorId` - Get doctor profile

### Patient Routes

- `GET /api/patients/doctors` - Get all doctors
- `POST /api/patients/appointments/book` - Book a new appointment
- `GET /api/patients/:patientId/appointments` - Get all appointments for a patient
- `GET /api/patients/:patientId` - Get patient profile

## Project Structure

```
hospital-management-system/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── doctorController.js
│   │   └── patientController.js
│   ├── models/
│   │   ├── Appointment.js
│   │   ├── Doctor.js
│   │   └── Patient.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── doctorRoutes.js
│   │   └── patientRoutes.js
│   ├── app.js
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```