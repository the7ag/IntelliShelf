// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // Get token from Authorization header (Bearer TOKEN)
  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No valid token provided, authorization denied' });
  }

  const token = authHeader.split(' ')[1]; // Extract token part

  // Check if no token exists after split
  if (!token) {
    return res.status(401).json({ message: 'Malformed token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add user payload (e.g., user id) to the request object
    // Ensure your JWT payload during login includes { user: { id: userId, ... } }
    if (!decoded.user || !decoded.user.id) {
       console.error('JWT payload missing user information:', decoded);
       return res.status(401).json({ message: 'Invalid token payload' });
    }
    req.user = decoded.user;

    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error("Token verification failed:", err.message);
    res.status(401).json({ message: 'Token is not valid' });
  }
};