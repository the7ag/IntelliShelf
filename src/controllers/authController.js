// src/controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Shared error handler (similar to bookController)
const handleAuthError = (res, error, message, statusCode = 500) => {
    console.error(`${message}:`, error);
    const errorMessage = process.env.NODE_ENV === 'production' ? message : error.message;
    res.status(statusCode).json({ message: errorMessage });
};


exports.register = async (req, res) => {
  // Add input validation later (username, email format, password strength)
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Username, email, and password are required' });
  }

  try {
    // 1. Check if user already exists (email or username)
    const userExists = await db.query('SELECT id FROM users WHERE email = $1 OR username = $2', [email, username]);
    if (userExists.rows.length > 0) {
      return res.status(409).json({ message: 'Email or username already exists' }); // 409 Conflict
    }

    // 2. Hash password
    const salt = await bcrypt.genSalt(10); // Salt rounds
    const password_hash = await bcrypt.hash(password, salt);

    // 3. Insert new user
    const insertQuery = `
      INSERT INTO users (username, email, password_hash)
      VALUES ($1, $2, $3)
      RETURNING id, username, email, created_at;
    `;
    const { rows } = await db.query(insertQuery, [username, email, password_hash]);

    // 4. Respond (don't send back password hash)
    res.status(201).json({ message: 'User registered successfully', user: rows[0] });

  } catch (error) {
    // Handle potential DB unique constraint errors more gracefully if needed
    handleAuthError(res, error, 'Server error during registration');
  }
};

exports.login = async (req, res) => {
  // Add input validation later
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // 1. Find user by email
    const { rows } = await db.query('SELECT id, username, email, password_hash FROM users WHERE email = $1', [email]);
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' }); // Use generic message
    }
    const user = rows[0];

    // 2. Compare submitted password with stored hash
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' }); // Use generic message
    }

    // 3. Create JWT Payload
    const payload = {
      user: {
        id: user.id, // Include user ID in the token
        username: user.username // Optional: include username
      }
    };

    // 4. Sign Token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' }, // Token expiration time (e.g., 1 hour) - Adjust as needed
      (err, token) => {
        if (err) throw err; // Let global error handler catch signing errors
        // Send token back to client
        res.json({ token });
      }
    );

  } catch (error) {
    handleAuthError(res, error, 'Server error during login');
  }
};