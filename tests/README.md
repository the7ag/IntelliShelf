# 🧪 Tests Directory

This directory contains test files for the IntelliShelf application.

## 📂 Files

- **book.test.js**: Tests for book-related functionality

## 🔍 Overview

The `tests` directory contains unit and integration tests for the application. These tests ensure that the application functions correctly and help catch bugs before they reach production.

## 📝 Test Structure

Tests are written using Jest and Supertest for API testing. Each test file typically follows this pattern:

```javascript
// Example test structure
const request = require('supertest');
const app = require('../server');
const db = require('../src/config/db');

describe('Book API', () => {
  // Setup before tests
  beforeAll(async () => {
    // Setup test database
  });

  // Cleanup after tests
  afterAll(async () => {
    // Clean up test database
  });

  // Test cases
  describe('GET /api/books', () => {
    it('should return all books', async () => {
      const response = await request(app).get('/api/books');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
    });
  });

  // More test cases...
});
```

## 🧪 Running Tests

To run the tests, use the following command:

```bash
npm test
```

To run tests with coverage reporting:

```bash
npm test -- --coverage
```

## 🛠️ Best Practices

- Write tests for all critical functionality
- Use descriptive test names
- Follow the Arrange-Act-Assert pattern
- Mock external dependencies
- Use test databases for integration tests
- Clean up test data after tests
- Aim for high test coverage
- Write tests before implementing features (TDD)
- Keep tests independent and isolated
- Use meaningful assertions 