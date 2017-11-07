import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import { Iterable } from 'immutable';
import promiseMiddleware from '../middleware/promiseMiddleware';
import rootReducer from '../reducers';

export default function configureStore(initialState, history) {

  const stateTransformer = (state) => {
    const newState = {};
    Object.keys(state).forEach(key => {
      if (Iterable.isIterable(state[key])) {
        newState[key] = state[key].toJS();
      }
      else {
        newState[key] = state[key];
      }
    });
    return newState;
  };
  const middleware = [thunk, promiseMiddleware, routerMiddleware(history)];

  let finalCreateStore;
  if (_DEVCLIENT) {
    if (_DEVLOGGER) {
      middleware.push(createLogger({ stateTransformer }));
    }
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
        compose;
    finalCreateStore = composeEnhancers(
        applyMiddleware(...middleware),
    );
  }
  else {
    finalCreateStore = compose(
        applyMiddleware(...middleware),
    );
  }

  const store = finalCreateStore(createStore)(rootReducer, initialState);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}