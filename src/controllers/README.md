# 🎮 Controllers Directory

This directory contains the controller files that handle the business logic for the IntelliShelf application.

## 📂 Files

- **authController.js**: Handles user authentication (login, register, profile)
- **bookcontroller.js**: Manages book-related operations (CRUD, search)

## 🔍 Overview

Controllers are responsible for processing incoming requests, interacting with the database, and sending responses back to the client. They implement the business logic of the application and act as a bridge between the routes and the data layer.

## 📝 Controller Structure

Each controller typically follows this pattern:

```javascript
// Example controller structure
const someController = {
  // Get all resources
  getAll: async (req, res) => {
    try {
      // Business logic
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  
  // Get a single resource
  getOne: async (req, res) => {
    // Implementation
  },
  
  // Create a new resource
  create: async (req, res) => {
    // Implementation
  },
  
  // Update a resource
  update: async (req, res) => {
    // Implementation
  },
  
  // Delete a resource
  delete: async (req, res) => {
    // Implementation
  }
};

module.exports = someController;
```

## 🛠️ Best Practices

- Keep controllers focused on a single responsibility
- Use async/await for asynchronous operations
- Implement proper error handling
- Validate input data before processing
- Use HTTP status codes correctly
- Keep business logic in controllers, not in routes
- Document complex operations with comments
- Write unit tests for controller functions 