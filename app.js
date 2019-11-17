require('dotenv').config();
const express = require('express'),
    app = express(),
    cors = require('cors'),
    NODE_ENV = process.env.NODE_ENV,
    routes = require('./routes/route'),
    { requestLogger, timeLogger } = require('./middlewares');

// Enable CORS
app.use(cors());
app.use(express.json());


// View
app.use(express.static('public'))
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
});

if (NODE_ENV === 'TEST') {
    app.use('/api/exercise', routes);
} else {
    // User Middleware loggers in DEV/PROD
    app.use(timeLogger);
    app.use('/api/exercise', requestLogger, routes);
}


module.exports = app;