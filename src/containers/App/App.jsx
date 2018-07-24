import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import newRenderRoutes from '../../utils/newRenderRoutes';

import './global.less';
import './App.less';

const helmetConf = {
  titleTemplate: 'App: %s',
  meta: [{ charset: 'utf-8' }]
};

@connect()
@withRouter
export default class App extends Component {
  static propTypes = {
    route: PropTypes.objectOf(PropTypes.any).isRequired,
    location: PropTypes.objectOf(PropTypes.any).isRequired
  };

  render() {
    const { route, location } = this.props;
    return (
      <div className="app">
        <Helmet {...helmetConf} />
        <div className="route-container">
          <TransitionGroup>
            <CSSTransition key={location.key} classNames="route" timeout={350}>
              {newRenderRoutes(route.routes, { visible: true }, { location })}
            </CSSTransition>
          </TransitionGroup>
        </div>
      </div>
    );
  }
}
