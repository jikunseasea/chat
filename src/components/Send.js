import React, { Component } from 'react';

const Send = ({ handleSend, isDisabledSend, handleChangeSend, typingValue }) => (
  <form className="send" onSubmit={handleSend}>
    <div className="input-group full-height">
      <input className="form-control full-height-change" onChange={handleChangeSend} value={typingValue}/>
      <span className="input-group-btn">
        <button
          className="btn btn-info full-height-change"
          disabled={isDisabledSend}
          // onClick={handleSend}
        >Send</button>
      </span>
    </div>
  </form>
);

export default Send;