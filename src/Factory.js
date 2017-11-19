const uuidv4 = require('uuid/v4');


/**
 * User type definition
 * @typedef {Object} User
 * @prop {string} id - User id
 * @prop {string} name - User name
 */

/**
 * Create a user
 * @param {Object}
 *   name {string} - An object contains NAME prop
 * @returns {User} - A created user
 */
const createUser = ({ name = '' } = {}) => ({
  id: uuidv4(),
  name
});


/**
 * Time type definition
 * @typedef {string} Time
 */
/**
 * Message type definition
 * @typedef {Object} Message
 * @prop {string} id - Message id
 * @prop {Time} time - Indicate the time when message sent
 * @prop {string} message - Message content
 * @prop {string} sender - Indicate the message sent from whom
 */

/**
 * Create a message
 * @param {object}
 *   message {string} - Message content
 *   sender {string} - Indicate the message sent from whom
 * @returns {Message}
 */
// const createMessage = ({
//   message = '',
//   sender = ''
// } = {}) => ({
//   id: uuidv4(),
//   time: getTime(new Date(Date.now())),
//   message,
//   sender
// });

/**
 * Chat type definition
 * @typedef {Object} Chat
 * @prop {string} id - Chat id
 * @prop {string} name - Chat name
 * @prop {...string} messages - Messages of the chat
 * @prop {...User} users - Users of the chat
 * @prop {...User} typingUsers - Users typing of the chat
 */

/**
 * Create a chat
 * @param {Object}
 *   messages {...string} - Messages of the chat
 *   name {string} - Chat name
 *   users {...User} - Users of the chat
 * @returns {Chat} - A created Chat object
 */
// const createChat = ({
//   messages = [],
//   name = '',
//   users = []
// } = {}) => ({
//   id: uuidv4(),
//   name,
//   messages,
//   users,
//   typingUsers: []
// });

const getTime = date => `${date.getHours()}:${("0"+date.getMinutes()).slice(-2)}:${("0"+date.getSeconds()).slice(-2)}`;


module.exports = {
  // createChat,
  // createMessage,
  createUser,
  getTime
};