module.exports = {
    requestLogger: (req, res, next) => {
        const { method, path, ip } = req;
        console.log(method, path, '-', ip);
        next();
    },
    timeLogger: (req, res, next) => {
        console.log('TIME -', new Date().toUTCString());
        next();
    }
}