# JWT Based Authentication

A backend API server built with Node.js and Express.js, designed to handle user authentication, login, and account management. The project also integrates Redis for caching and rate limiting to enhance security and performance.

## Features

- User authentication with multiple methods (OTP, password).
- Secure email and password update functionalities.
- Token-based access management with refresh tokens.
- Developer-specific tools like OTP generation.
- Swagger API documentation for easier integration.

## Table of Contents

- [Installation](#installation)
- [Available Scripts](#available-scripts)
- [API Documentation](#api-documentation)
- [Dependencies](#dependencies)
- [Rate Limiting with Redis](#rate-limiting-with-redis)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mohsen104/JWT-Based-Authentication.git
   cd JWT-Based-Authentication
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install and run Redis:
   - Follow the [Redis installation guide](https://redis.io/docs/getting-started/installation/).
   - Start the Redis server:
     ```bash
     redis-server
     ```

4. Create a `.env` file in the root directory with the following content:
   ```env
   NODE_ENV
   PORT
   MONGO_URI
   COOKIE_PARSER_SECRET_KEY
   JWT_SECRET_KEY
   ```

## Available Scripts

- **Start in Development Mode**:
  ```bash
  npm run dev
  ```
- **Start in Production Mode**:
  ```bash
  npm start
  ```

## API Documentation

Swagger documentation is available at:
```
http://localhost:3000/api-docs
```

### Key Endpoints

#### User Routes
- **POST** `/user/authentication` - Authenticate a user.
- **POST** `/user/login/otp` - Login using OTP.
- **POST** `/user/login/password` - Login using password.
- **POST** `/user/email/update` - Update email.
- **POST** `/user/password/update` - Update password.
- **GET** `/user/accessToken` - Get a new access token using refresh token.
- **GET** `/user/logout` - Logout user.

#### Developer Routes
- **POST** `/dev/loginMethod` - Fetch login methods.
- **GET** `/dev/generateCodeOtp` - Generate an OTP code.

## Dependencies

### Main
- **bcryptjs**: For password hashing.
- **cookie-parser**: Parsing cookies in requests.
- **cors**: Handling cross-origin resource sharing.
- **express**: Web framework for Node.js.
- **express-rate-limit**: Middleware for rate limiting.
- **helmet**: Security headers for Express apps.
- **joi**: Schema validation.
- **jsonwebtoken**: JSON Web Token for authentication.
- **mongoose**: MongoDB object modeling.
- **morgan**: HTTP request logger.
- **rate-limit-redis**: Redis-backed rate limiting.
- **redis**: Redis client for caching and rate limiting.

### Dev
- **dotenv**: For environment variable management.
- **nodemon**: Auto-restart server during development.
- **swagger-jsdoc**: Generate Swagger definitions.
- **swagger-ui-express**: Swagger UI middleware for Express.

## Rate Limiting with Redis

This project uses **Redis** with `rate-limit-redis` for advanced rate limiting:
- Redis acts as a store for request counts.
- Provides a high-performance solution to prevent abuse of the API.