'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('./wrapNativeSuper-b3646a2a.js');
require('./index-dc4ca14c.js');
var defineProperty = require('./defineProperty-ba7cd53d.js');
var index = require('./index.js');
var index$1 = require('./index-2340470f.js');
require('./FormErrors-a91e4b79.js');
var React = require('react');
var React__default = _interopDefault(React);
require('prop-types');
require('react-bootstrap');
var utils = require('./utils-6d62d4cd.js');
var SessionContext = require('./SessionContext-859ea7a9.js');
require('bcryptjs');
require('jsonwebtoken');
var axios = require('axios');
var axios__default = _interopDefault(axios);
var router = require('next/router');

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty._defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var usePage = function usePage(options) {
  var router$1 = router.useRouter();

  var _useState = React.useState(),
      session = _useState[0],
      setSession = _useState[1];

  var _useState2 = React.useState(),
      data = _useState2[0],
      setData = _useState2[1];

  var _useSessionContext = SessionContext.useSessionContext(),
      resetSessionContext = _useSessionContext.resetSessionContext,
      setSessionContext = _useSessionContext.setSessionContext;

  var routes = index.options.routes;
  var defaultOptions = {
    data: false,
    requireAuth: false,
    session: true,
    redirect: null
  };
  options = _objectSpread({}, defaultOptions, {}, options);

  var loginRouteWithNext = function loginRouteWithNext() {
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
    if (axios__default.isCancel(err)) return;

    if (err.response && err.response.status === utils.HTTP_STATUS_UNAUTHORIZED) {
      resetSessionContext();
      var pathname = window.location.pathname;

      if (pathname !== routes.login()) {
        router$1.replace(loginRouteWithNext());
      }

      return;
    }

    if (err.response && err.response.data) {
      setData(err.response.data);
      return;
    }

    console.log('Unknown error in usePage: ', err);
  };

  React.useEffect(function () {
    var cancelSessionRequest;
    var cancelDataRequest;

    if (options.redirect) {
      var _options$redirect = options.redirect,
          href = _options$redirect.href,
          asPath = _options$redirect.asPath;
      router$1.replace(href, asPath);
    }

    (function _callee() {
      var response, _window$location2, pathname, search, url, _response;

      return index$1._regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!options.session) {
                _context.next = 16;
                break;
              }

              _context.prev = 1;
              _context.next = 4;
              return index$1._regeneratorRuntime.awrap(axios__default(routes.apiSession(), {
                cancelToken: new axios.CancelToken(function (c) {
                  cancelSessionRequest = c;
                })
              }));

            case 4:
              response = _context.sent;
              cancelSessionRequest = null;
              setSession(response.data);
              setSessionContext(_objectSpread({}, response.data.session, {
                _ready: true
              }));

              if (!(options.requireAuth && !response.data.session.isAuthenticated)) {
                _context.next = 11;
                break;
              }

              router$1.replace(loginRouteWithNext());
              return _context.abrupt("return");

            case 11:
              _context.next = 16;
              break;

            case 13:
              _context.prev = 13;
              _context.t0 = _context["catch"](1);
              return _context.abrupt("return", handleError(_context.t0));

            case 16:
              if (!options.data) {
                _context.next = 30;
                break;
              }

              _window$location2 = window.location, pathname = _window$location2.pathname, search = _window$location2.search;
              url = "/api/page".concat(pathname).concat(search);
              _context.prev = 19;
              _context.next = 22;
              return index$1._regeneratorRuntime.awrap(axios__default(url, {
                cancelToken: new axios.CancelToken(function (c) {
                  cancelDataRequest = c;
                })
              }));

            case 22:
              _response = _context.sent;
              cancelDataRequest = null;
              setData(_response.data);
              _context.next = 30;
              break;

            case 27:
              _context.prev = 27;
              _context.t1 = _context["catch"](19);
              return _context.abrupt("return", handleError(_context.t1));

            case 30:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[1, 13], [19, 27]], Promise);
    })();

    return function () {
      if (typeof cancelSessionRequest === 'function') {
        cancelSessionRequest();
      }

      if (typeof cancelDataRequest === 'function') {
        cancelDataRequest();
      }
    };
  }, []);
  return {
    session: session,
    data: data
  };
};

exports.usePage = usePage;
