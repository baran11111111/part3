const { app } = require('@azure/functions');
const { DEPARTMENTS } = require('../db');

app.http('getDoctors', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log('getDoctors function received a request.');
        
        return {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(DEPARTMENTS)
        };
    }
});
