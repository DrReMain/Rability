// import multireducer from 'multireducer';
import { routerReducer as router } from 'react-router-redux';
import * as modules from './modules';

export default asyncReducers => ({
  router,
  online: (v = true) => v,
  ...modules,
  ...asyncReducers
});
