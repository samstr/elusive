'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var classCallCheck = require('../classCallCheck-d2bb402f.js');
var client = require('../index-61c82eb7.js');
var index = require('../index.js');
var FormErrors = require('../FormErrors-1539c4dc.js');
require('react');
require('prop-types');
require('react-bootstrap');
var index$1 = require('../index-072a3fc5.js');
var utils = require('../utils-00b86ca6.js');
require('uuid');
var utils$1 = require('../utils-385a9005.js');
var users = require('./users.js');

function _createSuper(Derived) { return function () { var Super = FormErrors._getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = FormErrors._getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return FormErrors._possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { client._defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var COLLECTION = 'userVerifications';
var TYPE_EMAIL = 'email';
var TYPE_PHONE = 'phone';
var model = function model(data) {
  var model = utils$1.createModel(data);

  model.getUser = function _callee(_) {
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
    getUserVerification = _createService.getObject,
    createUserVerification = _createService.createObject,
    updateUserVerification = _createService.updateObject,
    listUserVerifications = _createService.listObjects;
var sendUserVerificationEmail = function sendUserVerificationEmail(req, toEmail, userVerificationId) {
  var mailOptions, dynamicTemplateData;
  return index$1._regeneratorRuntime.async(function sendUserVerificationEmail$(_context2) {
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
            template_id: mailOptions.verifyEmailTemplateId,
            dynamic_template_data: _objectSpread({}, dynamicTemplateData, {
              verifyEmailUrl: "".concat(dynamicTemplateData.baseUrl, "/verify/").concat(userVerificationId)
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
var UserVerificationAlreadyVerifiedError = /*#__PURE__*/function (_BaseError) {
  FormErrors._inherits(UserVerificationAlreadyVerifiedError, _BaseError);

  var _super = _createSuper(UserVerificationAlreadyVerifiedError);

  function UserVerificationAlreadyVerifiedError() {
    classCallCheck._classCallCheck(this, UserVerificationAlreadyVerifiedError);

    return _super.apply(this, arguments);
  }

  return UserVerificationAlreadyVerifiedError;
}(FormErrors.BaseError);
var UserVerificationNotFoundError = /*#__PURE__*/function (_BaseError2) {
  FormErrors._inherits(UserVerificationNotFoundError, _BaseError2);

  var _super2 = _createSuper(UserVerificationNotFoundError);

  function UserVerificationNotFoundError() {
    classCallCheck._classCallCheck(this, UserVerificationNotFoundError);

    return _super2.apply(this, arguments);
  }

  return UserVerificationNotFoundError;
}(FormErrors.BaseError);

exports.COLLECTION = COLLECTION;
exports.TYPE_EMAIL = TYPE_EMAIL;
exports.TYPE_PHONE = TYPE_PHONE;
exports.UserVerificationAlreadyVerifiedError = UserVerificationAlreadyVerifiedError;
exports.UserVerificationNotFoundError = UserVerificationNotFoundError;
exports.createUserVerification = createUserVerification;
exports.getUserVerification = getUserVerification;
exports.listUserVerifications = listUserVerifications;
exports.model = model;
exports.sendUserVerificationEmail = sendUserVerificationEmail;
exports.updateUserVerification = updateUserVerification;
