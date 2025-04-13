# IntelliShelf

A book management system with user authentication and book tracking features.

## GitHub Actions CI/CD Setup

This project uses GitHub Actions for continuous integration and deployment. Here's how it works:

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

## Local Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Run tests
npm test

# Run linting
npm run lint
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
DATABASE_URL=postgres://username:password@db.supabase.co:5432/postgres
JWT_SECRET=your_jwt_secret
```

## Supabase Integration

This project uses Supabase for PostgreSQL database hosting. To set up Supabase:

1. Create an account at [Supabase](https://supabase.com/)
2. Create a new project
3. Get your database connection string from the project settings
4. Add the connection string to your environment variables

## Docker Deployment

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