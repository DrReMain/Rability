import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import styles from './NotFound.less';

@connect()
export default class Template extends Component {
  render() {
    return (
      <main className="not-found">
        <Helmet title="404啦～～～" />
        <section className="content">
          <div className={styles.container}>
            <span>404</span>
          </div>
        </section>
      </main>
    );
  }
}
