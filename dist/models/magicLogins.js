'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var classCallCheck = require('../classCallCheck-d2bb402f.js');
var client = require('../index-905648bc.js');
var index = require('../index.js');
var FormErrors = require('../FormErrors-1539c4dc.js');
require('react');
require('prop-types');
require('react-bootstrap');
var index$1 = require('../index-2340470f.js');
var utils = require('../utils-b8aefd19.js');
require('uuid');
var utils$1 = require('../utils-3fbf90f8.js');
var users = require('./users.js');

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { client._defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { return function () { var Super = FormErrors._getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = FormErrors._getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return FormErrors._possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var COLLECTION = 'magicLogins';
var model = function model(data) {
  var model = utils$1.createModel(data);

  model.getUser = function _callee(_) {
    return index$1._regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return index$1._regeneratorRuntime.awrap(users.getUserByID(model.userId));

          case 2:
            model.user = _context.sent;

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, null, Promise);
  };

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
var sendMagicSignUpEmail = function sendMagicSignUpEmail(req, toEmail, magicLoginID) {
  var _Elusive$options, mailOptions, siteOptions, dynamicTemplateData;

  return index$1._regeneratorRuntime.async(function sendMagicSignUpEmail$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _Elusive$options = index.options, mailOptions = _Elusive$options.mail, siteOptions = _Elusive$options.site;
          dynamicTemplateData = utils.defaultDynamicTemplateData(req);
          _context2.next = 4;
          return index$1._regeneratorRuntime.awrap(utils.sendMail({
            to: toEmail,
            template_id: mailOptions.magicSignUpTemplateID,
            dynamic_template_data: _objectSpread({}, dynamicTemplateData, {
              subject: "Confirm your ".concat(siteOptions.name, " account"),
              preheader: "Welcome to ".concat(siteOptions.name, ". Thank you for confirming your email address. Click here to create your account. "),
              reasonForEmail: "you signed up for a ".concat(siteOptions.name, " account"),
              magicLoginURL: "".concat(dynamicTemplateData.baseURL, "/login/").concat(magicLoginID)
            })
          }));

        case 4:
          return _context2.abrupt("return", _context2.sent);

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, null, Promise);
};

exports.MagicLoginAlreadyUsedError = MagicLoginAlreadyUsedError;
exports.MagicLoginNotFoundError = MagicLoginNotFoundError;
exports.createMagicLogin = createMagicLogin;
exports.getMagicLogin = getMagicLogin;
exports.getMagicLoginByID = getMagicLoginByID;
exports.listMagicLogins = listMagicLogins;
exports.magicLoginsCollection = magicLoginsCollection;
exports.model = model;
exports.sendMagicSignUpEmail = sendMagicSignUpEmail;
exports.updateMagicLogin = updateMagicLogin;
