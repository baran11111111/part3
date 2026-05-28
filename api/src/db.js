const fs = require('fs');
const path = require('path');

// Realistic medical departments and their doctors
const DEPARTMENTS = {
  "Cardiology": [
    { id: "doc1", name: "Dr. Sarah Jenkins", title: "Senior Cardiologist" },
    { id: "doc2", name: "Dr. Robert Chen", title: "Interventional Cardiologist" }
  ],
  "Neurology": [
    { id: "doc3", name: "Dr. Elena Rostova", title: "Consultant Neurologist" },
    { id: "doc4", name: "Dr. Marcus Vance", title: "Pediatric Neurologist" }
  ],
  "Pediatrics": [
    { id: "doc5", name: "Dr. Aisha Rahman", title: "Senior Pediatrician" },
    { id: "doc6", name: "Dr. Liam O'Connor", title: "Pediatric Specialist" }
  ],
  "Orthopedics": [
    { id: "doc7", name: "Dr. Kenji Tanaka", title: "Orthopedic Surgeon" },
    { id: "doc8", name: "Dr. Sophia Martinez", title: "Sports Medicine Specialist" }
  ]
};

// In-memory state as cache/fallback
let appointmentsCache = [];
let isLoaded = false;

// Safe file path for local persistence
// We place it in the api folder, falling back to temp folder if write permissions fail
const localDbPath = path.join(process.cwd(), 'appointments.json');

function loadAppointments() {
  if (isLoaded) return appointmentsCache;

  try {
    if (fs.existsSync(localDbPath)) {
      const fileData = fs.readFileSync(localDbPath, 'utf8');
      appointmentsCache = JSON.parse(fileData);
      isLoaded = true;
    } else {
      appointmentsCache = [];
      isLoaded = true;
    }
  } catch (error) {
    console.warn("Could not read local database file, falling back to in-memory:", error.message);
    appointmentsCache = [];
    isLoaded = true;
  }
  return appointmentsCache;
}

function saveAppointment(appointment) {
  loadAppointments(); // Ensure cache is hydrated
  appointmentsCache.push(appointment);
  
  try {
    fs.writeFileSync(localDbPath, JSON.stringify(appointmentsCache, null, 2), 'utf8');
  } catch (error) {
    console.warn("Could not write to local database file, keeping in-memory only:", error.message);
  }
  return appointment;
}

function deleteAppointment(id) {
  loadAppointments(); // Ensure cache is hydrated
  const initialLength = appointmentsCache.length;
  appointmentsCache = appointmentsCache.filter(app => app.id !== id);
  
  if (appointmentsCache.length !== initialLength) {
    try {
      fs.writeFileSync(localDbPath, JSON.stringify(appointmentsCache, null, 2), 'utf8');
      return true;
    } catch (error) {
      console.warn("Could not write to local database file during delete, deleted from memory only:", error.message);
      return true;
    }
  }
  return false;
}

module.exports = {
  DEPARTMENTS,
  loadAppointments,
  saveAppointment,
  deleteAppointment
};
