'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./classCallCheck-d2bb402f.js');
require('./index-6c0d18da.js');
var defineProperty = require('./defineProperty-ba7cd53d.js');
var index = require('./index.js');
var index$1 = require('./index-2340470f.js');
var Sentry = require('@sentry/node');
var FormErrors = require('./FormErrors-1539c4dc.js');
require('react');
require('prop-types');
require('react-bootstrap');
var utils = require('./utils-b08f259e.js');
var utils$1 = require('./utils-e75d8007.js');
require('jsonwebtoken');
var utils$2 = require('./utils-b756bb3f.js');

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty._defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var apiWrapper = function apiWrapper(req, res, fn, options) {
  var _Elusive$options, sentryOptions, sessionOptions, tokenOptions, defaultOptions, accessToken, refreshToken, userId, _await$getSession, session, tokens, data;

  return index$1._regeneratorRuntime.async(function apiWrapper$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _Elusive$options = index.options, sentryOptions = _Elusive$options.sentry, sessionOptions = _Elusive$options.sessions, tokenOptions = _Elusive$options.tokens;

          if (sentryOptions && sentryOptions.dsn) {
            Sentry.init({
              dsn: sentryOptions.dsn,
              enabled: sentryOptions.enabled
            });
          }

          defaultOptions = {
            allowedMethods: [utils.GET],
            requireAuth: false,
            setSessionCookies: false,
            reloadSessionUser: false
          };
          options = _objectSpread({}, defaultOptions, {}, options);
          _context.prev = 4;
          utils.validateRequest(req, res, options);
          accessToken = req.cookies[sessionOptions.accessTokenCookieName];
          refreshToken = req.cookies[sessionOptions.refreshTokenCookieName];
          userId = req.cookies[sessionOptions.userIdCookieName];
          _context.next = 11;
          return index$1._regeneratorRuntime.awrap(utils$1.getSession(accessToken, refreshToken, userId, options.reloadSessionUser));

        case 11:
          _await$getSession = _context.sent;
          session = _await$getSession.session;
          tokens = _await$getSession.tokens;

          if (options.setSessionCookies && session.isAuthenticated && tokens) {
            utils$1.createSessionCookies(res, utils$2.signTokens(session.claims, tokenOptions.secret), userId);
          }

          if (!(options.requireAuth && !session.isAuthenticated)) {
            _context.next = 17;
            break;
          }

          return _context.abrupt("return", utils.httpForbiddenResponse(res, FormErrors.errorJson(new Error('You do not have access to view this page.'))));

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

          return _context.abrupt("return", utils.httpBadRequestResponse(res, FormErrors.errorJson(data.errors)));

        case 28:
          return _context.abrupt("return", utils.httpOKResponse(res, data));

        case 31:
          _context.prev = 31;
          _context.t5 = _context["catch"](4);

          if (!(_context.t5 instanceof utils.HttpError)) {
            _context.next = 36;
            break;
          }

          if (!(_context.t5 instanceof utils.HttpMethodNotAllowedError)) {
            _context.next = 36;
            break;
          }

          return _context.abrupt("return", utils.httpMethodNotAllowedResponse(res, FormErrors.errorJson(_context.t5)));

        case 36:
          if (!(_context.t5 instanceof utils$1.SessionError)) {
            _context.next = 39;
            break;
          }

          utils$1.deleteSessionCookies(res);
          return _context.abrupt("return", utils.httpUnauthorizedResponse(res, FormErrors.errorJson(_context.t5)));

        case 39:
          if (!(_context.t5 instanceof FormErrors.BaseError)) {
            _context.next = 41;
            break;
          }

          return _context.abrupt("return", utils.httpBadRequestResponse(res, FormErrors.errorJson(_context.t5)));

        case 41:
          console.error('error in apiWrapper:', _context.t5);

          if (sentryOptions && sentryOptions.dsn) {
            console.log('sending to Sentry');
            Sentry.captureException(_context.t5);
          }

          return _context.abrupt("return", utils.httpInternalServerErrorResponse(res, FormErrors.errorJson(new Error('An unknown error occured.'))));

        case 44:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[4, 31]], Promise);
};

exports.apiWrapper = apiWrapper;
