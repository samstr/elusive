'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('./classCallCheck-d2bb402f.js');
var defineProperty$1 = require('./defineProperty-ba7cd53d.js');
require('./errors-6d843f19.js');
var asyncToGenerator = require('./asyncToGenerator-7a28bf2e.js');
var utils$1 = require('./utils-ac544182.js');
require('prop-types');
var React = require('react');
var React__default = _interopDefault(React);
var router = require('next/router');
var axios = require('axios');
var axios__default = _interopDefault(axios);
var UserContext = require('./UserContext-1558dc2a.js');
var utils = require('./utils-cb2ac89c.js');
var useSession = require('./useSession-069cbdf9.js');

var useRedirect = function useRedirect(href, asPath) {
  var router$1 = router.useRouter();
  React.useEffect(function () {
    router$1.replace(href, asPath);
  }, []);
};

var useRequireAuth = function useRequireAuth() {
  var router$1 = router.useRouter();

  var _useSessionContext = useSession.useSessionContext(),
      sessionContext = _useSessionContext.sessionContext;

  React.useEffect(function () {
    if (sessionContext._ready && !sessionContext.isAuthenticated) {
      router$1.replace(utils$1.loginRouteWithNext());
    }
  }, [sessionContext._ready]);
};

var useUserContext = (function () {
  return React.useContext(UserContext.UserContext);
});

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty$1._defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var useUser = function useUser() {
  var _useUserContext = useUserContext(),
      resetUserContext = _useUserContext.resetUserContext,
      setUserContext = _useUserContext.setUserContext;

  var _useState = React.useState(),
      user = _useState[0],
      setUser = _useState[1];

  var router$1 = router.useRouter();

  var handleError = function handleError(err) {
    if (axios__default.isCancel(err)) return;

    if (err.response && err.response.status === utils.HTTP_STATUS_UNAUTHORIZED) {
      resetUserContext();
      var pathname = window.location.pathname;

      if (pathname !== utils$1.loginRoute()) {
        router$1.replace(utils$1.loginRoute());
      }

      return;
    }

    console.log('Unknown error in useUser: ', err);
  };

  React.useEffect(function () {
    var cancelRequest;

    var fetch = /*#__PURE__*/function () {
      var _ref = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator.regenerator.mark(function _callee() {
        var response, _user;

        return asyncToGenerator.regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return axios__default(utils$1.userAPIRoute(), {
                  cancelToken: new axios.CancelToken(function (c) {
                    cancelRequest = c;
                  })
                });

              case 3:
                response = _context.sent;
                cancelRequest = null;
                _user = _objectSpread(_objectSpread({}, response.data.user), {}, {
                  _ready: true
                });
                setUser(_user);
                setUserContext(_user);
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
  return user;
};

exports.useData = useSession.useData;
exports.useSession = useSession.useSession;
exports.useSessionContext = useSession.useSessionContext;
exports.useRedirect = useRedirect;
exports.useRequireAuth = useRequireAuth;
exports.useUser = useUser;
exports.useUserContext = useUserContext;
