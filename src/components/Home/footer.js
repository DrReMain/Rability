import React, { Component } from 'react'

export default class Footer extends Component {
  render() {
    return (
      <footer>
        <div className="footer-container">
          <ul>
            <li>
              <span>123</span>
            </li>
            <li>
              <a
                className="github"
                href="https://github.com/jackhutu/jackblog-react"
                rel="noopener noreferrer">
                <i className="fa fa-github"/>
              </a>
            </li>
            <li>
              <a
                className="weibo"
                href="http://weibo.com/hutaigong"
                rel="noopener noreferrer">
                <i className="fa fa-weibo"/>
              </a>
            </li>
          </ul>
        </div>
      </footer>
    )
  }
}