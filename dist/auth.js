'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var classCallCheck = require('./classCallCheck-d2bb402f.js');
require('./ElusiveClient-d044fa81.js');
var defineProperty = require('./defineProperty-ba7cd53d.js');
var index = require('./index.js');
var errors = require('./errors-6d843f19.js');
var asyncToGenerator = require('./asyncToGenerator-7a28bf2e.js');
var bcrypt = _interopDefault(require('bcryptjs'));
var utils = require('./utils-8c3c3461.js');
var utils$1 = require('./utils-ac544182.js');

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = errors._getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = errors._getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return errors._possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var AuthError = /*#__PURE__*/function (_BaseError) {
  errors._inherits(AuthError, _BaseError);

  var _super = _createSuper(AuthError);

  function AuthError() {
    classCallCheck._classCallCheck(this, AuthError);

    return _super.apply(this, arguments);
  }

  return AuthError;
}(errors.BaseError);
var AlreadyAuthenticatedError = /*#__PURE__*/function (_AuthError) {
  errors._inherits(AlreadyAuthenticatedError, _AuthError);

  var _super2 = _createSuper(AlreadyAuthenticatedError);

  function AlreadyAuthenticatedError() {
    classCallCheck._classCallCheck(this, AlreadyAuthenticatedError);

    return _super2.apply(this, arguments);
  }

  return AlreadyAuthenticatedError;
}(AuthError);
var AuthenticationFailedError = /*#__PURE__*/function (_AuthError2) {
  errors._inherits(AuthenticationFailedError, _AuthError2);

  var _super3 = _createSuper(AuthenticationFailedError);

  function AuthenticationFailedError() {
    classCallCheck._classCallCheck(this, AuthenticationFailedError);

    return _super3.apply(this, arguments);
  }

  return AuthenticationFailedError;
}(AuthError);
var NotAuthenticatedError = /*#__PURE__*/function (_AuthError3) {
  errors._inherits(NotAuthenticatedError, _AuthError3);

  var _super4 = _createSuper(NotAuthenticatedError);

  function NotAuthenticatedError() {
    classCallCheck._classCallCheck(this, NotAuthenticatedError);

    return _super4.apply(this, arguments);
  }

  return NotAuthenticatedError;
}(AuthError);
var TooManyLoginAttemptsError = /*#__PURE__*/function (_AuthError4) {
  errors._inherits(TooManyLoginAttemptsError, _AuthError4);

  var _super5 = _createSuper(TooManyLoginAttemptsError);

  function TooManyLoginAttemptsError() {
    classCallCheck._classCallCheck(this, TooManyLoginAttemptsError);

    return _super5.apply(this, arguments);
  }

  return TooManyLoginAttemptsError;
}(AuthError);
var TooManyResetAttemptsError = /*#__PURE__*/function (_AuthError5) {
  errors._inherits(TooManyResetAttemptsError, _AuthError5);

  var _super6 = _createSuper(TooManyResetAttemptsError);

  function TooManyResetAttemptsError() {
    classCallCheck._classCallCheck(this, TooManyResetAttemptsError);

    return _super6.apply(this, arguments);
  }

  return TooManyResetAttemptsError;
}(AuthError);
var TooManyRegistrationsError = /*#__PURE__*/function (_AuthError6) {
  errors._inherits(TooManyRegistrationsError, _AuthError6);

  var _super7 = _createSuper(TooManyRegistrationsError);

  function TooManyRegistrationsError() {
    classCallCheck._classCallCheck(this, TooManyRegistrationsError);

    return _super7.apply(this, arguments);
  }

  return TooManyRegistrationsError;
}(AuthError);
var UserAlreadyExistsError = /*#__PURE__*/function (_AuthError7) {
  errors._inherits(UserAlreadyExistsError, _AuthError7);

  var _super8 = _createSuper(UserAlreadyExistsError);

  function UserAlreadyExistsError() {
    classCallCheck._classCallCheck(this, UserAlreadyExistsError);

    return _super8.apply(this, arguments);
  }

  return UserAlreadyExistsError;
}(AuthError);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty._defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
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
  var _ref = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator.regenerator.mark(function _callee(req, toEmail, autoLoginID, next) {
    var _Elusive$options, authOptions, mailOptions, siteOptions, dynamicTemplateData, autoLoginURL;

    return asyncToGenerator.regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _Elusive$options = index.options, authOptions = _Elusive$options.auth, mailOptions = _Elusive$options.mail, siteOptions = _Elusive$options.site;
            dynamicTemplateData = utils.defaultDynamicTemplateData(req);
            autoLoginURL = "".concat(dynamicTemplateData.baseURL).concat(utils$1.autoLoginRoute(autoLoginID).asPath);

            if (next) {
              autoLoginURL = "".concat(autoLoginURL, "?next=").concat(encodeURIComponent(next));
            }

            _context.next = 6;
            return utils.sendMail({
              to: toEmail,
              template_id: mailOptions.loginTemplateID,
              dynamic_template_data: _objectSpread(_objectSpread({}, dynamicTemplateData), {}, {
                subject: "Login to your ".concat(siteOptions.name, " account"),
                preheader: "Click the button below and you will be automatically logged in to your ".concat(siteOptions.name, " account. "),
                reasonForEmail: "you requested an automatic login link",
                autoLoginURL: autoLoginURL,
                expiryHours: authOptions.autoLoginExpiryHours === 1 ? "".concat(authOptions.autoLoginExpiryHours, " hour") : "".concat(authOptions.autoLoginExpiryHours, " hours")
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
  var _ref2 = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator.regenerator.mark(function _callee2(req, toEmail, autoLoginID) {
    var _Elusive$options2, mailOptions, siteOptions, dynamicTemplateData;

    return asyncToGenerator.regenerator.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _Elusive$options2 = index.options, mailOptions = _Elusive$options2.mail, siteOptions = _Elusive$options2.site;
            dynamicTemplateData = utils.defaultDynamicTemplateData(req);
            _context2.next = 4;
            return utils.sendMail({
              to: toEmail,
              template_id: mailOptions.signupTemplateID,
              dynamic_template_data: _objectSpread(_objectSpread({}, dynamicTemplateData), {}, {
                subject: "Confirm your ".concat(siteOptions.name, " account"),
                preheader: "Welcome to ".concat(siteOptions.name, ". Thank you for confirming your email address. Click here to create your account. "),
                reasonForEmail: "you signed up for a ".concat(siteOptions.name, " account"),
                autoLoginURL: "".concat(dynamicTemplateData.baseURL).concat(utils$1.autoLoginRoute(autoLoginID).asPath, "?next=").concat(encodeURIComponent(utils$1.onboardingRoute())),
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
  var _ref3 = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator.regenerator.mark(function _callee3(req, toEmail, autoLoginID) {
    var _Elusive$options3, authOptions, mailOptions, siteOptions, dynamicTemplateData;

    return asyncToGenerator.regenerator.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _Elusive$options3 = index.options, authOptions = _Elusive$options3.auth, mailOptions = _Elusive$options3.mail, siteOptions = _Elusive$options3.site;
            dynamicTemplateData = utils.defaultDynamicTemplateData(req);
            _context3.next = 4;
            return utils.sendMail({
              to: toEmail,
              template_id: mailOptions.resetTemplateID,
              dynamic_template_data: _objectSpread(_objectSpread({}, dynamicTemplateData), {}, {
                subject: "Reset your ".concat(siteOptions.name, " password"),
                preheader: "Someone recently requested a password change for your ".concat(siteOptions.name, " account. If this was you, you can set a new password here. "),
                reasonForEmail: "we received a password reset request for this account",
                autoLoginURL: "".concat(dynamicTemplateData.baseURL).concat(utils$1.autoLoginRoute(autoLoginID).asPath, "?next=").concat(encodeURIComponent(utils$1.settingsAccountRoute())),
                expiryHours: authOptions.autoLoginExpiryHours === 1 ? "".concat(authOptions.autoLoginExpiryHours, " hour") : "".concat(authOptions.autoLoginExpiryHours, " hours")
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

exports.AlreadyAuthenticatedError = AlreadyAuthenticatedError;
exports.AuthError = AuthError;
exports.AuthenticationFailedError = AuthenticationFailedError;
exports.NotAuthenticatedError = NotAuthenticatedError;
exports.TooManyLoginAttemptsError = TooManyLoginAttemptsError;
exports.TooManyRegistrationsError = TooManyRegistrationsError;
exports.TooManyResetAttemptsError = TooManyResetAttemptsError;
exports.UserAlreadyExistsError = UserAlreadyExistsError;
exports.comparePasswordHash = comparePasswordHash;
exports.hasRole = hasRole;
exports.hashPassword = hashPassword;
exports.sendLoginEmail = sendLoginEmail;
exports.sendResetEmail = sendResetEmail;
exports.sendSignupEmail = sendSignupEmail;
