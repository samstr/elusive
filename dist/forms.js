'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./classCallCheck-d2bb402f.js');
require('./index-61c82eb7.js');
var index = require('./index.js');
require('./FormErrors-1539c4dc.js');
require('react');
require('prop-types');
require('react-bootstrap');
var register = require('./register-fa52ffb5.js');
require('sanitize-html');

var login = (function () {
  var authOptions = index.options.auth;
  return register.createForm({
    fields: {
      email: register.emailField('email', {
        required: {
          value: true,
          errorMessage: 'Please enter your email'
        },
        invalid: {
          errorMessage: 'Your email is invalid'
        }
      }),
      password: register.textField('password', {
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

var resetPasswordRequest = (function () {
  return register.createForm({
    fields: {
      email: register.emailField('email', {
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

var resetPasswordConfirm = (function () {
  var authOptions = index.options.auth;
  return register.createForm({
    fields: {
      passwordResetId: register.textField('passwordResetId', {
        required: {
          value: true,
          errorMessage: 'Missing password reset key'
        }
      }),
      password: register.textField('password', {
        required: {
          value: true,
          errorMessage: 'Your password is required'
        },
        minLength: {
          value: authOptions.passwordMinLength,
          errorMessage: 'Your password is too short'
        }
      })
    }
  });
});

exports.FieldValueTooLongError = register.FieldValueTooLongError;
exports.FieldValueTooShortError = register.FieldValueTooShortError;
exports.FormError = register.FormError;
exports.InvalidFieldValueError = register.InvalidFieldValueError;
exports.MissingRequiredFieldError = register.MissingRequiredFieldError;
exports.UnknownFormError = register.UnknownFormError;
exports.booleanField = register.booleanField;
exports.clearFormFieldErrors = register.clearFormFieldErrors;
exports.createForm = register.createForm;
exports.emailField = register.emailField;
exports.field = register.field;
exports.getOnChangeValue = register.getOnChangeValue;
exports.registerForm = register.registerForm;
exports.textField = register.textField;
exports.loginForm = login;
exports.resetPasswordConfirmForm = resetPasswordConfirm;
exports.resetPasswordRequestForm = resetPasswordRequest;
