'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var classCallCheck = require('../classCallCheck-d2bb402f.js');
require('../ElusiveClient-b6e2cec5.js');
require('../defineProperty-ba7cd53d.js');
require('../index.js');
var errors = require('../errors-b316e546.js');
require('../asyncToGenerator-42483001.js');
require('bcryptjs');
require('../utils-53071686.js');
require('../utils-3409f232.js');
var utils$2 = require('../utils-9098034f.js');
require('uuid');
var utils = require('../utils-71c02254.js');

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = errors._getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = errors._getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return errors._possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var COLLECTION = 'users';
var model = function model(data) {
  var model = utils.createModel(data);

  model.hasRole = function (role) {
    return utils$2.hasRole(role, model.roles);
  };

  return model;
};

var _createService = utils.createService(model, COLLECTION),
    usersCollection = _createService.collection,
    getUserByID = _createService.getObjectByID,
    getUser = _createService.getObject,
    createUser = _createService.createObject,
    updateUser = _createService.updateObject,
    listUsers = _createService.listObjects;
var UserNotEnabledError = /*#__PURE__*/function (_BaseError) {
  errors._inherits(UserNotEnabledError, _BaseError);

  var _super = _createSuper(UserNotEnabledError);

  function UserNotEnabledError() {
    classCallCheck._classCallCheck(this, UserNotEnabledError);

    return _super.apply(this, arguments);
  }

  return UserNotEnabledError;
}(errors.BaseError);
var UserNotFoundError = /*#__PURE__*/function (_BaseError2) {
  errors._inherits(UserNotFoundError, _BaseError2);

  var _super2 = _createSuper(UserNotFoundError);

  function UserNotFoundError() {
    classCallCheck._classCallCheck(this, UserNotFoundError);

    return _super2.apply(this, arguments);
  }

  return UserNotFoundError;
}(errors.BaseError);

exports.UserNotEnabledError = UserNotEnabledError;
exports.UserNotFoundError = UserNotFoundError;
exports.createUser = createUser;
exports.getUser = getUser;
exports.getUserByID = getUserByID;
exports.listUsers = listUsers;
exports.model = model;
exports.updateUser = updateUser;
exports.usersCollection = usersCollection;
