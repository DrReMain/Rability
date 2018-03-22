import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { renderRoutes } from 'react-router-config';
import Helmet from 'react-helmet';
import { increment } from '../../redux/modules/demo';

const helmetConf = {
  titleTemplate: 'App: %s',
  meta: [{ charset: 'utf-8' }]
};

@connect(state => ({ demo: state.demo }), { increment })
@withRouter
export default class App extends Component {
  static propTypes = {
    route: PropTypes.objectOf(PropTypes.any).isRequired,
    demo: PropTypes.objectOf(PropTypes.number).isRequired,
    increment: PropTypes.func.isRequired
  };

  render() {
    const { route, demo, increment: add } = this.props;
    return (
      <div className="demo">
        <Helmet {...helmetConf} />
        <h1>{demo.count}</h1>
        <button onClick={add}>+</button>
        <section>{renderRoutes(route.routes)}</section>
      </div>
    );
  }
}
