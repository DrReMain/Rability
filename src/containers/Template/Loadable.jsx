import React from 'react';
import Loadable from 'react-loadable';

const TemplateLoadable = Loadable({
  loader: () => import('./Template' /* webpackChunkName: 'template' */).then(module => module.default),
  loading: () => <div>Loading</div>
});

export default TemplateLoadable;
