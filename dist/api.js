'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./classCallCheck-d2bb402f.js');
var client = require('./index-61c82eb7.js');
var index = require('./index.js');
var index$1 = require('./index-072a3fc5.js');
var FormErrors = require('./FormErrors-1539c4dc.js');
require('react');
require('prop-types');
require('react-bootstrap');
var utils = require('./utils-b08f259e.js');
var utils$1 = require('./utils-95cdaf5d.js');
require('./SessionContext-efd795c9.js');
require('uuid');
require('./utils-385a9005.js');
require('./models/users.js');
var utils$3 = require('./utils-5469b2c7.js');
require('jsonwebtoken');

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { client._defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var apiWrapper = function apiWrapper(req, res, api) {
  var sentry, tokenOptions, options, _await$getSession, session, tokens, data;

  return index$1._regeneratorRuntime.async(function apiWrapper$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          sentry = index.services.sentry;
          tokenOptions = index.options.tokens;
          options = _objectSpread({
            allowedMethods: [utils.GET],
            requireAuth: false,
            setSessionCookies: false,
            reloadSessionUser: false
          }, api.options);
          _context.prev = 3;
          utils.validateRequest(req, res, options);
          _context.next = 7;
          return index$1._regeneratorRuntime.awrap(utils$1.getSession(req, options.reloadSessionUser));

        case 7:
          _await$getSession = _context.sent;
          session = _await$getSession.session;
          tokens = _await$getSession.tokens;

          if (options.setSessionCookies && session.isAuthenticated && tokens) {
            utils$1.createSessionCookies(res, utils$3.signTokens(session.claims, tokenOptions.secret), session.claims.user.id);
          }

          if (!(options.requireAuth && !session.isAuthenticated)) {
            _context.next = 13;
            break;
          }

          return _context.abrupt("return", utils.httpForbiddenResponse(res, FormErrors.errorJson(new Error('You do not have access to view this page.'))));

        case 13:
          data = {};
          _context.t0 = _objectSpread;
          _context.t1 = {};
          _context.t2 = data;
          _context.t3 = {};
          _context.next = 20;
          return index$1._regeneratorRuntime.awrap(api({
            req: req,
            res: res,
            session: session
          }));

        case 20:
          _context.t4 = _context.sent;
          data = (0, _context.t0)(_context.t1, _context.t2, _context.t3, _context.t4);

          if (!(data.errors && data.errors.length)) {
            _context.next = 24;
            break;
          }

          return _context.abrupt("return", utils.httpBadRequestResponse(res, FormErrors.errorJson(data.errors)));

        case 24:
          return _context.abrupt("return", utils.httpOKResponse(res, data));

        case 27:
          _context.prev = 27;
          _context.t5 = _context["catch"](3);

          if (!(_context.t5 instanceof utils.HttpError)) {
            _context.next = 32;
            break;
          }

          if (!(_context.t5 instanceof utils.HttpMethodNotAllowedError)) {
            _context.next = 32;
            break;
          }

          return _context.abrupt("return", utils.httpMethodNotAllowedResponse(res, FormErrors.errorJson(_context.t5)));

        case 32:
          if (!(_context.t5 instanceof utils$1.SessionError || _context.t5 instanceof utils$3.TokenError)) {
            _context.next = 35;
            break;
          }

          utils$1.deleteSessionCookies(res);
          return _context.abrupt("return", utils.httpUnauthorizedResponse(res, FormErrors.errorJson(_context.t5)));

        case 35:
          if (!(_context.t5 instanceof FormErrors.BaseError)) {
            _context.next = 37;
            break;
          }

          return _context.abrupt("return", utils.httpBadRequestResponse(res, FormErrors.errorJson(_context.t5)));

        case 37:
          console.error('error in apiWrapper:', _context.t5);

          if (sentry) {
            sentry.captureException(_context.t5);
          }

          return _context.abrupt("return", utils.httpInternalServerErrorResponse(res, FormErrors.errorJson(new Error('An unknown error occured.'))));

        case 40:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 27]], Promise);
};

exports.apiWrapper = apiWrapper;
