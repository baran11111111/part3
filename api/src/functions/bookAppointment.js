const { app } = require('@azure/functions');
const { saveAppointment } = require('../db');

app.http('bookAppointment', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log('bookAppointment function received a request.');
        
        try {
            // Read and parse JSON request body
            const body = await request.json();
            
            const { patientName, patientEmail, department, doctor, appointmentTime } = body;
            
            // Simple validation
            if (!patientName || !patientEmail || !department || !doctor || !appointmentTime) {
                return {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ error: "All fields (Name, Email, Department, Doctor, Time) are required." })
                };
            }
            
            // Create a clean appointment object
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
            
            // Save to mock persistent DB
            const saved = saveAppointment(newAppointment);
            
            return {
                status: 201,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    message: "Appointment booked successfully!", 
                    appointment: saved 
                })
            };
            
        } catch (error) {
            context.log(`Error processing request: ${error.message}`);
            return {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ error: "Invalid JSON format in request body." })
            };
        }
    }
});
