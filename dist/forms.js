'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var wrapNativeSuper = require('./wrapNativeSuper-b3646a2a.js');
var readOnlyError = require('./readOnlyError-08c63dc8.js');
var errors = require('./errors-a41e2d55.js');
require('react');
require('prop-types');
require('react-bootstrap');
var FormErrors = require('./FormErrors-8aabc0ca.js');
var sanitizeHtml = _interopDefault(require('sanitize-html'));

function _createSuper(Derived) { return function () { var Super = wrapNativeSuper._getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = wrapNativeSuper._getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return wrapNativeSuper._possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var FormError = /*#__PURE__*/function (_BaseError) {
  wrapNativeSuper._inherits(FormError, _BaseError);

  var _super = _createSuper(FormError);

  function FormError(message, fields) {
    var _this;

    wrapNativeSuper._classCallCheck(this, FormError);

    _this = _super.call(this, message);
    _this.fields = [];

    if (fields) {
      _this.fields = fields;
    }

    return _this;
  }

  return FormError;
}(errors.BaseError);
var UnknownFormError = /*#__PURE__*/function (_FormError) {
  wrapNativeSuper._inherits(UnknownFormError, _FormError);

  var _super2 = _createSuper(UnknownFormError);

  function UnknownFormError() {
    wrapNativeSuper._classCallCheck(this, UnknownFormError);

    return _super2.apply(this, arguments);
  }

  return UnknownFormError;
}(FormError);
var InvalidFieldValueError = /*#__PURE__*/function (_FormError2) {
  wrapNativeSuper._inherits(InvalidFieldValueError, _FormError2);

  var _super3 = _createSuper(InvalidFieldValueError);

  function InvalidFieldValueError() {
    wrapNativeSuper._classCallCheck(this, InvalidFieldValueError);

    return _super3.apply(this, arguments);
  }

  return InvalidFieldValueError;
}(FormError);
var FieldValueTooShortError = /*#__PURE__*/function (_FormError3) {
  wrapNativeSuper._inherits(FieldValueTooShortError, _FormError3);

  var _super4 = _createSuper(FieldValueTooShortError);

  function FieldValueTooShortError() {
    wrapNativeSuper._classCallCheck(this, FieldValueTooShortError);

    return _super4.apply(this, arguments);
  }

  return FieldValueTooShortError;
}(FormError);
var FieldValueTooLongError = /*#__PURE__*/function (_FormError4) {
  wrapNativeSuper._inherits(FieldValueTooLongError, _FormError4);

  var _super5 = _createSuper(FieldValueTooLongError);

  function FieldValueTooLongError() {
    wrapNativeSuper._classCallCheck(this, FieldValueTooLongError);

    return _super5.apply(this, arguments);
  }

  return FieldValueTooLongError;
}(FormError);
var MissingRequiredFieldError = /*#__PURE__*/function (_FormError5) {
  wrapNativeSuper._inherits(MissingRequiredFieldError, _FormError5);

  var _super6 = _createSuper(MissingRequiredFieldError);

  function MissingRequiredFieldError() {
    wrapNativeSuper._classCallCheck(this, MissingRequiredFieldError);

    return _super6.apply(this, arguments);
  }

  return MissingRequiredFieldError;
}(FormError);

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
            errors = [new UnknownFormError('An unknown form error occured.')];
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
            errors = [new UnknownFormError('An unknown form error occured.')];
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
          throw new MissingRequiredFieldError(options.required.errorMessage, [name]);
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
        throw new FieldValueTooShortError(options.minLength.errorMessage, [name]);
      }
    }

    if (options.maxLength && options.maxLength.value) {
      if (cleanValue.length > options.maxLength.value) {
        throw new FieldValueTooLongError(options.maxLength.errorMessage, [name]);
      }
    }

    if (options.invalid && options.invalid.value) {
      if (!options.invalid.value.test(cleanValue)) {
        throw new InvalidFieldValueError(options.invalid.errorMessage, [name]);
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
      throw new InvalidFieldValueError(options.invalid.errorMessage, [name]);
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
          throw new MissingRequiredFieldError(options.required.errorMessage, [name]);
        }
      }

      if (typeof _validate3 === 'function') {
        cleanValue = (readOnlyError._readOnlyError("cleanValue"), _validate3(cleanValue));
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
