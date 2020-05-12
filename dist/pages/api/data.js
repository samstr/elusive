'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../classCallCheck-d2bb402f.js');
require('../../index-d4a1d5bf.js');
var index = require('../../index.js');
require('../../FormErrors-1539c4dc.js');
require('react');
require('prop-types');
require('react-bootstrap');
require('../../utils-872f816c.js');
require('bcryptjs');
require('../../utils-bf270033.js');
require('sanitize-html');
require('../../signup-38e90245.js');
require('../../utils-b08f259e.js');
var index$1 = require('../../index-2340470f.js');
require('../../utils-505540cd.js');
require('uuid');
require('../../utils-b8a60dab.js');
require('../../models/loginAttempts.js');
require('../../utils-e5ce624c.js');
var users = require('../../models/users.js');
var magicLogins = require('../../models/magicLogins.js');
require('../../models/resetAttempts.js');
var utils$4 = require('../../utils-d4e69f0f.js');
require('../../SessionContext-efd795c9.js');
var utils$5 = require('../../utils-7f9c7d1c.js');
require('jsonwebtoken');
require('moment');
require('../../signup-a5f797cf.js');

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

exports.magicLoginDataAPI = magicLoginDataAPI;
