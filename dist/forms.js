'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./classCallCheck-d2bb402f.js');
require('./createClass-013e6a9b.js');
require('./defineProperty-ba7cd53d.js');
require('./ElusiveClient-6f759f99.js');
var index = require('./index.js');
require('./errors-2aa38575.js');
require('./assertThisInitialized-bc0de409.js');
require('./utils-8eb11d51.js');
var signupForm = require('./signupForm-92e5f556.js');

var loginForm = (function () {
  var authOptions = index.options.auth;
  return signupForm.createForm({
    fields: {
      email: signupForm.emailField('email', {
        required: {
          value: true,
          errorMessage: 'Please enter your email.'
        },
        invalid: {
          errorMessage: 'Your email is invalid.'
        }
      }),
      password: signupForm.textField('password', {
        required: {
          value: true,
          errorMessage: 'Please enter your password.'
        },
        minLength: {
          value: authOptions.passwordMinLength,
          errorMessage: 'Your password is too short.'
        }
      })
    }
  });
});

exports.FieldValueTooLongError = signupForm.FieldValueTooLongError;
exports.FieldValueTooShortError = signupForm.FieldValueTooShortError;
exports.FormError = signupForm.FormError;
exports.InvalidFieldValueError = signupForm.InvalidFieldValueError;
exports.MissingRequiredFieldError = signupForm.MissingRequiredFieldError;
exports.UnknownFormError = signupForm.UnknownFormError;
exports.booleanField = signupForm.booleanField;
exports.clearFormFieldErrors = signupForm.clearFormFieldErrors;
exports.createForm = signupForm.createForm;
exports.emailField = signupForm.emailField;
exports.field = signupForm.field;
exports.getOnChangeValue = signupForm.getOnChangeValue;
exports.onboardingForm = signupForm.onboardingForm;
exports.resetForm = signupForm.resetForm;
exports.signupForm = signupForm.signupForm;
exports.textField = signupForm.textField;
exports.loginForm = loginForm;
