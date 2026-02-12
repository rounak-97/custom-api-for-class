const express = require('express')
require('dotenv').config({quiet: true})

// Swagger Setup
const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerOptions = require('./swagger/swagger.json')

// Database Connection
const DBConnection = require('./app/config/DBConnection')

// Initialize Express app
const app = express()

// CORS Middleware
const cors = require("cors");

app.use(
    cors({
        origin: [
            "http://localhost:3000",   // React dev
            "http://localhost:5173",   // Vite React
            "https://custom-api-for-react-class.onrender.com"
        ],
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"]
    })
);


// Middleware to parse JSON requests
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Database connection
DBConnection()

// Basic Health Check Route
app.get('/', (req, res) => {
    res.send('API is running...')
})

// Import Routes
const authRoutes = require('./app/routes/AuthRoutes')
const studentRoutes = require('./app/routes/StudentRoutes')

// Use Routes
app.use('/api/auth', authRoutes)
app.use('/api/students', studentRoutes)

// Swagger Setup
const swaaggerDocs = swaggerJsdoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaaggerDocs))


module.exports = app