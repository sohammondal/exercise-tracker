require('dotenv').config();
const express = require('express'),
    app = express(),
    cors = require('cors'),
    mongoose = require('mongoose'),
    routes = require('./routes/route');


// Connect to MongoDB
try {
    mongoose.connect(process.env.MLAB_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }, () => console.log("MONGODB CONNECTED"));

    // Set Debug mode in DEV env
    mongoose.set('debug', process.env.NODE_ENV === "DEV");
} catch (e) {
    console.error(e.message);
}



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