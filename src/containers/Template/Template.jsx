import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { getMessage } from '../../redux/modules/asyncDemo';

import './Template.less';

@connect(
  state => ({
    asyncDemo: state.asyncDemo
  }),
  { getMessage }
)
export default class Template extends Component {
  static propTypes = {
    asyncDemo: PropTypes.objectOf(PropTypes.any).isRequired,
    getMessage: PropTypes.func.isRequired
  };

  getHandler = () => {
    const { getMessage: getMessageMethod } = this.props;
    getMessageMethod({}).then(res => console.log(res));
  };

  render() {
    const {
      asyncDemo: { msg }
    } = this.props;
    return (
      <main className="template">
        {/* 类名是此页名称字符串, 可在app.less内配置路由动画 */}
        {/* meta,title 配置 */}
        <Helmet>
          <title>Template</title>
          <meta name="keywords" content="keywords" />
          <meta name="description" content="description" />
        </Helmet>
        {/* 头导航 */}
        <header className="header" />
        {/* 主内容 */}
        <section className="content">
          <h1>{msg}</h1>
          <button onClick={this.getHandler}>get demo</button>
          <p>111111111111111111</p>
        </section>
        {/* 尾导航 */}
        <footer className="footer" />
      </main>
    );
  }
}
