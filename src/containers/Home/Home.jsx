import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import { NavBar, Icon, NoticeBar, Carousel, WingBlank, Grid } from 'antd-mobile';

import style from './Home.less';

@connect()
export default class Home extends Component {
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
      <div className="home">
        <Helmet title="Home" />
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
        <div className={style.container}>
          <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
            Notice: The arrival time of incomes and transfers of Yu &#39;E Bao will be delayed during National Day..
          </NoticeBar>
        </div>
        <div className={style.container}>
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
        <div className={style.container}>
          <Grid data={data} columnNum={3} activeStyle={false} hasLine />
        </div>
        <div className={style.container}>
          <p className="danger">
            <Link to="/about">about</Link>
          </p>
        </div>
      </div>
    );
  }
}
