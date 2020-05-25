'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var classCallCheck = require('../classCallCheck-d2bb402f.js');
require('../ElusiveClient-7405d865.js');
var index = require('../index.js');
var errors = require('../errors-b316e546.js');
var asyncToGenerator = require('../asyncToGenerator-42483001.js');
require('bcryptjs');
require('../utils-c048fd8a.js');
require('../utils-3409f232.js');
require('../utils-24b30e03.js');
require('uuid');
var utils = require('../utils-8f18a4f1.js');
var moment = _interopDefault(require('moment'));
var users = require('./users.js');

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = errors._getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = errors._getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return errors._possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var COLLECTION = 'magicLogins';
var model = function model(data) {
  var model = utils.createModel(data);

  model.hasExpired = function () {
    return magicLoginExpired(model);
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

var _createService = utils.createService(model, COLLECTION),
    magicLoginsCollection = _createService.collection,
    getMagicLoginByID = _createService.getObjectByID,
    getMagicLogin = _createService.getObject,
    createMagicLogin = _createService.createObject,
    updateMagicLogin = _createService.updateObject,
    listMagicLogins = _createService.listObjects;
var MagicLoginAlreadyUsedError = /*#__PURE__*/function (_BaseError) {
  errors._inherits(MagicLoginAlreadyUsedError, _BaseError);

  var _super = _createSuper(MagicLoginAlreadyUsedError);

  function MagicLoginAlreadyUsedError() {
    classCallCheck._classCallCheck(this, MagicLoginAlreadyUsedError);

    return _super.apply(this, arguments);
  }

  return MagicLoginAlreadyUsedError;
}(errors.BaseError);
var MagicLoginNotFoundError = /*#__PURE__*/function (_BaseError2) {
  errors._inherits(MagicLoginNotFoundError, _BaseError2);

  var _super2 = _createSuper(MagicLoginNotFoundError);

  function MagicLoginNotFoundError() {
    classCallCheck._classCallCheck(this, MagicLoginNotFoundError);

    return _super2.apply(this, arguments);
  }

  return MagicLoginNotFoundError;
}(errors.BaseError);
var MagicLoginExpiredError = /*#__PURE__*/function (_BaseError3) {
  errors._inherits(MagicLoginExpiredError, _BaseError3);

  var _super3 = _createSuper(MagicLoginExpiredError);

  function MagicLoginExpiredError() {
    classCallCheck._classCallCheck(this, MagicLoginExpiredError);

    return _super3.apply(this, arguments);
  }

  return MagicLoginExpiredError;
}(errors.BaseError);
var magicLoginExpired = function magicLoginExpired(magicLogin) {
  var authOptions = index.options.auth;
  var dateNow = moment();
  var dateCreated = moment.unix(magicLogin.dateCreated);
  var dateExpires = moment(dateCreated).add(authOptions.magicLoginExpiryHours, 'hours');
  return dateNow.isAfter(dateExpires);
};

exports.MagicLoginAlreadyUsedError = MagicLoginAlreadyUsedError;
exports.MagicLoginExpiredError = MagicLoginExpiredError;
exports.MagicLoginNotFoundError = MagicLoginNotFoundError;
exports.createMagicLogin = createMagicLogin;
exports.getMagicLogin = getMagicLogin;
exports.getMagicLoginByID = getMagicLoginByID;
exports.listMagicLogins = listMagicLogins;
exports.magicLoginExpired = magicLoginExpired;
exports.magicLoginsCollection = magicLoginsCollection;
exports.model = model;
exports.updateMagicLogin = updateMagicLogin;
