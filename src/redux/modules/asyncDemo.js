const GET = 'projectName/asyncDemo/GET';
const GET_SUCCESS = 'projectName/asyncDemo/GET_SUCCESS';
const GET_FAIL = 'projectName/asyncDemo/GET_FAIL';

const initialState = {
  obj: {
    name: 'default'
  }
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET:
      return {
        ...state
      };
    case GET_SUCCESS:
      return {
        ...state,
        obj: action.result
      };
    case GET_FAIL:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
}

/**
 * Actions
 * * * * */

export function getMessage(data = { prop1: '', prop2: '' }) {
  return {
    types: [GET, GET_SUCCESS, GET_FAIL],
    promise: async ({ client }) => {
      try {
        return await client.get('https://api.github.com', data);
      } catch (error) {
        throw error;
      }
    }
  };
}
