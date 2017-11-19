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
  OTHER_DISCONNECTED,
  OTHER_SENT,
  SELF_SENT
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
    this.handleSent = this.handleSent.bind(this);
    this.handleOtherLogout = this.handleOtherLogout.bind(this);
    this.handleOtherSent = this.handleOtherSent.bind(this);
  }

  componentDidMount() {
    const { socket } = this.props;
    socket.on(OTHER_DISCONNECTED, this.handleOtherLogout);
    socket.on(OTHER_SENT, this.handleOtherSent);
  }

  componentWillUnmount() {
    const { socket } = this.props;
    socket.off(OTHER_DISCONNECTED, this.handleOtherLogout);
    socket.off(OTHER_SENT, this.handleOtherSent);
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
    socket.emit(USER_DISCONNECTED, username);
    setIsEmptySend(true);
    setUser(null);
    setIsConnected(false);
  } 
  
  handleSent(e, input) {
    e.preventDefault();
    console.log(input);
    const { socket, username, postMsg, setIsEmptySend, setTypingValue } = this.props;
    postMsg({
      senderName: username,
      content: input.value,
      color: SELF_INFO.color
    });
    socket.emit(SELF_SENT, username, input.value);
    setIsEmptySend(true);
    setTypingValue('');
  }

  handleOtherLogout(otherUsername) {
    const { postMsg } = this.props;
    postMsg({
      senderName: otherUsername,
      content: LEFT.content,
      color: LEFT.color
    });
    // console.log(otherUsername);
  }

  handleOtherSent(otherUsername, content) {
    console.log(this);
    const { postMsg } = this.props;
    postMsg({
      senderName: otherUsername,
      content: content,
      color: OTHER_INFO.color
    });
  }
  


  render() {
    const { username, isEmptySend, isConnected, msgs, typingValue } = this.props;

    if (!isConnected) {
      return <Redirect to="/" />
    }
    return (
      <div className="fluid-container chat">
        <Welcome username={username} handleLogout={this.handleLogout} />
        <Messages msgs={msgs} />
        <Send
          isDisabledSend={isEmptySend}
          handleChangeSend={this.handleChangeSend}
          handleSent={this.handleSent}
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
