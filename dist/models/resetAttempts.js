'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var classCallCheck = require('../classCallCheck-d2bb402f.js');
require('../ElusiveClient-d044fa81.js');
require('../defineProperty-ba7cd53d.js');
require('../index.js');
var errors = require('../errors-6d843f19.js');
require('../asyncToGenerator-7a28bf2e.js');
var utils$3 = require('../utils-f7ef4c1d.js');

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = errors._getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = errors._getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return errors._possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var COLLECTION = 'resetAttempts';
var model = function model(data) {
  return utils$3.createModel(data);
};

var _createService = utils$3.createService(model, COLLECTION),
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
