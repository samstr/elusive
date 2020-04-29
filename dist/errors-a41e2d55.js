'use strict';

var wrapNativeSuper = require('./wrapNativeSuper-b3646a2a.js');

function _createSuper(Derived) { return function () { var Super = wrapNativeSuper._getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = wrapNativeSuper._getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return wrapNativeSuper._possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var BaseError = /*#__PURE__*/function (_Error) {
  wrapNativeSuper._inherits(BaseError, _Error);

  var _super = _createSuper(BaseError);

  function BaseError() {
    wrapNativeSuper._classCallCheck(this, BaseError);

    return _super.apply(this, arguments);
  }

  return BaseError;
}( /*#__PURE__*/wrapNativeSuper._wrapNativeSuper(Error));

exports.BaseError = BaseError;
