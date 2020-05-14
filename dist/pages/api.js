'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../classCallCheck-d2bb402f.js');
var client = require('../index-c5fa8643.js');
var index = require('../index.js');
var FormErrors = require('../FormErrors-1539c4dc.js');
require('react');
require('prop-types');
require('react-bootstrap');
require('../errors-1d6db12f.js');
require('bcryptjs');
require('../utils-a6a1ae57.js');
require('../utils-c88c9c04.js');
require('sanitize-html');
require('../signup-50e33efc.js');
var utils$2 = require('../utils-b08f259e.js');
var asyncToGenerator = require('../asyncToGenerator-ae22edb1.js');
require('../utils-59259237.js');
require('uuid');
require('../utils-100b7d88.js');
require('../models/loginAttempts.js');
require('../utils-08b190dc.js');
require('../models/users.js');
require('../models/magicLogins.js');
require('../models/resetAttempts.js');
var utils$4 = require('../utils-74545f35.js');
require('../SessionContext-efd795c9.js');
var utils$5 = require('../utils-a7f6a71b.js');
require('jsonwebtoken');
require('moment');
var signup$1 = require('../signup-6013abe3.js');

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { client._defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var apiWrapper = /*#__PURE__*/function () {
  var _ref = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator._regeneratorRuntime.mark(function _callee(req, res, api) {
    var sentry, options, _yield$getSession, session, tokens, data;

    return asyncToGenerator._regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            sentry = index.services.sentry;
            options = _objectSpread({
              allowedMethods: [utils$2.GET],
              requireAuth: false,
              reloadUserSource: utils$4.RELOAD_USER_SOURCE_REFRESH_TOKEN
            }, api.options);
            _context.prev = 2;
            utils$2.validateRequest(req, res, options);
            _context.next = 6;
            return utils$4.getSession(req, options.reloadUserSource);

          case 6:
            _yield$getSession = _context.sent;
            session = _yield$getSession.session;
            tokens = _yield$getSession.tokens;

            if (!(options.requireAuth && !session.isAuthenticated)) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", utils$2.httpForbiddenResponse(res, FormErrors.errorJson(new Error('You do not have access to view this page.'))));

          case 11:
            data = {};
            _context.t0 = _objectSpread;
            _context.t1 = {};
            _context.t2 = data;
            _context.t3 = {};
            _context.next = 18;
            return api({
              req: req,
              res: res,
              session: session,
              tokens: tokens
            });

          case 18:
            _context.t4 = _context.sent;
            data = (0, _context.t0)(_context.t1, _context.t2, _context.t3, _context.t4);

            if (!(data.errors && data.errors.length)) {
              _context.next = 22;
              break;
            }

            return _context.abrupt("return", utils$2.httpBadRequestResponse(res, FormErrors.errorJson(data.errors)));

          case 22:
            return _context.abrupt("return", utils$2.httpOKResponse(res, data));

          case 25:
            _context.prev = 25;
            _context.t5 = _context["catch"](2);

            if (!(_context.t5 instanceof utils$2.HttpError)) {
              _context.next = 30;
              break;
            }

            if (!(_context.t5 instanceof utils$2.HttpMethodNotAllowedError)) {
              _context.next = 30;
              break;
            }

            return _context.abrupt("return", utils$2.httpMethodNotAllowedResponse(res, FormErrors.errorJson(_context.t5)));

          case 30:
            if (!(_context.t5 instanceof utils$4.SessionError || _context.t5 instanceof utils$5.TokenError)) {
              _context.next = 33;
              break;
            }

            utils$4.deleteSessionCookies(res);
            return _context.abrupt("return", utils$2.httpUnauthorizedResponse(res, FormErrors.errorJson(_context.t5)));

          case 33:
            if (!(_context.t5 instanceof FormErrors.BaseError)) {
              _context.next = 35;
              break;
            }

            return _context.abrupt("return", utils$2.httpBadRequestResponse(res, FormErrors.errorJson(_context.t5)));

          case 35:
            console.error('error in apiWrapper:', _context.t5);

            if (sentry) {
              sentry.captureException(_context.t5);
            }

            return _context.abrupt("return", utils$2.httpInternalServerErrorResponse(res, FormErrors.errorJson(new Error('An unknown error occured.'))));

          case 38:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 25]]);
  }));

  return function apiWrapper(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.loginAPI = signup$1.loginAPI;
exports.logoutAPI = signup$1.logoutAPI;
exports.resetAPI = signup$1.resetAPI;
exports.sessionAPI = signup$1.sessionAPI;
exports.signupAPI = signup$1.signupAPI;
exports.apiWrapper = apiWrapper;
