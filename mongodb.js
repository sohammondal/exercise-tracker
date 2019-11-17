const mongoose = require('mongoose');
module.exports = {
    mongoose,
    connect: (url) => {
        mongoose.connect(url, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        }, () => {
            console.log("MONGODB CONNECTED");
        });
    },
    disconnect: (done) => {
        mongoose.disconnect(done);
    },
};