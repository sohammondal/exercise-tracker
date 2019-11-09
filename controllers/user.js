const mongoose = require('mongoose');
const User = require('../models/user');
const shortid = require('shortid');


module.exports = {
    addUser: (username) => {
        return new Promise(async (resolve, reject) => {
            try {
                let user = await User.find({ username });
                if (user.length > 0) {
                    reject({
                        status: 409,
                        message: 'Username already exists'
                    })
                } else {
                    user = new User({
                        _id: shortid.generate(),
                        username
                    });
                    user = await user.save();
                    resolve(user);
                }
            } catch (error) {
                console.error(error.message);
                reject();
            }
        })
    },
    deleteUser: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await User.findOneAndDelete({ _id: id });
                if (user) {
                    resolve();
                } else {
                    reject({
                        status: 404,
                        message: 'User not found'
                    })
                }
            } catch (error) {
                console.error(error.message);
                reject();
            }
        })
    }
}