import NotFound from './components/NotFound';
import App from './components/App';

const routes = [
  {
    component: App,
    routes: [
      {
        path: '*',
        component: NotFound,
      },
    ],
  },
];

export default routes;