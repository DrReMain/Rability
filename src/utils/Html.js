import React, { Component } from 'react';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';
import config from '../../config';

export default class Html extends Component {
  static propTypes = {
    assets: PropTypes.shape({
      styles: PropTypes.object,
      javascript: PropTypes.object
    }),
    bundles: PropTypes.arrayOf(PropTypes.any),
    content: PropTypes.string,
    store: PropTypes.shape({
      getState: PropTypes.func
    }).isRequired
  };

  static defaultProps = {
    assets: {},
    bundles: [],
    content: ''
  };

  render() {
    const {
      assets, store, content, bundles
    } = this.props;
    const head = Helmet.renderStatic();

    /* eslint-disable react/no-danger */
    return (
      <html lang="en">
        <head>
          {head.base.toComponent()}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}

          <link rel="shortcut icon" href="/favicon.ico" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"
          />
          <link rel="manifest" href="/manifest.json" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="application-name" content="React App" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />
          <meta name="apple-mobile-web-app-title" content="React App" />
          <meta name="theme-color" content="#000000" />
          {assets.styles &&
            Object.keys(assets.styles).map(style => (
              <link
                href={assets.styles[style]}
                key={style}
                media="screen, projection"
                rel="stylesheet"
                type="text/css"
                charSet="UTF-8"
              />
            ))}
          {assets.styles && Object.keys(assets.styles).length === 0 ? (
            <style dangerouslySetInnerHTML={{ __html: '#content{display:none}' }} />
          ) : null}
          <script src="https://as.alipayobjects.com/g/component/fastclick/1.0.6/fastclick.js" />
        </head>
        <body>
          <div id="content" dangerouslySetInnerHTML={{ __html: content }} />
          <script
            dangerouslySetInnerHTML={{
              __html:
                "if ('addEventListener' in document) {document.addEventListener('DOMContentLoaded'," +
                ' function() {FastClick.attach(document.body);}, false);}'
            }}
          />
          {store && (
            <script
              dangerouslySetInnerHTML={{
                __html: `window.__data=${serialize(store.getState())}`
              }}
              charSet="UTF-8"
            />
          )}
          {__DLLS__ && <script key="dlls" src="/dist/dlls/dll_vendor.js" charSet="UTF-8" />}
          {assets.javascript && <script src={assets.javascript.main} charSet="UTF-8" />}
          {bundles.map(bundle => bundle && <script src={config.assetsDir + bundle.file} key={bundle.id} />)}

          {assets.styles && Object.keys(assets.styles).length === 0 ? (
            <script dangerouslySetInnerHTML={{ __html: 'document.getElementById("content").style.display="block"' }} />
          ) : null}
        </body>
      </html>
    );
    /* eslint-enable react/no-danger */
  }
}
