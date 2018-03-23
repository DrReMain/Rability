import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { NavBar, Icon, NoticeBar, WhiteSpace } from 'antd-mobile';

import style from './Home.less';

@connect()
export default class Home extends Component {
  render() {
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
        <WhiteSpace />
        <div className={style.container}>
          <WhiteSpace size="lg" />
          <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
            Notice: The arrival time of incomes and transfers of Yu &#39;E Bao will be delayed during National Day.
          </NoticeBar>
          <p className={style.text}>T_T</p>
        </div>
      </div>
    );
  }
}
