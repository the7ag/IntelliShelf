# ⚙️ Configuration Directory

This directory contains configuration files for the IntelliShelf application.

## 📂 Files

- **db.js**: Database connection configuration using PostgreSQL

## 🔍 Overview

The `config` directory centralizes all configuration settings for the application, making it easier to manage and update settings across the application.

## 📝 Usage

Configuration files are typically imported at the application startup and used throughout the codebase:

```javascript
// Example usage
const db = require('../config/db');

// Use the database connection
db.query('SELECT * FROM books', (err, result) => {
  // Handle result
});
```

## 🔐 Environment Variables

Configuration files often rely on environment variables for sensitive information. Make sure to set up your `.env` file with the necessary variables:

```
DATABASE_URL=postgres://username:password@db.supabase.co:5432/postgres
JWT_SECRET=your_jwt_secret
```

## 🛠️ Best Practices

- Keep sensitive information in environment variables, not in code
- Use a single source of truth for configuration
- Document all configuration options
- Provide default values for optional settings
- Validate configuration values at startup 