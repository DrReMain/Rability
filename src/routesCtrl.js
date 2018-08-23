import { replace } from 'connected-react-router';
import { connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect';
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';

const locationHelper = locationHelperBuilder({});

// 登录才能访问
export const isAuthenticated = connectedReduxRedirect({
  redirectPath: '/login',
  authenticatedSelector: state => state.auth.data !== null,
  redirectAction: replace,
  wrapperDisplayName: 'UserIsAuthenticated'
});

// 登录但没绑定可以访问
export const isBind = connectedReduxRedirect({
  redirectPath: (globalState, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/',
  authenticatedSelector: state => state.auth.data !== null && !state.auth.data.mobileBind,
  redirectAction: replace,
  wrapperDisplayName: 'UserIsBind',
  allowRedirectBack: false
});
