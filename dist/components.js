'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('./wrapNativeSuper-b3646a2a.js');
require('./index-4b16c673.js');
var defineProperty = require('./defineProperty-ba7cd53d.js');
var index = require('./index.js');
var index$1 = require('./index-2340470f.js');
require('./FormErrors-a91e4b79.js');
var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var reactBootstrap = require('react-bootstrap');
var utils = require('./utils-6d62d4cd.js');
var SessionContext = require('./SessionContext-af7ae771.js');
require('bcryptjs');
require('jsonwebtoken');
var axios = require('axios');
var axios__default = _interopDefault(axios);

var __jsx = React__default.createElement;

var Button = function Button(props) {
  var variant = props.variant,
      type = props.type,
      onClick = props.onClick,
      isLoading = props.isLoading,
      text = props.text,
      block = props.block,
      disabled = props.disabled;
  var _disabled = disabled;
  var spinnerContent;
  var textContent = text;

  if (isLoading && !disabled) {
    spinnerContent = __jsx(reactBootstrap.Spinner, {
      as: "span",
      animation: "border",
      size: "sm",
      role: "status",
      "aria-hidden": "true"
    });
    _disabled = true;
    textContent = null;
  }

  return __jsx(reactBootstrap.Button, {
    variant: variant,
    type: type,
    onClick: onClick,
    disabled: _disabled,
    block: block
  }, spinnerContent, textContent);
};

Button.propTypes = {
  variant: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
  isLoading: PropTypes.bool,
  text: PropTypes.string,
  block: PropTypes.bool,
  disabled: PropTypes.bool
};

var __jsx$1 = React__default.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty._defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var defaultOptions = {
  useSession: false,
  useGlobals: false,
  useData: false,
  requireAuth: false
};

var loginRouteWithNext = function loginRouteWithNext() {
  var routes = index.options.routes;
  var _window$location = window.location,
      pathname = _window$location.pathname,
      search = _window$location.search;
  var href = routes.login();

  if (pathname !== routes.logout()) {
    var encodedNext = encodeURIComponent("".concat(pathname).concat(search));
    href = "".concat(href, "?next=").concat(encodedNext);
  }

  return href;
};

var handleError = function handleError(err) {
  var routes = index.options.routes;
  var data;
  var logout;
  var redirect;
  if (axios__default.isCancel(err)) return;

  if (err.response && err.response.status === utils.HTTP_STATUS_UNAUTHORIZED) {
    logout = true;
    var pathname = window.location.pathname;

    if (pathname !== routes.login()) {
      redirect = loginRouteWithNext();
    }
  }

  if (err.response && err.response.data) {
    data = err.response.data;
  }

  if (!data && !logout && !redirect) {
    console.log('Unknown error from session or data endpoints: ', err);
  }

  return {
    data: data,
    logout: logout,
    redirect: redirect
  };
};

var withPageWrapper = function withPageWrapper(WrappedComponent, options) {
  options = _objectSpread({}, defaultOptions, {}, options);

  var Component = function Component(props) {
    var _props = props,
        router = _props.router;
    var session = SessionContext.useSession();

    var _useState = React.useState(props),
        pageProps = _useState[0],
        setPageProps = _useState[1];

    React.useEffect(function () {
      if (options.redirect) {
        var _options$redirect = options.redirect,
            href = _options$redirect.href,
            asPath = _options$redirect.asPath;
        router.replace(href, asPath);
      }
    }, []);
    React.useEffect(function () {
      var shouldSetPageProps = true;
      var cancelSessionRequest;
      var cancelDataRequest;

      (function _callee() {
        var response, sessionResponse, _handleError, data, logout, redirect, _window$location2, pathname, search, url, _response, _handleError2, _data, _logout, _redirect;

        return index$1._regeneratorRuntime.async(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                props = _objectSpread({}, pageProps);

                if (!options.useSession) {
                  _context.next = 28;
                  break;
                }

                _context.prev = 2;
                _context.next = 5;
                return index$1._regeneratorRuntime.awrap(axios__default.get('/api/session', {
                  cancelToken: new axios.CancelToken(function (c) {
                    cancelSessionRequest = c;
                  })
                }));

              case 5:
                response = _context.sent;
                cancelSessionRequest = null;
                sessionResponse = response.data.session;
                sessionResponse._ready = true;
                props.session = sessionResponse;

                if (!(options.requireAuth && !sessionResponse.isAuthenticated)) {
                  _context.next = 15;
                  break;
                }

                router.replace(loginRouteWithNext());
                return _context.abrupt("return");

              case 15:
                session.login(sessionResponse);

              case 16:
                _context.next = 28;
                break;

              case 18:
                _context.prev = 18;
                _context.t0 = _context["catch"](2);
                _handleError = handleError(_context.t0), data = _handleError.data, logout = _handleError.logout, redirect = _handleError.redirect;

                if (!(!data && !logout && !redirect)) {
                  _context.next = 23;
                  break;
                }

                return _context.abrupt("return");

              case 23:
                if (data) {
                  props.data = data;
                }

                if (logout) {
                  session.logout();
                }

                if (!redirect) {
                  _context.next = 28;
                  break;
                }

                router.replace(redirect);
                return _context.abrupt("return");

              case 28:
                if (options.useGlobals) ;

                if (!options.useData) {
                  _context.next = 50;
                  break;
                }

                // get page data
                _window$location2 = window.location, pathname = _window$location2.pathname, search = _window$location2.search;
                url = "/api/page".concat(pathname).concat(search);
                _context.prev = 32;
                _context.next = 35;
                return index$1._regeneratorRuntime.awrap(axios__default.get(url, {
                  cancelToken: new axios.CancelToken(function (c) {
                    cancelDataRequest = c;
                  })
                }));

              case 35:
                _response = _context.sent;
                cancelDataRequest = null;
                props.data = _response.data;
                _context.next = 50;
                break;

              case 40:
                _context.prev = 40;
                _context.t1 = _context["catch"](32);
                _handleError2 = handleError(_context.t1), _data = _handleError2.data, _logout = _handleError2.logout, _redirect = _handleError2.redirect;

                if (!(!_data && !_logout && !_redirect)) {
                  _context.next = 45;
                  break;
                }

                return _context.abrupt("return");

              case 45:
                if (_data) {
                  props.data = _data;
                }

                if (_logout) {
                  session.logout();
                }

                if (!_redirect) {
                  _context.next = 50;
                  break;
                }

                router.replace(_redirect);
                return _context.abrupt("return");

              case 50:
                if (shouldSetPageProps) {
                  setPageProps(props);
                }

              case 51:
              case "end":
                return _context.stop();
            }
          }
        }, null, null, [[2, 18], [32, 40]], Promise);
      })();

      return function () {
        shouldSetPageProps = false;

        if (options.useSession && typeof cancelSessionRequest === 'function') {
          cancelSessionRequest();
        }

        if (options.useData && typeof cancelDataRequest === 'function') {
          cancelDataRequest();
        }
      };
    }, []);
    return __jsx$1(WrappedComponent, pageProps);
  };

  Component.propTypes = {
    router: PropTypes.object
  };
  return Component;
};

exports.Button = Button;
exports.withPageWrapper = withPageWrapper;
