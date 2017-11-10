import Cookies from 'universal-cookie';
import {CookieDomain} from '../config';

const cookie = new Cookies();
let cookieConfig = {};
if (CookieDomain !== '') {
  cookieConfig = {domain: CookieDomain};
}

export function saveCookie(name, value) {
  cookie.set(name, value, cookieConfig);
}

export function getCookie(name) {
  return cookie.get(name);
}

export function removeCookie(name) {
  cookie.remove(name, cookieConfig);
}

export function signOut() {
  cookie.remove('token', cookieConfig);
}

export function isLogin() {
  return !!cookie.get('token');
}