import 'babel-polyfill';
import React from 'react';
import { hydrate as _hydrate } from 'react-dom';
import { ConnectedRouter } from 'react-router-redux';
import { renderRoutes } from 'react-router-config';
import { trigger } from 'redial';
import createBrowserHistory from 'history/createBrowserHistory';
import Loadable from 'react-loadable';
import { AppContainer as HotEnabler } from 'react-hot-loader';
import { getStoredState } from 'redux-persist';
import localForage from 'localforage';

import { socket, createApp } from './app';
import createStore from './redux/createStore';
import request from './utils/request';
import routes from './routes';
import isOnline from './utils/isOnline';
import asyncMatchRoutes from './utils/asyncMatchRoutes';
import { ReduxAsyncConnect, Provider } from './components';

const persistConfig = {
  key: 'primary',
  storage: localForage,
  whitelist: ['auth']
};

const target = document.getElementById('content');
const providers = {
  client: request(),
  app: createApp(),
  restApp: createApp('rest')
};

function initSocket() {
  socket.on('news', data => {
    console.log('socket emit "news":', data);
    socket.emit('my other event', { my: '客户端数据' });
  });
  socket.on('msg', data => {
    console.log('socket emit "msg":', data);
  });
  return socket;
}

global.socketApp = initSocket();

(async () => {
  const storedData = await getStoredState(persistConfig);
  const online = await (window.__data ? true : isOnline());

  if (online) {
    socket.open();
    await providers.app.authenticate().catch(() => null);
  }

  const history = createBrowserHistory();
  const data = !online
    ? {
      ...storedData,
      ...window.__data,
      online
    }
    : {
      ...window.__data,
      online
    };
  const store = createStore({
    history,
    data,
    providers,
    persistConfig
  });

  const hydrate = async _routes => {
    const { components, match, params } = await asyncMatchRoutes(_routes, history.location.pathname);
    const triggerLocals = {
      ...providers,
      store,
      match,
      params,
      history,
      location: history.location
    };

    await trigger('fetch', components, triggerLocals);
    await trigger('defer', components, triggerLocals);

    _hydrate(
      <HotEnabler>
        <Provider store={store} {...providers}>
          <ConnectedRouter history={history}>
            <ReduxAsyncConnect routes={_routes} store={store} providers={providers}>
              {renderRoutes(_routes)}
            </ReduxAsyncConnect>
          </ConnectedRouter>
        </Provider>
      </HotEnabler>,
      target
    );
  };

  await Loadable.preloadReady();

  await hydrate(routes);

  if (module.hot) {
    module.hot.accept('./routes', () => {
      const nextRoutes = require('./routes');
      hydrate(nextRoutes).catch(err => {
        console.error('Error on routes reload:', err);
      });
    });
  }

  if (process.env.NODE_ENV !== 'production') {
    window.React = React; // enable debugger

    if (
      !target ||
      !target.firstChild ||
      !target.firstChild.attributes ||
      !target.firstChild.attributes['data-reactroot']
    ) {
      console.error('Server-side React render was discarded.\n' +
          'Make sure that your initial render does not contain any client-side code.');
    }
  }

  if (!__DEVELOPMENT__ && 'serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('/dist/service-worker.js', { scope: '/' });
      console.log('SW registered!');
    } catch (e) {
      console.log('ERROR: registering SW: ', e);
    }

    await navigator.serviceWorker.ready;
    console.log('SW Ready');
  }
})();
