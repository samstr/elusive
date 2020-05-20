'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var classCallCheck = require('../classCallCheck-d2bb402f.js');
require('../index-c5fa8643.js');
var index = require('../index.js');
var FormErrors = require('../FormErrors-1539c4dc.js');
require('react');
require('prop-types');
require('react-bootstrap');
var asyncToGenerator = require('../asyncToGenerator-ae22edb1.js');
require('bcryptjs');
require('../utils-db80ea21.js');
require('../utils-790b751d.js');
require('../utils-dc5950ee.js');
require('uuid');
var utils$3 = require('../utils-100b7d88.js');
var moment = _interopDefault(require('moment'));
var users = require('./users.js');

function _createSuper(Derived) { return function () { var Super = FormErrors._getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = FormErrors._getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return FormErrors._possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var COLLECTION = 'magicLogins';
var model = function model(data) {
  var model = utils$3.createModel(data);

  model.hasExpired = function () {
    return magicLoginExpired(model);
  };

  model.getUser = /*#__PURE__*/function () {
    var _ref = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator._regeneratorRuntime.mark(function _callee(_) {
      return asyncToGenerator._regeneratorRuntime.wrap(function _callee$(_context) {
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
    magicLoginsCollection = _createService.collection,
    getMagicLoginByID = _createService.getObjectByID,
    getMagicLogin = _createService.getObject,
    createMagicLogin = _createService.createObject,
    updateMagicLogin = _createService.updateObject,
    listMagicLogins = _createService.listObjects;
var MagicLoginAlreadyUsedError = /*#__PURE__*/function (_BaseError) {
  FormErrors._inherits(MagicLoginAlreadyUsedError, _BaseError);

  var _super = _createSuper(MagicLoginAlreadyUsedError);

  function MagicLoginAlreadyUsedError() {
    classCallCheck._classCallCheck(this, MagicLoginAlreadyUsedError);

    return _super.apply(this, arguments);
  }

  return MagicLoginAlreadyUsedError;
}(FormErrors.BaseError);
var MagicLoginNotFoundError = /*#__PURE__*/function (_BaseError2) {
  FormErrors._inherits(MagicLoginNotFoundError, _BaseError2);

  var _super2 = _createSuper(MagicLoginNotFoundError);

  function MagicLoginNotFoundError() {
    classCallCheck._classCallCheck(this, MagicLoginNotFoundError);

    return _super2.apply(this, arguments);
  }

  return MagicLoginNotFoundError;
}(FormErrors.BaseError);
var MagicLoginExpiredError = /*#__PURE__*/function (_BaseError3) {
  FormErrors._inherits(MagicLoginExpiredError, _BaseError3);

  var _super3 = _createSuper(MagicLoginExpiredError);

  function MagicLoginExpiredError() {
    classCallCheck._classCallCheck(this, MagicLoginExpiredError);

    return _super3.apply(this, arguments);
  }

  return MagicLoginExpiredError;
}(FormErrors.BaseError);
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
