# 📚 IntelliShelf

<div align="center">
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="Express.js" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
  <img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white" alt="GitHub Actions" />
  <img src="https://img.shields.io/badge/OpenAPI-6BA539?style=for-the-badge&logo=openapi&logoColor=white" alt="OpenAPI" />
</div>

## 📋 Overview

IntelliShelf is a modern book management system that helps users organize, track, and manage their personal book collections. Built with Node.js, Express, and PostgreSQL (hosted on Supabase), it provides a robust API for book-related operations with user authentication.

## ✨ Features

- 🔐 **User Authentication**: Secure login and registration system
- 📚 **Book Management**: Add, update, delete, and search books
- 🔍 **Advanced Search**: Find books by title, author, genre, or status
- 📊 **Reading Statistics**: Track reading progress and history
- 🔄 **API Integration**: RESTful API for frontend integration
- 🚀 **Docker Support**: Containerized for easy deployment
- 🔄 **CI/CD Pipeline**: Automated testing and deployment with GitHub Actions
- 📝 **OpenAPI Documentation**: Comprehensive API documentation

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL (hosted on Supabase)
- **Authentication**: JWT (JSON Web Tokens)
- **Containerization**: Docker
- **CI/CD**: GitHub Actions
- **Testing**: Jest, Supertest
- **Linting**: ESLint
- **API Documentation**: OpenAPI/Swagger

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Docker (optional, for containerized deployment)
- Supabase account (for database)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/intellishelf.git
   cd intellishelf
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory with the following variables:
   ```
   DATABASE_URL=postgres://username:password@db.supabase.co:5432/postgres
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the application**
   ```bash
   npm run dev
   ```

## 📁 Project Structure

```
intellishelf/
├── src/                  # Source code
│   ├── config/           # Configuration files
│   ├── controllers/      # Request handlers
│   ├── middleware/       # Custom middleware
│   └── routes/           # API routes
├── tests/                # Test files
├── .github/              # GitHub configuration
│   └── workflows/        # GitHub Actions workflows
├── Dockerfile            # Docker configuration
├── schema.sql            # Database schema
├── openapi.yaml          # OpenAPI documentation
└── server.js             # Application entry point
```

## 📝 API Documentation

The API is fully documented using OpenAPI 3.0. You can view the documentation in several ways:

1. **View the OpenAPI specification**
   ```bash
   cat openapi.yaml
   ```

2. **Use Swagger UI (if enabled)**
   Visit `http://localhost:3000/api-docs` when the server is running

3. **Generate client libraries**
   ```bash
   npx swagger-codegen-cli generate -i openapi.yaml -l javascript -o ./client
   ```

The API documentation includes:
- Authentication endpoints
- Book management endpoints
- Request/response schemas
- Error handling
- Security requirements

## 🔄 CI/CD Pipeline

This project uses GitHub Actions for continuous integration and deployment:

### Workflows

1. **CI/CD Pipeline** (`.github/workflows/ci-cd.yml`)
   - Runs on every push to main branch and pull requests
   - Uses Supabase for database testing
   - Installs dependencies
   - Runs linting
   - Runs tests
   - Builds the application
   - Uploads test coverage as an artifact

2. **Deployment** (`.github/workflows/deploy.yml`)
   - Runs only when code is pushed to the main branch
   - Builds a Docker image
   - Pushes the image to Docker Hub
   - Tags the image with both 'latest' and the commit SHA

### How to Use

1. **Push your code to GitHub**
   - The CI/CD pipeline will automatically run on every push to the main branch
   - You can view the workflow runs in the "Actions" tab of your GitHub repository

2. **Configure Secrets**
   - Go to your repository settings > Secrets and variables > Actions
   - Add the following secrets:
     - `SUPABASE_DATABASE_URL`: Your Supabase PostgreSQL connection string
     - `JWT_SECRET`: Secret key for JWT token generation
     - `DOCKER_HUB_USERNAME`: Your Docker Hub username
     - `DOCKER_HUB_TOKEN`: Your Docker Hub access token (create an access token at https://hub.docker.com/settings/security)

3. **Pull and Run the Docker Image**
   - After deployment, you can pull and run the image from Docker Hub:
     ```bash
     docker pull yourusername/intellishelf:latest
     docker run -p 3000:3000 -e DATABASE_URL=your_database_url -e JWT_SECRET=your_jwt_secret yourusername/intellishelf:latest
     ```

## 🐳 Docker Deployment

This project is containerized using Docker and can be deployed to any environment that supports Docker.

### Local Docker Development

```bash
# Build the development image
docker build -t intellishelf:dev --target development .

# Run the development container
docker run -p 3001:3001 -e DATABASE_URL=your_database_url -e JWT_SECRET=your_jwt_secret intellishelf:dev
```

### Production Docker Deployment

```bash
# Build the production image
docker build -t intellishelf:prod --target production .

# Run the production container
docker run -p 3000:3000 -e DATABASE_URL=your_database_url -e JWT_SECRET=your_jwt_secret intellishelf:prod
```

## 📊 Supabase Integration

This project uses Supabase for PostgreSQL database hosting. To set up Supabase:

1. Create an account at [Supabase](https://supabase.com/)
2. Create a new project
3. Get your database connection string from the project settings
4. Add the connection string to your environment variables

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## 📈 Future Enhancements

- [ ] User profile customization
- [ ] Reading lists and bookmarks
- [ ] Book recommendations
- [ ] Social sharing features
- [ ] Mobile application
- [ ] Integration with e-book platforms

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributors

- Your Name - Initial work

## 🙏 Acknowledgments

- Express.js team for the amazing framework
- Supabase team for the PostgreSQL hosting
- All contributors and users of IntelliShelf 