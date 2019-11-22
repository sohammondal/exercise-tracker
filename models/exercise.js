const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    userId: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date }
});

module.exports = mongoose.model('Exercise', exerciseSchema);