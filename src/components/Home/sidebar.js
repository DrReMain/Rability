import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Sidebar extends Component {
  static propTypes = {
    indexImg: PropTypes.any.isRequired,
  };

  render() {
    const {indexImg} = this.props;
    let styles = {
      backgroundImage: `url(${indexImg})`,
    };
    return (
        <div className="col-sm-3 sidebar-box">
          <div className="cover-img" style={styles}/>
          <div className="bottom-block">
            <h1>Jack Hu</h1>
            <h3>。。。</h3>
            <h3>。。。</h3>
          </div>
        </div>
    );
  }
}