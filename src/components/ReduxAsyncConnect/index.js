import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Route } from 'react-router';
import { trigger } from 'redial';
import NProgress from 'nprogress';
import asyncMatchRoutes from '../../utils/asyncMatchRoutes';

@withRouter
export default class ReduxAsyncConnect extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    history: PropTypes.objectOf(PropTypes.any).isRequired,
    location: PropTypes.objectOf(PropTypes.any).isRequired
  };

  state = {
    previousLocation: null
  };

  componentWillMount() {
    NProgress.configure({ trickleSpeed: 200 });
  }

  async componentWillReceiveProps(nextProps) {
    const {
      history, location, routes, store, providers
    } = this.props;
    const navigated = nextProps.location !== location;

    if (navigated) {
      // 保存位置,便于返回
      NProgress.start();
      this.setState({ previousLocation: location });
      // 加载数据
      const { components, match, params } = await asyncMatchRoutes(routes, nextProps.location.pathname);

      const triggerLocals = {
        ...providers,
        store,
        match,
        params,
        history,
        location: nextProps.location
      };

      await trigger('fetch', components, triggerLocals);
      if (__CLIENT__) {
        await trigger('defer', components, triggerLocals);
      }

      // 清除旧位置，渲染新页面
      this.setState({ previousLocation: null });
      NProgress.done();
    }
  }

  render() {
    const { children, location } = this.props;
    const { previousLocation } = this.state;

    return <Route location={previousLocation || location} render={() => children} />;
  }
}
