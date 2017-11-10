import * as types from './types';
import {push} from 'react-router-redux';
import {saveCookie, getCookie, signOut} from '../utils/authService';
import {showMsg} from './other';
import api from '../api';
import {API_ROOT} from '../config';

// 获取snslogins
export const getSnsLogins = () => {
  return {
    type: types.GET_SNSLOGINS,
    promise: api.getSnsLogins(),
  };
};

// 获取验证码
export const getCaptchaUrl = () => {
  return {
    type: types.GET_CAPTCHAURL,
    captchaUrl: API_ROOT + 'users/getCaptcha?' + Math.random(),
  };
};

// 登录
function loginSuccess(token) {
  return {
    type: types.LOGIN_SUCCESS,
    token,
  };
}