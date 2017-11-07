import { combineReducers } from 'redux';

const test = (state = 'init', action) => {
  switch (action.type) {
  case 'TEST1':
    return 'hello, TEST1';
  case 'TEST2':
    return 'hello, TEST2';
  default:
    return state;
  }
};

const rootReducer = combineReducers({
  test,
});

export default rootReducer;