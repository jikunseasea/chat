import React, { Component } from 'react';

import { VERIFY_USER } from '../constants/Events';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: '',
      error: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { socket } = this.props;
    const { nickname } = this.state;
    socket.emit(VERIFY_USER, nickname, this.setUser);
  }

  setUser({ isUser, user }) {
    console.log(isUser, user);
    if (isUser) {
      this.setError('User name taken');
    } else {
      this.props.setUser(user);
      this.setError('');
    }
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ nickname: this.textInput.value });
  };

  setError(error) {
    this.setState({ error });
  }

  render() {
    const { nickname, error } = this.state;
    return (
      <div className="login">
        <form onSubmit={this.handleSubmit} className="login-form">
          <h2><label htmlFor="nickname">Got a nickname?</label></h2>
          <input
            ref={input => this.textInput = input}
            id="nickname"
            value={nickname}
            onChange={this.handleChange}
            placeholder="My cool username"
          />
          <div className="error">{error?error:null}</div>
        </form>
      </div>
    );
  }
}

export default LoginForm;
