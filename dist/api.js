'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./classCallCheck-d2bb402f.js');
require('./index-08623d88.js');
var defineProperty = require('./defineProperty-ba7cd53d.js');
require('./utils-1794fb54.js');
var index = require('./index.js');
var index$1 = require('./index-2340470f.js');
var Sentry = require('@sentry/node');
var FormErrors = require('./FormErrors-1539c4dc.js');
require('react');
require('prop-types');
require('react-bootstrap');
var utils$1 = require('./utils-b08f259e.js');
var utils$2 = require('./utils-ab1e44de.js');

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty._defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var apiWrapper = function apiWrapper(req, res, fn, options) {
  var _Elusive$options, sentry, jwt, sessions, defaultOptions, accessToken, refreshToken, userId, _await$getSession, session, newTokens, data;

  return index$1._regeneratorRuntime.async(function apiWrapper$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _Elusive$options = index.options, sentry = _Elusive$options.sentry, jwt = _Elusive$options.jwt, sessions = _Elusive$options.sessions;

          if (sentry && sentry.dsn) {
            Sentry.init({
              dsn: sentry.dsn,
              enabled: sentry.enabled
            });
          }

          defaultOptions = {
            allowedMethods: [utils$1.GET],
            requireAuth: false,
            setTokens: false
          };
          options = _objectSpread({}, defaultOptions, {}, options);
          _context.prev = 4;
          utils$1.validateRequest(req, res, options);
          accessToken = req.cookies[sessions.cookies.accessTokenName];
          refreshToken = req.cookies[sessions.cookies.refreshTokenName];
          userId = req.cookies[sessions.cookies.userIdName];
          _context.next = 11;
          return index$1._regeneratorRuntime.awrap(getSession(accessToken, refreshToken));

        case 11:
          _await$getSession = _context.sent;
          session = _await$getSession.session;
          newTokens = _await$getSession.newTokens;

          if (session.isAuthenticated && newTokens && options.setTokens) {
            createSessionCookies(res, signTokens(session.claims, jwt.secret), userId);
          }

          if (!(options.requireAuth && !session.isAuthenticated)) {
            _context.next = 17;
            break;
          }

          return _context.abrupt("return", utils$1.httpForbiddenResponse(res, FormErrors.errorJson(new Error('You do not have access to view this page.'))));

        case 17:
          data = {};
          _context.t0 = _objectSpread;
          _context.t1 = {};
          _context.t2 = data;
          _context.t3 = {};
          _context.next = 24;
          return index$1._regeneratorRuntime.awrap(fn({
            session: session
          }));

        case 24:
          _context.t4 = _context.sent;
          data = (0, _context.t0)(_context.t1, _context.t2, _context.t3, _context.t4);

          if (!(data.errors && data.errors.length)) {
            _context.next = 28;
            break;
          }

          return _context.abrupt("return", utils$1.httpBadRequestResponse(res, FormErrors.errorJson(data.errors)));

        case 28:
          return _context.abrupt("return", utils$1.httpOKResponse(res, data));

        case 31:
          _context.prev = 31;
          _context.t5 = _context["catch"](4);

          if (!(_context.t5 instanceof utils$1.HttpError)) {
            _context.next = 36;
            break;
          }

          if (!(_context.t5 instanceof utils$1.HttpMethodNotAllowedError)) {
            _context.next = 36;
            break;
          }

          return _context.abrupt("return", utils$1.httpMethodNotAllowedResponse(res, FormErrors.errorJson(_context.t5)));

        case 36:
          if (!(_context.t5 instanceof utils$2.SessionError)) {
            _context.next = 39;
            break;
          }

          utils$2.deleteSessionCookies(res);
          return _context.abrupt("return", utils$1.httpUnauthorizedResponse(res, FormErrors.errorJson(_context.t5)));

        case 39:
          if (!(_context.t5 instanceof FormErrors.BaseError)) {
            _context.next = 41;
            break;
          }

          return _context.abrupt("return", utils$1.httpBadRequestResponse(res, FormErrors.errorJson(_context.t5)));

        case 41:
          console.error('error in apiWrapper:', _context.t5);

          if (sentry && sentry.dsn) {
            console.log('sending to Sentry');
            Sentry.captureException(_context.t5);
          }

          return _context.abrupt("return", utils$1.httpInternalServerErrorResponse(res, FormErrors.errorJson(new Error('An unknown error occured.'))));

        case 44:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[4, 31]], Promise);
};

exports.apiWrapper = apiWrapper;
