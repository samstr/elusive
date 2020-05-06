'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('../classCallCheck-d2bb402f.js');
var client = require('../index-e304a026.js');
var index = require('../index.js');
var FormErrors = require('../FormErrors-1539c4dc.js');
require('react');
require('prop-types');
require('react-bootstrap');
var utils = require('../utils-78c5e054.js');
require('bcryptjs');
var resetPasswordConfirm = require('../reset-password-confirm-e0a0d0e5.js');
require('sanitize-html');
var utils$1 = require('../utils-b08f259e.js');
var index$1 = require('../index-2340470f.js');
require('../utils-ab79aa7c.js');
require('uuid');
require('../utils-c34f61d5.js');
var users = require('../models/users.js');
var moment = _interopDefault(require('moment'));
var passwordResets = require('../models/passwordResets.js');
var userVerifications = require('../models/userVerifications.js');
var utils$3 = require('../utils-1e44271e.js');
require('../SessionContext-efd795c9.js');
var utils$4 = require('../utils-587b1755.js');
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
          _loginForm$validate = resetPasswordConfirm.loginForm().validate({
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
  var res, session;
  return index$1._regeneratorRuntime.async(function logoutApi$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          res = _ref.res, session = _ref.session;

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
  var req, res, session, _Elusive$options, authOptions, tokenOptions, _req$body, email, password, termsAgreed, _registerForm$validat, cleanValues, errors, user, ip, date1DayAgo, recentUsersByIP, userVerification, claims;

  return index$1._regeneratorRuntime.async(function registerApi$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          req = _ref.req, res = _ref.res, session = _ref.session;
          _Elusive$options = index.options, authOptions = _Elusive$options.auth, tokenOptions = _Elusive$options.tokens;

          if (!session.isAuthenticated) {
            _context.next = 4;
            break;
          }

          throw new utils.AlreadyAuthenticatedError('You are already logged in');

        case 4:
          _req$body = req.body, email = _req$body.email, password = _req$body.password, termsAgreed = _req$body.termsAgreed;
          _registerForm$validat = resetPasswordConfirm.registerForm().validate({
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
          ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
          date1DayAgo = moment().subtract(1, 'day');
          _context.next = 17;
          return index$1._regeneratorRuntime.awrap(users.getUsersByIPSinceDate(ip, date1DayAgo));

        case 17:
          recentUsersByIP = _context.sent;

          if (!(recentUsersByIP.length >= authOptions.registrationMaxAccountsPerDay)) {
            _context.next = 20;
            break;
          }

          throw new utils.TooManyRegistrationsError('You have created too many accounts recently.');

        case 20:
          _context.next = 22;
          return index$1._regeneratorRuntime.awrap(users.createUser({
            email: cleanValues.email,
            password: utils.hashPassword(cleanValues.password),
            imageUrl: '',
            enabled: true,
            termsAgreed: termsAgreed,
            registrationIP: ip,
            verifications: {
              email: false,
              phone: false
            }
          }));

        case 22:
          user = _context.sent;
          _context.next = 25;
          return index$1._regeneratorRuntime.awrap(userVerifications.createUserVerification({
            userId: user.id,
            type: userVerifications.TYPE_EMAIL
          }));

        case 25:
          userVerification = _context.sent;
          claims = tokenOptions.createClaims(user);
          utils$3.createSessionCookies(res, utils$4.signTokens(claims, tokenOptions.secret), user.id);
          _context.next = 30;
          return index$1._regeneratorRuntime.awrap(userVerifications.sendUserVerificationEmail(req, user.email, userVerification.id));

        case 30:
          return _context.abrupt("return", {
            isAuthenticated: true,
            claims: claims
          });

        case 31:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, null, Promise);
};

registerApi.options = {
  allowedMethods: [utils$1.POST]
};

var resetPasswordConfirmApi = function resetPasswordConfirmApi(_ref) {
  var req, res, tokenOptions, _req$body, passwordResetId, password, _resetPasswordConfirm, cleanValues, errors, passwordReset, claims;

  return index$1._regeneratorRuntime.async(function resetPasswordConfirmApi$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          req = _ref.req, res = _ref.res;
          tokenOptions = index.options.tokens;
          _req$body = req.body, passwordResetId = _req$body.passwordResetId, password = _req$body.password;
          _resetPasswordConfirm = resetPasswordConfirm.resetPasswordConfirmForm().validate({
            passwordResetId: passwordResetId,
            password: password
          }), cleanValues = _resetPasswordConfirm.cleanValues, errors = _resetPasswordConfirm.errors;

          if (!(errors && errors.length)) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", {
            errors: errors
          });

        case 6:
          _context.next = 8;
          return index$1._regeneratorRuntime.awrap(passwordResets.getPasswordReset(passwordResetId));

        case 8:
          passwordReset = _context.sent;

          if (passwordReset) {
            _context.next = 11;
            break;
          }

          throw new passwordResets.PasswordResetNotFoundError('Password reset key not found');

        case 11:
          if (!passwordReset.used) {
            _context.next = 13;
            break;
          }

          throw new passwordResets.PasswordResetAlreadyUsedError('Password reset key already used');

        case 13:
          if (!passwordReset.hasExpired()) {
            _context.next = 15;
            break;
          }

          throw new passwordResets.PasswordResetExpiredError('Password reset key has expired');

        case 15:
          _context.next = 17;
          return index$1._regeneratorRuntime.awrap(passwordReset.getUser());

        case 17:
          if (passwordReset.user) {
            _context.next = 19;
            break;
          }

          throw new users.UserNotFoundError('User not found');

        case 19:
          if (passwordReset.user.enabled) {
            _context.next = 21;
            break;
          }

          throw new users.UserNotEnabledError('User not enabled');

        case 21:
          _context.next = 23;
          return index$1._regeneratorRuntime.awrap(passwordResets.updatePasswordReset(passwordReset, {
            used: true
          }));

        case 23:
          _context.next = 25;
          return index$1._regeneratorRuntime.awrap(users.updateUser(passwordReset.user, {
            password: utils.hashPassword(cleanValues.password)
          }));

        case 25:
          claims = tokenOptions.createClaims(passwordReset.user);
          utils$3.createSessionCookies(res, utils$4.signTokens(claims, tokenOptions.secret), passwordReset.user.id);
          return _context.abrupt("return", {
            isAuthenticated: true,
            claims: claims
          });

        case 28:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, null, Promise);
};

resetPasswordConfirmApi.options = {
  allowedMethods: [utils$1.POST]
};

var resetPasswordRequestApi = function resetPasswordRequestApi(_ref) {
  var req, email, _resetPasswordRequest, cleanValues, errors, user, passwordReset;

  return index$1._regeneratorRuntime.async(function resetPasswordRequestApi$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          req = _ref.req;
          email = req.body.email;
          _resetPasswordRequest = resetPasswordConfirm.resetPasswordRequestForm().validate({
            email: email
          }), cleanValues = _resetPasswordRequest.cleanValues, errors = _resetPasswordRequest.errors;

          if (!(errors && errors.length)) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return", {
            errors: errors
          });

        case 5:
          _context.next = 7;
          return index$1._regeneratorRuntime.awrap(users.getUserByEmail(cleanValues.email));

        case 7:
          user = _context.sent;

          if (!(user && user.enabled)) {
            _context.next = 14;
            break;
          }

          _context.next = 11;
          return index$1._regeneratorRuntime.awrap(passwordResets.createPasswordReset({
            userId: user.id
          }));

        case 11:
          passwordReset = _context.sent;
          _context.next = 14;
          return index$1._regeneratorRuntime.awrap(passwordResets.sendPasswordResetRequestEmail(req, user.email, passwordReset.id));

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, null, Promise);
};

resetPasswordRequestApi.options = {
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
exports.resetPasswordConfirmApi = resetPasswordConfirmApi;
exports.resetPasswordRequestApi = resetPasswordRequestApi;
exports.sessionApi = sessionApi;
