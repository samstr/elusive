'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var client = require('./index-c5fa8643.js');
var index = require('./index.js');
var asyncToGenerator = require('./asyncToGenerator-ae22edb1.js');
var bcrypt = _interopDefault(require('bcryptjs'));
var utils = require('./utils-db80ea21.js');
var utils$1 = require('./utils-790b751d.js');

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { client._defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var LOGIN_TYPE_LINK = 'link';
var LOGIN_TYPE_PASSWORD = 'password';
var LOGIN_TYPES = [LOGIN_TYPE_LINK, LOGIN_TYPE_PASSWORD];
var hashPassword = function hashPassword(password) {
  var authOptions = index.options.auth;
  return bcrypt.hashSync(password, authOptions.saltRounds);
};
var comparePasswordHash = function comparePasswordHash(password, hash) {
  return bcrypt.compareSync(password, hash);
};
var hasRole = function hasRole(role, roles) {
  return roles.includes(role);
};
var sendLoginEmail = /*#__PURE__*/function () {
  var _ref = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator._regeneratorRuntime.mark(function _callee(req, toEmail, magicLoginID, next) {
    var _Elusive$options, authOptions, mailOptions, siteOptions, dynamicTemplateData, magicLoginURL;

    return asyncToGenerator._regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _Elusive$options = index.options, authOptions = _Elusive$options.auth, mailOptions = _Elusive$options.mail, siteOptions = _Elusive$options.site;
            dynamicTemplateData = utils.defaultDynamicTemplateData(req);
            magicLoginURL = "".concat(dynamicTemplateData.baseURL).concat(utils$1.magicLoginRoute(magicLoginID).asPath);

            if (next) {
              magicLoginURL = "".concat(magicLoginURL, "?next=").concat(encodeURIComponent(next));
            }

            _context.next = 6;
            return utils.sendMail({
              to: toEmail,
              template_id: mailOptions.loginTemplateID,
              dynamic_template_data: _objectSpread({}, dynamicTemplateData, {
                subject: "Login to your ".concat(siteOptions.name, " account"),
                preheader: "Click the button below and you will be automatically logged in to your ".concat(siteOptions.name, " account. "),
                reasonForEmail: "you requested an automatic login link",
                magicLoginURL: magicLoginURL,
                expiryHours: authOptions.magicLoginExpiryHours === 1 ? "".concat(authOptions.magicLoginExpiryHours, " hour") : "".concat(authOptions.magicLoginExpiryHours, " hours")
              })
            });

          case 6:
            return _context.abrupt("return", _context.sent);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function sendLoginEmail(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();
var sendSignupEmail = /*#__PURE__*/function () {
  var _ref2 = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator._regeneratorRuntime.mark(function _callee2(req, toEmail, magicLoginID) {
    var _Elusive$options2, mailOptions, siteOptions, dynamicTemplateData;

    return asyncToGenerator._regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _Elusive$options2 = index.options, mailOptions = _Elusive$options2.mail, siteOptions = _Elusive$options2.site;
            dynamicTemplateData = utils.defaultDynamicTemplateData(req);
            _context2.next = 4;
            return utils.sendMail({
              to: toEmail,
              template_id: mailOptions.signupTemplateID,
              dynamic_template_data: _objectSpread({}, dynamicTemplateData, {
                subject: "Confirm your ".concat(siteOptions.name, " account"),
                preheader: "Welcome to ".concat(siteOptions.name, ". Thank you for confirming your email address. Click here to create your account. "),
                reasonForEmail: "you signed up for a ".concat(siteOptions.name, " account"),
                magicLoginURL: "".concat(dynamicTemplateData.baseURL).concat(utils$1.magicLoginRoute(magicLoginID).asPath, "?next=").concat(encodeURIComponent(utils$1.onboardingRoute())),
                termsURL: "".concat(dynamicTemplateData.baseURL).concat(utils$1.termsRoute())
              })
            });

          case 4:
            return _context2.abrupt("return", _context2.sent);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function sendSignupEmail(_x5, _x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}();
var sendResetEmail = /*#__PURE__*/function () {
  var _ref3 = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator._regeneratorRuntime.mark(function _callee3(req, toEmail, magicLoginID) {
    var _Elusive$options3, authOptions, mailOptions, siteOptions, dynamicTemplateData;

    return asyncToGenerator._regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _Elusive$options3 = index.options, authOptions = _Elusive$options3.auth, mailOptions = _Elusive$options3.mail, siteOptions = _Elusive$options3.site;
            dynamicTemplateData = utils.defaultDynamicTemplateData(req);
            _context3.next = 4;
            return utils.sendMail({
              to: toEmail,
              template_id: mailOptions.resetTemplateID,
              dynamic_template_data: _objectSpread({}, dynamicTemplateData, {
                subject: "Reset your ".concat(siteOptions.name, " password"),
                preheader: "Someone recently requested a password change for your ".concat(siteOptions.name, " account. If this was you, you can set a new password here. "),
                reasonForEmail: "we received a password reset request for this account",
                magicLoginURL: "".concat(dynamicTemplateData.baseURL).concat(utils$1.magicLoginRoute(magicLoginID).asPath, "?next=").concat(encodeURIComponent(utils$1.settingsAccountRoute())),
                expiryHours: authOptions.magicLoginExpiryHours === 1 ? "".concat(authOptions.magicLoginExpiryHours, " hour") : "".concat(authOptions.magicLoginExpiryHours, " hours")
              })
            });

          case 4:
            return _context3.abrupt("return", _context3.sent);

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function sendResetEmail(_x8, _x9, _x10) {
    return _ref3.apply(this, arguments);
  };
}();

exports.LOGIN_TYPES = LOGIN_TYPES;
exports.LOGIN_TYPE_LINK = LOGIN_TYPE_LINK;
exports.LOGIN_TYPE_PASSWORD = LOGIN_TYPE_PASSWORD;
exports.comparePasswordHash = comparePasswordHash;
exports.hasRole = hasRole;
exports.hashPassword = hashPassword;
exports.sendLoginEmail = sendLoginEmail;
exports.sendResetEmail = sendResetEmail;
exports.sendSignupEmail = sendSignupEmail;
