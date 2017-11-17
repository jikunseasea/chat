import { combineReducers } from "redux";

import {
  SET_SOCKET,
  SET_USER,
  SET_LOGIN_ERROR,
  SET_IS_CONNECTED,
  SET_IS_EMPTY_SEND,
  SET_IS_LOGINED,
  POST_MSG,
  SET_TYPING_VALUE
} from '../constants/ActionName';

const socket = (state = null, action) => {
  switch (action.type) {
    case SET_SOCKET: 
      return action.socket;
    default:
      return state;
  }
};

const user = (state = null, action) => {
  switch (action.type) {
    case SET_USER: 
      return action.user;
    default:
      return state;
  }
};

const loginError = (state = '', action) => {
  switch (action.type) {
    case SET_LOGIN_ERROR: 
      return action.loginError;
    default:
      return state;
  }
};

const isConnected = (state = false, action) => {
  switch (action.type) {
    case SET_IS_CONNECTED: 
      return action.isConnected;
    default:
      return state;
  }
}

const isEmptySend = (state = true, action) => {
  switch (action.type) {
    case SET_IS_EMPTY_SEND: 
      return action.isEmptySend;
    default:
      return state;
  }
}

const msgs = (state = [], action) => {
  switch (action.type) {
    case POST_MSG:
      const { id, senderName, content, color, receivedAt } = action;
      const msg = {
        id,
        senderName,
        content,
        color,
        receivedAt
      };
      return [...state, msg];
    default:
      return state;
  }
}

const typingValue = (state = '', action) => {
  switch (action.type) {
    case SET_TYPING_VALUE:
      return action.typingValue;
    default:
      return state;
  }
}

export default combineReducers({
  socket,
  user,
  loginError,
  isConnected,
  isEmptySend,
  msgs,
  typingValue
});