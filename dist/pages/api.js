'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('../classCallCheck-d2bb402f.js');
var client = require('../index-c5fa8643.js');
var index = require('../index.js');
var FormErrors = require('../FormErrors-1539c4dc.js');
require('react');
require('prop-types');
require('react-bootstrap');
var errors = require('../errors-1d6db12f.js');
var asyncToGenerator = require('../asyncToGenerator-ae22edb1.js');
require('bcryptjs');
require('../utils-4b2eeb65.js');
require('../utils-3f60041c.js');
var utils$2 = require('../utils-8e2326e3.js');
require('../utils-bc45515c.js');
var signup = require('../signup-fbb2288c.js');
var utils$4 = require('../utils-b08f259e.js');
require('uuid');
require('../utils-100b7d88.js');
var loginAttempts = require('../models/loginAttempts.js');
var moment = _interopDefault(require('moment'));
var users = require('../models/users.js');
var magicLogins = require('../models/magicLogins.js');
var resetAttempts = require('../models/resetAttempts.js');
var utils$6 = require('../utils-5d6fb8d6.js');
require('../SessionContext-efd795c9.js');
var utils$7 = require('../utils-a7f6a71b.js');
require('jsonwebtoken');

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
              allowedMethods: [utils$4.GET],
              requireAuth: false,
              reloadUserSource: utils$6.RELOAD_USER_SOURCE_REFRESH_TOKEN
            }, api.options);
            _context.prev = 2;
            utils$4.validateRequest(req, res, options);
            _context.next = 6;
            return utils$6.getSession(req, options.reloadUserSource);

          case 6:
            _yield$getSession = _context.sent;
            session = _yield$getSession.session;
            tokens = _yield$getSession.tokens;

            if (!(options.requireAuth && !session.isAuthenticated)) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", utils$4.httpForbiddenResponse(res, FormErrors.errorJson(new Error('You do not have access to view this page.'))));

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

            return _context.abrupt("return", utils$4.httpBadRequestResponse(res, FormErrors.errorJson(data.errors)));

          case 22:
            return _context.abrupt("return", utils$4.httpOKResponse(res, data));

          case 25:
            _context.prev = 25;
            _context.t5 = _context["catch"](2);

            if (!(_context.t5 instanceof utils$4.HttpError)) {
              _context.next = 30;
              break;
            }

            if (!(_context.t5 instanceof utils$4.HttpMethodNotAllowedError)) {
              _context.next = 30;
              break;
            }

            return _context.abrupt("return", utils$4.httpMethodNotAllowedResponse(res, FormErrors.errorJson(_context.t5)));

          case 30:
            if (!(_context.t5 instanceof utils$6.SessionError || _context.t5 instanceof utils$7.TokenError)) {
              _context.next = 33;
              break;
            }

            utils$6.deleteSessionCookies(res);
            return _context.abrupt("return", utils$4.httpUnauthorizedResponse(res, FormErrors.errorJson(_context.t5)));

          case 33:
            if (!(_context.t5 instanceof FormErrors.BaseError)) {
              _context.next = 35;
              break;
            }

            return _context.abrupt("return", utils$4.httpBadRequestResponse(res, FormErrors.errorJson(_context.t5)));

          case 35:
            console.error('error in apiWrapper:', _context.t5);

            if (sentry) {
              sentry.captureException(_context.t5);
            }

            return _context.abrupt("return", utils$4.httpInternalServerErrorResponse(res, FormErrors.errorJson(new Error('An unknown error occured.'))));

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

var loginAPI = /*#__PURE__*/function () {
  var _ref2 = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator._regeneratorRuntime.mark(function _callee(_ref) {
    var req, res, session, _Elusive$options, authOptions, tokenOptions, ip, date1HourAgo, recentLoginAttemptsByIP, _req$body, type, email, password, next, recentLoginAttemptsByAccount, _loginWithPasswordFor, cleanValues, errors$1, user, claims, _loginWithLinkForm$va, _cleanValues, _errors, _user, magicLogin;

    return asyncToGenerator._regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            req = _ref.req, res = _ref.res, session = _ref.session;
            _Elusive$options = index.options, authOptions = _Elusive$options.auth, tokenOptions = _Elusive$options.tokens;

            if (!session.isAuthenticated) {
              _context.next = 4;
              break;
            }

            throw new errors.AlreadyAuthenticatedError('You are already logged in');

          case 4:
            ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
            date1HourAgo = moment().subtract(1, 'hour');

            if (!(process.env.NODE_ENV === 'production')) {
              _context.next = 12;
              break;
            }

            _context.next = 9;
            return loginAttempts.listLoginAttempts(loginAttempts.loginAttemptsCollection().where('ip', '==', ip).where('dateCreated', '>', date1HourAgo).limit(authOptions.maxLoginAttemptsPerIPPerHour));

          case 9:
            recentLoginAttemptsByIP = _context.sent;

            if (!(recentLoginAttemptsByIP.length >= authOptions.maxLoginAttemptsPerIPPerHour)) {
              _context.next = 12;
              break;
            }

            throw new errors.TooManyLoginAttemptsError('You have attempted to login too many times. Try again later.');

          case 12:
            _req$body = req.body, type = _req$body.type, email = _req$body.email, password = _req$body.password, next = _req$body.next;

            if (!(process.env.NODE_ENV === 'production')) {
              _context.next = 19;
              break;
            }

            _context.next = 16;
            return loginAttempts.listLoginAttempts(loginAttempts.loginAttemptsCollection().where('ip', '==', ip).where('email', '==', email).where('dateCreated', '>', date1HourAgo).limit(authOptions.maxLoginAttemptsPerAccountPerHour));

          case 16:
            recentLoginAttemptsByAccount = _context.sent;

            if (!(recentLoginAttemptsByAccount.length >= authOptions.maxLoginAttemptsPerAccountPerHour)) {
              _context.next = 19;
              break;
            }

            throw new errors.TooManyLoginAttemptsError('You have attempted to login too many times. Try again later.');

          case 19:
            _context.next = 21;
            return loginAttempts.createLoginAttempt({
              ip: ip,
              email: email,
              type: type
            });

          case 21:
            if (!(type === utils$2.LOGIN_TYPE_PASSWORD)) {
              _context.next = 39;
              break;
            }

            _loginWithPasswordFor = signup.loginWithPasswordForm().validate({
              type: type,
              email: email,
              password: password,
              next: next
            }), cleanValues = _loginWithPasswordFor.cleanValues, errors$1 = _loginWithPasswordFor.errors;

            if (!(errors$1 && errors$1.length)) {
              _context.next = 25;
              break;
            }

            return _context.abrupt("return", {
              errors: errors$1
            });

          case 25:
            _context.next = 27;
            return users.getUser(users.usersCollection().where('email', '==', cleanValues.email));

          case 27:
            user = _context.sent;

            if (user) {
              _context.next = 30;
              break;
            }

            throw new users.UserNotFoundError('Authentication failed');

          case 30:
            if (user.enabled) {
              _context.next = 32;
              break;
            }

            throw new users.UserNotEnabledError('Authentication failed');

          case 32:
            if (utils$2.comparePasswordHash(cleanValues.password, user.password)) {
              _context.next = 34;
              break;
            }

            throw new errors.AuthenticationFailedError('Authentication failed');

          case 34:
            claims = tokenOptions.createClaims(user);
            utils$6.createSessionCookies(res, utils$7.signTokens(claims, tokenOptions.secret), user.id);
            return _context.abrupt("return", {
              session: {
                isAuthenticated: true,
                claims: claims
              }
            });

          case 39:
            if (!(type === utils$2.LOGIN_TYPE_LINK)) {
              _context.next = 52;
              break;
            }

            _loginWithLinkForm$va = signup.loginWithLinkForm().validate({
              type: type,
              email: email,
              next: next
            }), _cleanValues = _loginWithLinkForm$va.cleanValues, _errors = _loginWithLinkForm$va.errors;

            if (!(_errors && _errors.length)) {
              _context.next = 43;
              break;
            }

            return _context.abrupt("return", {
              errors: _errors
            });

          case 43:
            _context.next = 45;
            return users.getUser(users.usersCollection().where('email', '==', _cleanValues.email));

          case 45:
            _user = _context.sent;

            if (!(_user && _user.enabled)) {
              _context.next = 52;
              break;
            }

            _context.next = 49;
            return magicLogins.createMagicLogin({
              userId: _user.id
            });

          case 49:
            magicLogin = _context.sent;
            _context.next = 52;
            return utils$2.sendLoginEmail(req, _user.email, magicLogin.id, _cleanValues.next);

          case 52:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function loginAPI(_x) {
    return _ref2.apply(this, arguments);
  };
}();
loginAPI.options = {
  allowedMethods: [utils$4.POST]
};

var logoutAPI = /*#__PURE__*/function () {
  var _ref2 = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator._regeneratorRuntime.mark(function _callee(_ref) {
    var res, session;
    return asyncToGenerator._regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            res = _ref.res, session = _ref.session;

            if (session.isAuthenticated) {
              _context.next = 3;
              break;
            }

            throw new errors.NotAuthenticatedError('You are not logged in');

          case 3:
            utils$6.deleteSessionCookies(res);
            return _context.abrupt("return", {
              isAuthenticated: false,
              claims: null
            });

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function logoutAPI(_x) {
    return _ref2.apply(this, arguments);
  };
}();

logoutAPI.options = {
  allowedMethods: [utils$4.POST]
};

var resetAPI = /*#__PURE__*/function () {
  var _ref2 = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator._regeneratorRuntime.mark(function _callee(_ref) {
    var req, authOptions, email, ip, date1HourAgo, recentResetAttemptsByIP, _resetForm$validate, cleanValues, errors$1, user, magicLogin;

    return asyncToGenerator._regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            req = _ref.req;
            authOptions = index.options.auth;
            email = req.body.email;
            ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
            date1HourAgo = moment().subtract(1, 'hour');

            if (!(process.env.NODE_ENV === 'production')) {
              _context.next = 11;
              break;
            }

            _context.next = 8;
            return resetAttempts.listResetAttempts(resetAttempts.resetAttemptsCollection().where('ip', '==', ip).where('dateCreated', '>', date1HourAgo).limit(authOptions.maxResetAttemptsPerHour));

          case 8:
            recentResetAttemptsByIP = _context.sent;

            if (!(recentResetAttemptsByIP.length >= authOptions.maxResetAttemptsPerHour)) {
              _context.next = 11;
              break;
            }

            throw new errors.TooManyResetAttemptsError('You have requested too many password resets. Try again later.');

          case 11:
            _context.next = 13;
            return resetAttempts.createResetAttempt({
              ip: ip,
              email: email
            });

          case 13:
            _resetForm$validate = signup.resetForm().validate({
              email: email
            }), cleanValues = _resetForm$validate.cleanValues, errors$1 = _resetForm$validate.errors;

            if (!(errors$1 && errors$1.length)) {
              _context.next = 16;
              break;
            }

            return _context.abrupt("return", {
              errors: errors$1
            });

          case 16:
            _context.next = 18;
            return users.getUser(users.usersCollection().where('email', '==', cleanValues.email));

          case 18:
            user = _context.sent;

            if (!(user && user.enabled)) {
              _context.next = 25;
              break;
            }

            _context.next = 22;
            return magicLogins.createMagicLogin({
              userId: user.id
            });

          case 22:
            magicLogin = _context.sent;
            _context.next = 25;
            return utils$2.sendResetEmail(req, user.email, magicLogin.id);

          case 25:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function resetAPI(_x) {
    return _ref2.apply(this, arguments);
  };
}();

resetAPI.options = {
  allowedMethods: [utils$4.POST]
};

var sessionAPI = /*#__PURE__*/function () {
  var _ref2 = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator._regeneratorRuntime.mark(function _callee(_ref) {
    var res, session, tokens, tokenOptions;
    return asyncToGenerator._regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            res = _ref.res, session = _ref.session, tokens = _ref.tokens;
            tokenOptions = index.options.tokens; // Are there tokens? That means we regenerated the session. Set new cookies

            if (session.isAuthenticated && tokens) {
              utils$6.createSessionCookies(res, utils$7.signTokens(session.claims, tokenOptions.secret), session.claims.user.id);
            }

            return _context.abrupt("return", {
              session: session
            });

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function sessionAPI(_x) {
    return _ref2.apply(this, arguments);
  };
}();

sessionAPI.options = {
  reloadUserSource: utils$6.RELOAD_USER_SOURCE_DATABASE
};

var signupAPI = /*#__PURE__*/function () {
  var _ref2 = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator._regeneratorRuntime.mark(function _callee(_ref) {
    var req, res, session, authOptions, email, _signupForm$validate, cleanValues, errors$1, ip, date1DayAgo, recentUsersByIP, user, baseURL, magicLogin;

    return asyncToGenerator._regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            req = _ref.req, res = _ref.res, session = _ref.session;
            authOptions = index.options.auth;

            if (!session.isAuthenticated) {
              _context.next = 4;
              break;
            }

            throw new errors.AlreadyAuthenticatedError('You are already logged in.');

          case 4:
            email = req.body.email;
            _signupForm$validate = signup.signupForm().validate({
              email: email
            }), cleanValues = _signupForm$validate.cleanValues, errors$1 = _signupForm$validate.errors;

            if (!(errors$1 && errors$1.length)) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", {
              errors: errors$1
            });

          case 8:
            ip = req.headers['x-real-ip'] || req.connection.remoteAddress;

            if (!(process.env.NODE_ENV === 'production')) {
              _context.next = 16;
              break;
            }

            date1DayAgo = moment().subtract(1, 'day');
            _context.next = 13;
            return users.listUsers(users.usersCollection().where('registrationIP', '==', ip).where('dateCreated', '>', date1DayAgo).limit(authOptions.maxRegistrationsPerDay));

          case 13:
            recentUsersByIP = _context.sent;

            if (!(recentUsersByIP.length >= authOptions.maxRegistrationsPerDay)) {
              _context.next = 16;
              break;
            }

            throw new errors.TooManyRegistrationsError('You have created too many accounts recently.');

          case 16:
            _context.next = 18;
            return users.getUser(users.usersCollection().where('email', '==', cleanValues.email));

          case 18:
            user = _context.sent;

            if (!(user && user.password)) {
              _context.next = 21;
              break;
            }

            throw new errors.UserAlreadyExistsError('An account with this email address already exists.');

          case 21:
            if (!(user && !user.enabled)) {
              _context.next = 23;
              break;
            }

            throw new users.UserNotEnabledError('This account has been disabled.');

          case 23:
            if (user) {
              _context.next = 28;
              break;
            }

            baseURL = "".concat(process.env.NODE_ENV === 'production' ? 'https' : 'http', "://").concat(req.headers.host);
            _context.next = 27;
            return users.createUser({
              email: cleanValues.email,
              enabled: true,
              registrationIP: ip,
              profilePictureURL: "".concat(baseURL, "/img/profile-picture/default.png"),
              verifications: {
                email: false
              }
            });

          case 27:
            user = _context.sent;

          case 28:
            _context.next = 30;
            return magicLogins.createMagicLogin({
              userId: user.id
            });

          case 30:
            magicLogin = _context.sent;
            _context.next = 33;
            return utils$2.sendSignupEmail(req, user.email, magicLogin.id);

          case 33:
            return _context.abrupt("return", {
              user: {
                id: user.id
              }
            });

          case 34:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function signupAPI(_x) {
    return _ref2.apply(this, arguments);
  };
}();

signupAPI.options = {
  allowedMethods: [utils$4.POST]
};

exports.apiWrapper = apiWrapper;
exports.loginAPI = loginAPI;
exports.logoutAPI = logoutAPI;
exports.resetAPI = resetAPI;
exports.sessionAPI = sessionAPI;
exports.signupAPI = signupAPI;
