const mongoose = require('mongoose');
module.exports = {
    mongoose,
    connect: (url) => {
        console.log(url);
        mongoose.connect(url, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        }, (err) => {
            if (err) {
                console.error(err.name, err.message);
            } else {
                console.log("MONGODB CONNECTED");
            }
        });
    },
    disconnect: (done) => {
        mongoose.disconnect(done);
    },
};