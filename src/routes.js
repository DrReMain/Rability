import routesMap from './containers/routesmap';
import { isAuthenticated } from './routesCtrl';

const routes = [
  {
    component: routesMap.get('app'),
    routes: [
      { path: '/', exact: true, component: routesMap.get('template') },
      { path: '/template', exact: true, component: isAuthenticated(routesMap.get('template')) },
      { component: routesMap.get('404') }
    ]
  }
];

export default routes;
