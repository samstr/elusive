'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var classCallCheck = require('../classCallCheck-d2bb402f.js');
var client = require('../index-14401048.js');
var index = require('../index.js');
var index$1 = require('../index-072a3fc5.js');
var FormErrors = require('../FormErrors-1539c4dc.js');
require('react');
require('prop-types');
require('react-bootstrap');
var service = require('../service-19d76d04.js');
require('uuid');
require('../utils-dbb053a5.js');

function _createSuper(Derived) { return function () { var Super = FormErrors._getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = FormErrors._getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return FormErrors._possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { client._defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var getUserByEmail = function getUserByEmail(email) {
  var firestore, docs, user;
  return index$1._regeneratorRuntime.async(function getUserByEmail$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          firestore = index.options.firebase.instance.firestore();
          _context.next = 3;
          return index$1._regeneratorRuntime.awrap(firestore.collection(service.COLLECTION).where('email', '==', email).get());

        case 3:
          docs = _context.sent;

          if (!(docs.size === 0)) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", null);

        case 6:
          docs.forEach(function (doc) {
            user = service.model(_objectSpread({
              id: doc.id
            }, doc.data()));
          });
          return _context.abrupt("return", user);

        case 8:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, null, Promise);
};

exports.COLLECTION = service.COLLECTION;
exports.createUser = service.createUser;
exports.getUser = service.getUser;
exports.listUsers = service.listUsers;
exports.model = service.model;
exports.updateUser = service.updateUser;
exports.UserNotEnabledError = UserNotEnabledError;
exports.UserNotFoundError = UserNotFoundError;
exports.getUserByEmail = getUserByEmail;
