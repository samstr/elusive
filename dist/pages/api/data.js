'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../classCallCheck-d2bb402f.js');
require('../../index-905648bc.js');
require('../../index.js');
require('../../FormErrors-1539c4dc.js');
require('react');
require('prop-types');
require('react-bootstrap');
var index$1 = require('../../index-2340470f.js');
require('../../utils-b8aefd19.js');
require('uuid');
require('../../utils-3fbf90f8.js');
var users = require('../../models/users.js');
require('moment');
var passwordResets = require('../../models/passwordResets.js');

var resetPasswordConfirmDataApi = function resetPasswordConfirmDataApi(_ref) {
  var req, passwordReset;
  return index$1._regeneratorRuntime.async(function resetPasswordConfirmDataApi$(_context) {
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

exports.resetPasswordConfirmDataApi = resetPasswordConfirmDataApi;
