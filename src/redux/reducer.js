import multireducer from 'multireducer';
import { routerReducer as router } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import demo from './modules/demo';

export default asyncReducers => ({
  router,
  online: (v = true) => v,
  form,
  demo,
  demoOthers: multireducer({
    demo1: demo,
    demo2: demo
  }),
  ...asyncReducers
});
