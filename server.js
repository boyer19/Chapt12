let express = require('express')
let api_routes = require('./routes/api.js')

// Create web application
let app = express()

// Handle requests with JSON requests, convert data to JavaScript
app.use(express.json())

app.use('/api', api_routes)

app.use(function(req, res, next) {
    // respond with a 404 to any other requests
    res.status(404).send('Not found')
})

app.use(function(err, req, res, next){
    console.error(err.stack)
    res.status(500).send('Server error')            // 500 is general server error
})

// Start server running
let server = app.listen(process.env.PORT || 3000, function(){                       // .env is an environment variable called PORT
    console.log('Express server running on port ', server.address().port )
})




