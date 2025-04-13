# 📁 Source Code Directory

This directory contains the core application code for IntelliShelf.

## 📂 Directory Structure

```
src/
├── config/           # Configuration files
├── controllers/      # Request handlers
├── middleware/       # Custom middleware
└── routes/           # API routes
```

## 🔍 Overview

The `src` directory follows a modular architecture pattern, separating concerns into distinct directories:

- **config/**: Contains configuration files for database connections, environment variables, and application settings.
- **controllers/**: Contains the business logic for handling requests. Each controller is responsible for a specific resource or feature.
- **middleware/**: Contains custom middleware functions that process requests before they reach the controllers.
- **routes/**: Defines the API endpoints and maps them to the appropriate controller functions.

## 🛠️ Development Guidelines

When adding new features to the application:

1. **Routes**: Define new endpoints in the appropriate route file
2. **Controllers**: Implement the business logic in controller files
3. **Middleware**: Add any necessary middleware for request processing
4. **Config**: Update configuration files if needed

## 📝 Best Practices

- Keep controllers focused on a single responsibility
- Use middleware for cross-cutting concerns like authentication and validation
- Follow the RESTful API design principles
- Document your code with comments for complex logic
- Write unit tests for new functionality 