import axios from 'axios';
import config from '../../config';

export default function (req) {
  const instance = axios.create({
    baseURL: __SERVER__ ? `http://${config.apiHOST}:${config.apiPORT}` : '/api'
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
    err => Promise.reject(err)
  );

  instance.interceptors.response.use(
    response => response.data,
    err => Promise.reject(err.response ? err.response.data : err)
  );

  return instance;
}
