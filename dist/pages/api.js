'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('../classCallCheck-d2bb402f.js');
require('../ElusiveClient-d044fa81.js');
var defineProperty$1 = require('../defineProperty-ba7cd53d.js');
var index$1 = require('../index.js');
var errors = require('../errors-6d843f19.js');
var utils = require('../utils-8eb11d51.js');
var errors$1 = require('../errors-304c18aa.js');
var asyncToGenerator = require('../asyncToGenerator-7a28bf2e.js');
require('bcryptjs');
require('../utils-8c3c3461.js');
require('../utils-ac544182.js');
var utils$2 = require('../utils-744e9199.js');
var signupForm = require('../signupForm-6a97ccb8.js');
var utils$2$1 = require('../utils-ca45b13c.js');
var utils$3 = require('../utils-b82a9439.js');
require('uuid');
require('../utils-6bc10708.js');
var loginAttempts = require('../models/loginAttempts.js');
var moment = _interopDefault(require('moment'));
var users = require('../models/users.js');
var autoLogins = require('../models/autoLogins.js');
var resetAttempts = require('../models/resetAttempts.js');
var utils$4 = require('../utils-f10a4085.js');
var utils$5 = require('../utils-ff0a4179.js');
require('jsonwebtoken');

var autoLoginDataAPI = /*#__PURE__*/function () {
  var _ref2 = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator.regenerator.mark(function _callee(_ref) {
    var req, res, tokenOptions, autoLogin, claims;
    return asyncToGenerator.regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            req = _ref.req, res = _ref.res;
            tokenOptions = index$1.options.tokens;
            _context.next = 4;
            return autoLogins.getAutoLoginByID(req.query.id);

          case 4:
            autoLogin = _context.sent;

            if (autoLogin) {
              _context.next = 7;
              break;
            }

            throw new autoLogins.AutoLoginNotFoundError('This login link is invalid.');

          case 7:
            if (!autoLogin.used) {
              _context.next = 9;
              break;
            }

            throw new autoLogins.AutoLoginAlreadyUsedError('This login link has already been used.');

          case 9:
            _context.next = 11;
            return autoLogin.getUser();

          case 11:
            if (autoLogin.user) {
              _context.next = 13;
              break;
            }

            throw new users.UserNotFoundError('This account could not be found.');

          case 13:
            if (autoLogin.user.enabled) {
              _context.next = 15;
              break;
            }

            throw new users.UserNotEnabledError('This account has been disabled.');

          case 15:
            if (!autoLogin.hasExpired()) {
              _context.next = 17;
              break;
            }

            throw new autoLogins.AutoLoginExpiredError('This login link has expired.');

          case 17:
            _context.next = 19;
            return autoLogins.updateAutoLogin({
              id: autoLogin.id
            }, {
              used: true
            });

          case 19:
            claims = tokenOptions.createClaims(autoLogin.user);
            utils$4.createSessionCookies(res, utils$5.signTokens(claims, tokenOptions.secret), autoLogin.user.id);
            return _context.abrupt("return", {
              session: {
                isAuthenticated: true,
                claims: claims
              }
            });

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function autoLoginDataAPI(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var loginAPI = /*#__PURE__*/function () {
  var _ref2 = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator.regenerator.mark(function _callee(_ref) {
    var req, res, session, _Elusive$options, authOptions, tokenOptions, ip, date1HourAgo, recentLoginAttemptsByIP, _req$body, email, password, next, recentLoginAttemptsByAccount, _loginForm$validate, cleanValues, errors, user, claims;

    return asyncToGenerator.regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            req = _ref.req, res = _ref.res, session = _ref.session;
            _Elusive$options = index$1.options, authOptions = _Elusive$options.auth, tokenOptions = _Elusive$options.tokens;

            if (!session.isAuthenticated) {
              _context.next = 4;
              break;
            }

            throw new errors$1.AlreadyAuthenticatedError('You are already logged in');

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

            throw new errors$1.TooManyLoginAttemptsError('You have attempted to login too many times. Try again later.');

          case 12:
            _req$body = req.body, email = _req$body.email, password = _req$body.password, next = _req$body.next;

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

            throw new errors$1.TooManyLoginAttemptsError('You have attempted to login too many times. Try again later.');

          case 19:
            _context.next = 21;
            return loginAttempts.createLoginAttempt({
              ip: ip,
              email: email
            });

          case 21:
            _loginForm$validate = signupForm.loginForm().validate({
              email: email,
              password: password,
              next: next
            }), cleanValues = _loginForm$validate.cleanValues, errors = _loginForm$validate.errors;

            if (!(errors && errors.length)) {
              _context.next = 24;
              break;
            }

            return _context.abrupt("return", {
              errors: errors
            });

          case 24:
            _context.next = 26;
            return users.getUser(users.usersCollection().where('email', '==', cleanValues.email));

          case 26:
            user = _context.sent;

            if (!(!user || !(user === null || user === void 0 ? void 0 : user.enabled) || !(user === null || user === void 0 ? void 0 : user.password))) {
              _context.next = 29;
              break;
            }

            throw new users.UserNotFoundError('Authentication failed');

          case 29:
            if (utils$2.comparePasswordHash(cleanValues.password, user.password)) {
              _context.next = 31;
              break;
            }

            throw new errors$1.AuthenticationFailedError('Authentication failed');

          case 31:
            claims = tokenOptions.createClaims(user);
            utils$4.createSessionCookies(res, utils$5.signTokens(claims, tokenOptions.secret), user.id);
            return _context.abrupt("return", {
              session: {
                isAuthenticated: true,
                claims: claims
              }
            });

          case 34:
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
  allowedMethods: [utils$2$1.POST]
};

var logoutAPI = /*#__PURE__*/function () {
  var _ref2 = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator.regenerator.mark(function _callee(_ref) {
    var res, session;
    return asyncToGenerator.regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            res = _ref.res, session = _ref.session;

            if (session.isAuthenticated) {
              _context.next = 3;
              break;
            }

            throw new errors$1.NotAuthenticatedError('You are not logged in');

          case 3:
            utils$4.deleteSessionCookies(res);
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
  allowedMethods: [utils$2$1.POST]
};

var onboardingAPI = /*#__PURE__*/function () {
  var _ref2 = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator.regenerator.mark(function _callee(_ref) {
    var req, res, session, tokenOptions, password, _onboardingForm$valid, cleanValues, errors, user, claims;

    return asyncToGenerator.regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            req = _ref.req, res = _ref.res, session = _ref.session;
            tokenOptions = index$1.options.tokens;
            password = req.body.password;
            _onboardingForm$valid = signupForm.onboardingForm().validate({
              password: password
            }), cleanValues = _onboardingForm$valid.cleanValues, errors = _onboardingForm$valid.errors;

            if (!(errors && errors.length)) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", {
              errors: errors
            });

          case 6:
            _context.next = 8;
            return users.getUserByID(session.claims.user.id);

          case 8:
            user = _context.sent;

            if (user) {
              _context.next = 11;
              break;
            }

            throw new users.UserNotFoundError('This account no longer exists.');

          case 11:
            if (user.enabled) {
              _context.next = 13;
              break;
            }

            throw new users.UserNotEnabledError('This account has been disabled.');

          case 13:
            _context.next = 15;
            return users.updateUser(user, {
              password: utils$2.hashPassword(cleanValues.password)
            });

          case 15:
            user = _context.sent;
            claims = tokenOptions.createClaims(user);
            utils$4.createSessionCookies(res, utils$5.signTokens(claims, tokenOptions.secret), user.id);
            return _context.abrupt("return", {
              session: {
                isAuthenticated: true,
                claims: claims
              }
            });

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function onboardingAPI(_x) {
    return _ref2.apply(this, arguments);
  };
}();

onboardingAPI.options = {
  allowedMethods: [utils$2$1.POST],
  requireAuth: true
};

var resetAPI = /*#__PURE__*/function () {
  var _ref2 = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator.regenerator.mark(function _callee(_ref) {
    var req, authOptions, email, ip, date1HourAgo, recentResetAttemptsByIP, _resetForm$validate, cleanValues, errors, user, autoLogin;

    return asyncToGenerator.regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            req = _ref.req;
            authOptions = index$1.options.auth;
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

            throw new errors$1.TooManyResetAttemptsError('You have requested too many password resets. Try again later.');

          case 11:
            _context.next = 13;
            return resetAttempts.createResetAttempt({
              ip: ip,
              email: email
            });

          case 13:
            _resetForm$validate = signupForm.resetForm().validate({
              email: email
            }), cleanValues = _resetForm$validate.cleanValues, errors = _resetForm$validate.errors;

            if (!(errors && errors.length)) {
              _context.next = 16;
              break;
            }

            return _context.abrupt("return", {
              errors: errors
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
            return autoLogins.createAutoLogin({
              userId: user.id
            });

          case 22:
            autoLogin = _context.sent;
            _context.next = 25;
            return utils$2.sendResetEmail(req, user.email, autoLogin.id);

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
  allowedMethods: [utils$2$1.POST]
};

var sessionAPI = /*#__PURE__*/function () {
  var _ref2 = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator.regenerator.mark(function _callee(_ref) {
    var res, session, tokens, tokenOptions;
    return asyncToGenerator.regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            res = _ref.res, session = _ref.session, tokens = _ref.tokens;
            tokenOptions = index$1.options.tokens; // Are there tokens? That means we regenerated the session. Set new cookies

            if (session.isAuthenticated && tokens) {
              utils$4.createSessionCookies(res, utils$5.signTokens(session.claims, tokenOptions.secret), session.claims.user.id);
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
  reloadUserSource: utils$4.RELOAD_USER_SOURCE_DATABASE
};

var signupAPI = /*#__PURE__*/function () {
  var _ref2 = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator.regenerator.mark(function _callee(_ref) {
    var req, res, session, authOptions, email, _signupForm$validate, cleanValues, errors, ip, date1DayAgo, recentUsersByIP, user, baseURL, autoLogin;

    return asyncToGenerator.regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            req = _ref.req, res = _ref.res, session = _ref.session;
            authOptions = index$1.options.auth;

            if (!session.isAuthenticated) {
              _context.next = 4;
              break;
            }

            throw new errors$1.AlreadyAuthenticatedError('You are already logged in.');

          case 4:
            email = req.body.email;
            _signupForm$validate = signupForm.signupForm().validate({
              email: email
            }), cleanValues = _signupForm$validate.cleanValues, errors = _signupForm$validate.errors;

            if (!(errors && errors.length)) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", {
              errors: errors
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

            throw new errors$1.TooManyRegistrationsError('You have created too many accounts recently.');

          case 16:
            _context.next = 18;
            return users.getUser(users.usersCollection().where('email', '==', cleanValues.email));

          case 18:
            user = _context.sent;

            if (!user) {
              _context.next = 26;
              break;
            }

            if (!user.password) {
              _context.next = 22;
              break;
            }

            throw new errors$1.UserAlreadyExistsError('An account with this email address already exists.');

          case 22:
            if (user.enabled) {
              _context.next = 24;
              break;
            }

            throw new users.UserNotEnabledError('This account has been disabled.');

          case 24:
            _context.next = 30;
            break;

          case 26:
            baseURL = "".concat(process.env.NODE_ENV === 'production' ? 'https' : 'http', "://").concat(req.headers.host);
            _context.next = 29;
            return users.createUser({
              email: cleanValues.email,
              enabled: true,
              registrationIP: ip,
              profilePictureURL: "".concat(baseURL, "/img/profile-picture/default-").concat(utils$3.randomInt(1, authOptions.numDefaultProfilePictureVariations), ".png"),
              verifications: {
                email: false
              }
            });

          case 29:
            user = _context.sent;

          case 30:
            _context.next = 32;
            return autoLogins.createAutoLogin({
              userId: user.id
            });

          case 32:
            autoLogin = _context.sent;
            _context.next = 35;
            return utils$2.sendSignupEmail(req, user.email, autoLogin.id);

          case 35:
            return _context.abrupt("return", {
              user: {
                id: user.id
              }
            });

          case 36:
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
  allowedMethods: [utils$2$1.POST]
};

var userAPI = /*#__PURE__*/function () {
  var _ref2 = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator.regenerator.mark(function _callee(_ref) {
    var session, user;
    return asyncToGenerator.regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            session = _ref.session;
            _context.next = 3;
            return users.getUserByID(session.claims.user.id);

          case 3:
            user = _context.sent;

            if (user) {
              _context.next = 6;
              break;
            }

            throw new users.UserNotFoundError('Authentication failed');

          case 6:
            if (user.enabled) {
              _context.next = 8;
              break;
            }

            throw new users.UserNotEnabledError('Authentication failed');

          case 8:
            return _context.abrupt("return", {
              user: {
                id: user.id,
                email: user.email,
                enabled: user.enabled,
                name: user.name,
                profilePictureURL: user.profilePictureURL,
                username: user.username,
                verifications: user.verifications
              }
            });

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function userAPI(_x) {
    return _ref2.apply(this, arguments);
  };
}();

userAPI.options = {
  reloadUserSource: utils$4.RELOAD_USER_SOURCE_DATABASE,
  requireAuth: true
};

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty$1._defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var apiWrapper = /*#__PURE__*/function () {
  var _ref = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator.regenerator.mark(function _callee(req, res, api) {
    var sentry, options, _yield$getSession, session, tokens, data;

    return asyncToGenerator.regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            sentry = index$1.services.sentry;
            options = _objectSpread({
              allowedMethods: [utils$2$1.GET],
              requireAuth: false,
              reloadUserSource: utils$4.RELOAD_USER_SOURCE_REFRESH_TOKEN
            }, api.options);
            _context.prev = 2;
            utils$2$1.validateRequest(req, res, options);
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

            return _context.abrupt("return", utils$2$1.httpForbiddenResponse(res, utils.errorJson(new Error('You do not have access to view this page.'))));

          case 11:
            data = {};
            _context.t0 = _objectSpread;
            _context.t1 = _objectSpread({}, data);
            _context.next = 16;
            return api({
              req: req,
              res: res,
              session: session,
              tokens: tokens
            });

          case 16:
            _context.t2 = _context.sent;
            data = (0, _context.t0)(_context.t1, _context.t2);

            if (!(data.errors && data.errors.length)) {
              _context.next = 20;
              break;
            }

            return _context.abrupt("return", utils$2$1.httpBadRequestResponse(res, utils.errorJson(data.errors)));

          case 20:
            return _context.abrupt("return", utils$2$1.httpOKResponse(res, data));

          case 23:
            _context.prev = 23;
            _context.t3 = _context["catch"](2);

            if (!(_context.t3 instanceof utils$2$1.HttpError)) {
              _context.next = 28;
              break;
            }

            if (!(_context.t3 instanceof utils$2$1.HttpMethodNotAllowedError)) {
              _context.next = 28;
              break;
            }

            return _context.abrupt("return", utils$2$1.httpMethodNotAllowedResponse(res, utils.errorJson(_context.t3)));

          case 28:
            if (!(_context.t3 instanceof utils$4.SessionError || _context.t3 instanceof utils$5.TokenError)) {
              _context.next = 31;
              break;
            }

            utils$4.deleteSessionCookies(res);
            return _context.abrupt("return", utils$2$1.httpUnauthorizedResponse(res, utils.errorJson(_context.t3)));

          case 31:
            if (!(_context.t3 instanceof errors.BaseError)) {
              _context.next = 33;
              break;
            }

            return _context.abrupt("return", utils$2$1.httpBadRequestResponse(res, utils.errorJson(_context.t3)));

          case 33:
            console.error('error in apiWrapper:', _context.t3);

            if (sentry) {
              sentry.captureException(_context.t3);
            }

            return _context.abrupt("return", utils$2$1.httpInternalServerErrorResponse(res, utils.errorJson(new Error('An unknown error occured.'))));

          case 36:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 23]]);
  }));

  return function apiWrapper(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.apiWrapper = apiWrapper;
exports.autoLoginDataAPI = autoLoginDataAPI;
exports.loginAPI = loginAPI;
exports.logoutAPI = logoutAPI;
exports.onboardingAPI = onboardingAPI;
exports.resetAPI = resetAPI;
exports.sessionAPI = sessionAPI;
exports.signupAPI = signupAPI;
exports.userAPI = userAPI;
