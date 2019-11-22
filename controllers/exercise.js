const User = require('../models/user');
const Exercise = require('../models/exercise');
const shortid = require('shortid');

module.exports = {
    addExerciseToUser: (userId, description, duration, date) => {
        return new Promise(async (resolve, reject) => {
            const user = await User.findById(userId);
            if (!user) {
                return reject({
                    status: 404,
                    message: `User with id ${userId} not found`
                })
            }
            const exercise = new Exercise({
                _id: shortid(),
                userId,
                description,
                duration,
                date: date ? date : Date.now()
            });
            await exercise.save();
            return resolve(exercise);
        });
    },
    getExerciseLogsOfUser: (userId, from, to, limit) => {
        return new Promise(async (resolve, reject) => {
            const user = await User.findById(userId);
            if (!user) {
                return reject({
                    status: 404,
                    message: `User with id ${userId} not found`
                })
            }
            const exercises = await Exercise.find({
                userId
            }).where('date').gt(new Date(from || '1000')).lt(new Date(to || '9999')).limit(limit || 0);
            return resolve({
                _id: user._id,
                username: user.username,
                count: exercises.length,
                log: exercises
            })
        });
    }

}