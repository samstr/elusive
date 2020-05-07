'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var classCallCheck = require('../classCallCheck-d2bb402f.js');
require('../index-7c1a0ac8.js');
require('../index.js');
var FormErrors = require('../FormErrors-1539c4dc.js');
require('react');
require('prop-types');
require('react-bootstrap');
require('../index-2340470f.js');
require('uuid');
var utils = require('../utils-29097260.js');

function _createSuper(Derived) { return function () { var Super = FormErrors._getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = FormErrors._getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return FormErrors._possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var COLLECTION = 'passwordResetAttempts';
var model = function model(data) {
  return utils.createModel(data);
};

var _createService = utils.createService(model, COLLECTION),
    passwordResetAttemptsCollection = _createService.collection,
    getPasswordResetAttemptByID = _createService.getObjectByID,
    getPasswordResetAttempt = _createService.getObject,
    createPasswordResetAttempt = _createService.createObject,
    updatePasswordResetAttempt = _createService.updateObject,
    listPasswordResetAttempts = _createService.listObjects;
var PasswordResetAttemptNotFoundError = /*#__PURE__*/function (_BaseError) {
  FormErrors._inherits(PasswordResetAttemptNotFoundError, _BaseError);

  var _super = _createSuper(PasswordResetAttemptNotFoundError);

  function PasswordResetAttemptNotFoundError() {
    classCallCheck._classCallCheck(this, PasswordResetAttemptNotFoundError);

    return _super.apply(this, arguments);
  }

  return PasswordResetAttemptNotFoundError;
}(FormErrors.BaseError);

exports.PasswordResetAttemptNotFoundError = PasswordResetAttemptNotFoundError;
exports.createPasswordResetAttempt = createPasswordResetAttempt;
exports.getPasswordResetAttempt = getPasswordResetAttempt;
exports.getPasswordResetAttemptByID = getPasswordResetAttemptByID;
exports.listPasswordResetAttempts = listPasswordResetAttempts;
exports.model = model;
exports.passwordResetAttemptsCollection = passwordResetAttemptsCollection;
exports.updatePasswordResetAttempt = updatePasswordResetAttempt;
