// import React, { Component } from 'react';

// class Messages extends Component {
//   render() {
//     return <div className="messages"></div>;
//   }
// }

import React from 'react';

const Messages = ({ msgs }) => {
  const getInfo = msg => {
    const { receivedAt, senderName, content } = msg;
    return `${receivedAt} ${senderName}: ${content}`;
  }

  const getColor = msg => ({ color: msg.color});

  const mapMsgsToLi = msgs => (
    msgs.map((msg, i) => <li key={i} style={getColor(msg)}>{getInfo(msg)}</li>)
  );

  return (
    <ul className="messages">
      {mapMsgsToLi(msgs)}
    </ul>
  );
};

export default Messages;