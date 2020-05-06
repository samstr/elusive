'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../classCallCheck-d2bb402f.js');
require('../../index-26463b7f.js');
require('../../index.js');
require('../../FormErrors-1539c4dc.js');
require('react');
require('prop-types');
require('react-bootstrap');
var index$1 = require('../../index-2340470f.js');
require('../../utils-459eee4d.js');
require('uuid');
require('../../utils-8d461900.js');
var users = require('../../models/users.js');
require('moment');
var passwordResets = require('../../models/passwordResets.js');
var userVerifications = require('../../models/userVerifications.js');

var resetPasswordConfirmDataApi = function resetPasswordConfirmDataApi(_ref) {
  var req, passwordReset;
  return index$1._regeneratorRuntime.async(function resetPasswordConfirmDataApi$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          req = _ref.req;
          _context.next = 3;
          return index$1._regeneratorRuntime.awrap(passwordResets.getPasswordReset(req.query.id));

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

var verifyEmailApi = function verifyEmailApi(_ref) {
  var req, userVerification;
  return index$1._regeneratorRuntime.async(function verifyEmailApi$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          req = _ref.req;
          _context.next = 3;
          return index$1._regeneratorRuntime.awrap(userVerifications.getUserVerification(req.query.id));

        case 3:
          userVerification = _context.sent;

          if (userVerification) {
            _context.next = 6;
            break;
          }

          throw new userVerifications.UserVerificationNotFoundError('User verification key not found');

        case 6:
          if (!userVerification.verified) {
            _context.next = 8;
            break;
          }

          throw new userVerifications.UserVerificationAlreadyVerifiedError('Already verified');

        case 8:
          _context.next = 10;
          return index$1._regeneratorRuntime.awrap(userVerification.getUser());

        case 10:
          if (userVerification.user) {
            _context.next = 12;
            break;
          }

          throw new users.UserNotFoundError('User not found');

        case 12:
          if (userVerification.user.enabled) {
            _context.next = 14;
            break;
          }

          throw new users.UserNotEnabledError('User not enabled');

        case 14:
          if (!userVerification.user.verifications.email) {
            _context.next = 16;
            break;
          }

          throw new userVerifications.UserVerificationAlreadyVerifiedError('Already verified');

        case 16:
          _context.next = 18;
          return index$1._regeneratorRuntime.awrap(userVerifications.updateUserVerification(userVerification, {
            verified: true
          }));

        case 18:
          _context.next = 20;
          return index$1._regeneratorRuntime.awrap(users.updateUser(userVerification.user, {
            'verifications.email': true
          }));

        case 20:
          return _context.abrupt("return", {
            userVerification: {
              id: userVerification.id
            }
          });

        case 21:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, null, Promise);
};

exports.resetPasswordConfirmDataApi = resetPasswordConfirmDataApi;
exports.verifyEmailApi = verifyEmailApi;
