import axios from 'axios';
import config from '../../config';

export default function (req) {
  const instance = axios.create({
    baseURL: __SERVER__ ? config.proxyUrl : '/api'
    // 默认formdata后get请求需单独配置
    // transformRequest: [
    //   data =>
    //     Object.entries(data)
    //       .map(item => `${encodeURIComponent(item[0])}=${encodeURIComponent(item[1])}`)
    //       .join('&')
    // ],
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // }
  });

  let token;

  instance.setJwtToken = newToken => {
    token = newToken;
  };

  instance.interceptors.request.use(
    conf => {
      if (__SERVER__) {
        if (req.header('cookie')) {
          conf.headers.Cookie = req.header('cookie');
        }
        if (req.header('authorization')) {
          conf.headers.authorization = req.header('authorization');
        }
      }

      if (token) {
        conf.headers.authorization = token;
      }

      return conf;
    },
    error => Promise.reject(error)
  );

  /* eslint-disable prefer-promise-reject-errors */
  instance.interceptors.response.use(
    // 根据后端接口规范，配置res状态
    // e.g
    // response =>
    //   response.data.status
    //     ? Promise.reject({ errmsg: response.data.errmsg, errcode: response.data.errcode })
    //     : response.data,
    response => response.data,
    error => Promise.reject(error.response ? error.response.data : error)
  );
  /* eslint-enable prefer-promise-reject-errors */

  return instance;
}
