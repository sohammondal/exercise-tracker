const User = require('../models/user');
const Exercise = require('../models/exercise');

module.exports = {
    addExerciseToUser: (userId, description, duration, date) => {
        return new Promise(async (resolve, reject) => {
            const user = await User.findById(userId);
            console.log(user);
            if (!user) {
                return reject({
                    status: 404,
                    message: `User with id ${userId} not found`
                })
            }
            const exercise = new Exercise({
                userId,
                description,
                duration,
                date: date ? new Date(date).toISOString() : new Date().toISOString()
            });
            await exercise.save();
            return resolve(exercise);
        });
    },

}