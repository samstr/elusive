'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var classCallCheck = require('../classCallCheck-d2bb402f.js');
require('../ElusiveClient-d044fa81.js');
require('../defineProperty-ba7cd53d.js');
var index$1 = require('../index.js');
var errors = require('../errors-6d843f19.js');
var asyncToGenerator = require('../asyncToGenerator-7a28bf2e.js');
require('bcryptjs');
require('../utils-8c3c3461.js');
require('../utils-ac544182.js');
require('../utils-744e9199.js');
var utils$3 = require('../utils-f7ef4c1d.js');
var moment = _interopDefault(require('moment'));
var users = require('./users.js');

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = errors._getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = errors._getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return errors._possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var COLLECTION = 'autoLogins';
var model = function model(data) {
  var model = utils$3.createModel(data);

  model.hasExpired = function () {
    return autoLoginExpired(model);
  };

  model.getUser = /*#__PURE__*/function () {
    var _ref = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator.regenerator.mark(function _callee(_) {
      return asyncToGenerator.regenerator.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return users.getUserByID(model.userId);

            case 2:
              model.user = _context.sent;

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();

  return model;
};

var _createService = utils$3.createService(model, COLLECTION),
    autoLoginsCollection = _createService.collection,
    getAutoLoginByID = _createService.getObjectByID,
    getAutoLogin = _createService.getObject,
    createAutoLogin = _createService.createObject,
    updateAutoLogin = _createService.updateObject,
    listAutoLogins = _createService.listObjects;
var AutoLoginAlreadyUsedError = /*#__PURE__*/function (_BaseError) {
  errors._inherits(AutoLoginAlreadyUsedError, _BaseError);

  var _super = _createSuper(AutoLoginAlreadyUsedError);

  function AutoLoginAlreadyUsedError() {
    classCallCheck._classCallCheck(this, AutoLoginAlreadyUsedError);

    return _super.apply(this, arguments);
  }

  return AutoLoginAlreadyUsedError;
}(errors.BaseError);
var AutoLoginNotFoundError = /*#__PURE__*/function (_BaseError2) {
  errors._inherits(AutoLoginNotFoundError, _BaseError2);

  var _super2 = _createSuper(AutoLoginNotFoundError);

  function AutoLoginNotFoundError() {
    classCallCheck._classCallCheck(this, AutoLoginNotFoundError);

    return _super2.apply(this, arguments);
  }

  return AutoLoginNotFoundError;
}(errors.BaseError);
var AutoLoginExpiredError = /*#__PURE__*/function (_BaseError3) {
  errors._inherits(AutoLoginExpiredError, _BaseError3);

  var _super3 = _createSuper(AutoLoginExpiredError);

  function AutoLoginExpiredError() {
    classCallCheck._classCallCheck(this, AutoLoginExpiredError);

    return _super3.apply(this, arguments);
  }

  return AutoLoginExpiredError;
}(errors.BaseError);
var autoLoginExpired = function autoLoginExpired(autoLogin) {
  var authOptions = index$1.options.auth;
  var dateNow = moment();
  var dateCreated = moment.unix(autoLogin.dateCreated);
  var dateExpires = moment(dateCreated).add(authOptions.autoLoginExpiryHours, 'hours');
  return dateNow.isAfter(dateExpires);
};

exports.AutoLoginAlreadyUsedError = AutoLoginAlreadyUsedError;
exports.AutoLoginExpiredError = AutoLoginExpiredError;
exports.AutoLoginNotFoundError = AutoLoginNotFoundError;
exports.autoLoginExpired = autoLoginExpired;
exports.autoLoginsCollection = autoLoginsCollection;
exports.createAutoLogin = createAutoLogin;
exports.getAutoLogin = getAutoLogin;
exports.getAutoLoginByID = getAutoLoginByID;
exports.listAutoLogins = listAutoLogins;
exports.model = model;
exports.updateAutoLogin = updateAutoLogin;
