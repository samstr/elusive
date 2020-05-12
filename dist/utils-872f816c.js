'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var classCallCheck = require('./classCallCheck-d2bb402f.js');
var index = require('./index.js');
var FormErrors = require('./FormErrors-1539c4dc.js');
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
var AuthenticationFailedError = /*#__PURE__*/function (_AuthError2) {
  FormErrors._inherits(AuthenticationFailedError, _AuthError2);

  var _super3 = _createSuper(AuthenticationFailedError);

  function AuthenticationFailedError() {
    classCallCheck._classCallCheck(this, AuthenticationFailedError);

    return _super3.apply(this, arguments);
  }

  return AuthenticationFailedError;
}(AuthError);
var NotAuthenticatedError = /*#__PURE__*/function (_AuthError3) {
  FormErrors._inherits(NotAuthenticatedError, _AuthError3);

  var _super4 = _createSuper(NotAuthenticatedError);

  function NotAuthenticatedError() {
    classCallCheck._classCallCheck(this, NotAuthenticatedError);

    return _super4.apply(this, arguments);
  }

  return NotAuthenticatedError;
}(AuthError);
var TooManyLoginAttemptsError = /*#__PURE__*/function (_AuthError4) {
  FormErrors._inherits(TooManyLoginAttemptsError, _AuthError4);

  var _super5 = _createSuper(TooManyLoginAttemptsError);

  function TooManyLoginAttemptsError() {
    classCallCheck._classCallCheck(this, TooManyLoginAttemptsError);

    return _super5.apply(this, arguments);
  }

  return TooManyLoginAttemptsError;
}(AuthError);
var TooManyResetAttemptsError = /*#__PURE__*/function (_AuthError5) {
  FormErrors._inherits(TooManyResetAttemptsError, _AuthError5);

  var _super6 = _createSuper(TooManyResetAttemptsError);

  function TooManyResetAttemptsError() {
    classCallCheck._classCallCheck(this, TooManyResetAttemptsError);

    return _super6.apply(this, arguments);
  }

  return TooManyResetAttemptsError;
}(AuthError);
var TooManyRegistrationsError = /*#__PURE__*/function (_AuthError6) {
  FormErrors._inherits(TooManyRegistrationsError, _AuthError6);

  var _super7 = _createSuper(TooManyRegistrationsError);

  function TooManyRegistrationsError() {
    classCallCheck._classCallCheck(this, TooManyRegistrationsError);

    return _super7.apply(this, arguments);
  }

  return TooManyRegistrationsError;
}(AuthError);
var UserAlreadyExistsError = /*#__PURE__*/function (_AuthError7) {
  FormErrors._inherits(UserAlreadyExistsError, _AuthError7);

  var _super8 = _createSuper(UserAlreadyExistsError);

  function UserAlreadyExistsError() {
    classCallCheck._classCallCheck(this, UserAlreadyExistsError);

    return _super8.apply(this, arguments);
  }

  return UserAlreadyExistsError;
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
exports.TooManyLoginAttemptsError = TooManyLoginAttemptsError;
exports.TooManyRegistrationsError = TooManyRegistrationsError;
exports.TooManyResetAttemptsError = TooManyResetAttemptsError;
exports.UserAlreadyExistsError = UserAlreadyExistsError;
exports.comparePasswordHash = comparePasswordHash;
exports.hashPassword = hashPassword;
