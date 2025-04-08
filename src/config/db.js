// src/config/db.js
const { Pool } = require('pg');

// Supabase requires SSL connections
const useSSL = process.env.NODE_ENV === 'production'; // Enforce SSL in production

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: useSSL ? { rejectUnauthorized: false } : false
    // Using rejectUnauthorized: false is common for cloud DBs without full CA setup,
    // but less secure than verifying the CA. For production apps, consider adding the Supabase CA cert.
});

pool.connect((err, client, release) => {
    if (err) {
        // Provide more detailed error logging during connection attempt
        console.error('Error acquiring Supabase client:', err.message);
        console.error('Stack:', err.stack);
        // Consider exiting if connection fails critically during startup in production
        // process.exit(1);
        return;
    }
    console.log('Connected to Supabase Database!');
    if (client) {
        client.release(); // Release the client immediately after connection test
    }
});

module.exports = {
    query: (text, params) => pool.query(text, params),
    pool // Export pool if needed for transactions etc.
};