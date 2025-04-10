// src/controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const handleAuthError = (res, error, message, statusCode = 500) => {
    console.error(`${message}:`, error);
    const errorMessage = process.env.NODE_ENV === 'production' ? message : error.message;
    res.status(statusCode).json({ message: errorMessage });
};


exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Username, email, and password are required' });
  }

  try {
    const userExists = await db.query('SELECT id FROM users WHERE email = $1 OR username = $2', [email, username]);
    if (userExists.rows.length > 0) {
      return res.status(409).json({ message: 'Email or username already exists' }); // 409 Conflict
    }

    const salt = await bcrypt.genSalt(10); 
    const password_hash = await bcrypt.hash(password, salt);

    const insertQuery = `
      INSERT INTO users (username, email, password_hash)
      VALUES ($1, $2, $3)
      RETURNING id, username, email, created_at;
    `;
    const { rows } = await db.query(insertQuery, [username, email, password_hash]);

    res.status(201).json({ message: 'User registered successfully', user: rows[0] });

  } catch (error) {
    handleAuthError(res, error, 'Server error during registration');
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const { rows } = await db.query('SELECT id, username, email, password_hash FROM users WHERE email = $1', [email]);
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' }); // Use generic message
    }
    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' }); // Use generic message
    }

    const payload = {
      user: {
        id: user.id, 
        username: user.username 
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' }, 
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );

  } catch (error) {
    handleAuthError(res, error, 'Server error during login');
  }
};