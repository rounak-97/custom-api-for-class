# Custom API for React Class

A RESTful backend API built with **Node.js, Express, MongoDB, and Swagger**, providing authentication and student CRUD operations for applications.

**Live Swagger Docs**  
---------> ""

---

## Features
- JWT-based authentication
- Student CRUD APIs (protected)
- Input validation (Joi)
- Swagger UI documentation
- MongoDB Atlas + Render deployment

---

## Tech Stack
Node.js • Express • MongoDB • JWT • Swagger • Render

---

## API Endpoints

### Auth
- POST `/api/auth/register`
- POST `/api/auth/login`
- GET `/api/auth/profile` (JWT)

### Students (JWT)
- POST `/api/students/create`
- GET `/api/students/all`
- PUT `/api/students/update/{id}`
- DELETE `/api/students/delete/{id}`

---

## Environment Variables
```
PORT
MONGODB_URI
JWT_SECRET
```

---

## Author
**Rounak Kantha**