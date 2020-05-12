'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../classCallCheck-d2bb402f.js');
require('../../index-53403115.js');
var index = require('../../index.js');
require('../../FormErrors-1539c4dc.js');
require('react');
require('prop-types');
require('react-bootstrap');
require('../../utils-0e4a4d8d.js');
require('bcryptjs');
require('../../utils-9aa5c5d6.js');
require('sanitize-html');
require('../../reset-password-request-b77fe1f1.js');
require('../../utils-b08f259e.js');
var index$1 = require('../../index-2340470f.js');
require('../../utils-9a85f680.js');
require('uuid');
require('../../utils-29bedb4c.js');
require('../../models/loginAttempts.js');
require('../../utils-fd2c8eb3.js');
var users = require('../../models/users.js');
var magicLogins = require('../../models/magicLogins.js');
require('../../models/passwordResetAttempts.js');
require('moment');
var passwordResets = require('../../models/passwordResets.js');
var utils$4 = require('../../utils-e425e693.js');
require('../../SessionContext-efd795c9.js');
var utils$5 = require('../../utils-f128e714.js');
require('jsonwebtoken');
require('../../session-47f6d2f7.js');

var magicLoginDataAPI = function magicLoginDataAPI(_ref) {
  var req, res, tokenOptions, magicLogin, claims;
  return index$1._regeneratorRuntime.async(function magicLoginDataAPI$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          req = _ref.req, res = _ref.res;
          tokenOptions = index.options.tokens;
          _context.next = 4;
          return index$1._regeneratorRuntime.awrap(magicLogins.getMagicLoginByID(req.query.id));

        case 4:
          magicLogin = _context.sent;

          if (magicLogin) {
            _context.next = 7;
            break;
          }

          throw new magicLogins.MagicLoginNotFoundError('This login link is invalid.');

        case 7:
          if (!magicLogin.used) {
            _context.next = 9;
            break;
          }

          throw new magicLogins.MagicLoginAlreadyUsedError('This login link has already been used.');

        case 9:
          _context.next = 11;
          return index$1._regeneratorRuntime.awrap(magicLogin.getUser());

        case 11:
          if (magicLogin.user) {
            _context.next = 13;
            break;
          }

          throw new users.UserNotFoundError('This account could not be found.');

        case 13:
          if (magicLogin.user.enabled) {
            _context.next = 15;
            break;
          }

          throw new users.UserNotEnabledError('This account has been disabled.');

        case 15:
          if (!magicLogin.user.password) {
            _context.next = 18;
            break;
          }

          _context.next = 18;
          return index$1._regeneratorRuntime.awrap(magicLogins.updateMagicLogin({
            id: magicLogin.id
          }, {
            used: true
          }));

        case 18:
          claims = tokenOptions.createClaims(magicLogin.user);
          utils$4.createSessionCookies(res, utils$5.signTokens(claims, tokenOptions.secret), magicLogin.user.id);
          return _context.abrupt("return", {
            session: {
              isAuthenticated: true,
              claims: claims
            }
          });

        case 21:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, null, Promise);
};

var resetPasswordConfirmDataAPI = function resetPasswordConfirmDataAPI(_ref) {
  var req, passwordReset;
  return index$1._regeneratorRuntime.async(function resetPasswordConfirmDataAPI$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          req = _ref.req;
          _context.next = 3;
          return index$1._regeneratorRuntime.awrap(passwordResets.getPasswordResetByID(req.query.id));

        case 3:
          passwordReset = _context.sent;

          if (passwordReset) {
            _context.next = 6;
            break;
          }

          throw new passwordResets.PasswordResetNotFoundError('Password reset key not found');

        case 6:
          if (!passwordReset.used) {
            _context.next = 8;
            break;
          }

          throw new passwordResets.PasswordResetAlreadyUsedError('Password reset key has already been used');

        case 8:
          if (!passwordReset.hasExpired()) {
            _context.next = 10;
            break;
          }

          throw new passwordResets.PasswordResetExpiredError('Password reset key has expired');

        case 10:
          _context.next = 12;
          return index$1._regeneratorRuntime.awrap(passwordReset.getUser());

        case 12:
          if (passwordReset.user) {
            _context.next = 14;
            break;
          }

          throw new users.UserNotFoundError('User not found');

        case 14:
          if (passwordReset.user.enabled) {
            _context.next = 16;
            break;
          }

          throw new users.UserNotEnabledError('User not enabled');

        case 16:
          return _context.abrupt("return", {
            passwordReset: {
              id: passwordReset.id
            }
          });

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, null, Promise);
};

exports.magicLoginDataAPI = magicLoginDataAPI;
exports.resetPasswordConfirmDataAPI = resetPasswordConfirmDataAPI;
