import routesMap from './containers/routesmap';
// import { isAuthenticated } from './routesControl';

const routes = [
  {
    component: routesMap.get('app'),
    routes: [{ path: '/template', component: routesMap.get('template') }, { component: routesMap.get('404') }]
  }
];

export default routes;
