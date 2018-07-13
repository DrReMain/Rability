import * as containers from './index';

const routesMap = new Map([
  ['app', containers.App],
  ['home', containers.Home],
  ['about', containers.About],
  ['login', containers.Login],
  ['404', containers.NotFound]
]);

export default routesMap;
