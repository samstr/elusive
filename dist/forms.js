'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var classCallCheck = require('./classCallCheck-d2bb402f.js');
var getPrototypeOf = require('./getPrototypeOf-b5b03665.js');
require('prop-types');
require('react');
require('react-bootstrap');
var errors = require('./errors-df969561.js');
var FormErrors = require('./FormErrors-22a51af8.js');
var sanitizeHtml = _interopDefault(require('sanitize-html'));

function _createSuper(Derived) { return function () { var Super = getPrototypeOf._getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = getPrototypeOf._getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return getPrototypeOf._possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var FormError = /*#__PURE__*/function (_BaseError) {
  getPrototypeOf._inherits(FormError, _BaseError);

  var _super = _createSuper(FormError);

  function FormError() {
    classCallCheck._classCallCheck(this, FormError);

    return _super.apply(this, arguments);
  }

  return FormError;
}(errors.BaseError);
var UnknownFormError = /*#__PURE__*/function (_FormError) {
  getPrototypeOf._inherits(UnknownFormError, _FormError);

  var _super2 = _createSuper(UnknownFormError);

  function UnknownFormError(props) {
    var _this;

    classCallCheck._classCallCheck(this, UnknownFormError);

    _this = _super2.call(this, props);
    _this.name = 'UnknownFormError';
    return _this;
  }

  return UnknownFormError;
}(FormError);
var InvalidFieldValueError = /*#__PURE__*/function (_FormError2) {
  getPrototypeOf._inherits(InvalidFieldValueError, _FormError2);

  var _super3 = _createSuper(InvalidFieldValueError);

  function InvalidFieldValueError(props) {
    var _this2;

    classCallCheck._classCallCheck(this, InvalidFieldValueError);

    _this2 = _super3.call(this, props);
    _this2.name = 'InvalidFieldValueError';
    return _this2;
  }

  return InvalidFieldValueError;
}(FormError);
var FieldValueTooShortError = /*#__PURE__*/function (_FormError3) {
  getPrototypeOf._inherits(FieldValueTooShortError, _FormError3);

  var _super4 = _createSuper(FieldValueTooShortError);

  function FieldValueTooShortError(props) {
    var _this3;

    classCallCheck._classCallCheck(this, FieldValueTooShortError);

    _this3 = _super4.call(this, props);
    _this3.name = 'FieldValueTooShortError';
    return _this3;
  }

  return FieldValueTooShortError;
}(FormError);
var FieldValueTooLongError = /*#__PURE__*/function (_FormError4) {
  getPrototypeOf._inherits(FieldValueTooLongError, _FormError4);

  var _super5 = _createSuper(FieldValueTooLongError);

  function FieldValueTooLongError(props) {
    var _this4;

    classCallCheck._classCallCheck(this, FieldValueTooLongError);

    _this4 = _super5.call(this, props);
    _this4.name = 'FieldValueTooLongError';
    return _this4;
  }

  return FieldValueTooLongError;
}(FormError);
var MissingRequiredFieldError = /*#__PURE__*/function (_FormError5) {
  getPrototypeOf._inherits(MissingRequiredFieldError, _FormError5);

  var _super6 = _createSuper(MissingRequiredFieldError);

  function MissingRequiredFieldError(props) {
    var _this5;

    classCallCheck._classCallCheck(this, MissingRequiredFieldError);

    _this5 = _super6.call(this, props);
    _this5.name = 'MissingRequiredFieldError';
    return _this5;
  }

  return MissingRequiredFieldError;
}(FormError);

function _readOnlyError(name) {
  throw new Error("\"" + name + "\" is read-only");
}

var createForm = function createForm(_ref) {
  var fields = _ref.fields,
      _validate = _ref.validate;
  return {
    fields: fields,
    validate: function validate(values) {
      var cleanValues = {};
      var errors = []; // validate each field

      Object.keys(fields).forEach(function (field) {
        var value = values[field];

        try {
          cleanValues[field] = fields[field].validate(value);
        } catch (err) {
          if (err instanceof FormError) {
            errors.push(err);
          } else {
            // TODO Sentry?
            console.log(err);
            errors = [new UnknownFormError({
              message: 'Unknown error'
            })];
          }
        }
      });

      if (!errors.length && typeof _validate === 'function') {
        try {
          // additional validation
          _validate(cleanValues);
        } catch (err) {
          if (err instanceof FormError) {
            errors.push(err);
          } else {
            // TODO Sentry?
            console.log(err);
            errors = [new UnknownFormError({
              message: 'Unknown error'
            })];
          }
        }
      }

      if (errors.length) {
        return FormErrors.createErrorResponseArray(errors);
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
