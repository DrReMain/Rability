import * as containers from './index';

const routesMap = new Map([['app', containers.App], ['template', containers.Template], ['404', containers.NotFound]]);

export default routesMap;
