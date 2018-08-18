import 'babel-polyfill';
import FastClick from 'fastclick';
import React from 'react';
import { hydrate as _hydrate } from 'react-dom';
import { ConnectedRouter } from 'react-router-redux';
import { renderRoutes } from 'react-router-config';
import { trigger } from 'redial';
import createBrowserHistory from 'history/createBrowserHistory';
import Loadable from 'react-loadable';
import { AppContainer as HotEnabler } from 'react-hot-loader';
import { getStoredState } from 'redux-persist';
import { CookieStorage } from 'redux-persist-cookie-storage';
import Cookies from 'cookies-js';
import createStore from './redux/createStore';
import request from './utils/request';
import routes from './routes';
import isOnline from './utils/isOnline';
import asyncMatchRoutes from './utils/asyncMatchRoutes';
import { ReduxAsyncConnect, Provider } from './components';
import config from '../config';

const persistConfig = {
  key: 'root',
  storage: new CookieStorage(Cookies, {
    expiration: {
      default: config.tokenExpiration
    }
  }),
  stateReconciler: (inboundState, originalState) => originalState,
  whitelist: ['auth']
};

const target = document.getElementById('content');
const client = request();
const providers = {
  client
};

(async () => {
  const preloadedState = await getStoredState(persistConfig);
  const online = window.__data ? true : await isOnline();

  if (online) {
    // await providers.app.authenticate().catch(() => null);
  }

  const history = createBrowserHistory();
  const store = createStore({
    history,
    data: {
      ...preloadedState,
      ...window.__data,
      online
    },
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

  // FastClick
  if ('addEventListener' in document) {
    document.addEventListener(
      'DOMContentLoaded',
      () => {
        FastClick.attach(document.body);
      },
      false
    );
  }

  await hydrate(routes);

  // Hot reload
  if (module.hot) {
    module.hot.accept('./routes', () => {
      const nextRoutes = require('./routes').default;
      hydrate(nextRoutes).catch(err => {
        console.error('ERROR on `routes.js` reload:', err);
      });
    });
  }

  // Server-side rendering check
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

  // Service worker
  // if (!__DEVELOPMENT__ && 'serviceWorker' in navigator) {
  //   try {
  //     const registration = await navigator.serviceWorker.register('/dist/service-worker.js', { scope: '/' });
  //     registration.onupdatefound = () => {
  //       // The updatefound event implies that reg.installing is set; see
  //       // https://w3c.github.io/ServiceWorker/#service-worker-registration-updatefound-event
  //       const installingWorker = registration.installing;
  //
  //       installingWorker.onstatechange = () => {
  //         switch (installingWorker.state) {
  //           case 'installed':
  //             if (navigator.serviceWorker.controller) {
  //               // At this point, the old content will have been purged and the fresh content will
  //               // have been added to the cache.
  //               // It's the perfect time to display a "New content is available; please refresh."
  //               // message in the page's interface.
  //               console.log('New or updated content is available.');
  //             } else {
  //               // At this point, everything has been precached.
  //               // It's the perfect time to display a "Content is cached for offline use." message.
  //               console.log('Content is now available offline!');
  //             }
  //             break;
  //           case 'redundant':
  //             console.error('The installing service worker became redundant.');
  //             break;
  //           default:
  //         }
  //       };
  //     };
  //   } catch (e) {
  //     console.log('ERROR: registering SW: ', e);
  //   }
  //
  //   await navigator.serviceWorker.ready;
  //   console.log('SW Ready');
  // }
})();
