import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { NavBar, Icon, NoticeBar, Carousel, WingBlank, Grid } from 'antd-mobile';

import './Home.less';

@connect()
export default class Home extends Component {
  static propTypes = {
    // location: PropTypes.objectOf(PropTypes.any).isRequired
  };

  state = {
    data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
    imgHeight: 176,
    list: [
      'check-circle',
      'check',
      'check-circle-o',
      'cross-circle',
      'cross',
      'cross-circle-o',
      'up',
      'down',
      'left',
      'right',
      'ellipsis',
      'loading'
    ]
  };

  render() {
    const data = this.state.list.map(item => ({
      icon: <Icon type={item} />,
      text: item
    }));

    return (
      <section className="home">
        {/* 每个路由第一级标签必须是section，且类名是此页名称字符串, 在app.less中可根据类名自定义路由动画 */}
        <Helmet title="home" />
        <NavBar
          mode="dark"
          leftContent="Back"
          rightContent={[
            <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
            <Icon key="1" type="ellipsis" />
          ]}
        >
          HOME
        </NavBar>
        <div className="container">
          <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
            Notice: The arrival time of incomes and transfers of Yu &#39;E Bao will be delayed during National Day..
          </NoticeBar>
        </div>
        <div className="container">
          <WingBlank>
            <Carousel
              autoplay={false}
              infinite
              beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
              afterChange={index => console.log('slide to', index)}
            >
              {this.state.data.map(val => (
                <a
                  key={val}
                  href="http://www.alipay.com"
                  style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                >
                  <img
                    src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                    alt=""
                    style={{ width: '100%', verticalAlign: 'top' }}
                    onLoad={() => {
                      // fire window resize event to change height
                      window.dispatchEvent(new Event('resize'));
                      this.setState({ imgHeight: 'auto' });
                    }}
                  />
                </a>
              ))}
            </Carousel>
          </WingBlank>
        </div>
        <div className="container">
          <Grid data={data} columnNum={3} activeStyle={false} hasLine />
        </div>
        <div className="container">
          <p className="danger">
            <Link to="/about">about</Link>
          </p>
        </div>
      </section>
    );
  }
}
