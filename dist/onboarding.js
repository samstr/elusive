'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var classCallCheck = require('./classCallCheck-d2bb402f.js');
var FormErrors = require('./FormErrors-1539c4dc.js');
require('react');
require('prop-types');
require('react-bootstrap');

function _createSuper(Derived) { return function () { var Super = FormErrors._getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = FormErrors._getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return FormErrors._possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var OnboardingError = /*#__PURE__*/function (_BaseError) {
  FormErrors._inherits(OnboardingError, _BaseError);

  var _super = _createSuper(OnboardingError);

  function OnboardingError() {
    classCallCheck._classCallCheck(this, OnboardingError);

    return _super.apply(this, arguments);
  }

  return OnboardingError;
}(FormErrors.BaseError);
var OnboardingUserAlreadyHasPassword = /*#__PURE__*/function (_OnboardingError) {
  FormErrors._inherits(OnboardingUserAlreadyHasPassword, _OnboardingError);

  var _super2 = _createSuper(OnboardingUserAlreadyHasPassword);

  function OnboardingUserAlreadyHasPassword() {
    classCallCheck._classCallCheck(this, OnboardingUserAlreadyHasPassword);

    return _super2.apply(this, arguments);
  }

  return OnboardingUserAlreadyHasPassword;
}(OnboardingError);

exports.OnboardingError = OnboardingError;
exports.OnboardingUserAlreadyHasPassword = OnboardingUserAlreadyHasPassword;
