const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, default: new Date().toLocaleDateString('en-GB', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }) }
});

module.exports = mongoose.model('Exercise', exerciseSchema);