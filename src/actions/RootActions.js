import {
  SET_SOCKET,
  SET_USER,
  SET_LOGIN_ERROR,
  SET_IS_CONNECTED,
  SET_IS_EMPTY_SEND
} from '../constants/ActionName';

export const setSocket = socket => ({ type: SET_SOCKET, socket});

export const setUser = user => ({ type: SET_USER, user});

export const setLoginError = loginError => ({ type: SET_LOGIN_ERROR, loginError});

export const setIsConnected = isConnected => ({ type: SET_IS_CONNECTED, isConnected });

export const setIsEmptySend = isEmptySend => ({ type: SET_IS_EMPTY_SEND, isEmptySend });

// export const setNickname = nickname => ({ type: SET_NICKNAME, nickname});
