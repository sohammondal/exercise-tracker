const app = require('./app');
const { NODE_ENV, MLAB_URI, PORT } = process.env;
const { connect, mongoose } = require('./mongodb');

try {
  if (NODE_ENV !== "TEST") {
    connect(MLAB_URI); // Connect to MongoDB
    mongoose.set('debug', NODE_ENV === "DEV"); // Set Debug mode in DEV env
  }
} catch (e) {
  console.error(e.message);
}

const listener = app.listen(PORT || 3000, () => {
  console.log('SERVER LISTENING ON PORT ' + listener.address().port);
})