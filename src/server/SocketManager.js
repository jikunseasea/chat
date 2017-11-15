const _ = require('lodash');


const io = require('./index.js').io;

const {
  VERIFY_USER,
  USER_CONNECTED,
  LOGOUT
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

let connectedUser = {};

module.exports = (socket) => {
  console.log(`Socket id = ${socket.id}`);


  // socket.on(VERIFY_USER, (name, fn = () => {}) => {
  //   if (isUser(connectedUser, name)) {
  //     fn({ isUser: true });
  //   } else {
  //     const user = createUser({ name });
  //     fn({ isUser: false, user });
  //   }
  // });

  socket.on(VERIFY_USER, (name, fn) => {
    fn(isValidUser(connectedUser, name));
  });

  // socket.on(SET_USER, (name, fn) => {
  //   fn(createUser({ name }));
  // })

  socket.on(USER_CONNECTED, (user) => {
    connectedUser = addUser(connectedUser, user);

    console.log(connectedUser);
  })
};

const addUser = (userList, user) => _.assign({}, userList, { [user.name]: user });
const removeUser = (userList, username) => _.omit(userList, username);
// const isUser = (userList, username) => username in userList;
const isUser = (userList, username) => {
  const isExisted = _.hasIn(userList, username)
  if (isExisted) {
    return { isValid: false, kind: EXISTED }
  }
  return { isValid: true };
};
const isValidUser = (userList, username) => {
  if (!username) return { isValid: false, kind: EMPTY };
  return isUser(userList, username);
};