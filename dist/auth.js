'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var wrapNativeSuper = require('./wrapNativeSuper-b3646a2a.js');
var client = require('./index-dbb6645d.js');
require('./defineProperty-ba7cd53d.js');
var index = require('./index.js');
var FormErrors = require('./FormErrors-a91e4b79.js');
require('react');
require('prop-types');
require('react-bootstrap');
var bcrypt = _interopDefault(require('bcryptjs'));

function _createSuper(Derived) { return function () { var Super = wrapNativeSuper._getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = wrapNativeSuper._getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return wrapNativeSuper._possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var AuthError = /*#__PURE__*/function (_BaseError) {
  wrapNativeSuper._inherits(AuthError, _BaseError);

  var _super = _createSuper(AuthError);

  function AuthError() {
    wrapNativeSuper._classCallCheck(this, AuthError);

    return _super.apply(this, arguments);
  }

  return AuthError;
}(FormErrors.BaseError);
var AlreadyAuthenticatedError = /*#__PURE__*/function (_AuthError) {
  wrapNativeSuper._inherits(AlreadyAuthenticatedError, _AuthError);

  var _super2 = _createSuper(AlreadyAuthenticatedError);

  function AlreadyAuthenticatedError() {
    wrapNativeSuper._classCallCheck(this, AlreadyAuthenticatedError);

    return _super2.apply(this, arguments);
  }

  return AlreadyAuthenticatedError;
}(AuthError);
var UserAlreadyExistsError = /*#__PURE__*/function (_AuthError2) {
  wrapNativeSuper._inherits(UserAlreadyExistsError, _AuthError2);

  var _super3 = _createSuper(UserAlreadyExistsError);

  function UserAlreadyExistsError() {
    wrapNativeSuper._classCallCheck(this, UserAlreadyExistsError);

    return _super3.apply(this, arguments);
  }

  return UserAlreadyExistsError;
}(AuthError);
var AuthenticationFailedError = /*#__PURE__*/function (_AuthError3) {
  wrapNativeSuper._inherits(AuthenticationFailedError, _AuthError3);

  var _super4 = _createSuper(AuthenticationFailedError);

  function AuthenticationFailedError() {
    wrapNativeSuper._classCallCheck(this, AuthenticationFailedError);

    return _super4.apply(this, arguments);
  }

  return AuthenticationFailedError;
}(AuthError);
var NotAuthenticatedError = /*#__PURE__*/function (_AuthError4) {
  wrapNativeSuper._inherits(NotAuthenticatedError, _AuthError4);

  var _super5 = _createSuper(NotAuthenticatedError);

  function NotAuthenticatedError() {
    wrapNativeSuper._classCallCheck(this, NotAuthenticatedError);

    return _super5.apply(this, arguments);
  }

  return NotAuthenticatedError;
}(AuthError);

var hashPassword = function hashPassword(password) {
  var options = index.options.sessions;
  return bcrypt.hashSync(password, options.bcrypt.saltRounds);
};
var comparePasswordHash = function comparePasswordHash(password, hash) {
  return bcrypt.compareSync(password, hash);
};

exports.SALT_ROUNDS = client.SALT_ROUNDS;
exports.AlreadyAuthenticatedError = AlreadyAuthenticatedError;
exports.AuthError = AuthError;
exports.AuthenticationFailedError = AuthenticationFailedError;
exports.NotAuthenticatedError = NotAuthenticatedError;
exports.UserAlreadyExistsError = UserAlreadyExistsError;
exports.comparePasswordHash = comparePasswordHash;
exports.hashPassword = hashPassword;
