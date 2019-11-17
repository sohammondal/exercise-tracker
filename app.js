require('dotenv').config();
const express = require('express'),
    app = express(),
    cors = require('cors'),
    routes = require('./routes/route');

// Enable CORS
app.use(cors());
app.use(express.json());


// View
app.use(express.static('public'))
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
});


app.use('/api/exercise', routes);

module.exports = app;