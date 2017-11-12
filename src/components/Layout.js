import React, { Component } from 'react';
import io from 'socket.io-client';

const socketURL = "https://localhost:3231";

class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      socket: null
    };
  }

  initSocket = () => {
    const socket = io(socketURL);
    socket.on('connect', () => {});
    this.setState({ socket });
  };

  render() {
    const { title } = this.props;
    return (
      <div className="container">
        {title}
      </div>
    );
  }
}

export default Layout;