import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withClient } from '../../hoc';

@withClient
export default class About extends Component {
  static propTypes = {
    client: PropTypes.func.isRequired
  };

  request = async () => {
    const res = await this.props.client.get('https://api.github.com/users/octocat/gists');
    console.log(res);
  };

  render() {
    return (
      <div>
        <h1>About!!!!!!</h1>
        <button onClick={this.request}>request</button>
      </div>
    );
  }
}
