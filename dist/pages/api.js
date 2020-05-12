'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../classCallCheck-d2bb402f.js');
var client = require('../index-53403115.js');
var index = require('../index.js');
var FormErrors = require('../FormErrors-1539c4dc.js');
require('react');
require('prop-types');
require('react-bootstrap');
require('../utils-0e4a4d8d.js');
require('bcryptjs');
require('../utils-9aa5c5d6.js');
require('sanitize-html');
require('../reset-password-request-b77fe1f1.js');
var utils$2 = require('../utils-b08f259e.js');
var index$1 = require('../index-2340470f.js');
require('../utils-9a85f680.js');
require('uuid');
require('../utils-29bedb4c.js');
require('../models/loginAttempts.js');
require('../utils-fd2c8eb3.js');
require('../models/users.js');
require('../models/magicLogins.js');
require('../models/passwordResetAttempts.js');
require('moment');
require('../models/passwordResets.js');
var utils$4 = require('../utils-e425e693.js');
require('../SessionContext-efd795c9.js');
var utils$5 = require('../utils-f128e714.js');
require('jsonwebtoken');
var session = require('../session-47f6d2f7.js');

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { client._defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var apiWrapper = function apiWrapper(req, res, api) {
  var sentry, options, _await$getSession, session, tokens, data;

  return index$1._regeneratorRuntime.async(function apiWrapper$(_context) {
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
          return index$1._regeneratorRuntime.awrap(utils$4.getSession(req, options.reloadUserSource));

        case 6:
          _await$getSession = _context.sent;
          session = _await$getSession.session;
          tokens = _await$getSession.tokens;

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
          return index$1._regeneratorRuntime.awrap(api({
            req: req,
            res: res,
            session: session,
            tokens: tokens
          }));

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
  }, null, null, [[2, 25]], Promise);
};

exports.loginAPI = session.loginAPI;
exports.logoutAPI = session.logoutAPI;
exports.registerAPI = session.registerAPI;
exports.resetPasswordConfirmAPI = session.resetPasswordConfirmAPI;
exports.resetPasswordRequestAPI = session.resetPasswordRequestAPI;
exports.sessionAPI = session.sessionAPI;
exports.apiWrapper = apiWrapper;
