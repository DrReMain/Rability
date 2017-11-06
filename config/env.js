const env = {
  devPort: 3000,
  prodPort: 8300,
  devApiURI: 'http://localhost:9000/',
  prodApiURI: 'https://api.jackhu.top/',
  devCookieDomain: '',
  prodCookeDomain: '.jackhu.top',
};

export const isDev = process.env.NODE_ENV === 'development';
export const LISTEN_PORT = process.env.PORT || isDev
    ? env.devPort
    : env.prodPort;

export const API_URI = process.env.NODE_ENV === 'development'
    ? env.devApiURI
    : env.prodApiURI;

export const CookieDomain = process.env.NODE_ENV === 'development'
    ? env.devCookieDomain
    : env.prodCookeDomain;