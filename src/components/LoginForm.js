import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { VERIFY_USER } from '../constants/Events';

import { setNickname, setLoginError } from '../actions/RootActions';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   nickname: '',
    //   error: ''
    // };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { socket, nickname } = this.props;
    // const { nickname } = this.state;
    socket.emit(VERIFY_USER, nickname, this.setUser);
  }

  setUser({ isUser, user }) {
    console.log('====================================');
    console.log(isUser, user);
    console.log('====================================');
    const { setLoginError } = this.props;
    if (isUser) {
      // this.setError('User name taken');
      setLoginError('User name taken');
    } else {
      this.props.setUser(user);
      // this.setError('');
      setLoginError('');
    }
  }

  handleChange(e) {
    e.preventDefault();
    // this.setState({ nickname: this.textInput.value });
    const { setNickname } = this.props;
    setNickname(this.textInput.value);
  };

  // setError(error) {
  //   this.setState({ error });
  // }

  render() {
    // const { nickname, error } = this.state;
    const { nickname, loginError } = this.props;
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
          <div className="error">{loginError?loginError:null}</div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  nickname: state.nickname,
  loginError: state.loginError
});
const mapDispatchProps = dispatch => bindActionCreators({
  setNickname,
  setLoginError
}, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(LoginForm);
