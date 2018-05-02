// import multireducer from 'multireducer';
import { routerReducer as router } from 'react-router-redux';

export default asyncReducers => ({
  router,
  online: (v = true) => v,
  ...asyncReducers
});
