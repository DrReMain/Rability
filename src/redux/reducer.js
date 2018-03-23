// import multireducer from 'multireducer';
import { routerReducer as router } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import { asyncDemo } from './modules';

export default asyncReducers => ({
  router,
  online: (v = true) => v,
  form,
  asyncDemo,
  ...asyncReducers
});
