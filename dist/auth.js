'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var classCallCheck = require('./classCallCheck-d2bb402f.js');
require('./index-0e573485.js');
var index = require('./index.js');
var FormErrors = require('./FormErrors-1539c4dc.js');
require('react');
require('prop-types');
require('react-bootstrap');
var bcrypt = _interopDefault(require('bcryptjs'));

function _createSuper(Derived) { return function () { var Super = FormErrors._getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = FormErrors._getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return FormErrors._possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var AuthError = /*#__PURE__*/function (_BaseError) {
  FormErrors._inherits(AuthError, _BaseError);

  var _super = _createSuper(AuthError);

  function AuthError() {
    classCallCheck._classCallCheck(this, AuthError);

    return _super.apply(this, arguments);
  }

  return AuthError;
}(FormErrors.BaseError);
var AlreadyAuthenticatedError = /*#__PURE__*/function (_AuthError) {
  FormErrors._inherits(AlreadyAuthenticatedError, _AuthError);

  var _super2 = _createSuper(AlreadyAuthenticatedError);

  function AlreadyAuthenticatedError() {
    classCallCheck._classCallCheck(this, AlreadyAuthenticatedError);

    return _super2.apply(this, arguments);
  }

  return AlreadyAuthenticatedError;
}(AuthError);
var UserAlreadyExistsError = /*#__PURE__*/function (_AuthError2) {
  FormErrors._inherits(UserAlreadyExistsError, _AuthError2);

  var _super3 = _createSuper(UserAlreadyExistsError);

  function UserAlreadyExistsError() {
    classCallCheck._classCallCheck(this, UserAlreadyExistsError);

    return _super3.apply(this, arguments);
  }

  return UserAlreadyExistsError;
}(AuthError);
var AuthenticationFailedError = /*#__PURE__*/function (_AuthError3) {
  FormErrors._inherits(AuthenticationFailedError, _AuthError3);

  var _super4 = _createSuper(AuthenticationFailedError);

  function AuthenticationFailedError() {
    classCallCheck._classCallCheck(this, AuthenticationFailedError);

    return _super4.apply(this, arguments);
  }

  return AuthenticationFailedError;
}(AuthError);
var NotAuthenticatedError = /*#__PURE__*/function (_AuthError4) {
  FormErrors._inherits(NotAuthenticatedError, _AuthError4);

  var _super5 = _createSuper(NotAuthenticatedError);

  function NotAuthenticatedError() {
    classCallCheck._classCallCheck(this, NotAuthenticatedError);

    return _super5.apply(this, arguments);
  }

  return NotAuthenticatedError;
}(AuthError);

var hashPassword = function hashPassword(password) {
  var authOptions = index.options.auth;
  return bcrypt.hashSync(password, authOptions.saltRounds);
};
var comparePasswordHash = function comparePasswordHash(password, hash) {
  return bcrypt.compareSync(password, hash);
};

exports.AlreadyAuthenticatedError = AlreadyAuthenticatedError;
exports.AuthError = AuthError;
exports.AuthenticationFailedError = AuthenticationFailedError;
exports.NotAuthenticatedError = NotAuthenticatedError;
exports.UserAlreadyExistsError = UserAlreadyExistsError;
exports.comparePasswordHash = comparePasswordHash;
exports.hashPassword = hashPassword;
