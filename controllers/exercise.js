const User = require('../models/user');
const Exercise = require('../models/exercise');

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
            const locale = 'en-GB';
            const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }
            const exercise = new Exercise({
                userId,
                description,
                duration,
                date: date ? new Date(date).toLocaleDateString(locale, options) : new Date().toLocaleDateString(locale, options)
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
        });
    }

}