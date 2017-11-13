import React, { Component } from 'react';
import io from 'socket.io-client';

import {
  USER_CONNECTED,
  LOGOUT
} from '../constants/Events';


import LoginForm from './LoginForm';

const socketURL = "http://localhost:3231";

class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      socket: null,
      user: null
    };

    this.serUser = this.setUser.bind(this);
  }

  componentWillMount() {
    this.initSocket();
  }

  initSocket = () => {
    const socket = io(socketURL);
    socket.on('connect', () => {
      console.log('Connected');
    });
    this.setState({ socket });
  };

  setUser = (user) => {
    const { socket } = this.state;
    socket.emit(USER_CONNECTED, user);
    this.setState({ user });
  }

  logout = () => {
    const { socket } = this.state;
    socket.emit(LOGOUT);
    this.setState({ user: null });
  }

  render() {
    const { title } = this.props;
    const { socket } = this.state;
    return (
      <div className="container">
        <LoginForm socket={socket} setUser={this.serUser}/>
      </div>
    );
  }
}

export default Layout;