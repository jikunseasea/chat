import { combineReducers } from "redux";

import {
  SET_SOCKET,
  SET_USER,
  SET_LOGIN_ERROR,
  SET_NICKNAME
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

// const nickname = (state = '', action) => {
//   switch (action.type) {
//     case SET_NICKNAME: 
//       return action.nickname;
//     default:
//       return state;
//   }
// };

const loginError = (state = '', action) => {
  switch (action.type) {
    case SET_LOGIN_ERROR: 
      return action.loginError;
    default:
      return state;
  }
};


export default combineReducers({
  socket,
  user,
  // nickname,
  loginError
});