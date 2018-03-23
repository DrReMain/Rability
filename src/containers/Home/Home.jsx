import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { load } from '../../redux/modules/asyncDemo';

@connect(state => ({ info: state.asyncDemo.data }), { load })
export default class Home extends Component {
  static propTypes = {
    info: PropTypes.shape({
      message: PropTypes.string,
      time: PropTypes.number
    }),

    load: PropTypes.func.isRequired
  };

  static defaultProps = {
    info: null
  };

  render() {
    const { info, load: loadHandler } = this.props;
    return (
      <div className="home">
        <Helmet title="Home" />
        <h1>{info ? info.message : 'no info!'}</h1>
        <p>{info && new Date(info.time).toString()}</p>
        <button onClick={loadHandler}>reload</button>
      </div>
    );
  }
}
