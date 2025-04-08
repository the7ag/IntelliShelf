# IntelliShelf

IntelliShelf is a modern digital library management system that helps users organize, track, and manage their book collections efficiently. Whether you're a book enthusiast, student, or professional, IntelliShelf provides the tools you need to keep your reading life organized.

![IntelliShelf Logo](assets/logo.png)

## Features

### Book Management
- **Add Books**: Easily add new books to your collection with detailed information
- **Edit Books**: Update book details, cover images, and metadata
- **Delete Books**: Remove books from your collection when needed
- **View Book Details**: Access comprehensive information about each book
- **Search Books**: Find books quickly with powerful search functionality
- **Filter Books**: Filter your collection by various criteria (genre, author, status, etc.)

### User Management
- **User Authentication**: Secure login and registration system
- **User Profiles**: Personalized user profiles with reading preferences
- **Role-Based Access**: Different permission levels for users and administrators

### Reading Progress
- **Reading Status**: Track books as "Want to Read", "Currently Reading", or "Read"
- **Reading Progress**: Record your progress through books
- **Reading History**: View your reading history and patterns
- **Reading Goals**: Set and track reading goals

### Social Features
- **Book Reviews**: Write and share reviews of books you've read
- **Rating System**: Rate books on a scale of 1-5 stars
- **Reading Lists**: Create and share custom reading lists
- **Recommendations**: Get personalized book recommendations based on your preferences

### Advanced Features
- **Book Cover Recognition**: Automatically fetch book covers and details using ISBN scanning
- **Export/Import**: Export your library data or import from other platforms
- **Statistics**: View reading statistics and insights
- **Mobile Responsive**: Access your library from any device

## Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **API**: RESTful API architecture
- **Testing**: Jest, React Testing Library
- **CI/CD**: Jenkins

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL

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

5. Open your browser and navigate to `http://localhost:3001`

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

The application can be deployed to various platforms:

- Heroku
- AWS
- DigitalOcean

## CI/CD Pipeline

IntelliShelf uses Jenkins for continuous integration and deployment:

- **Continuous Integration**: Automated testing and building on every code push
- **Continuous Deployment**: Automatic deployment to staging and production environments
- **Quality Gates**: Code quality checks and security scanning
- **Environment Management**: Separate configurations for development, staging, and production


## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.


## Contact

Project Link: [https://github.com/yourusername/intellishelf](https://github.com/the7ag/intellishelf) 
