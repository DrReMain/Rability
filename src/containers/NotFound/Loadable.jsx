import React from 'react';
import Loadable from 'react-loadable';

const NotFoundLoadable = Loadable({
  loader: () => import('./NotFound' /* webpackChunkName: 'noutfound' */).then(module => module.default),
  loading: () => <div>Loading</div>
});

export default NotFoundLoadable;
