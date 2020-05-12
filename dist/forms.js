'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./classCallCheck-d2bb402f.js');
require('./index-53403115.js');
var index = require('./index.js');
require('./FormErrors-1539c4dc.js');
require('react');
require('prop-types');
require('react-bootstrap');
var reset = require('./reset-e12034ed.js');
require('sanitize-html');

var onboarding = (function () {
  var authOptions = index.options.auth;
  return reset.createForm({
    fields: {
      password: reset.textField('password', {
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

exports.FieldValueTooLongError = reset.FieldValueTooLongError;
exports.FieldValueTooShortError = reset.FieldValueTooShortError;
exports.FormError = reset.FormError;
exports.InvalidFieldValueError = reset.InvalidFieldValueError;
exports.MissingRequiredFieldError = reset.MissingRequiredFieldError;
exports.UnknownFormError = reset.UnknownFormError;
exports.booleanField = reset.booleanField;
exports.clearFormFieldErrors = reset.clearFormFieldErrors;
exports.createForm = reset.createForm;
exports.emailField = reset.emailField;
exports.field = reset.field;
exports.getOnChangeValue = reset.getOnChangeValue;
exports.loginForm = reset.loginForm;
exports.registerForm = reset.registerForm;
exports.resetForm = reset.resetForm;
exports.textField = reset.textField;
exports.onboardingForm = onboarding;
