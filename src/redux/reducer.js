// import multireducer from 'multireducer';
import * as modules from './modules';

export default asyncReducers => ({
  online: (v = true) => v,
  ...modules,
  ...asyncReducers
});
