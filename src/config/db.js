// src/config/db.js
const { Pool } = require('pg');

const useSSL = process.env.NODE_ENV === 'production'; 

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: useSSL ? { rejectUnauthorized: false } : false

});

pool.connect((err, client, release) => {
    if (err) {
        console.error('Error acquiring Supabase client:', err.message);
        console.error('Stack:', err.stack);

        return;
    }
    console.log('Connected to Supabase Database!');
    if (client) {
        client.release(); 
    }
});

module.exports = {
    query: (text, params) => pool.query(text, params),
    pool 
};