# 🔄 GitHub Configuration Directory

This directory contains GitHub-specific configuration files for the IntelliShelf project.

## 📂 Directory Structure

```
.github/
└── workflows/        # GitHub Actions workflows
    ├── ci-cd.yml     # Continuous Integration workflow
    └── deploy.yml    # Deployment workflow
```

## 🔍 Overview

The `.github` directory contains configuration files for GitHub features, such as GitHub Actions workflows for continuous integration and deployment.

## 📝 GitHub Actions Workflows

### CI/CD Pipeline (`ci-cd.yml`)

This workflow runs on every push to the main branch and pull requests. It:

- Sets up a Node.js environment
- Installs dependencies
- Runs linting
- Runs tests
- Builds the application
- Uploads test coverage as an artifact

### Deployment (`deploy.yml`)

This workflow runs only when code is pushed to the main branch. It:

- Sets up Docker Buildx
- Logs in to Docker Hub
- Builds and pushes the Docker image
- Tags the image with both 'latest' and the commit SHA

## 🔐 GitHub Secrets

To use these workflows, you need to set up the following secrets in your GitHub repository:

- `SUPABASE_DATABASE_URL`: Your Supabase PostgreSQL connection string
- `JWT_SECRET`: Secret key for JWT token generation
- `DOCKER_HUB_USERNAME`: Your Docker Hub username
- `DOCKER_HUB_TOKEN`: Your Docker Hub access token

## 🛠️ Best Practices

- Keep workflow files simple and focused
- Use GitHub Secrets for sensitive information
- Use caching to speed up workflows
- Set up branch protection rules
- Use environment-specific workflows
- Document workflow steps with comments
- Test workflows with pull requests
- Monitor workflow performance 