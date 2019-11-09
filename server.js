const listener = require('./app').listen(process.env.PORT || 3000, () => {
  console.log('SERVER LISTENING ON PORT ' + listener.address().port);
})