import React, { Component } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setSocket, setUser } from '../actions/RootActions';

import {
  USER_CONNECTED,
  LOGOUT
} from '../constants/Events';


import LoginForm from './LoginForm';

const socketURL = "http://localhost:3231";

class Layout extends Component {
  constructor(props) {
    super(props);
    this.setUser = this.setUser.bind(this);
  }

  componentWillMount() {
    this.initSocket();
  }

  initSocket = () => {
    const socket = io(socketURL);
    socket.on('connect', () => {
      console.log('Connected');
    });
    const { setSocket } = this.props;
    setSocket(socket);
  };

  setUser = (user) => {
    const { socket, setUser } = this.props;
    socket.emit(USER_CONNECTED, user);
    setUser(user);
  }

  logout = () => {
    const { socket, setUser } = this.props;
    socket.emit(LOGOUT);
    setUser(null);
  }

  render() {
    const { socket } = this.props;
    return (
      <div className="container">
        <LoginForm socket={socket} setUser={this.setUser}/>
      </div>
    );
  }
}

const mapStateToProps = state => ({ socket: state.socket });

const mapDispatchToProps = dispatch => bindActionCreators({
  setSocket,
  setUser
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Layout);