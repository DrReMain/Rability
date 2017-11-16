import NotFound from './components/NotFound';
import App from './components/App';
import Home from './components/Home'

const routes = [
  {
    component: App,
    routes: [
      { path: '/',
        exact: true,
        component: Home
      },
      {
        path: '*',
        component: NotFound,
      },
    ],
  },
];

export default routes;