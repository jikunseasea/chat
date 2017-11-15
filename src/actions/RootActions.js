import {
  SET_SOCKET,
  SET_USER,
  SET_LOGIN_ERROR,
  SET_NICKNAME
} from '../constants/ActionName';

export const setSocket = socket => ({ type: SET_SOCKET, socket});

export const setUser = user => ({ type: SET_USER, user});

export const setLoginError = loginError => ({ type: SET_LOGIN_ERROR, loginError});

export const setNickname = nickname => ({ type: SET_NICKNAME, nickname});
