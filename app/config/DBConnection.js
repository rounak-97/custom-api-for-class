const mongoose = require('mongoose')

// Establish a connection to the MongoDB database
// App should not run if the DB connection fails

const DBConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            autoIndex: true
        })

        console.log('Database connected successfully')
    } catch (error) {
        console.error('Database connection failed:', error.message)
        process.exit(1) // Exit the application if DB connection fails
    }
}

module.exports = DBConnection