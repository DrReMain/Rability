import config from '../config';
import routesMap from './containers/routesmap';

export default async providers => {
  if (config.dynamicRoutes) {
    const routesInfo = await providers.client.get(config.routesAPI);
    const routes = routesInfo.map(i => i);
    return routes;
  }

  const routes = [
    {
      component: routesMap.get('app'),
      routes: [
        { path: '/', exact: true, component: routesMap.get('home') },
        { path: '/about', component: routesMap.get('about') },
        { component: routesMap.get('404') }
      ]
    }
  ];

  return routes;
};
