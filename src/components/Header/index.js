import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link, NavLink} from 'react-router-dom';
import {Dropdown} from 'react-bootstrap';
import defaultAvatar from '../../assets/images/avatar.png';
import Avatar from './avatar';

export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
  };

  render() {
    const {auth, logout, location} = this.props;
    return (
        <div className="navbar-box navbar-skin">
          <div className="navbar-menu">
            <Link className={'navbar-item logo' +
            (location.pathname !== '/apps' && 'active')}
                  title="首页"
                  to="/">
              Hu
            </Link>
            <NavLink activeClassName="active"
                     className="navbar-item mobile"
                     title="移动应用"
                     to="/apps">
              <i className="fa fa-mobile"/>
            </NavLink>
          </div>

          <div className="navbar-expanded">
            <div>
              <a className="expanded-var angular2"
                 href="http://angular2.jackhu.top" title="Angular2.x版">
              </a>
              <a className="expanded-var vue" href="http://vue.jackhu.top"
                 title="Vue版">
              </a>
              <a className="expanded-var react" href="//react.jackhu.top"
                 title="React版">
              </a>
              <a className="expanded-var angular1"
                 href="http://angular.jackhu.top" title="Angular1.x版">
              </a>
              <a className="navbar-item change-mode" href="javascript:;"
                 onClick={this.handleChangeMode}>
                <i className="fa fa-sun-o"/>
              </a>
            </div>
            {(auth.token && auth.user) ? <div>
                  <a href="javascript: void(0);"
                     className="navbar-item expanded-logout" onClick={logout}
                     title="登出">
                    <i className="fa fa-sign-out"/>
                  </a>
                  <Link to="/settings" className="navbar-item expanded-avatar"
                        title={auth.user.nickname}>
                    <img src={auth.user.avatar || defaultAvatar}/>
                  </Link>
                </div>
                : <div>
                  <NavLink activeClassName="active" className="navbar-item"
                           title="登录" to="/login">
                    <i className="fa fa-sign-in"/>
                  </NavLink>
                </div>
            }
          </div>

          <div className="navbar-shrink">
            {(auth.token && auth.user) ?
                <Dropdown id="dropdown-menu" className="pull-right">
                  <Avatar auth={auth} bsRole="toggle"/>
                  <Dropdown.Menu className="dropdown-menu">
                    <li><Link to="/settings"><i className="fa fa-cog"/>
                      设置</Link></li>
                    <li className="divider"/>
                    <li><a href="javascript:void(0);" className="shrink-logout"
                           onClick={logout}>
                      <i className="fa fa-sign-out"/> 登出
                    </a></li>
                  </Dropdown.Menu>
                </Dropdown>
                : <div className="pull-right">
                  <Link className="shrink-login" title="登录" to="/login">
                    <i className="fa fa-sign-in"/>
                  </Link>
                </div>
            }
            <a href="javascript:void(0);"
               className="pull-right navbar-item change-mode">
              <i className="fa fa-sun-o"/>
            </a>
            <a className="pull-right expanded-var angular1"
               href="http://angular.jackhu.top" title="Angular1.x版">
            </a>
            <a className="pull-right expanded-var react"
               href="//react.jackhu.top" title="React版">
            </a>
            <a className="pull-right expanded-var vue"
               href="http://vue.jackhu.top" title="Vue版">
            </a>
            <a className="pull-right expanded-var angular2"
               href="http://angular2.jackhu.top" title="Agnular2.x版">
            </a>
          </div>
        </div>
    );
  }
}