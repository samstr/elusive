'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var classCallCheck = require('../classCallCheck-d2bb402f.js');
require('../index-44fecfcf.js');
require('../index.js');
var FormErrors = require('../FormErrors-1539c4dc.js');
require('react');
require('prop-types');
require('react-bootstrap');
require('../index-2340470f.js');
require('uuid');
var utils = require('../utils-f4788b10.js');

function _createSuper(Derived) { return function () { var Super = FormErrors._getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = FormErrors._getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return FormErrors._possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var COLLECTION = 'loginAttempts';
var model = function model(data) {
  return utils.createModel(data);
};

var _createService = utils.createService(model, COLLECTION),
    loginAttemptsCollection = _createService.collection,
    getLoginAttemptByID = _createService.getObjectByID,
    getLoginAttempt = _createService.getObject,
    createLoginAttempt = _createService.createObject,
    updateLoginAttempt = _createService.updateObject,
    listLoginAttempts = _createService.listObjects;
var LoginAttemptNotFoundError = /*#__PURE__*/function (_BaseError) {
  FormErrors._inherits(LoginAttemptNotFoundError, _BaseError);

  var _super = _createSuper(LoginAttemptNotFoundError);

  function LoginAttemptNotFoundError() {
    classCallCheck._classCallCheck(this, LoginAttemptNotFoundError);

    return _super.apply(this, arguments);
  }

  return LoginAttemptNotFoundError;
}(FormErrors.BaseError);

exports.LoginAttemptNotFoundError = LoginAttemptNotFoundError;
exports.createLoginAttempt = createLoginAttempt;
exports.getLoginAttempt = getLoginAttempt;
exports.getLoginAttemptByID = getLoginAttemptByID;
exports.listLoginAttempts = listLoginAttempts;
exports.loginAttemptsCollection = loginAttemptsCollection;
exports.model = model;
exports.updateLoginAttempt = updateLoginAttempt;
