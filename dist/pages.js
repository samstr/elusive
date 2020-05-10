'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('./classCallCheck-d2bb402f.js');
var client = require('./index-905648bc.js');
require('./index.js');
require('./FormErrors-1539c4dc.js');
var React = require('react');
var React__default = _interopDefault(React);
require('prop-types');
require('react-bootstrap');
var utils = require('./utils-b08f259e.js');
var index$1 = require('./index-2340470f.js');
require('uuid');
var axios = require('axios');
var axios__default = _interopDefault(axios);
var router = require('next/router');
var utils$1 = require('./utils-88e48cad.js');
var SessionContext = require('./SessionContext-efd795c9.js');
require('jsonwebtoken');

var useData = function useData() {
  var _useSessionContext = SessionContext.useSessionContext(),
      resetSessionContext = _useSessionContext.resetSessionContext;

  var _useState = React.useState(),
      data = _useState[0],
      setData = _useState[1];

  var router$1 = router.useRouter();

  var handleError = function handleError(err) {
    if (axios__default.isCancel(err)) return;

    if (err.response && err.response.status === utils.HTTP_STATUS_UNAUTHORIZED) {
      resetSessionContext();
      var pathname = window.location.pathname;

      if (pathname !== utils$1.loginRoute()) {
        router$1.replace(utils$1.loginRouteWithNext());
      }

      return;
    }

    if (err.response && err.response.data) {
      setData(err.response.data);
      return;
    }

    console.log('Unknown error in useData: ', err);
  };

  React.useEffect(function () {
    var cancelRequest;

    var fetch = function fetch() {
      var _window$location, pathname, search, url, response;

      return index$1._regeneratorRuntime.async(function fetch$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _window$location = window.location, pathname = _window$location.pathname, search = _window$location.search;
              url = "/api/data".concat(pathname).concat(search);
              _context.next = 5;
              return index$1._regeneratorRuntime.awrap(axios__default(url, {
                cancelToken: new axios.CancelToken(function (c) {
                  cancelRequest = c;
                })
              }));

            case 5:
              response = _context.sent;
              cancelRequest = null;
              setData(response.data);
              _context.next = 13;
              break;

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", handleError(_context.t0));

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 10]], Promise);
    };

    fetch();
    return function () {
      if (typeof cancelRequest === 'function') {
        cancelRequest();
      }
    };
  }, []);
  return data;
};

var useRedirect = function useRedirect(href, asPath) {
  var router$1 = router.useRouter();
  React.useEffect(function () {
    router$1.replace(href, asPath);
  }, []);
};

var useRequireAuth = function useRequireAuth() {
  var router$1 = router.useRouter();

  var _useSessionContext = SessionContext.useSessionContext(),
      sessionContext = _useSessionContext.sessionContext;

  React.useEffect(function () {
    if (sessionContext._ready && !sessionContext.isAuthenticated) {
      router$1.replace(utils$1.loginRouteWithNext());
    }
  }, [sessionContext._ready]);
};

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { client._defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var useSession = function useSession() {
  var _useSessionContext = SessionContext.useSessionContext(),
      sessionContext = _useSessionContext.sessionContext,
      resetSessionContext = _useSessionContext.resetSessionContext,
      setSessionContext = _useSessionContext.setSessionContext;

  var _useState = React.useState(sessionContext),
      session = _useState[0],
      setSession = _useState[1];

  var router$1 = router.useRouter();

  var handleError = function handleError(err) {
    if (axios__default.isCancel(err)) return;

    if (err.response && err.response.status === utils.HTTP_STATUS_UNAUTHORIZED) {
      resetSessionContext();
      var pathname = window.location.pathname;

      if (pathname !== utils$1.loginRoute()) {
        router$1.replace(utils$1.loginRouteWithNext());
      }

      return;
    }

    console.log('Unknown error in useSession: ', err);
  };

  React.useEffect(function () {
    var cancelRequest;

    var fetch = function fetch() {
      var _session$claims, _session$claims$user, response, _session;

      return index$1._regeneratorRuntime.async(function fetch$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return index$1._regeneratorRuntime.awrap(axios__default(utils$1.sessionAPIRoute(), {
                cancelToken: new axios.CancelToken(function (c) {
                  cancelRequest = c;
                })
              }));

            case 3:
              response = _context.sent;
              cancelRequest = null;
              _session = _objectSpread({}, response.data, {
                _ready: true
              }); // if user still needs onboarding

              if (!((_session === null || _session === void 0 ? void 0 : _session.isAuthenticated) && (_session === null || _session === void 0 ? void 0 : (_session$claims = _session.claims) === null || _session$claims === void 0 ? void 0 : (_session$claims$user = _session$claims.user) === null || _session$claims$user === void 0 ? void 0 : _session$claims$user.needsPassword))) {
                _context.next = 9;
                break;
              }

              router$1.replace(utils$1.onboardingRoute());
              return _context.abrupt("return");

            case 9:
              setSession(_session);
              setSessionContext(_session);
              _context.next = 16;
              break;

            case 13:
              _context.prev = 13;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", handleError(_context.t0));

            case 16:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 13]], Promise);
    };

    fetch();
    return function () {
      if (typeof cancelRequest === 'function') {
        cancelRequest();
      }
    };
  }, []);
  return session;
};

exports.useData = useData;
exports.useRedirect = useRedirect;
exports.useRequireAuth = useRequireAuth;
exports.useSession = useSession;
