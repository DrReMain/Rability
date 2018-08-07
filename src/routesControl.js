import { routerActions } from 'react-router-redux';
import { connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect';
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';

const locationHelper = locationHelperBuilder({});

// 登录才能访问
export const isAuthenticated = connectedReduxRedirect({
  redirectPath: '/login',
  authenticatedSelector: state => state.auth.data !== null,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsAuthenticated'
});

// 没登录才能访问,且未绑定跳转绑定页
export const isNotAuthenticated = connectedReduxRedirect({
  redirectPath: (globalState, ownProps) => {
    const redirect = locationHelper.getRedirectQueryParam(ownProps);
    if (globalState.auth.data && !globalState.auth.data.mobileBind) {
      return redirect ? `/bind?redirect=${redirect}` : '/bind';
    }
    return redirect || '/';
  },
  authenticatedSelector: state => state.auth.data === null,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsNotAuthenticated',
  allowRedirectBack: false
});
