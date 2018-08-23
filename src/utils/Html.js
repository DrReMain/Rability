import React from 'react';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';
import config from '../../config';

const Html = ({
  assets, store, content, bundles
}) => {
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
        <link rel="manifest" href="/manifest.json" />
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="
          width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no,minimal-ui"
        />
        <meta name="App-Config" content="fullscreen=yes,useHistoryState=yes,transition=yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-touch-fullscreen" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="React App" />
        <meta name="application-name" content="React App" />
        <meta name="theme-color" content="#000000" />
        {/* styles (will be present only in production with webpack extract text plugin) */}
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
        {/* (will be present only in development mode) */}
        {assets.styles && Object.keys(assets.styles).length === 0 ? (
          <style dangerouslySetInnerHTML={{ __html: '#content{display:none}' }} />
        ) : null}
      </head>
      <body>
        <div id="content" dangerouslySetInnerHTML={{ __html: content }} />
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
        {bundles.map(bundle => bundle && <script src={config.assetsPath + bundle.file} key={bundle.id} />)}
        {/* (will be present only in development mode) */}
        {assets.styles && Object.keys(assets.styles).length === 0 ? (
          <script dangerouslySetInnerHTML={{ __html: 'document.getElementById("content").style.display="block";' }} />
        ) : null}
      </body>
    </html>
  );
  /* eslint-enable react/no-danger */
};

Html.propTypes = {
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

Html.defaultProps = {
  assets: {},
  bundles: [],
  content: ''
};

export default Html;
