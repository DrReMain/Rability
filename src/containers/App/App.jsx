import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Switch, Route } from 'react-router-dom';
import Helmet from 'react-helmet';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import './global.less';
import styles from './App.less';

const helmetConf = {
  titleTemplate: 'App: %s',
  meta: [{ charset: 'utf-8' }]
};

const renderRoutes = (routes, extraProps = {}, switchProps = {}) =>
  routes ? (
    <Switch {...switchProps}>
      {routes.map((route, i) => (
        <Route
          key={route.key || i}
          path={route.path}
          exact={route.exact}
          strict={route.strict}
          render={props =>
            route.render ? (
              route.render({ ...props, ...extraProps, route })
            ) : (
              <route.component {...props} {...extraProps} route={route} />
            )
          }
        />
      ))}
    </Switch>
  ) : null;

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
      <div className={styles.app}>
        {/* 此类名固定，不可更改 */}
        {/* meta info */}
        <Helmet {...helmetConf} />
        {/*  header nav */}
        <header className="header-default" />
        <main className="main-default">
          <TransitionGroup>
            <CSSTransition key={location.key} classNames="route" timeout={450} appear>
              {renderRoutes(route.routes, { extraProp: null }, { location })}
            </CSSTransition>
          </TransitionGroup>
        </main>
        {/* footer nav */}
        <footer className="footer-default" />
      </div>
    );
  }
}
