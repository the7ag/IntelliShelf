# IntelliShelf API

IntelliShelf is a RESTful API for a digital library management system. It provides endpoints for managing books, users, and reading progress.

## Features

### Book Management
- **Add Books**: Create new book entries with detailed information
- **Edit Books**: Update book details and metadata
- **Delete Books**: Remove books from the collection
- **View Book Details**: Retrieve comprehensive information about each book
- **Search Books**: Find books with powerful search functionality
- **Filter Books**: Filter books by various criteria (genre, author, status, etc.)

### User Management
- **User Authentication**: Secure login and registration system
- **User Profiles**: Manage user profiles with reading preferences
- **Role-Based Access**: Different permission levels for users and administrators

### Reading Progress
- **Reading Status**: Track books as "Want to Read", "Currently Reading", or "Read"
- **Reading Progress**: Record progress through books
- **Reading History**: View reading history and patterns
- **Reading Goals**: Set and track reading goals

## Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL (hosted on Supabase)
- **Authentication**: JWT (JSON Web Tokens)
- **API**: RESTful API architecture
- **Testing**: Jest
- **CI/CD**: Jenkins

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Supabase account

### Installation

1. Clone the repository
   ```
   git clone https://github.com/the7ag/intellishelf.git
   cd intellishelf
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Set up environment variables
   Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3001
   DATABASE_URL=postgresql://postgres.alukijmszwbqlfsxpivz:6ZtWNjOR485J6j9R@aws-0-eu-west-2.pooler.supabase.com:5432/postgres
   JWT_SECRET="random_String_1234567890"
   ```

4. Start the development server
   ```
   npm run dev
   ```

5. The API will be available at `http://localhost:3001`

## API Documentation

The API documentation is available at `/api-docs` when running the server.

### Key Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/books` - Get all books
- `POST /api/books` - Add a new book
- `GET /api/books/:id` - Get a specific book
- `PUT /api/books/:id` - Update a book
- `DELETE /api/books/:id` - Delete a book

## Testing

Run the test suite with:

```
npm test
```

## Deployment

The API is already deployed and accessible at [https://intellishelf-api.example.com](https://intellishelf-api.example.com)

## CI/CD Pipeline

IntelliShelf uses Jenkins for continuous integration and deployment:

- **Continuous Integration**: Automated testing and building on every code push
- **Continuous Deployment**: Automatic deployment to production environment
- **Quality Gates**: Code quality checks and security scanning

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Project Link: [https://github.com/the7ag/intellishelf](https://github.com/the7ag/intellishelf) 
