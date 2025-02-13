# Secure User API with Node.js

## Overview
Secure User API is a Node.js and Express-based project that provides user authentication and management features. It includes JWT-based authentication, password hashing, and user data storage using a JSON file. The API also offers user login, signup, and protected routes.

## Features
- **User Authentication**: Secure login system using JWT.
- **User Management**: Create, fetch, and retrieve users.
- **Password Security**: Uses bcrypt for hashing.
- **Middleware Protection**: JWT-based authentication for secure access.
- **Lightweight Storage**: User data is stored in a JSON file.

## API Endpoints
### Public Routes
- `POST /users` – Register a new user.
- `POST /users/login` – Login and receive a JWT.

### Protected Routes (Require JWT)
- `GET /users` – Retrieve all users.
- `GET /users/:id` – Get user details by ID.

## Installation
1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd <project-folder>
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set environment variables in a `.env` file:
   ```env
   JWT_SECRET_KEY=your-secret-key
   ```
4. Start the server:
   ```sh
   npm start
   ```

## Usage
- Register a user using `POST /users` with `name`, `email`, and `password`.
- Log in using `POST /users/login` to receive a JWT.
- Use the JWT as an `Authorization: Bearer <token>` header to access protected routes.

## Dependencies
- **Express** – Web framework for Node.js.
- **jsonwebtoken** – JWT implementation.
- **bcryptjs** – Secure password hashing.
- **fs-extra** – File system utilities for JSON storage.


