import React, { Component } from 'react';

const Send = ({ username, socket, isDisabledSend, handleChangeSend }) => {
  let textInput = null;
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  // const renderSendBtn = (value) => {
  //   return value === '' ? 
  // }
  return (
    <form className="send" onSubmit={handleSubmit}>
      <div className="input-group full-height">
        <input className="form-control full-height-change" onChange={handleChangeSend} />
        <span className="input-group-btn">
          <button
            className="btn btn-info full-height-change"
            disabled={isDisabledSend}>Send</button>
        </span>
      </div>
    </form>
  )
};

export default Send;