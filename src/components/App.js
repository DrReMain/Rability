import React, {Component} from 'react';
import {renderRoutes} from 'react-router-config';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Header from './Header';
import Toaster from './Toaster';
import ScrollTop from './ScrollTop';
import * as Actions from '../actions';

const mapStateToProps = state => {
  return {
    globalVal: state.globalVal.toJS(),
    auth: state.auth.toJS(),
    showmsg: state.showmsg.toJS(),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch),
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {
  constructor(props) {
    super(props);
  }

  static fetchData({token}) {
    return [
      Actions.getUserInfo(token),
      Actions.getIndexImage(),
    ];
  }
}