const LOAD = 'demo/LOAD';
const LOAD_SUCCESS = 'demo/LOAD_SUCCESS';
const LOAD_FAIL = 'demo/LOAD_FAIL';

const initialState = {
  loaded: false
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case LOAD_FAIL:
      return {
        loading: false,
        loaded: false,
        error: action.error
      };
    default:
      return state;
  }
};

export const isLoaded = globalState => globalState.info && globalState.info.loaded;

export const load = () => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) => client.get('/loadInfo')
});
