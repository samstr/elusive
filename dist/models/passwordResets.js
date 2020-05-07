'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var classCallCheck = require('../classCallCheck-d2bb402f.js');
var client = require('../index-832c7a28.js');
var index = require('../index.js');
var FormErrors = require('../FormErrors-1539c4dc.js');
require('react');
require('prop-types');
require('react-bootstrap');
var index$1 = require('../index-2340470f.js');
var utils = require('../utils-c66da574.js');
require('uuid');
var utils$1 = require('../utils-ca780ba6.js');
var users = require('./users.js');
var moment = _interopDefault(require('moment'));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { client._defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { return function () { var Super = FormErrors._getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = FormErrors._getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return FormErrors._possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var COLLECTION = 'passwordResets';
var model = function model(data) {
  var model = utils$1.createModel(data);

  model.hasExpired = function () {
    return passwordResetExpired(model);
  };

  model.getUser = function _callee() {
    return index$1._regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return index$1._regeneratorRuntime.awrap(users.getUser(model.userId));

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
    passwordResetsCollection = _createService.collection,
    getPasswordResetByID = _createService.getObjectByID,
    getPasswordReset = _createService.getObject,
    createPasswordReset = _createService.createObject,
    updatePasswordReset = _createService.updateObject,
    listPasswordResets = _createService.listObjects;
var PasswordResetAlreadyUsedError = /*#__PURE__*/function (_BaseError) {
  FormErrors._inherits(PasswordResetAlreadyUsedError, _BaseError);

  var _super = _createSuper(PasswordResetAlreadyUsedError);

  function PasswordResetAlreadyUsedError() {
    classCallCheck._classCallCheck(this, PasswordResetAlreadyUsedError);

    return _super.apply(this, arguments);
  }

  return PasswordResetAlreadyUsedError;
}(FormErrors.BaseError);
var PasswordResetExpiredError = /*#__PURE__*/function (_BaseError2) {
  FormErrors._inherits(PasswordResetExpiredError, _BaseError2);

  var _super2 = _createSuper(PasswordResetExpiredError);

  function PasswordResetExpiredError() {
    classCallCheck._classCallCheck(this, PasswordResetExpiredError);

    return _super2.apply(this, arguments);
  }

  return PasswordResetExpiredError;
}(FormErrors.BaseError);
var PasswordResetNotFoundError = /*#__PURE__*/function (_BaseError3) {
  FormErrors._inherits(PasswordResetNotFoundError, _BaseError3);

  var _super3 = _createSuper(PasswordResetNotFoundError);

  function PasswordResetNotFoundError() {
    classCallCheck._classCallCheck(this, PasswordResetNotFoundError);

    return _super3.apply(this, arguments);
  }

  return PasswordResetNotFoundError;
}(FormErrors.BaseError);
var passwordResetExpired = function passwordResetExpired(passwordReset) {
  var authOptions = index.options.auth;
  var dateNow = moment();
  var dateCreated = moment.unix(passwordReset.dateCreated);
  var dateExpires = moment(dateCreated).add(authOptions.resetPasswordExpiryHours, 'hours');
  return dateNow.isAfter(dateExpires);
};
var sendPasswordResetRequestEmail = function sendPasswordResetRequestEmail(req, toEmail, passwordResetId) {
  var mailOptions, dynamicTemplateData;
  return index$1._regeneratorRuntime.async(function sendPasswordResetRequestEmail$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          mailOptions = index.options.mail;
          dynamicTemplateData = utils.defaultDynamicTemplateData(req);
          toEmail = 'samstr@gmail.com';
          _context2.next = 5;
          return index$1._regeneratorRuntime.awrap(utils.sendMail({
            to: toEmail,
            from: {
              email: mailOptions.fromEmail,
              name: mailOptions.fromName
            },
            template_id: mailOptions.resetPasswordRequestTemplateId,
            dynamic_template_data: _objectSpread({}, dynamicTemplateData, {
              resetPasswordConfirmUrl: "".concat(dynamicTemplateData.baseUrl, "/reset/").concat(passwordResetId)
            })
          }));

        case 5:
          return _context2.abrupt("return", _context2.sent);

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, null, Promise);
};

exports.PasswordResetAlreadyUsedError = PasswordResetAlreadyUsedError;
exports.PasswordResetExpiredError = PasswordResetExpiredError;
exports.PasswordResetNotFoundError = PasswordResetNotFoundError;
exports.createPasswordReset = createPasswordReset;
exports.getPasswordReset = getPasswordReset;
exports.getPasswordResetByID = getPasswordResetByID;
exports.listPasswordResets = listPasswordResets;
exports.model = model;
exports.passwordResetExpired = passwordResetExpired;
exports.passwordResetsCollection = passwordResetsCollection;
exports.sendPasswordResetRequestEmail = sendPasswordResetRequestEmail;
exports.updatePasswordReset = updatePasswordReset;
