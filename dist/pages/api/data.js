'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../classCallCheck-d2bb402f.js');
require('../../index-c5fa8643.js');
var index = require('../../index.js');
require('../../FormErrors-1539c4dc.js');
require('react');
require('prop-types');
require('react-bootstrap');
require('../../errors-1d6db12f.js');
require('bcryptjs');
require('../../utils-a6a1ae57.js');
require('../../utils-bc45515c.js');
require('../../signup-0b38e1e3.js');
require('../../utils-b08f259e.js');
var asyncToGenerator = require('../../asyncToGenerator-ae22edb1.js');
require('../../utils-4b2eeb65.js');
require('uuid');
require('../../utils-100b7d88.js');
require('../../models/loginAttempts.js');
require('../../utils-08b190dc.js');
var users = require('../../models/users.js');
var magicLogins = require('../../models/magicLogins.js');
require('../../models/resetAttempts.js');
var utils$4 = require('../../utils-74545f35.js');
require('../../SessionContext-efd795c9.js');
var utils$5 = require('../../utils-a7f6a71b.js');
require('jsonwebtoken');
require('moment');
require('../../signup-c464c4b2.js');

var magicLoginDataAPI = /*#__PURE__*/function () {
  var _ref2 = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator._regeneratorRuntime.mark(function _callee(_ref) {
    var req, res, tokenOptions, magicLogin, claims;
    return asyncToGenerator._regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            req = _ref.req, res = _ref.res;
            tokenOptions = index.options.tokens;
            _context.next = 4;
            return magicLogins.getMagicLoginByID(req.query.id);

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
            return magicLogin.getUser();

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
            return magicLogins.updateMagicLogin({
              id: magicLogin.id
            }, {
              used: true
            });

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
    }, _callee);
  }));

  return function magicLoginDataAPI(_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.magicLoginDataAPI = magicLoginDataAPI;
