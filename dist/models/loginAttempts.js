'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var classCallCheck = require('../classCallCheck-d2bb402f.js');
require('../ElusiveClient-d044fa81.js');
require('../defineProperty-ba7cd53d.js');
require('../index.js');
var errors = require('../errors-6d843f19.js');
require('../asyncToGenerator-7a28bf2e.js');
require('uuid');
var utils = require('../utils-1f36ab63.js');

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = errors._getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = errors._getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return errors._possibleConstructorReturn(this, result); }; }

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
  errors._inherits(LoginAttemptNotFoundError, _BaseError);

  var _super = _createSuper(LoginAttemptNotFoundError);

  function LoginAttemptNotFoundError() {
    classCallCheck._classCallCheck(this, LoginAttemptNotFoundError);

    return _super.apply(this, arguments);
  }

  return LoginAttemptNotFoundError;
}(errors.BaseError);

exports.LoginAttemptNotFoundError = LoginAttemptNotFoundError;
exports.createLoginAttempt = createLoginAttempt;
exports.getLoginAttempt = getLoginAttempt;
exports.getLoginAttemptByID = getLoginAttemptByID;
exports.listLoginAttempts = listLoginAttempts;
exports.loginAttemptsCollection = loginAttemptsCollection;
exports.model = model;
exports.updateLoginAttempt = updateLoginAttempt;
