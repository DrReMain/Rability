const ORIGIN_LOGIN = 'wuyou-pwa/auth/ORIGIN_LOGIN';
const ORIGIN_LOGIN_SUCCESS = 'wuyou-pwa/auth/ORIGIN_LOGIN_SUCCESS';
const ORIGIN_LOGIN_FAIL = 'wuyou-pwa/auth/ORIGIN_LOGIN_FAIL';

const initialState = {
  loaded: false,
  data: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ORIGIN_LOGIN:
      return {
        ...state,
        loggingIn: true
      };
    case ORIGIN_LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        loaded: true,
        data: action.result.data
      };
    case ORIGIN_LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        loginError: action.error
      };
    default:
      return state;
  }
}

function setToken({ client }) {
  return ({ data }) => {
    client.setJwtToken(data && data.token);
  };
}

/**
 * Actions
 * * * * */

// 初始化client，setToken
export const initClient = client => (dispatch, getState) => setToken({ client })(getState().auth);

// 帐号密码登录
export function originLogin(data = { phoneNum: '', password: '' }) {
  return {
    types: [ORIGIN_LOGIN, ORIGIN_LOGIN_SUCCESS, ORIGIN_LOGIN_FAIL],
    promise: async ({ client }) => {
      try {
        const response = await client.post('/login.do', data);
        setToken({ client })(response);
        return response;
      } catch (error) {
        throw error;
      }
    }
  };
}
