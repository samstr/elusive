'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var classCallCheck = require('./classCallCheck-d2bb402f.js');
var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var reactBootstrap = require('react-bootstrap');

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$1()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var BaseError = /*#__PURE__*/function (_Error) {
  _inherits(BaseError, _Error);

  var _super = _createSuper(BaseError);

  function BaseError() {
    classCallCheck._classCallCheck(this, BaseError);

    return _super.apply(this, arguments);
  }

  return BaseError;
}( /*#__PURE__*/_wrapNativeSuper(Error));

var __jsx = React__default.createElement;

var GenericErrors = function GenericErrors(_ref) {
  var errors = _ref.errors;
  return __jsx(reactBootstrap.Alert, {
    variant: "danger"
  }, errors.map(function (error) {
    return __jsx("div", {
      key: error.message
    }, error.message);
  }));
};

GenericErrors.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.shape({
    message: PropTypes.string.isRequired,
    fields: PropTypes.arrayOf(PropTypes.string)
  }))
};

var errorJson = function errorJson(errors) {
  if (Array.isArray(errors)) {
    return {
      errors: errors.map(function (err) {
        var obj = {
          message: err.message
        };

        if (err.fields) {
          obj.fields = err.fields;
        }

        return obj;
      })
    };
  } else {
    return {
      errors: [{
        message: errors.message
      }]
    };
  }
};
var genericErrors = function genericErrors(errors, includingFields) {
  if (!errors || !errors.length) return [];
  return errors.filter(function (err) {
    return !err.fields || err.fields && err.fields.length && includingFields && includingFields.length && err.fields.some(function (field) {
      return includingFields.includes(field);
    });
  });
};
var fieldErrors = function fieldErrors(errors, field) {
  if (!errors || !errors.length) return [];
  return errors.filter(function (err) {
    return err.fields && err.fields.length && err.fields.includes(field);
  });
};

var __jsx$1 = React__default.createElement;

var FormErrors = function FormErrors(_ref) {
  var errors = _ref.errors,
      field = _ref.field,
      includingFields = _ref.includingFields;

  // Errors for a specific form field
  if (field) {
    var _fieldErrors = fieldErrors(errors, field);

    if (!_fieldErrors.length) return null;
    return __jsx$1(reactBootstrap.Form.Control.Feedback, {
      type: "invalid"
    }, _fieldErrors.map(function (error) {
      return __jsx$1("div", {
        key: error.message
      }, error.message);
    }));
  } // Generic errors


  var _genericErrors = genericErrors(errors, includingFields);

  if (!_genericErrors.length) return null;
  return __jsx$1(GenericErrors, {
    errors: _genericErrors
  });
};

FormErrors.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.shape({
    message: PropTypes.string.isRequired,
    fields: PropTypes.arrayOf(PropTypes.string)
  })),
  field: PropTypes.string,
  includingFields: PropTypes.arrayOf(PropTypes.string)
};

exports.BaseError = BaseError;
exports.FormErrors = FormErrors;
exports.GenericErrors = GenericErrors;
exports._getPrototypeOf = _getPrototypeOf;
exports._inherits = _inherits;
exports._possibleConstructorReturn = _possibleConstructorReturn;
exports.errorJson = errorJson;
exports.fieldErrors = fieldErrors;
exports.genericErrors = genericErrors;
