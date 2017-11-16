import React, { Component } from 'react';

const Welcome = ({ username }) => (
  <div className="jumbotron welcome">
    <h3>Welcome, {username}</h3>
  </div>
);

export default Welcome;