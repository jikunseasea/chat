import React from 'react';

const Send = ({ handleSent, isDisabledSend, handleChangeSend, typingValue }) => {
  let textInput = null;
  return (
    <form className="send" onSubmit={e => handleSent(e, textInput)}>
      <div className="input-group full-height">
        <input className="form-control full-height-change"
          onChange={handleChangeSend}
          value={typingValue}
          ref={input => textInput = input} />
        <span className="input-group-btn">
          <button
            className="btn btn-info full-height-change"
            disabled={isDisabledSend}
            onClick={e => handleSent(e, textInput)}
          >Send</button>
        </span>
      </div>
    </form>
  );
}

export default Send;
