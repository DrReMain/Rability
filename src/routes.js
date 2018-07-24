import routesMap from './containers/routesmap';

const routes = [
  {
    component: routesMap.get('app'),
    routes: [{ path: '/', exact: true, component: routesMap.get('template') }, { component: routesMap.get('404') }]
  }
];

export default routes;
