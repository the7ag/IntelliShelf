// tests/book.test.js
const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken'); // To generate test tokens

// --- Mock Dependencies ---
// Mock the DB module BEFORE requiring routes/controllers that use it
jest.mock('../src/config/db', () => ({
    query: jest.fn().mockResolvedValue({ rows: [], rowCount: 0 }), // Default mock
    pool: { // Mock pool methods if directly used (e.g., transactions)
        connect: jest.fn().mockResolvedValue({ release: jest.fn() }),
        // Add other pool methods if needed
    }
}));
const db = require('../src/config/db'); // Now require the mocked module

// --- Setup Express App for Testing ---
const app = express();
app.use(express.json()); // Need JSON parsing for request bodies in tests

// Manually inject user into request for testing protected routes
// This avoids needing to mock the entire authMiddleware complex logic here
const injectTestUser = (req, res, next) => {
    // Check for a specific test token or simply inject user for all tests here
    if (req.headers.authorization === `Bearer valid-test-token`) {
         req.user = { id: 1, username: 'testuser' }; // Mock user object
    } else {
        // Allow testing unauthenticated scenarios if needed
        // If no valid test token, don't add req.user
    }
    next();
};
app.use(injectTestUser); // Apply the injector middleware

// Mount the actual routes AFTER middleware setup
const bookRoutes = require('../src/routes/bookRoutes');
app.use('/api/v1/books', bookRoutes);

// --- Test Suite ---
describe('Book API Endpoints (/api/v1/books)', () => {
    const validToken = 'valid-test-token';
    const invalidToken = 'invalid-token';
    let testBookId; // To store ID for PUT/DELETE tests

    // Reset mocks before each test to ensure clean state
    beforeEach(() => {
        db.query.mockClear();
        // Reset to default mock implementation if needed
        db.query.mockResolvedValue({ rows: [], rowCount: 0 });
    });

    // Test Authentication Requirement
    test('GET / - should return 401 Unauthorized if no token is provided', async () => {
        const response = await request(app).get('/api/v1/books');
        expect(response.statusCode).toBe(401);
        // Check specific message if authMiddleware returns one
        // expect(response.body.message).toContain('No valid token provided');
    });

    // Test POST /api/v1/books
    describe('POST /', () => {
        test('should create a new book and return 201 if authenticated and valid data provided', async () => {
            const newBookData = { title: 'Created Book', status: 'reading' };
            const mockCreatedBook = { id: 10, user_id: 1, ...newBookData, author_name: null }; // Simulating return value
            const mockQueryResult = { rows: [{id: 10}], rowCount: 1 }; // INSERT result
            const mockFetchResult = { rows: [mockCreatedBook], rowCount: 1}; // SELECT after insert result

            // Chain mock return values for the two expected queries
            db.query.mockResolvedValueOnce(mockQueryResult) // Mock INSERT RETURNING id
                     .mockResolvedValueOnce(mockFetchResult); // Mock SELECT b.*, a.name ... WHERE b.id = $1

            const response = await request(app)
                .post('/api/v1/books')
                .set('Authorization', `Bearer ${validToken}`)
                .send(newBookData);

            expect(response.statusCode).toBe(201);
            expect(response.body).toEqual(mockCreatedBook);
            expect(db.query).toHaveBeenCalledTimes(2); // Ensure both queries were called
            expect(db.query).toHaveBeenNthCalledWith(1, expect.stringContaining('INSERT INTO books'), expect.arrayContaining([1, 'Created Book'])); // Check insert
            expect(db.query).toHaveBeenNthCalledWith(2, expect.stringContaining('SELECT b.*, a.name'), [10]); // Check select after insert
        });

         test('should return 400 Bad Request if title is missing', async () => {
            const response = await request(app)
                .post('/api/v1/books')
                .set('Authorization', `Bearer ${validToken}`)
                .send({ status: 'to-read' }); // Missing title

            expect(response.statusCode).toBe(400);
            expect(response.body.message).toContain('Title is required');
        });

         test('should return 401 Unauthorized if token is invalid or missing', async () => {
            const response = await request(app)
                .post('/api/v1/books')
                .set('Authorization', `Bearer ${invalidToken}`) // Or omit header
                .send({ title: 'Unauthorized Book' });
            expect(response.statusCode).toBe(401);
        });
    });

    // Test GET /api/v1/books
    describe('GET /', () => {
        test('should return list of books for the authenticated user', async () => {
            const mockBooks = [
                { id: 1, title: 'User Book 1', user_id: 1, author_name: 'Author A'},
                { id: 2, title: 'User Book 2', user_id: 1, author_name: null }
            ];
            db.query.mockResolvedValueOnce({ rows: mockBooks, rowCount: mockBooks.length });

            const response = await request(app)
                .get('/api/v1/books')
                .set('Authorization', `Bearer ${validToken}`);

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(mockBooks);
            expect(db.query).toHaveBeenCalledWith(expect.stringContaining('SELECT b.*, a.name'), [1]); // Check user_id = 1
        });
    });

    // --- Add more describe blocks for GET /:id, PUT /:id, DELETE /:id ---
    // Remember to mock db.query appropriately for each scenario (success, not found, error)
    // Example PUT test structure:
    describe('PUT /:id', () => {
        test('should update book and return 200 if found and authorized', async() => {
            const bookIdToUpdate = 5;
            const updateData = { status: 'read', current_page: 300 };
            const mockUpdatedBook = { id: bookIdToUpdate, title: 'Existing Title', user_id: 1, status: 'read', current_page: 300, author_name: 'Some Author'};
            db.query.mockResolvedValueOnce({ rows: [{id: bookIdToUpdate}], rowCount: 1 }) // Mock UPDATE RETURNING id
                     .mockResolvedValueOnce({ rows: [mockUpdatedBook], rowCount: 1}); // Mock SELECT after update

            const response = await request(app)
                .put(`/api/v1/books/${bookIdToUpdate}`)
                .set('Authorization', `Bearer ${validToken}`)
                .send(updateData);

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(mockUpdatedBook);
            expect(db.query).toHaveBeenCalledTimes(2);
            expect(db.query).toHaveBeenNthCalledWith(1, expect.stringContaining('UPDATE books SET'), expect.arrayContaining(['read', 300, bookIdToUpdate, 1])); // Check update query structure
        });
        // Add tests for 404 Not Found, 401 Unauthorized, 400 Bad Request (no data)
    });

     // Example DELETE test structure:
     describe('DELETE /:id', () => {
         test('should delete book and return 204 if found and authorized', async () => {
             const bookIdToDelete = 7;
             db.query.mockResolvedValueOnce({ rowCount: 1 }); // Simulate successful delete

             const response = await request(app)
                 .delete(`/api/v1/books/${bookIdToDelete}`)
                 .set('Authorization', `Bearer ${validToken}`);

             expect(response.statusCode).toBe(204);
             expect(db.query).toHaveBeenCalledWith(expect.stringContaining('DELETE FROM books'), [bookIdToDelete, 1]);
         });
         // Add tests for 404 Not Found, 401 Unauthorized
     });

}); // End of test suite