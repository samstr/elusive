'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var classCallCheck = require('../classCallCheck-d2bb402f.js');
require('../ElusiveClient-5959be3f.js');
require('../defineProperty-ba7cd53d.js');
require('../index.js');
var FormErrors = require('../FormErrors-bf65213f.js');
require('react');
require('prop-types');
require('react-bootstrap');
require('../asyncToGenerator-42483001.js');
require('bcryptjs');
require('../utils-6363c83d.js');
require('../utils-3409f232.js');
var utils$2 = require('../utils-188be96f.js');
require('uuid');
var utils$3 = require('../utils-ee651d6c.js');

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = FormErrors._getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = FormErrors._getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return FormErrors._possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var COLLECTION = 'users';
var model = function model(data) {
  var model = utils$3.createModel(data);

  model.hasRole = function (role) {
    return utils$2.hasRole(role, model.roles);
  };

  return model;
};

var _createService = utils$3.createService(model, COLLECTION),
    usersCollection = _createService.collection,
    getUserByID = _createService.getObjectByID,
    getUser = _createService.getObject,
    createUser = _createService.createObject,
    updateUser = _createService.updateObject,
    listUsers = _createService.listObjects;
var UserNotEnabledError = /*#__PURE__*/function (_BaseError) {
  FormErrors._inherits(UserNotEnabledError, _BaseError);

  var _super = _createSuper(UserNotEnabledError);

  function UserNotEnabledError() {
    classCallCheck._classCallCheck(this, UserNotEnabledError);

    return _super.apply(this, arguments);
  }

  return UserNotEnabledError;
}(FormErrors.BaseError);
var UserNotFoundError = /*#__PURE__*/function (_BaseError2) {
  FormErrors._inherits(UserNotFoundError, _BaseError2);

  var _super2 = _createSuper(UserNotFoundError);

  function UserNotFoundError() {
    classCallCheck._classCallCheck(this, UserNotFoundError);

    return _super2.apply(this, arguments);
  }

  return UserNotFoundError;
}(FormErrors.BaseError);

exports.UserNotEnabledError = UserNotEnabledError;
exports.UserNotFoundError = UserNotFoundError;
exports.createUser = createUser;
exports.getUser = getUser;
exports.getUserByID = getUserByID;
exports.listUsers = listUsers;
exports.model = model;
exports.updateUser = updateUser;
exports.usersCollection = usersCollection;
