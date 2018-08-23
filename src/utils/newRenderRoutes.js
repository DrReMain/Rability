/**
 * 由于react-router-config库中 renderRoutes组件 缺失switchProps配置项
 * */
import React from 'react';
import { Switch, Route } from 'react-router-dom';

const renderRoutes = (routes, extraProps = {}, switchProps = {}) => routes ? (
  <Switch {...switchProps}>
    {routes.map((route, i) => (
      <Route
        key={route.key || i}
        path={route.path}
        exact={route.exact}
        strict={route.strict}
        render={props => (route.render ? route.render({ ...props, ...extraProps, route }) : <route.component {...props} {...extraProps} route={route} />)}
      />
    ))}
  </Switch>
) : null;

export default renderRoutes;
