import fs from 'fs';
import path from 'path';
import http from 'http';
import express from 'express';
import morgan from 'morgan';
import favicon from 'serve-favicon';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import httpProxy from 'http-proxy';
import PrettyError from 'pretty-error';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { renderRoutes } from 'react-router-config';
import createMemoryHistory from 'history/createMemoryHistory';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';
import { trigger } from 'redial';

import config from '../config';
import createStore from '../src/redux/createStore';
import request from './utils/request';
import Html from '../src/utils/Html';
import routes from '../src/routes';
import { createApp } from '../src/app';
import getChunks, { waitChunks } from '../src/utils/getChunks';
import asyncMatchRoutes from '../src/utils/asyncMatchRoutes';
import { ReduxAsyncConnect, Provider } from '../src/components';

const chunksPath = path.join(__dirname, '..', 'static', 'dist', 'loadable-chunks.json');

process.on('unhandledRejection', error => console.error(error));

const pretty = new PrettyError();
const app = express();
const server = new http.Server(app);
const proxy = httpProxy.createProxyServer({
  target: config.proxyUrl,
  ws: true
});

app
  // webSocket的请求忽略log
  .use(morgan('dev', {
    skip: req => req.originalUrl.indexOf('/ws') !== -1
  }))
  .use(cookieParser())
  .use(compression())
  .use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')))
  // 读取移动APP.manifest配置文件
  .use('/manifest.json', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'static', 'manifest.json'));
  });

app.use('/dist/service-worker.js', (req, res, next) => {
  res.setHeader('Service-Worker-Allowed', '/');
  return next();
});

app.use('/dist/dlls/:dllName.js', (req, res, next) => {
  fs.access(
    path.join(__dirname, '..', 'static', 'dist', 'dlls', `${req.params.dllName}.js`),
    fs.constants.R_OK,
    err => (err ? res.send(`console.log('No dll file found (${req.originalUrl})')`) : next())
  );
});

app.use(express.static(path.join(__dirname, '..', 'static')));

app.use((req, res, next) => {
  res.setHeader('X-Forwarded-For', req.ip);
  return next();
});

// 转发api请求
app.use('/api', (req, res) => {
  proxy.web(req, res, { target: config.proxyUrl });
});

// 转发webSocket请求
app.use('/ws', (req, res) => {
  proxy.web(req, res, { target: `${config.proxyUrl}/ws` });
});

server.on('upgrade', (req, socket, head) => {
  proxy.ws(req, socket, head);
});

proxy.on('error', (error, req, res) => {
  if (error.code !== 'ECONNRESET') {
    console.error('proxy error', error);
  }
  if (!res.headersSent) {
    res.writeHead(500, { 'content-type': 'application/json' });
  }

  const json = { error: 'proxy_error', reason: error.message };
  res.end(JSON.stringify(json));
});

app.use(async (req, res) => {
  if (__DEVELOPMENT__) {
    global.webpackIsomorphicTools.refresh();
  }
  const providers = {
    client: request(req),
    app: createApp(req),
    restApp: createApp(req)
  };

  const history = createMemoryHistory({ initialEntries: [req.originalUrl] });
  const store = createStore({
    history,
    providers
  });

  function hydrate() {
    res.write('<!doctype html>');
    ReactDOMServer.renderToNodeStream(<Html assets={global.webpackIsomorphicTools.assets()} store={store} />).pipe(res);
  }

  if (__DISABLE_SSR__) {
    return hydrate();
  }

  try {
    const { components, match, params } = await asyncMatchRoutes(routes, req.originalUrl);
    await trigger('fetch', components, {
      ...providers,
      store,
      match,
      params,
      history,
      location: history.location
    });

    const modules = [];
    const context = {};
    const component = (
      <Loadable.Capture report={moduleName => modules.push(moduleName)}>
        <Provider store={store} {...providers}>
          <ConnectedRouter history={history}>
            <StaticRouter location={req.originalUrl} context={context}>
              <ReduxAsyncConnect routes={routes} store={store} providers={providers}>
                {renderRoutes(routes)}
              </ReduxAsyncConnect>
            </StaticRouter>
          </ConnectedRouter>
        </Provider>
      </Loadable.Capture>
    );
    const content = ReactDOMServer.renderToString(component);

    if (context.url) {
      return res.redirect(301, context.url);
    }

    const locationState = store.getState().router.location;
    if (req.originalUrl !== locationState.pathname + locationState.search) {
      return res.redirect(301, locationState.pathname);
    }

    const bundles = getBundles(getChunks(), modules);
    const html = (
      <Html assets={global.webpackIsomorphicTools.assets()} bundles={bundles} content={content} store={store} />
    );

    res.status(200).send(`<!doctype html>${ReactDOMServer.renderToString(html)}`);
  } catch (mountError) {
    console.error('ERROR:', pretty.render(mountError));
    res.status(500);
    hydrate();
  }
});

(async () => {
  if (config.port) {
    try {
      await Loadable.preloadAll();
      await waitChunks(chunksPath);
    } catch (e) {
      console.log('Server preload or get loadable-chunks.json error:', e);
    }

    server.listen(config.port, err => {
      if (err) {
        console.error(err);
      }
      // console.info('----\n==> ✅  app is running, talking to API server on %s.', config.apiPORT);
      console.info('==> 💻  Open //%s:%s in a browser to view the app.', config.host, config.port);
    });
  } else {
    console.error('==>  ERROR: No PORT environment variable');
  }
})();
