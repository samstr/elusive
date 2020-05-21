'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('./classCallCheck-d2bb402f.js');
var defineProperty = require('./defineProperty-ba7cd53d.js');
require('./FormErrors-1539c4dc.js');
var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
require('react-bootstrap');
var asyncToGenerator = require('./asyncToGenerator-ae22edb1.js');
var utils$1 = require('./utils-38c8c40b.js');
var utils = require('./utils-b08f259e.js');
var axios = require('axios');
var axios__default = _interopDefault(axios);
var router = require('next/router');

var __jsx = React__default.createElement;
var defaultValue = {
  isAuthenticated: false,
  claims: null,
  _ready: false
};
var SessionContext = React.createContext(defaultValue);
var SessionContextProvider = function SessionContextProvider(_ref) {
  var children = _ref.children;

  var _useState = React.useState(defaultValue),
      sessionContext = _useState[0],
      setSessionContext = _useState[1];

  var resetSessionContext = function resetSessionContext() {
    return setSessionContext(defaultValue);
  };

  var context = {
    sessionContext: sessionContext,
    setSessionContext: setSessionContext,
    resetSessionContext: resetSessionContext
  };
  return __jsx(SessionContext.Provider, {
    value: context
  }, children);
};
SessionContextProvider.propTypes = {
  children: PropTypes.node.isRequired
};
var useSessionContext = function useSessionContext() {
  return React.useContext(SessionContext);
};

var __jsx$1 = React__default.createElement;
var defaultValue$1 = null;
var UserContext = React.createContext(defaultValue$1);
var UserContextProvider = function UserContextProvider(_ref) {
  var children = _ref.children;

  var _useState = React.useState(defaultValue$1),
      userContext = _useState[0],
      setUserContext = _useState[1];

  var resetUserContext = function resetUserContext() {
    return setUserContext(defaultValue$1);
  };

  var context = {
    userContext: userContext,
    setUserContext: setUserContext,
    resetUserContext: resetUserContext
  };
  return __jsx$1(UserContext.Provider, {
    value: context
  }, children);
};
UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired
};
var useUserContext = function useUserContext() {
  return React.useContext(UserContext);
};

var useData = function useData() {
  var _useSessionContext = useSessionContext(),
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
        router$1.replace(utils$1.loginRoute());
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

    var fetch = /*#__PURE__*/function () {
      var _ref = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator._regeneratorRuntime.mark(function _callee() {
        var _window$location, pathname, search, url, response;

        return asyncToGenerator._regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _window$location = window.location, pathname = _window$location.pathname, search = _window$location.search;
                url = "/api/data".concat(pathname).concat(search);
                _context.next = 5;
                return axios__default(url, {
                  cancelToken: new axios.CancelToken(function (c) {
                    cancelRequest = c;
                  })
                });

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
        }, _callee, null, [[0, 10]]);
      }));

      return function fetch() {
        return _ref.apply(this, arguments);
      };
    }();

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

  var _useSessionContext = useSessionContext(),
      sessionContext = _useSessionContext.sessionContext;

  React.useEffect(function () {
    if (sessionContext._ready && !sessionContext.isAuthenticated) {
      router$1.replace(utils$1.loginRouteWithNext());
    }
  }, [sessionContext._ready]);
};

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty._defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var useSession = function useSession() {
  var _useSessionContext = useSessionContext(),
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
        router$1.replace(utils$1.loginRoute());
      }

      return;
    }

    console.log('Unknown error in useSession: ', err);
  };

  React.useEffect(function () {
    var cancelRequest;

    var fetch = /*#__PURE__*/function () {
      var _ref = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator._regeneratorRuntime.mark(function _callee() {
        var response, _session, pathname, user;

        return asyncToGenerator._regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return axios__default(utils$1.sessionAPIRoute(), {
                  cancelToken: new axios.CancelToken(function (c) {
                    cancelRequest = c;
                  })
                });

              case 3:
                response = _context.sent;
                cancelRequest = null;
                _session = _objectSpread({}, response.data.session, {
                  _ready: true
                });
                setSession(_session);
                setSessionContext(_session); // if user still needs onboarding

                if (_session.isAuthenticated) {
                  pathname = window.location.pathname;
                  user = _session.claims.user;

                  if (user.needsOnboarding && pathname !== utils$1.onboardingRoute()) {
                    router$1.replace(utils$1.onboardingRoute());
                  }
                }

                _context.next = 14;
                break;

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", handleError(_context.t0));

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 11]]);
      }));

      return function fetch() {
        return _ref.apply(this, arguments);
      };
    }();

    fetch();
    return function () {
      if (typeof cancelRequest === 'function') {
        cancelRequest();
      }
    };
  }, []);
  return session;
};

exports.SessionContext = SessionContext;
exports.SessionContextProvider = SessionContextProvider;
exports.UserContext = UserContext;
exports.UserContextProvider = UserContextProvider;
exports.useData = useData;
exports.useRedirect = useRedirect;
exports.useRequireAuth = useRequireAuth;
exports.useSession = useSession;
exports.useSessionContext = useSessionContext;
exports.useUserContext = useUserContext;
