# 🛣️ Routes Directory

This directory contains the route definitions for the IntelliShelf API.

## 📂 Files

- **authRoutes.js**: Authentication-related routes (login, register, profile)
- **bookRoutes.js**: Book-related routes (CRUD operations, search)

## 🔍 Overview

Routes define the API endpoints of the application and map them to the appropriate controller functions. They act as the entry points for client requests and determine which controller methods should handle each request.

## 📝 Route Structure

Each route file typically follows this pattern:

```javascript
// Example route structure
const express = require('express');
const router = express.Router();
const controller = require('../controllers/someController');
const middleware = require('../middleware/someMiddleware');

// Public routes
router.get('/', controller.getAll);
router.get('/:id', controller.getOne);

// Protected routes
router.post('/', middleware.authenticate, controller.create);
router.put('/:id', middleware.authenticate, controller.update);
router.delete('/:id', middleware.authenticate, controller.delete);

module.exports = router;
```

## 🔗 API Endpoints

### Authentication Routes

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/me` - Get current user profile

### Book Routes

- `GET /api/books` - Get all books (with pagination)
- `GET /api/books/:id` - Get a specific book
- `POST /api/books` - Create a new book
- `PUT /api/books/:id` - Update a book
- `DELETE /api/books/:id` - Delete a book
- `GET /api/books/search` - Search books by title, author, or genre

## 🛠️ Best Practices

- Follow RESTful API design principles
- Use consistent URL naming conventions
- Group related endpoints together
- Use appropriate HTTP methods (GET, POST, PUT, DELETE)
- Implement proper error handling
- Document API endpoints with comments
- Use middleware for authentication and validation
- Keep routes simple and delegate business logic to controllers 