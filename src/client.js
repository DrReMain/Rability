const a = 'a';
console.log(a);

import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { routerReducer } from 'react-router-redux';
import { renderRoutes } from 'react-router-config';

const style = {
  fontSize: '20px',
  fontWeight: 'bold',
};

render(
    <h1 style={{ ...style }}>hello</h1>,
    document.getElementById('root'),
);
