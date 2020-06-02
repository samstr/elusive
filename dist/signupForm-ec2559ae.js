'use strict';

var classCallCheck = require('./classCallCheck-d2bb402f.js');
var index = require('./index.js');
var errors = require('./errors-2aa38575.js');
var utils = require('./utils-8eb11d51.js');
var utils$2 = require('./utils-a00ce781.js');

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = errors._getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = errors._getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return errors._possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var FormError = /*#__PURE__*/function (_BaseError) {
  errors._inherits(FormError, _BaseError);

  var _super = _createSuper(FormError);

  function FormError(message, fields) {
    var _this;

    classCallCheck._classCallCheck(this, FormError);

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
  errors._inherits(UnknownFormError, _FormError);

  var _super2 = _createSuper(UnknownFormError);

  function UnknownFormError() {
    classCallCheck._classCallCheck(this, UnknownFormError);

    return _super2.apply(this, arguments);
  }

  return UnknownFormError;
}(FormError);
var InvalidFieldValueError = /*#__PURE__*/function (_FormError2) {
  errors._inherits(InvalidFieldValueError, _FormError2);

  var _super3 = _createSuper(InvalidFieldValueError);

  function InvalidFieldValueError() {
    classCallCheck._classCallCheck(this, InvalidFieldValueError);

    return _super3.apply(this, arguments);
  }

  return InvalidFieldValueError;
}(FormError);
var FieldValueTooShortError = /*#__PURE__*/function (_FormError3) {
  errors._inherits(FieldValueTooShortError, _FormError3);

  var _super4 = _createSuper(FieldValueTooShortError);

  function FieldValueTooShortError() {
    classCallCheck._classCallCheck(this, FieldValueTooShortError);

    return _super4.apply(this, arguments);
  }

  return FieldValueTooShortError;
}(FormError);
var FieldValueTooLongError = /*#__PURE__*/function (_FormError4) {
  errors._inherits(FieldValueTooLongError, _FormError4);

  var _super5 = _createSuper(FieldValueTooLongError);

  function FieldValueTooLongError() {
    classCallCheck._classCallCheck(this, FieldValueTooLongError);

    return _super5.apply(this, arguments);
  }

  return FieldValueTooLongError;
}(FormError);
var MissingRequiredFieldError = /*#__PURE__*/function (_FormError5) {
  errors._inherits(MissingRequiredFieldError, _FormError5);

  var _super6 = _createSuper(MissingRequiredFieldError);

  function MissingRequiredFieldError() {
    classCallCheck._classCallCheck(this, MissingRequiredFieldError);

    return _super6.apply(this, arguments);
  }

  return MissingRequiredFieldError;
}(FormError);

function _readOnlyError(name) {
  throw new Error("\"" + name + "\" is read-only");
}

var createForm = function createForm(_ref) {
  var fields = _ref.fields,
      _validate = _ref.validate;
  var sentry = index.services.sentry;
  return {
    fields: fields,
    validate: function validate(values, fieldsToValidate) {
      var cleanValues = {};
      var errors = []; // use all fields if none provided

      if (!fieldsToValidate) {
        fieldsToValidate = Object.keys(fields);
      } // validate each field


      fieldsToValidate.forEach(function (field) {
        var value = values[field];

        try {
          cleanValues[field] = fields[field].validate(value);
        } catch (err) {
          if (err instanceof FormError) {
            errors.push(err);
          } else {
            console.log(err);

            if (sentry) {
              sentry.captureException(err);
            }

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
            console.log(err);

            if (sentry) {
              sentry.captureException(err);
            }

            errors = [new UnknownFormError('An unknown form error occured.')];
          }
        }
      }

      if (errors.length) {
        return utils.errorJson(errors);
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
      var _options$required;

      var cleanValue;

      if (value) {
        cleanValue = value.trim();
      }

      if ((options === null || options === void 0 ? void 0 : (_options$required = options.required) === null || _options$required === void 0 ? void 0 : _options$required.value) && !cleanValue) {
        throw new MissingRequiredFieldError(options.required.errorMessage, [name]);
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
    var _options$minLength, _options$minLength2, _options$maxLength, _options$maxLength2, _options$invalid, _options$invalid2, _options$invalid2$val;

    var cleanValue = value;

    if ((options === null || options === void 0 ? void 0 : (_options$minLength = options.minLength) === null || _options$minLength === void 0 ? void 0 : _options$minLength.value) && cleanValue.length < (options === null || options === void 0 ? void 0 : (_options$minLength2 = options.minLength) === null || _options$minLength2 === void 0 ? void 0 : _options$minLength2.value)) {
      throw new FieldValueTooShortError(options.minLength.errorMessage, [name]);
    }

    if ((options === null || options === void 0 ? void 0 : (_options$maxLength = options.maxLength) === null || _options$maxLength === void 0 ? void 0 : _options$maxLength.value) && cleanValue.length > (options === null || options === void 0 ? void 0 : (_options$maxLength2 = options.maxLength) === null || _options$maxLength2 === void 0 ? void 0 : _options$maxLength2.value)) {
      throw new FieldValueTooLongError(options.maxLength.errorMessage, [name]);
    }

    if ((options === null || options === void 0 ? void 0 : (_options$invalid = options.invalid) === null || _options$invalid === void 0 ? void 0 : _options$invalid.value) && !(options === null || options === void 0 ? void 0 : (_options$invalid2 = options.invalid) === null || _options$invalid2 === void 0 ? void 0 : (_options$invalid2$val = _options$invalid2.value) === null || _options$invalid2$val === void 0 ? void 0 : _options$invalid2$val.test(cleanValue))) {
      throw new InvalidFieldValueError(options.invalid.errorMessage, [name]);
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
      var _options$required2;

      var cleanValue = value;

      if ((options === null || options === void 0 ? void 0 : (_options$required2 = options.required) === null || _options$required2 === void 0 ? void 0 : _options$required2.value) && !cleanValue) {
        throw new MissingRequiredFieldError(options.required.errorMessage, [name]);
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

var loginWithLinkForm = (function () {
  return createForm({
    fields: {
      email: emailField('email', {
        required: {
          value: true,
          errorMessage: 'Please enter your email'
        },
        invalid: {
          errorMessage: 'Your email is invalid'
        }
      }),
      type: textField('type', {
        required: {
          value: true,
          errorMessage: 'Type field is missing.'
        }
      }, function (type) {
        if (!utils$2.LOGIN_TYPES.includes(type)) {
          throw new InvalidFieldValueError('Type field is invalid.', ['type']);
        }

        return type;
      }),
      next: textField('next')
    }
  });
});

var loginWithPasswordForm = (function () {
  var authOptions = index.options.auth;
  return createForm({
    fields: {
      email: emailField('email', {
        required: {
          value: true,
          errorMessage: 'Please enter your email.'
        },
        invalid: {
          errorMessage: 'Your email is invalid.'
        }
      }),
      password: textField('password', {
        required: {
          value: true,
          errorMessage: 'Please enter your password.'
        },
        minLength: {
          value: authOptions.passwordMinLength,
          errorMessage: 'Your password is too short.'
        }
      }),
      type: textField('type', {
        required: {
          value: true,
          errorMessage: 'Type field is missing.'
        }
      }, function (type) {
        if (!utils$2.LOGIN_TYPES.includes(type)) {
          throw new InvalidFieldValueError('Type field is invalid.', ['type']);
        }

        return type;
      })
    }
  });
});

var onboardingForm = (function () {
  var authOptions = index.options.auth;
  return createForm({
    fields: {
      password: textField('password', {
        required: {
          value: true,
          errorMessage: 'Please enter your password'
        },
        minLength: {
          value: authOptions.passwordMinLength,
          errorMessage: 'Your password is too short'
        }
      })
    }
  });
});

var resetForm = (function () {
  return createForm({
    fields: {
      email: emailField('email', {
        required: {
          value: true,
          errorMessage: 'Your email is required'
        },
        invalid: {
          errorMessage: 'Your email address is invalid'
        }
      })
    }
  });
});

var signupForm = (function () {
  return createForm({
    fields: {
      email: emailField('email', {
        required: {
          value: true,
          errorMessage: 'Your email is required'
        },
        invalid: {
          errorMessage: 'Your email address is invalid'
        }
      })
    }
  });
});

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
exports.loginWithLinkForm = loginWithLinkForm;
exports.loginWithPasswordForm = loginWithPasswordForm;
exports.onboardingForm = onboardingForm;
exports.resetForm = resetForm;
exports.signupForm = signupForm;
exports.textField = textField;
