const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    username: { type: String, required: true },
    createdAt: { type: Date, default: new Date().toLocaleDateString('en-GB', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }) }
})

module.exports = mongoose.model('ExerciseUser', userSchema);