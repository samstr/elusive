'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('./classCallCheck-d2bb402f.js');
require('./index.js');
var defineProperty = require('./defineProperty-ba7cd53d.js');
var PropTypes = _interopDefault(require('prop-types'));
var React = require('react');
var React__default = _interopDefault(React);
var reactBootstrap = require('react-bootstrap');
var index$1 = require('./index-2340470f.js');
var axios = require('axios');
var axios__default = _interopDefault(axios);
require('./FormErrors-22a51af8.js');
var SessionContext = require('./SessionContext-b57e1931.js');
require('bcryptjs');
require('nookies');
require('jsonwebtoken');

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
        var response, sessionResponse, _window$location, pathname, search, href, encodedNext, _window$location2, _pathname, _search, url, _response;

        return index$1._regeneratorRuntime.async(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                props = _objectSpread({}, pageProps);

                if (!options.useSession) {
                  _context.next = 25;
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
                sessionResponse = response.data;
                sessionResponse._ready = true;
                props.session = sessionResponse;

                if (!(options.requireAuth && !sessionResponse.isAuthenticated)) {
                  _context.next = 18;
                  break;
                }

                _window$location = window.location, pathname = _window$location.pathname, search = _window$location.search;
                href = '/login';

                if (pathname !== '/logout') {
                  encodedNext = encodeURIComponent("".concat(pathname).concat(search));
                  href = "".concat(href, "?next=").concat(encodedNext);
                }

                router.replace(href);
                return _context.abrupt("return");

              case 18:
                session.setSession(sessionResponse);

              case 19:
                _context.next = 25;
                break;

              case 21:
                _context.prev = 21;
                _context.t0 = _context["catch"](2);

                if (!(_context.t0 instanceof axios.Cancel)) {
                  console.log('error getting /api/session', _context.t0);
                }

                return _context.abrupt("return");

              case 25:
                if (options.useGlobals) ;

                if (!options.useData) {
                  _context.next = 41;
                  break;
                }

                // get page data
                _window$location2 = window.location, _pathname = _window$location2.pathname, _search = _window$location2.search;
                url = "/api/page".concat(_pathname).concat(_search);
                _context.prev = 29;
                _context.next = 32;
                return index$1._regeneratorRuntime.awrap(axios__default.get(url, {
                  cancelToken: new axios.CancelToken(function (c) {
                    cancelDataRequest = c;
                  })
                }));

              case 32:
                _response = _context.sent;
                cancelDataRequest = null;
                props.data = _response.data;
                _context.next = 41;
                break;

              case 37:
                _context.prev = 37;
                _context.t1 = _context["catch"](29);

                if (!(_context.t1 instanceof axios.Cancel)) {
                  console.log("error getting ".concat(url), _context.t1);
                }

                return _context.abrupt("return");

              case 41:
                if (shouldSetPageProps) {
                  setPageProps(props);
                }

              case 42:
              case "end":
                return _context.stop();
            }
          }
        }, null, null, [[2, 21], [29, 37]], Promise);
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
