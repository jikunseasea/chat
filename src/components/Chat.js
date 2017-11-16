import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setIsEmptySend } from '../actions/RootActions';
import './Chat.css';

import Welcome from './Welcome';
import Messages from './Messages';
import Send from './Send';



class Chat extends Component {
  constructor(props) {
    super(props);
    this.handleChangeSend = this.handleChangeSend.bind(this);
  }

  handleChangeSend(e) {
    const { setIsEmptySend } = this.props;
    if (e.target.value === '') {
      setIsEmptySend(true);
    } else {
      setIsEmptySend(false);
    }
  }

  render() {
    const { username, socket, isEmptySend } = this.props;
    return (
      <div className="fluid-container chat">
        <Welcome username={username} />
        <Messages />
        <Send
          username={username}
          socket={socket}
          isDisabledSend={isEmptySend}
          handleChangeSend={this.handleChangeSend} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  socket: state.socket,
  isEmptySend: state.isEmptySend
});
const mapDispatchToProps = dispatch => bindActionCreators({
  setIsEmptySend
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Chat);