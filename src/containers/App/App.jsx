import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { renderRoutes } from 'react-router-config';
import Helmet from 'react-helmet';

const helmetConf = {
  titleTemplate: 'App: %s',
  meta: [{ charset: 'utf-8' }]
};

@connect()
@withRouter
export default class App extends Component {
  static propTypes = {
    route: PropTypes.objectOf(PropTypes.any).isRequired
  };

  render() {
    const { route } = this.props;
    return (
      <div className="demo">
        <Helmet {...helmetConf} />
        <main>{renderRoutes(route.routes)}</main>
      </div>
    );
  }
}
