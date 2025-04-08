require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./src/config/db'); // Ensure this runs
const bookRoutes = require('./src/routes/bookRoutes');
const authRoutes = require('./src/routes/authRoutes');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use(express.json());
app.use('/api/v1/books', bookRoutes);
app.use('/api/v1/auth', authRoutes); 
