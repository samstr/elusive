'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var classCallCheck = require('../classCallCheck-d2bb402f.js');
var client = require('../index-79fa448e.js');
var index = require('../index.js');
var FormErrors = require('../FormErrors-1539c4dc.js');
require('react');
require('prop-types');
require('react-bootstrap');
var index$1 = require('../index-2340470f.js');
require('uuid');
var utils$1 = require('../utils-2e3310dc.js');

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { client._defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { return function () { var Super = FormErrors._getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = FormErrors._getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return FormErrors._possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var COLLECTION = 'users';
var model = function model(data) {
  return utils$1.createModel(data);
};

var _createService = utils$1.createService(model, COLLECTION),
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
var getUserByEmail = function getUserByEmail(email) {
  var firebase, firestore, docs, user;
  return index$1._regeneratorRuntime.async(function getUserByEmail$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          firebase = index.services.firebase;
          firestore = firebase.firestore();
          _context.next = 4;
          return index$1._regeneratorRuntime.awrap(firestore.collection(COLLECTION).where('email', '==', email).get());

        case 4:
          docs = _context.sent;

          if (!(docs.size === 0)) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", null);

        case 7:
          docs.forEach(function (doc) {
            user = model(_objectSpread({
              id: doc.id
            }, doc.data()));
          });
          return _context.abrupt("return", user);

        case 9:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, null, Promise);
};
var getUserByUsername = function getUserByUsername(username) {
  var firebase, firestore, docs, user;
  return index$1._regeneratorRuntime.async(function getUserByUsername$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          firebase = index.services.firebase;
          firestore = firebase.firestore();
          _context2.next = 4;
          return index$1._regeneratorRuntime.awrap(firestore.collection(COLLECTION).where('username', '==', username).get());

        case 4:
          docs = _context2.sent;

          if (!(docs.size === 0)) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", null);

        case 7:
          docs.forEach(function (doc) {
            user = model(_objectSpread({
              id: doc.id
            }, doc.data()));
          });
          return _context2.abrupt("return", user);

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, null, Promise);
};
var getUsersByIPSinceDate = function getUsersByIPSinceDate(ip, date) {
  var firebase, firestore, docs, objects;
  return index$1._regeneratorRuntime.async(function getUsersByIPSinceDate$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          firebase = index.services.firebase;
          firestore = firebase.firestore();
          _context3.next = 4;
          return index$1._regeneratorRuntime.awrap(firestore.collection(COLLECTION).where('registrationIP', '==', ip).where('dateCreated', '>', date).get());

        case 4:
          docs = _context3.sent;
          objects = [];
          docs.forEach(function (doc) {
            objects.push(model(_objectSpread({
              id: doc.id
            }, doc.data())));
          });
          return _context3.abrupt("return", objects);

        case 8:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, null, Promise);
};

exports.COLLECTION = COLLECTION;
exports.UserNotEnabledError = UserNotEnabledError;
exports.UserNotFoundError = UserNotFoundError;
exports.createUser = createUser;
exports.getUser = getUser;
exports.getUserByEmail = getUserByEmail;
exports.getUserByUsername = getUserByUsername;
exports.getUsersByIPSinceDate = getUsersByIPSinceDate;
exports.listUsers = listUsers;
exports.model = model;
exports.updateUser = updateUser;
