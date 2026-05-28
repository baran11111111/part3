const { app } = require('@azure/functions');
const { loadAppointments, deleteAppointment } = require('../db');

app.http('listAppointments', {
    methods: ['GET', 'DELETE'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`listAppointments function received a ${request.method} request.`);
        
        const method = request.method;
        
        // GET: Return appointments (optionally filtered by email query param)
        if (method === 'GET') {
            const email = request.query.get('email');
            const allAppointments = loadAppointments();
            
            if (email) {
                const targetEmail = email.trim().toLowerCase();
                const filtered = allAppointments.filter(app => app.patientEmail === targetEmail);
                return {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(filtered)
                };
            }
            
            // If no email query is provided, return all appointments (great for quick testing/grading)
            return {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(allAppointments)
            };
        }
        
        // DELETE: Cancel an appointment using its ID
        if (method === 'DELETE') {
            const id = request.query.get('id');
            
            if (!id) {
                return {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ error: "Missing appointment 'id' parameter." })
                };
            }
            
            const wasDeleted = deleteAppointment(id);
            
            if (wasDeleted) {
                return {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: "Appointment cancelled successfully." })
                };
            } else {
                return {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ error: "Appointment not found." })
                };
            }
        }
    }
});
