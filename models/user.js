const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    username: { type: String, required: true },
    createdAt: { type: Date, default: new Date() }
})

module.exports = mongoose.model('ExerciseUser', userSchema);