'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../classCallCheck-d2bb402f.js');
require('../../ElusiveClient-b6e2cec5.js');
require('../../defineProperty-ba7cd53d.js');
var index = require('../../index.js');
require('../../FormErrors-bf65213f.js');
require('react');
require('prop-types');
require('react-bootstrap');
var asyncToGenerator = require('../../asyncToGenerator-42483001.js');
require('bcryptjs');
require('../../utils-53071686.js');
require('../../utils-3409f232.js');
require('../../utils-9098034f.js');
require('uuid');
require('../../utils-71c02254.js');
require('moment');
var users = require('../../models/users.js');
var magicLogins = require('../../models/magicLogins.js');
var utils$6 = require('../../utils-e94a7920.js');
var utils$7 = require('../../utils-1fe8b89d.js');
require('jsonwebtoken');

var magicLoginDataAPI = /*#__PURE__*/function () {
  var _ref2 = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator.regenerator.mark(function _callee(_ref) {
    var req, res, tokenOptions, magicLogin, claims;
    return asyncToGenerator.regenerator.wrap(function _callee$(_context) {
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
            if (!magicLogin.hasExpired()) {
              _context.next = 17;
              break;
            }

            throw new magicLogins.MagicLoginExpiredError('This login link has expired.');

          case 17:
            _context.next = 19;
            return magicLogins.updateMagicLogin({
              id: magicLogin.id
            }, {
              used: true
            });

          case 19:
            claims = tokenOptions.createClaims(magicLogin.user);
            utils$6.createSessionCookies(res, utils$7.signTokens(claims, tokenOptions.secret), magicLogin.user.id);
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

  return function magicLoginDataAPI(_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.magicLoginDataAPI = magicLoginDataAPI;
