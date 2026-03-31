# College Connect Backend

This is the backend for the College Connect project. It is built using Node.js, Express, and MongoDB.

## Features

- **Authentication System:** Secure student and faculty registration and login (using JWT and bcryptjs).
- **Admin Controls:** Endpoints for admins to approve or reject student/faculty accounts (`/api/admin`).
- **Announcements:** API to create, view, and manage announcements (`/api/announcements`).
- **Events:** API to create and manage college events (`/api/events`).

## Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** (with Mongoose ODM)
- **JWT** for Authentication
- **bcryptjs** for Password Hashing
- **dotenv** for Environment Variables Management
- **cors** for Cross-Origin Resource Sharing
- **morgan** for HTTP Request Logging

## Installation and Setup

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <repository-url>
   cd college-connect-backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   Create a `.env` file in the root directory based on `.env.example` (if applicable) or provide the following variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the Application**:
   - For development (with auto-restart via nodemon):
     ```bash
     npm run dev
     ```
   - For production:
     ```bash
     npm start
     ```

## API Endpoints Overview

- **`GET /`** - Health check / test route to ensure the server is running.
- **`USE /api/auth`** - Authentication routes (register, login, etc.).
- **`USE /api/announcements`** - Announcement management routes.
- **`USE /api/events`** - Event management routes.
- **`USE /api/admin`** - Admin routes (e.g., approve/reject users).
- **`GET /api/debug/create-user`** - Temporary debug route to force MongoDB Atlas database creation and insert a test admin user.

## Project Structure

```text
college-connect-backend/
├── config/             # Database connection configuration
├── controllers/        # Route logic and handlers
├── middleware/         # Custom Express middlewares (e.g., auth checks)
├── models/             # Mongoose schemas/models
├── routes/             # API route definitions
├── scripts/            # Utility scripts
├── server.js           # Application entry point and setup
├── package.json        # Dependencies and scripts
└── .env                # Environment variables (not tracked in git)
```
