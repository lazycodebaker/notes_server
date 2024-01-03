# README: Advanced MikroORM Notes API

## Table of Contents
- [Introduction](#introduction)
- [Entities and Relationships](#entities-and-relationships)
- [API Endpoints](#api-endpoints)
  - [User Endpoints](#user-endpoints)
  - [Note Endpoints](#note-endpoints)
- [Getting Started](#getting-started)
- [Authentication](#authentication)
- [Usage Examples](#usage-examples)
- [Contributing](#contributing)
- [License](#license)

## Introduction
This README provides documentation for an advanced MikroORM-based Notes API. The API is designed to manage user accounts and notes with various functionalities like creating, updating, deleting notes, and sharing them between users.

## Entities and Relationships
The API consists of two main entities: `User` and `Note`. These entities are interconnected to establish relationships:

### User Entity
- **Attributes:**
  - `id` (Primary Key): The unique identifier of the user.
  - `username`: The username of the user.
  - `password`: The hashed password of the user.
  - `isLogged`: The login status of the user.
  - `salt`: The salt used for password hashing.
  - `createdAt`: The date and time the user was created.

- **Relationships:**
  - `ownedNotes`: One-to-Many relationship with `Note` for owned notes.
  - `sharedNotes`: Many-to-Many relationship with `Note` for shared notes.

### Note Entity
- **Attributes:**
  - `id` (Primary Key): The unique identifier of the note.
  - `title`: The title of the note.
  - `content`: The content of the note.
  - `createdAt`: The date and time the note was created.
  - `updatedAt`: The date and time the note was last updated.

- **Relationships:**
  - `owner`: Many-to-One relationship with `User` for note ownership.
  - `sharedWith`: Many-to-Many relationship with `User` for sharing notes.

## API Endpoints
The API exposes several endpoints for user and note management. Below is a summary of the available endpoints:

### User Endpoints
- **POST /api/auth/signup:**
  - Create a new user account.

- **POST /api/auth/login:**
  - Log in to an existing user account and receive an access token.

- **POST /api/auth/logout:**
  - Log out of the user account.

### Note Endpoints
- **GET /api/notes:**
  - Get a list of all notes for the authenticated user.

- **GET /api/notes/:id:**
  - Get a note by ID for the authenticated user.

- **POST /api/notes:**
  - Create a new note for the authenticated user.

- **PUT /api/notes/:id:**
  - Update an existing note by ID for the authenticated user.

- **DELETE /api/notes/:id:**
  - Delete a note by ID for the authenticated user.

- **POST /api/notes/:id/share:**
  - Share a note with another user for the authenticated user.

- **GET /api/search?q=:query:**
  - Search for notes based on keywords for the authenticated user.

## Getting Started
To get started with the API, follow these steps:

1. Install dependencies: `npm install`
2. Set up your database connection in `database/connector.ts`.
3. Run the application: `npm start`

## Authentication
Authentication is handled using JSON Web Tokens (JWT). Include the JWT token in the `Authorization` header for protected routes.

## Usage Examples
Here are some examples of how to interact with the API:

### Creating a new user account:
```bash
curl -X POST -H "Content-Type: application/json" -d '{"username": "example", "password": "securepassword"}' http://localhost:3000/api/auth/signup
```

### Logging in:
```bash
curl -X POST -H "Content-Type: application/json" -d '{"username": "example", "password": "securepassword"}' http://localhost:3000/api/auth/login
```

### Creating a new note:
```bash
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer <TOKEN>" -d '{"title": "New Note", "content": "This is the content."}' http://localhost:3000/api/notes
```



## Additional Updates (Not Completed)
I apologize for not being able to complete the full documentation as I ran out of time. I intended to provide more detailed information on error handling, response formats, and additional features like note categorization, versioning, and data validation. Feel free to extend the documentation with these details based on your implementation.
