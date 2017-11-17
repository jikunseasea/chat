const _ = require('lodash');


const io = require('./index.js').io;

const {
  VERIFY_USER,
  USER_CONNECTED,
  USER_DISCONNECTED,
  OTHER_DISCONNECTED
} = require('../constants/Events');
const {
  EMPTY,
  EXISTED
} = require('../constants/LoginError');

const {
  createUser,
  createMessage,
  createChat
} = require('../Factory');

let connectedUsers = {};
// let messages = [];

module.exports = (socket) => {
  console.log(`Socket id = ${socket.id}`);

  socket.on(VERIFY_USER, (name, fn) => {
    fn(isValidUser(connectedUsers, name));
  });

  socket.on(USER_CONNECTED, (user) => {
    connectedUsers = addUser(connectedUsers, user);
    console.log(connectedUsers);
  })

  socket.on(USER_DISCONNECTED, (username) => {
    connectedUsers = removeUser(connectedUsers, username);
    console.log(connectedUsers);
    socket.broadcast.emit(OTHER_DISCONNECTED, username);
  })
};

const addUser = (userList, user) => _.assign({}, userList, { [user.name]: user });

const removeUser = (userList, username) => _.omit(userList, username);

// const isUser = (userList, username) => username in userList;
const isExistedUser = (userList, username) => {
  const isExisted = _.hasIn(userList, username)
  if (isExisted) {
    return { isValid: false, kind: EXISTED }
  }
  return { isValid: true };
};
const isValidUser = (userList, username) => {
  if (!username) return { isValid: false, kind: EMPTY };
  return isExistedUser(userList, username);
};