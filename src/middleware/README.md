# 🔗 Middleware Directory

This directory contains middleware functions for the IntelliShelf application.

## 📂 Files

- **authMiddleware.js**: Handles authentication and authorization

## 🔍 Overview

Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application's request-response cycle. They can execute any code, make changes to the request and response objects, end the request-response cycle, and call the next middleware function.

## 📝 Middleware Usage

Middleware is typically used in routes to perform operations before the request reaches the controller:

```javascript
// Example usage in routes
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const bookController = require('../controllers/bookcontroller');

// Public routes
router.get('/books', bookController.getAllBooks);

// Protected routes (require authentication)
router.post('/books', authMiddleware.authenticate, bookController.createBook);
router.put('/books/:id', authMiddleware.authenticate, bookController.updateBook);
router.delete('/books/:id', authMiddleware.authenticate, bookController.deleteBook);

module.exports = router;
```

## 🔐 Authentication Middleware

The `authMiddleware.js` file contains functions for:

- Verifying JWT tokens
- Checking user permissions
- Protecting routes from unauthorized access

## 🛠️ Best Practices

- Keep middleware functions focused on a single responsibility
- Use middleware for cross-cutting concerns like authentication, logging, and error handling
- Chain middleware functions in a logical order
- Handle errors properly in middleware
- Use async/await for asynchronous middleware
- Document middleware parameters and return values
- Write unit tests for middleware functions 