import React, { Component } from 'react';

const Welcome = ({ username, handleLogout }) => (
  <div className="jumbotron welcome">
    <h3 className="pull-left">Welcome, {username}</h3>
    <button
      className="pull-right btn btn-danger"
      onClick={handleLogout}>Logout</button>
  </div>
);

export default Welcome;