const env = {
  devPort: 3000,
  prodPort: 8300,
};

export const isDev = process.env.NODE_ENV === 'development';
export const LISTEN_PORT = process.env.PORT || isDev
    ? env.devPort
    : env.prodPort;