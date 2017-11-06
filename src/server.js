import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { matchRoutes, renderRoutes } from 'react-router-config';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import Cookies from 'universal-cookie';
import { fromJS } from 'immutable';

import configureStore from './store/configureStore';
import routes from './routes';
import { API_URI } from '../config/env';

async function fetchAllData(batch, dispatch, token) {
  // 请求初始数据的actions
  const needs =
      batch.map(({ route, match }) => {
        match.params = Object.assign({}, match.params, { token });
        return { component: route.component, params: match.params };
      }).
          filter(needComponent => needComponent.component.fetchData).
          reduce((prev, current) => {
            return current.component.fetchData(current.params).concat(prev);
          }, []).
          map(action => dispatch(action));

  return await Promise.all(needs);
}

function renderFullPage(renderedContent, initialState) {
  return `<!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="renderer" content="webkit">
      <title>Document</title>
      <meta name="description" content="">
      <meta name="keyword" content="">
      <link rel="stylesheet" href="/style.css"/>
    </head>
    <body>
      <!--[if lt IE 9]>
        <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
      <![endif]-->
      <div id="root">${renderedContent}</div>
      <script>
        window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
      </script>
      <script type="text/javascript" charset="utf-8" src="/vendor.js"></script>
      <script type="text/javascript" charset="utf-8" src="/bundle.js"></script>
    </body>
  </html>
  `;
}

export default function render(req, res) {
  const cookies = new Cookies(req.headers.cookie);
  const history = createMemoryHistory();
  const token = cookies.get('token') || null;
  const store = configureStore({}, history);
  const batch = matchRoutes(routes, req.url);

  return fetchAllData(batch, store.dispatch, token).then(function(data) {
    const context = {};
    const initialState = store.getState();
    const InitialView = (
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            {renderRoutes(routes)}
          </StaticRouter>
        </Provider>
    );
    const componentHTML = renderToString(InitialView);

    if (context.status === 404) {
      res.status(404);
    }
    if (context.status === 302) {
      return res.redirect(302, context.url);
    }

    if (_DEVSERVER) {
      res.set('Content-Type', 'text/html');
      return res.status(200).send(renderFullPage(componentHTML, initialState));
    }
    else {
      return res.render(
          'index',
          { __html__: componentHTML, __state__: JSON.stringify(initialState) });
    }

  }).catch(err => {
    if (_DEVSERVER) {
      res.set('Content-Type', 'text/html');
      return res.status(200).send(renderFullPage('', {}));
    }
    else {
      return res.render('index', { __html__: '', __state__: {} });
    }
  });
}
