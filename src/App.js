import React, { Component } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

import { setSocket, setUser } from './actions/RootActions';

import {
  USER_CONNECTED,
  LOGOUT
} from './constants/Events';


import LoginForm from './components/LoginForm';
import Chat from './components/Chat';

const socketURL = "http://localhost:3231";

// const Test = (outterProps) => {
//   console.log(outterProps);
//   return (
//     <Route p2={2} render={(props) => {
//       console.log(props);
//       return <div></div>;
//     }}/>
//   )
// };

class App extends Component {
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
      <Router>
        <div>
          <Route exact path="/" render={() => <LoginForm socket={socket} setUser={this.setUser} />} />
          <Route path="/:username" render={({ match }) => <Chat username={match.params.username} />} />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({ socket: state.socket });

const mapDispatchToProps = dispatch => bindActionCreators({
  setSocket,
  setUser
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
