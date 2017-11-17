import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

import {
  setIsEmptySend,
  setUser,
  setIsConnected,
  postMsg,
  setTypingValue
} from '../actions/RootActions';

import {
  USER_DISCONNECTED,
  OTHER_DISCONNECTED
} from '../constants/Events';

import { LEFT, OTHER_INFO, SELF_INFO } from '../constants/Msgs';

import './Chat.css';

import Welcome from './Welcome';
import Messages from './Messages';
import Send from './Send';



class Chat extends Component {
  constructor(props) {
    super(props);
    this.handleChangeSend = this.handleChangeSend.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleSend = this.handleSend.bind(this);
    this.handleOtherLogout = this.handleOtherLogout.bind(this);
  }

  componentDidMount() {
    // const { socket, handleOtherLogout } = this.props;
    const { socket } = this.props;
    socket.on(OTHER_DISCONNECTED, this.handleOtherLogout);
  }

  componentWillUnmount() {
    // const { socket, handleOtherLogout } = this.props;
    const { socket } = this.props;
    socket.off(OTHER_DISCONNECTED, this.handleOtherLogout);
  }


  handleChangeSend(e) {
    const { setIsEmptySend, setTypingValue } = this.props;
    setTypingValue(e.target.value);
    if (e.target.value === '') {
      setIsEmptySend(true);
    } else {
      setIsEmptySend(false);
    }
  }

  handleLogout() {
    const { setIsEmptySend, setUser, setIsConnected, socket, username } = this.props;
    setIsEmptySend(true);
    setUser(null);
    setIsConnected(false);
    socket.emit(USER_DISCONNECTED, username);
  }

  handleOtherLogout(otherUsername) {
    const { postMsg } = this.props;
    postMsg({
      senderName: otherUsername,
      content: LEFT.info,
      color: LEFT.color
    });
    console.log(otherUsername);
  }

  /// Todo
  // handleOtherLogout(otherUsername) {
  //   const { postMsg } = this.props;
  //   postMsg({
  //     senderName: otherUsername,
  //     content: LEFT.info,
  //     color: LEFT.color
  //   });
  // }
  
  handleSend(e, input) {
    e.preventDefault();
    const { username, postMsg, setIsEmptySend, setTypingValue } = this.props;
    postMsg({
      senderName: username,
      content: e.target.value,
      color: SELF_INFO.color
    });
    setTypingValue('');
    setIsEmptySend(true);
  }

  render() {
    const { username, socket, isEmptySend, isConnected, msgs, typingValue } = this.props;

    if (!isConnected) {
      return <Redirect to="/" />
    }
    return (
      <div className="fluid-container chat">
        <Welcome username={username} handleLogout={this.handleLogout} />
        <Messages
          socket={socket}
          msgs={msgs}
          handleOtherLogout={this.handleOtherLogout} />
        <Send
          username={username}
          socket={socket}
          isDisabledSend={isEmptySend}
          handleChangeSend={this.handleChangeSend}
          handleSend={this.handleSend}
          typingValue={typingValue} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  socket: state.socket,
  isEmptySend: state.isEmptySend,
  isConnected: state.isConnected,
  msgs: state.msgs,
  typingValue: state.typingValue
});
const mapDispatchToProps = dispatch => bindActionCreators({
  setIsEmptySend,
  setUser,
  setIsConnected,
  postMsg,
  setTypingValue
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Chat);