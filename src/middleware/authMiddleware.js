// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No valid token provided, authorization denied' });
  }

  const token = authHeader.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ message: 'Malformed token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);


    if (!decoded.user || !decoded.user.id) {
       console.error('JWT payload missing user information:', decoded);
       return res.status(401).json({ message: 'Invalid token payload' });
    }
    req.user = decoded.user;

    next();
  } catch (err) {
    console.error("Token verification failed:", err.message);
    res.status(401).json({ message: 'Token is not valid' });
  }
};