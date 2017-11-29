import React from 'react'
import { hydrate } from 'react-dom'
import { renderRoutes } from 'react-router-config'
import { BrowserRouter } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'

import configureStore from './store/configureStore'
import routes from './routes'
import 'font-awesome/css/font-awesome.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'jackblog-sass/dist/index.css'
import 'react-s-alert/dist/s-alert-default.css'
import './assets/style/index.css'

const history = createBrowserHistory()
const initialState = window.__INITIAL_STATE__
const store = configureStore(initialState, history)

hydrate(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <BrowserRouter>
        {renderRoutes(routes)}
      </BrowserRouter>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
)
