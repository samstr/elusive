'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var classCallCheck = require('../classCallCheck-d2bb402f.js');
var client = require('../index-c5fa8643.js');
var index = require('../index.js');
var FormErrors = require('../FormErrors-1539c4dc.js');
require('react');
require('prop-types');
require('react-bootstrap');
var asyncToGenerator = require('../asyncToGenerator-ae22edb1.js');
var utils = require('../utils-59259237.js');
require('uuid');
var utils$1 = require('../utils-100b7d88.js');
var utils$2 = require('../utils-08b190dc.js');
var users = require('./users.js');

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { client._defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { return function () { var Super = FormErrors._getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = FormErrors._getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return FormErrors._possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var COLLECTION = 'magicLogins';
var model = function model(data) {
  var model = utils$1.createModel(data);

  model.getUser = /*#__PURE__*/function () {
    var _ref = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator._regeneratorRuntime.mark(function _callee(_) {
      return asyncToGenerator._regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return users.getUserByID(model.userId);

            case 2:
              model.user = _context.sent;

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();

  return model;
};

var _createService = utils$1.createService(model, COLLECTION),
    magicLoginsCollection = _createService.collection,
    getMagicLoginByID = _createService.getObjectByID,
    getMagicLogin = _createService.getObject,
    createMagicLogin = _createService.createObject,
    updateMagicLogin = _createService.updateObject,
    listMagicLogins = _createService.listObjects;
var MagicLoginAlreadyUsedError = /*#__PURE__*/function (_BaseError) {
  FormErrors._inherits(MagicLoginAlreadyUsedError, _BaseError);

  var _super = _createSuper(MagicLoginAlreadyUsedError);

  function MagicLoginAlreadyUsedError() {
    classCallCheck._classCallCheck(this, MagicLoginAlreadyUsedError);

    return _super.apply(this, arguments);
  }

  return MagicLoginAlreadyUsedError;
}(FormErrors.BaseError);
var MagicLoginNotFoundError = /*#__PURE__*/function (_BaseError2) {
  FormErrors._inherits(MagicLoginNotFoundError, _BaseError2);

  var _super2 = _createSuper(MagicLoginNotFoundError);

  function MagicLoginNotFoundError() {
    classCallCheck._classCallCheck(this, MagicLoginNotFoundError);

    return _super2.apply(this, arguments);
  }

  return MagicLoginNotFoundError;
}(FormErrors.BaseError);
var sendLoginEmail = /*#__PURE__*/function () {
  var _ref2 = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator._regeneratorRuntime.mark(function _callee2(req, toEmail, magicLoginID) {
    var _Elusive$options, authOptions, mailOptions, siteOptions, dynamicTemplateData;

    return asyncToGenerator._regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _Elusive$options = index.options, authOptions = _Elusive$options.auth, mailOptions = _Elusive$options.mail, siteOptions = _Elusive$options.site;
            dynamicTemplateData = utils.defaultDynamicTemplateData(req);
            _context2.next = 4;
            return utils.sendMail({
              to: toEmail,
              template_id: mailOptions.magicLoginTemplateID,
              dynamic_template_data: _objectSpread({}, dynamicTemplateData, {
                subject: "Login to your ".concat(siteOptions.name, " account"),
                preheader: "Click the button below and you will be automatically logged in to your ".concat(siteOptions.name, " account. "),
                reasonForEmail: "you requested an automatic login link",
                magicLoginURL: "".concat(dynamicTemplateData.baseURL).concat(utils$2.magicLoginRoute(magicLoginID).asPath),
                expiryHours: authOptions.magicLoginExpiryHours === 1 ? "".concat(authOptions.magicLoginExpiryHours, " hour") : "".concat(authOptions.magicLoginExpiryHours, " hours")
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

  return function sendLoginEmail(_x2, _x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var sendSignupEmail = /*#__PURE__*/function () {
  var _ref3 = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator._regeneratorRuntime.mark(function _callee3(req, toEmail, magicLoginID) {
    var _Elusive$options2, mailOptions, siteOptions, dynamicTemplateData;

    return asyncToGenerator._regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _Elusive$options2 = index.options, mailOptions = _Elusive$options2.mail, siteOptions = _Elusive$options2.site;
            dynamicTemplateData = utils.defaultDynamicTemplateData(req);
            _context3.next = 4;
            return utils.sendMail({
              to: toEmail,
              template_id: mailOptions.magicSignUpTemplateID,
              dynamic_template_data: _objectSpread({}, dynamicTemplateData, {
                subject: "Confirm your ".concat(siteOptions.name, " account"),
                preheader: "Welcome to ".concat(siteOptions.name, ". Thank you for confirming your email address. Click here to create your account. "),
                reasonForEmail: "you signed up for a ".concat(siteOptions.name, " account"),
                magicLoginURL: "".concat(dynamicTemplateData.baseURL).concat(utils$2.magicLoginRoute(magicLoginID).asPath),
                termsURL: "".concat(dynamicTemplateData.baseURL).concat(utils$2.termsRoute())
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

  return function sendSignupEmail(_x5, _x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();
var sendResetEmail = /*#__PURE__*/function () {
  var _ref4 = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator._regeneratorRuntime.mark(function _callee4(req, toEmail, magicLoginID) {
    return asyncToGenerator._regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function sendResetEmail(_x8, _x9, _x10) {
    return _ref4.apply(this, arguments);
  };
}();

exports.MagicLoginAlreadyUsedError = MagicLoginAlreadyUsedError;
exports.MagicLoginNotFoundError = MagicLoginNotFoundError;
exports.createMagicLogin = createMagicLogin;
exports.getMagicLogin = getMagicLogin;
exports.getMagicLoginByID = getMagicLoginByID;
exports.listMagicLogins = listMagicLogins;
exports.magicLoginsCollection = magicLoginsCollection;
exports.model = model;
exports.sendLoginEmail = sendLoginEmail;
exports.sendResetEmail = sendResetEmail;
exports.sendSignupEmail = sendSignupEmail;
exports.updateMagicLogin = updateMagicLogin;
