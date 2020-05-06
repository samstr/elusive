'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../classCallCheck-d2bb402f.js');
var client = require('../index-61c82eb7.js');
var index = require('../index.js');
var FormErrors = require('../FormErrors-1539c4dc.js');
require('react');
require('prop-types');
require('react-bootstrap');
var utils = require('../utils-b31a2049.js');
require('bcryptjs');
var register = require('../register-1ffce60d.js');
require('sanitize-html');
var utils$1 = require('../utils-b08f259e.js');
var index$1 = require('../index-072a3fc5.js');
require('../utils-00b86ca6.js');
require('uuid');
require('../utils-385a9005.js');
var users = require('../models/users.js');
var userVerifications = require('../models/userVerifications.js');
var utils$3 = require('../utils-050f73b7.js');
require('../SessionContext-efd795c9.js');
var utils$4 = require('../utils-5469b2c7.js');
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
            allowedMethods: [utils$1.GET],
            requireAuth: false,
            setSessionCookies: false,
            reloadSessionUser: false
          }, api.options);
          _context.prev = 3;
          utils$1.validateRequest(req, res, options);
          _context.next = 7;
          return index$1._regeneratorRuntime.awrap(utils$3.getSession(req, options.reloadSessionUser));

        case 7:
          _await$getSession = _context.sent;
          session = _await$getSession.session;
          tokens = _await$getSession.tokens;

          if (options.setSessionCookies && session.isAuthenticated && tokens) {
            utils$3.createSessionCookies(res, utils$4.signTokens(session.claims, tokenOptions.secret), session.claims.user.id);
          }

          if (!(options.requireAuth && !session.isAuthenticated)) {
            _context.next = 13;
            break;
          }

          return _context.abrupt("return", utils$1.httpForbiddenResponse(res, FormErrors.errorJson(new Error('You do not have access to view this page.'))));

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

          return _context.abrupt("return", utils$1.httpBadRequestResponse(res, FormErrors.errorJson(data.errors)));

        case 24:
          return _context.abrupt("return", utils$1.httpOKResponse(res, data));

        case 27:
          _context.prev = 27;
          _context.t5 = _context["catch"](3);

          if (!(_context.t5 instanceof utils$1.HttpError)) {
            _context.next = 32;
            break;
          }

          if (!(_context.t5 instanceof utils$1.HttpMethodNotAllowedError)) {
            _context.next = 32;
            break;
          }

          return _context.abrupt("return", utils$1.httpMethodNotAllowedResponse(res, FormErrors.errorJson(_context.t5)));

        case 32:
          if (!(_context.t5 instanceof utils$3.SessionError || _context.t5 instanceof utils$4.TokenError)) {
            _context.next = 35;
            break;
          }

          utils$3.deleteSessionCookies(res);
          return _context.abrupt("return", utils$1.httpUnauthorizedResponse(res, FormErrors.errorJson(_context.t5)));

        case 35:
          if (!(_context.t5 instanceof FormErrors.BaseError)) {
            _context.next = 37;
            break;
          }

          return _context.abrupt("return", utils$1.httpBadRequestResponse(res, FormErrors.errorJson(_context.t5)));

        case 37:
          console.error('error in apiWrapper:', _context.t5);

          if (sentry) {
            sentry.captureException(_context.t5);
          }

          return _context.abrupt("return", utils$1.httpInternalServerErrorResponse(res, FormErrors.errorJson(new Error('An unknown error occured.'))));

        case 40:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 27]], Promise);
};

var loginApi = function loginApi(_ref) {
  var req, res, session, tokenOptions, _req$body, email, password, _loginForm$validate, cleanValues, errors, user, claims;

  return index$1._regeneratorRuntime.async(function loginApi$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          req = _ref.req, res = _ref.res, session = _ref.session;
          tokenOptions = index.options.tokens;

          if (!session.isAuthenticated) {
            _context.next = 4;
            break;
          }

          throw new utils.AlreadyAuthenticatedError('You are already logged in');

        case 4:
          _req$body = req.body, email = _req$body.email, password = _req$body.password;
          _loginForm$validate = register.loginForm().validate({
            email: email,
            password: password
          }), cleanValues = _loginForm$validate.cleanValues, errors = _loginForm$validate.errors;

          if (!(errors && errors.length)) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", {
            errors: errors
          });

        case 8:
          _context.next = 10;
          return index$1._regeneratorRuntime.awrap(users.getUserByEmail(cleanValues.email));

        case 10:
          user = _context.sent;

          if (user) {
            _context.next = 13;
            break;
          }

          throw new users.UserNotFoundError('Authentication failed');

        case 13:
          if (user.enabled) {
            _context.next = 15;
            break;
          }

          throw new users.UserNotEnabledError('Authentication failed');

        case 15:
          if (utils.comparePasswordHash(cleanValues.password, user.password)) {
            _context.next = 17;
            break;
          }

          throw new utils.AuthenticationFailedError('Authentication failed');

        case 17:
          claims = tokenOptions.createClaims(user);
          utils$3.createSessionCookies(res, utils$4.signTokens(claims, tokenOptions.secret), user.id);
          return _context.abrupt("return", {
            isAuthenticated: true,
            claims: claims
          });

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, null, Promise);
};
loginApi.options = {
  allowedMethods: [utils$1.POST]
};

var logoutApi = function logoutApi(_ref) {
  var req, res, session;
  return index$1._regeneratorRuntime.async(function logoutApi$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          req = _ref.req, res = _ref.res, session = _ref.session;

          if (session.isAuthenticated) {
            _context.next = 3;
            break;
          }

          throw new utils.NotAuthenticatedError('You are not logged in');

        case 3:
          utils$3.deleteSessionCookies(res);
          return _context.abrupt("return", {
            isAuthenticated: false,
            claims: null
          });

        case 5:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, null, Promise);
};

logoutApi.options = {
  allowedMethods: [utils$1.POST]
};

var registerApi = function registerApi(_ref) {
  var req, res, session, tokenOptions, _req$body, email, password, termsAgreed, _registerForm$validat, cleanValues, errors, user, userVerification, claims;

  return index$1._regeneratorRuntime.async(function registerApi$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          req = _ref.req, res = _ref.res, session = _ref.session;
          tokenOptions = index.options.tokens;

          if (!session.isAuthenticated) {
            _context.next = 4;
            break;
          }

          throw new utils.AlreadyAuthenticatedError('You are already logged in');

        case 4:
          _req$body = req.body, email = _req$body.email, password = _req$body.password, termsAgreed = _req$body.termsAgreed;
          _registerForm$validat = register.registerForm().validate({
            email: email,
            password: password,
            termsAgreed: termsAgreed
          }), cleanValues = _registerForm$validat.cleanValues, errors = _registerForm$validat.errors;

          if (!(errors && errors.length)) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", {
            errors: errors
          });

        case 8:
          _context.next = 10;
          return index$1._regeneratorRuntime.awrap(users.getUserByEmail(cleanValues.email));

        case 10:
          user = _context.sent;

          if (!user) {
            _context.next = 13;
            break;
          }

          throw new utils.UserAlreadyExistsError('User already exists');

        case 13:
          _context.next = 15;
          return index$1._regeneratorRuntime.awrap(users.createUser({
            email: cleanValues.email,
            password: utils.hashPassword(cleanValues.password),
            imageUrl: '',
            enabled: true,
            termsAgreed: termsAgreed,
            verifications: {
              email: false,
              phone: false
            }
          }));

        case 15:
          user = _context.sent;
          _context.next = 18;
          return index$1._regeneratorRuntime.awrap(userVerifications.createUserVerification({
            userId: user.id,
            type: userVerifications.TYPE_EMAIL
          }));

        case 18:
          userVerification = _context.sent;
          claims = tokenOptions.createClaims(user);
          utils$3.createSessionCookies(res, utils$4.signTokens(claims, tokenOptions.secret), user.id);
          _context.next = 23;
          return index$1._regeneratorRuntime.awrap(userVerifications.sendUserVerificationEmail(req, user.email, userVerification.id));

        case 23:
          return _context.abrupt("return", {
            isAuthenticated: true,
            claims: claims
          });

        case 24:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, null, Promise);
};

registerApi.options = {
  allowedMethods: [utils$1.POST]
};

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { client._defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var sessionApi = function sessionApi(_ref) {
  var session;
  return index$1._regeneratorRuntime.async(function sessionApi$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          session = _ref.session;
          return _context.abrupt("return", _objectSpread$1({}, session));

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, null, Promise);
};

sessionApi.options = {
  reloadSessionUser: true,
  setSessionCookies: true
};

exports.apiWrapper = apiWrapper;
exports.loginApi = loginApi;
exports.logoutApi = logoutApi;
exports.registerApi = registerApi;
exports.sessionApi = sessionApi;
