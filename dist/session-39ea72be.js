'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var index = require('./index.js');
require('./FormErrors-1539c4dc.js');
var utils = require('./utils-0e4a4d8d.js');
require('bcryptjs');
var reset = require('./reset-e12034ed.js');
require('sanitize-html');
var utils$1 = require('./utils-b08f259e.js');
var index$1 = require('./index-2340470f.js');
var loginAttempts = require('./models/loginAttempts.js');
var users = require('./models/users.js');
var magicLogins = require('./models/magicLogins.js');
var passwordResetAttempts = require('./models/passwordResetAttempts.js');
var moment = _interopDefault(require('moment'));
var passwordResets = require('./models/passwordResets.js');
var utils$3 = require('./utils-841d3b9b.js');
require('./SessionContext-efd795c9.js');
var utils$4 = require('./utils-f128e714.js');

var loginAPI = function loginAPI(_ref) {
  var req, res, session, _Elusive$options, authOptions, tokenOptions, ip, date1HourAgo, recentLoginAttemptsByIP, _req$body, email, password, recentLoginAttemptsByAccount, _loginForm$validate, cleanValues, errors, user, claims;

  return index$1._regeneratorRuntime.async(function loginAPI$(_context) {
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
          ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
          date1HourAgo = moment().subtract(1, 'hour');

          if (!(process.env.NODE_ENV === 'production')) {
            _context.next = 12;
            break;
          }

          _context.next = 9;
          return index$1._regeneratorRuntime.awrap(loginAttempts.listLoginAttempts(loginAttempts.loginAttemptsCollection().where('ip', '==', ip).where('dateCreated', '>', date1HourAgo).limit(authOptions.maxLoginAttemptsPerIPPerHour)));

        case 9:
          recentLoginAttemptsByIP = _context.sent;

          if (!(recentLoginAttemptsByIP.length >= authOptions.maxLoginAttemptsPerIPPerHour)) {
            _context.next = 12;
            break;
          }

          throw new utils.TooManyLoginAttemptsError('You have attempted to login too many times. Try again later.');

        case 12:
          _req$body = req.body, email = _req$body.email, password = _req$body.password;

          if (!(process.env.NODE_ENV === 'production')) {
            _context.next = 19;
            break;
          }

          _context.next = 16;
          return index$1._regeneratorRuntime.awrap(loginAttempts.listLoginAttempts(loginAttempts.loginAttemptsCollection().where('ip', '==', ip).where('email', '==', email).where('dateCreated', '>', date1HourAgo).limit(authOptions.maxLoginAttemptsPerAccountPerHour)));

        case 16:
          recentLoginAttemptsByAccount = _context.sent;

          if (!(recentLoginAttemptsByAccount.length >= authOptions.maxLoginAttemptsPerAccountPerHour)) {
            _context.next = 19;
            break;
          }

          throw new utils.TooManyLoginAttemptsError('You have attempted to login too many times. Try again later.');

        case 19:
          _context.next = 21;
          return index$1._regeneratorRuntime.awrap(loginAttempts.createLoginAttempt({
            ip: ip,
            email: email
          }));

        case 21:
          _loginForm$validate = reset.loginForm().validate({
            email: email,
            password: password
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
          return index$1._regeneratorRuntime.awrap(users.getUser(users.usersCollection().where('email', '==', cleanValues.email)));

        case 26:
          user = _context.sent;

          if (user) {
            _context.next = 29;
            break;
          }

          throw new users.UserNotFoundError('Authentication failed');

        case 29:
          if (user.enabled) {
            _context.next = 31;
            break;
          }

          throw new users.UserNotEnabledError('Authentication failed');

        case 31:
          if (utils.comparePasswordHash(cleanValues.password, user.password)) {
            _context.next = 33;
            break;
          }

          throw new utils.AuthenticationFailedError('Authentication failed');

        case 33:
          claims = tokenOptions.createClaims(user);
          utils$3.createSessionCookies(res, utils$4.signTokens(claims, tokenOptions.secret), user.id);
          return _context.abrupt("return", {
            isAuthenticated: true,
            claims: claims
          });

        case 36:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, null, Promise);
};
loginAPI.options = {
  allowedMethods: [utils$1.POST]
};

var logoutAPI = function logoutAPI(_ref) {
  var res, session;
  return index$1._regeneratorRuntime.async(function logoutAPI$(_context) {
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

logoutAPI.options = {
  allowedMethods: [utils$1.POST]
};

var registerAPI = function registerAPI(_ref) {
  var req, res, session, authOptions, email, _registerForm$validat, cleanValues, errors, ip, date1DayAgo, recentUsersByIP, user, magicLogin;

  return index$1._regeneratorRuntime.async(function registerAPI$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          req = _ref.req, res = _ref.res, session = _ref.session;
          authOptions = index.options.auth;

          if (!session.isAuthenticated) {
            _context.next = 4;
            break;
          }

          throw new utils.AlreadyAuthenticatedError('You are already logged in.');

        case 4:
          email = req.body.email;
          _registerForm$validat = reset.registerForm().validate({
            email: email
          }), cleanValues = _registerForm$validat.cleanValues, errors = _registerForm$validat.errors;

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
          return index$1._regeneratorRuntime.awrap(users.listUsers(users.usersCollection().where('registrationIP', '==', ip).where('dateCreated', '>', date1DayAgo).limit(authOptions.maxRegistrationsPerDay)));

        case 13:
          recentUsersByIP = _context.sent;

          if (!(recentUsersByIP.length >= authOptions.maxRegistrationsPerDay)) {
            _context.next = 16;
            break;
          }

          throw new utils.TooManyRegistrationsError('You have created too many accounts recently.');

        case 16:
          _context.next = 18;
          return index$1._regeneratorRuntime.awrap(users.getUser(users.usersCollection().where('email', '==', cleanValues.email)));

        case 18:
          user = _context.sent;

          if (!(user && user.password)) {
            _context.next = 21;
            break;
          }

          throw new utils.UserAlreadyExistsError('An account with this email address already exists.');

        case 21:
          if (!(user && !user.enabled)) {
            _context.next = 23;
            break;
          }

          throw new users.UserNotEnabledError('This account has been disabled.');

        case 23:
          if (user) {
            _context.next = 27;
            break;
          }

          _context.next = 26;
          return index$1._regeneratorRuntime.awrap(users.createUser({
            email: cleanValues.email,
            enabled: true,
            registrationIP: ip,
            verifications: {
              email: false
            }
          }));

        case 26:
          user = _context.sent;

        case 27:
          _context.next = 29;
          return index$1._regeneratorRuntime.awrap(magicLogins.createMagicLogin({
            userId: user.id
          }));

        case 29:
          magicLogin = _context.sent;
          _context.next = 32;
          return index$1._regeneratorRuntime.awrap(magicLogins.sendMagicSignUpEmail(req, user.email, magicLogin.id));

        case 32:
          return _context.abrupt("return", {
            user: {
              id: user.id
            }
          });

        case 33:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, null, Promise);
};

registerAPI.options = {
  allowedMethods: [utils$1.POST]
};

var resetPasswordRequestAPI = function resetPasswordRequestAPI(_ref) {
  var req, authOptions, email, ip, date1HourAgo, recentPasswordResetAttemptsByIP, _resetForm$validate, cleanValues, errors, user, passwordReset;

  return index$1._regeneratorRuntime.async(function resetPasswordRequestAPI$(_context) {
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
          return index$1._regeneratorRuntime.awrap(passwordResetAttempts.listPasswordResetAttempts(passwordResetAttempts.passwordResetAttemptsCollection().where('ip', '==', ip).where('dateCreated', '>', date1HourAgo).limit(authOptions.maxPasswordResetAttemptsPerHour)));

        case 8:
          recentPasswordResetAttemptsByIP = _context.sent;

          if (!(recentPasswordResetAttemptsByIP.length >= authOptions.maxPasswordResetAttemptsPerHour)) {
            _context.next = 11;
            break;
          }

          throw new utils.TooManyResetPasswordRequestsError('You have requested too many password resets. Try again later.');

        case 11:
          _context.next = 13;
          return index$1._regeneratorRuntime.awrap(passwordResetAttempts.createPasswordResetAttempt({
            ip: ip,
            email: email
          }));

        case 13:
          _resetForm$validate = reset.resetForm().validate({
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
          return index$1._regeneratorRuntime.awrap(users.getUser(users.usersCollection().where('email', '==', cleanValues.email)));

        case 18:
          user = _context.sent;

          if (!(user && user.enabled)) {
            _context.next = 25;
            break;
          }

          _context.next = 22;
          return index$1._regeneratorRuntime.awrap(passwordResets.createPasswordReset({
            userId: user.id,
            ip: ip
          }));

        case 22:
          passwordReset = _context.sent;
          _context.next = 25;
          return index$1._regeneratorRuntime.awrap(passwordResets.sendPasswordResetRequestEmail(req, user.email, passwordReset.id));

        case 25:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, null, Promise);
};

resetPasswordRequestAPI.options = {
  allowedMethods: [utils$1.POST]
};

var sessionAPI = function sessionAPI(_ref) {
  var res, session, tokens, tokenOptions;
  return index$1._regeneratorRuntime.async(function sessionAPI$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          res = _ref.res, session = _ref.session, tokens = _ref.tokens;
          tokenOptions = index.options.tokens; // Are there tokens? That means we regenerated the session. Set new cookies

          if (session.isAuthenticated && tokens) {
            utils$3.createSessionCookies(res, utils$4.signTokens(session.claims, tokenOptions.secret), session.claims.user.id);
          }

          return _context.abrupt("return", {
            session: session
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, null, Promise);
};

sessionAPI.options = {
  reloadUserSource: utils$3.RELOAD_USER_SOURCE_DATABASE
};

exports.loginAPI = loginAPI;
exports.logoutAPI = logoutAPI;
exports.registerAPI = registerAPI;
exports.resetPasswordRequestAPI = resetPasswordRequestAPI;
exports.sessionAPI = sessionAPI;
