'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var classCallCheck = require('../classCallCheck-d2bb402f.js');
require('../ElusiveClient-7405d865.js');
require('../index.js');
var errors = require('../errors-b316e546.js');
require('../asyncToGenerator-42483001.js');
require('uuid');
var utils = require('../utils-8f18a4f1.js');

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = errors._getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = errors._getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return errors._possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var COLLECTION = 'resetAttempts';
var model = function model(data) {
  return utils.createModel(data);
};

var _createService = utils.createService(model, COLLECTION),
    resetAttemptsCollection = _createService.collection,
    getResetAttemptByID = _createService.getObjectByID,
    getResetAttempt = _createService.getObject,
    createResetAttempt = _createService.createObject,
    updateResetAttempt = _createService.updateObject,
    listResetAttempts = _createService.listObjects;
var ResetAttemptNotFoundError = /*#__PURE__*/function (_BaseError) {
  errors._inherits(ResetAttemptNotFoundError, _BaseError);

  var _super = _createSuper(ResetAttemptNotFoundError);

  function ResetAttemptNotFoundError() {
    classCallCheck._classCallCheck(this, ResetAttemptNotFoundError);

    return _super.apply(this, arguments);
  }

  return ResetAttemptNotFoundError;
}(errors.BaseError);

exports.ResetAttemptNotFoundError = ResetAttemptNotFoundError;
exports.createResetAttempt = createResetAttempt;
exports.getResetAttempt = getResetAttempt;
exports.getResetAttemptByID = getResetAttemptByID;
exports.listResetAttempts = listResetAttempts;
exports.model = model;
exports.resetAttemptsCollection = resetAttemptsCollection;
exports.updateResetAttempt = updateResetAttempt;
