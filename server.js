let express = require('express')
let api_routes = require('./routes/api.js')

// Create web application
let app = express()

// Handle requests with JSON requests, convert data to JavaScript
app.use(express.json())

app.use('/api', api_routes)

// Start server running
let server = app.listen(process.env.PORT || 3000, function(){                       // .env is an environment variable called PORT
    console.log('Express server running on port ', server.address().port )
})




