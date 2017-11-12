const io = require('./index.js').io;

module.exports = (socket) => {
  console.log(`Socket id = ${socket.id}`);
};