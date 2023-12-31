# Application Startup Guide

This guide explains how to launch a MERN-based instagram apk version control app using Docker and `make`. The application consists of a frontend (React), a backend (Node.js), MongoDB, and Redis.

## Prerequisites

- Docker must be installed.
- `make` command should be available in Linux/MacOS environments. Alternative commands for Windows users are provided.

## Configuration

Ensure that your application's necessary environment variables are defined in the `.env` file:

```bash
DB_URI=mongodb://mongo:27017/admin
REDIS_URI=redis://redis:6379/0
PORT=5000
```

## Launch Procedures

### For Linux/MacOS Users

```bash
cd path/to/your/project
make build
make run
```
### For Windows Users

```bash
cd path/to/your/project/panel
docker build -t social-app-react .
cd ..
cd server
docker build -t social-app-server .
cd ..
docker-compose up
```

### Without Docker

Note: You must have MongoDB and Redis installed and running on your machine. you must change the DB_URI and REDIS_URI in the .env.

```bash
cd path/to/your/project/panel
npm install
npm start
cd ..
cd server
npm install
npm start
```

## Accessing the Application
Your application should now be running at http://localhost:3000 for the frontend and http://localhost:5000 for the backend.

## API Documentation
The API documentation is available at http://localhost:5000/api/docs/#/ when you reach the project.


## tech stack
- React
- Node.js
- MongoDB
- Redis
- Docker
- Swagger
- Chakra-ui
