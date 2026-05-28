/**
 * Hospital Appointment System - Single Unified Express Server (server.js)
 * 
 * This server serves both the frontend static files and the API endpoints.
 * It provides a single-command solution to run the entire project locally!
 */

const express = require('express');
const path = require('path');
const { DEPARTMENTS, loadAppointments, saveAppointment, deleteAppointment } = require('./api/src/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and urlencoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files (index.html, style.css, app.js, etc.)
app.use(express.static(path.join(__dirname, 'frontend')));

// --- 🌐 API ENDPOINTS ---

// 1. GET: Fetch departments and doctors
app.get('/api/getDoctors', (req, res) => {
  console.log('Express API: GET /api/getDoctors called');
  res.json(DEPARTMENTS);
});

// 2. POST: Book an appointment
app.post('/api/bookAppointment', (req, res) => {
  console.log('Express API: POST /api/bookAppointment called');
  
  const { patientName, patientEmail, department, doctor, appointmentTime } = req.body;
  
  // Validation
  if (!patientName || !patientEmail || !department || !doctor || !appointmentTime) {
    return res.status(400).json({ error: "All fields (Name, Email, Department, Doctor, Time) are required." });
  }
  
  const newAppointment = {
    id: 'apt_' + Date.now() + Math.random().toString(36).substring(2, 7),
    patientName: patientName.trim(),
    patientEmail: patientEmail.trim().toLowerCase(),
    department,
    doctor,
    appointmentTime,
    status: "Confirmed",
    createdAt: new Date().toISOString()
  };
  
  const saved = saveAppointment(newAppointment);
  res.status(201).json({
    message: "Appointment booked successfully!",
    appointment: saved
  });
});

// 3. GET/DELETE: List or cancel appointments
app.route('/api/listAppointments')
  // GET: Fetch appointments (optionally filtered by email)
  .get((req, res) => {
    console.log('Express API: GET /api/listAppointments called');
    const { email } = req.query;
    const allAppointments = loadAppointments();
    
    if (email) {
      const targetEmail = email.trim().toLowerCase();
      const filtered = allAppointments.filter(app => app.patientEmail === targetEmail);
      return res.json(filtered);
    }
    
    res.json(allAppointments);
  })
  // DELETE: Cancel/Delete an appointment by ID
  .delete((req, res) => {
    console.log('Express API: DELETE /api/listAppointments called');
    const { id } = req.query;
    
    if (!id) {
      return res.status(400).json({ error: "Missing appointment 'id' parameter." });
    }
    
    const wasDeleted = deleteAppointment(id);
    
    if (wasDeleted) {
      res.json({ message: "Appointment cancelled successfully." });
    } else {
      res.status(404).json({ error: "Appointment not found." });
    }
  });

// Fallback to index.html for any other frontend routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(`🏥 MediCare Hospital Appointment System is running!`);
  console.log(`🌐 Local URL: http://localhost:${PORT}`);
  console.log(`==================================================\n`);
});
