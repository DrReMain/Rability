import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

@connect()
export default class Home extends Component {
  render() {
    return (
      <div className="home">
        <Helmet title="Home" />
        <h1>HOME</h1>
      </div>
    );
  }
}
