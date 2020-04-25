'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('prop-types');
require('react');
require('react-bootstrap');
var errors = require('./index-72262e3e.js');
var sanitizeHtml = _interopDefault(require('sanitize-html'));

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

function _readOnlyError(name) {
  throw new Error("\"" + name + "\" is read-only");
}

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var createForm = function createForm(_ref) {
  var fields = _ref.fields,
      _validate = _ref.validate;
  return {
    fields: fields,
    validate: function validate(values) {
      var cleanValues = {};
      var errors$1 = []; // validate each field

      Object.keys(fields).forEach(function (field) {
        var value = values[field];

        try {
          cleanValues[field] = fields[field].validate(value);
        } catch (err) {
          if (err instanceof FormError) {
            errors$1.push(err);
          } else {
            // TODO Sentry?
            console.log(err);
            errors$1 = [new UnknownFormError({
              message: 'Unknown error'
            })];
          }
        }
      });

      if (!errors$1.length && typeof _validate === 'function') {
        try {
          // additional validation
          _validate(cleanValues);
        } catch (err) {
          if (err instanceof FormError) {
            errors$1.push(err);
          } else {
            // TODO Sentry?
            console.log(err);
            errors$1 = [new UnknownFormError({
              message: 'Unknown error'
            })];
          }
        }
      }

      if (errors$1.length) {
        return errors.createErrorResponseArray(errors$1);
      }

      return {
        valid: true,
        cleanValues: cleanValues
      };
    }
  };
};
var field = function field(name, options, _validate2) {
  return {
    validate: function validate(value) {
      var cleanValue;

      if (value) {
        cleanValue = value.trim();
      }

      if (options.required && options.required.value) {
        if (options.required.value && !cleanValue) {
          throw new MissingRequiredFieldError({
            message: options.required.errorMessage,
            fields: [name]
          });
        }
      }

      if (typeof _validate2 === 'function') {
        cleanValue = _validate2(cleanValue);
      }

      return cleanValue || null;
    }
  };
};
var textField = function textField(name, options, validate) {
  return field(name, options, function (value) {
    var cleanValue;

    if (value) {
      cleanValue = sanitizeHtml(value, {
        allowedTags: [],
        allowedAttributes: {}
      });
    }

    if (options.minLength && options.minLength.value) {
      if (cleanValue.length < options.minLength.value) {
        throw new FieldValueTooShortError({
          message: options.minLength.errorMessage,
          fields: [name]
        });
      }
    }

    if (options.maxLength && options.maxLength.value) {
      if (cleanValue.length > options.maxLength.value) {
        throw new FieldValueTooLongError({
          message: options.maxLength.errorMessage,
          fields: [name]
        });
      }
    }

    if (options.invalid && options.invalid.value) {
      if (!options.invalid.value.test(cleanValue)) {
        throw new InvalidFieldValueError({
          message: options.invalid.errorMessage,
          fields: [name]
        });
      }
    }

    if (typeof validate === 'function') {
      cleanValue = validate(cleanValue);
    }

    return cleanValue || null;
  });
};
var emailField = function emailField(name, options) {
  return textField(name, options, function (value) {
    var regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i; // eslint-disable-line no-control-regex

    var cleanValue;

    if (value) {
      cleanValue = value.toLowerCase();
    } else {
      cleanValue = null;
    }

    if (!regex.test(cleanValue)) {
      throw new InvalidFieldValueError({
        message: options.invalid.errorMessage,
        fields: [name]
      });
    }

    return cleanValue;
  });
};
var booleanField = function booleanField(name, options, _validate3) {
  return {
    validate: function validate(value) {
      var cleanValue = value;

      if (options.required && options.required.value) {
        if (options.required.value && !cleanValue) {
          throw new MissingRequiredFieldError({
            message: options.required.errorMessage,
            fields: [name]
          });
        }
      }

      if (typeof _validate3 === 'function') {
        cleanValue = (_readOnlyError("cleanValue"), _validate3(cleanValue));
      }

      return cleanValue || null;
    }
  };
};
var clearFormFieldErrors = function clearFormFieldErrors(formErrors, field) {
  if (!formErrors) return null;
  return formErrors.filter(function (e) {
    return e.fields && !e.fields.includes(field);
  });
};
var getOnChangeValue = function getOnChangeValue(event) {
  var _event$target = event.target,
      name = _event$target.name,
      type = _event$target.type,
      value = _event$target.value,
      checked = _event$target.checked;
  var _value = value;

  if (type === 'checkbox') {
    _value = checked;
  }

  return {
    field: name,
    value: _value
  };
};
var FormError = /*#__PURE__*/function (_BaseError) {
  _inherits(FormError, _BaseError);

  var _super = _createSuper(FormError);

  function FormError() {
    errors._classCallCheck(this, FormError);

    return _super.apply(this, arguments);
  }

  return FormError;
}(errors.BaseError);
var UnknownFormError = /*#__PURE__*/function (_FormError) {
  _inherits(UnknownFormError, _FormError);

  var _super2 = _createSuper(UnknownFormError);

  function UnknownFormError(props) {
    var _this;

    errors._classCallCheck(this, UnknownFormError);

    _this = _super2.call(this, props);
    _this.name = 'UnknownFormError';
    return _this;
  }

  return UnknownFormError;
}(FormError);
var InvalidFieldValueError = /*#__PURE__*/function (_FormError2) {
  _inherits(InvalidFieldValueError, _FormError2);

  var _super3 = _createSuper(InvalidFieldValueError);

  function InvalidFieldValueError(props) {
    var _this2;

    errors._classCallCheck(this, InvalidFieldValueError);

    _this2 = _super3.call(this, props);
    _this2.name = 'InvalidFieldValueError';
    return _this2;
  }

  return InvalidFieldValueError;
}(FormError);
var FieldValueTooShortError = /*#__PURE__*/function (_FormError3) {
  _inherits(FieldValueTooShortError, _FormError3);

  var _super4 = _createSuper(FieldValueTooShortError);

  function FieldValueTooShortError(props) {
    var _this3;

    errors._classCallCheck(this, FieldValueTooShortError);

    _this3 = _super4.call(this, props);
    _this3.name = 'FieldValueTooShortError';
    return _this3;
  }

  return FieldValueTooShortError;
}(FormError);
var FieldValueTooLongError = /*#__PURE__*/function (_FormError4) {
  _inherits(FieldValueTooLongError, _FormError4);

  var _super5 = _createSuper(FieldValueTooLongError);

  function FieldValueTooLongError(props) {
    var _this4;

    errors._classCallCheck(this, FieldValueTooLongError);

    _this4 = _super5.call(this, props);
    _this4.name = 'FieldValueTooLongError';
    return _this4;
  }

  return FieldValueTooLongError;
}(FormError);
var MissingRequiredFieldError = /*#__PURE__*/function (_FormError5) {
  _inherits(MissingRequiredFieldError, _FormError5);

  var _super6 = _createSuper(MissingRequiredFieldError);

  function MissingRequiredFieldError(props) {
    var _this5;

    errors._classCallCheck(this, MissingRequiredFieldError);

    _this5 = _super6.call(this, props);
    _this5.name = 'MissingRequiredFieldError';
    return _this5;
  }

  return MissingRequiredFieldError;
}(FormError);

exports.FieldValueTooLongError = FieldValueTooLongError;
exports.FieldValueTooShortError = FieldValueTooShortError;
exports.FormError = FormError;
exports.InvalidFieldValueError = InvalidFieldValueError;
exports.MissingRequiredFieldError = MissingRequiredFieldError;
exports.UnknownFormError = UnknownFormError;
exports.booleanField = booleanField;
exports.clearFormFieldErrors = clearFormFieldErrors;
exports.createForm = createForm;
exports.emailField = emailField;
exports.field = field;
exports.getOnChangeValue = getOnChangeValue;
exports.textField = textField;
