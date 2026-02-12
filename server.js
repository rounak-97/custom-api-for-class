require('dotenv').config({quiet: true})

const app = require('./app')

// Define Port
const PORT = process.env.PORT || 5500

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})