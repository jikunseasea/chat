import {
  SET_SOCKET,
  SET_USER,
  SET_LOGIN_ERROR,
  SET_IS_CONNECTED,
  SET_IS_EMPTY_SEND,
  POST_MSG,
  SET_TYPING_VALUE
} from '../constants/ActionName';

const uuidv4 = require('uuid/v4');

const { getTime } = require('../Factory'); 


export const setSocket = socket => ({ type: SET_SOCKET, socket});

export const setUser = user => ({ type: SET_USER, user});

export const setLoginError = loginError => ({ type: SET_LOGIN_ERROR, loginError});

export const setIsConnected = isConnected => ({ type: SET_IS_CONNECTED, isConnected });

export const setIsEmptySend = isEmptySend => ({ type: SET_IS_EMPTY_SEND, isEmptySend });

export const postMsg = ({ senderName, content, color }) => ({
  type: POST_MSG,
  senderName,
  content,
  color,
  id: uuidv4(),
  receivedAt: getTime(new Date())
});

export const setTypingValue = typingValue => ({ type: SET_TYPING_VALUE, typingValue});