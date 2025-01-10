# uber
# Backend API Documentation

This repository contains a backend system for user authentication and profile management, built using Node.js, Express, and MongoDB.

## Features
- User registration
- User login
- Profile management
- Secure password hashing
- Token-based authentication
- User logout

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   ```
2. Navigate to the project directory:
   ```bash
   cd your-repo-name
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory and add the following environment variables:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=your_preferred_port
   ```

## Usage
1. Start the server:
   ```bash
   npm start
   ```
2. The API will be available at `http://localhost:<PORT>` (default is `3000`).

## API Endpoints

### User Endpoints

#### Register User
**POST** `/users/register`

**Request Body:**
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

**Response:**
```json
{
  "token": "jwt-token",
  "user": {
    "_id": "user-id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

---

#### Login User
**POST** `/users/login`

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

**Response:**
```json
{
  "token": "jwt-token",
  "user": {
    "_id": "user-id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

---

#### Get User Profile
**GET** `/users/profile`

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "_id": "user-id",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com"
}
```

---

#### Logout User
**GET** `/users/logout`

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "message": "Logged Out"
}
```

## Project Structure
- **models/**: Contains Mongoose schemas for database models
- **routes/**: Defines API routes
- **controllers/**: Handles API logic
- **services/**: Contains reusable business logic
- **middlewares/**: Authentication and other middleware functions

## License
This project is licensed under the MIT License.

