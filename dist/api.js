'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./classCallCheck-d2bb402f.js');
var client = require('./index-7e627aef.js');
var index = require('./index.js');
var index$1 = require('./index-2340470f.js');
var Sentry = require('@sentry/node');
var FormErrors = require('./FormErrors-1539c4dc.js');
require('react');
require('prop-types');
require('react-bootstrap');
var utils = require('./utils-b08f259e.js');
var utils$1 = require('./utils-a6936a19.js');
require('./SessionContext-efd795c9.js');
var utils$2 = require('./utils-bc155fc2.js');
require('jsonwebtoken');

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { client._defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var apiWrapper = function apiWrapper(req, res, api) {
  var _Elusive$options, sentryOptions, tokenOptions, options, _await$getSession, session, tokens, data;

  return index$1._regeneratorRuntime.async(function apiWrapper$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _Elusive$options = index.options, sentryOptions = _Elusive$options.sentry, tokenOptions = _Elusive$options.tokens;
          options = _objectSpread({
            allowedMethods: [utils.GET],
            requireAuth: false,
            setSessionCookies: false,
            reloadSessionUser: false
          }, api.options);
          _context.prev = 2;
          utils.validateRequest(req, res, options);
          _context.next = 6;
          return index$1._regeneratorRuntime.awrap(utils$1.getSession(req, options.reloadSessionUser));

        case 6:
          _await$getSession = _context.sent;
          session = _await$getSession.session;
          tokens = _await$getSession.tokens;

          if (options.setSessionCookies && session.isAuthenticated && tokens) {
            utils$1.createSessionCookies(res, utils$2.signTokens(session.claims, tokenOptions.secret), session.claims.user.id);
          }

          if (!(options.requireAuth && !session.isAuthenticated)) {
            _context.next = 12;
            break;
          }

          return _context.abrupt("return", utils.httpForbiddenResponse(res, FormErrors.errorJson(new Error('You do not have access to view this page.'))));

        case 12:
          data = {};
          _context.t0 = _objectSpread;
          _context.t1 = {};
          _context.t2 = data;
          _context.t3 = {};
          _context.next = 19;
          return index$1._regeneratorRuntime.awrap(api({
            req: req,
            res: res,
            session: session
          }));

        case 19:
          _context.t4 = _context.sent;
          data = (0, _context.t0)(_context.t1, _context.t2, _context.t3, _context.t4);

          if (!(data.errors && data.errors.length)) {
            _context.next = 23;
            break;
          }

          return _context.abrupt("return", utils.httpBadRequestResponse(res, FormErrors.errorJson(data.errors)));

        case 23:
          return _context.abrupt("return", utils.httpOKResponse(res, data));

        case 26:
          _context.prev = 26;
          _context.t5 = _context["catch"](2);

          if (!(_context.t5 instanceof utils.HttpError)) {
            _context.next = 31;
            break;
          }

          if (!(_context.t5 instanceof utils.HttpMethodNotAllowedError)) {
            _context.next = 31;
            break;
          }

          return _context.abrupt("return", utils.httpMethodNotAllowedResponse(res, FormErrors.errorJson(_context.t5)));

        case 31:
          if (!(_context.t5 instanceof utils$1.SessionError)) {
            _context.next = 34;
            break;
          }

          utils$1.deleteSessionCookies(res);
          return _context.abrupt("return", utils.httpUnauthorizedResponse(res, FormErrors.errorJson(_context.t5)));

        case 34:
          if (!(_context.t5 instanceof FormErrors.BaseError)) {
            _context.next = 36;
            break;
          }

          return _context.abrupt("return", utils.httpBadRequestResponse(res, FormErrors.errorJson(_context.t5)));

        case 36:
          console.error('error in apiWrapper:', _context.t5);

          if (sentryOptions && sentryOptions.dsn) {
            console.log('sending to Sentry');
            Sentry.captureException(_context.t5);
          }

          return _context.abrupt("return", utils.httpInternalServerErrorResponse(res, FormErrors.errorJson(new Error('An unknown error occured.'))));

        case 39:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 26]], Promise);
};

exports.apiWrapper = apiWrapper;
