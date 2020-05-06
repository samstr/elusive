'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./classCallCheck-d2bb402f.js');
require('./index-26463b7f.js');
var index = require('./index.js');
require('./FormErrors-1539c4dc.js');
require('react');
require('prop-types');
require('react-bootstrap');
var resetPasswordConfirm = require('./reset-password-confirm-4bfceb3a.js');
require('sanitize-html');

var login = (function () {
  var authOptions = index.options.auth;
  return resetPasswordConfirm.createForm({
    fields: {
      email: resetPasswordConfirm.emailField('email', {
        required: {
          value: true,
          errorMessage: 'Please enter your email'
        },
        invalid: {
          errorMessage: 'Your email is invalid'
        }
      }),
      password: resetPasswordConfirm.textField('password', {
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

exports.FieldValueTooLongError = resetPasswordConfirm.FieldValueTooLongError;
exports.FieldValueTooShortError = resetPasswordConfirm.FieldValueTooShortError;
exports.FormError = resetPasswordConfirm.FormError;
exports.InvalidFieldValueError = resetPasswordConfirm.InvalidFieldValueError;
exports.MissingRequiredFieldError = resetPasswordConfirm.MissingRequiredFieldError;
exports.UnknownFormError = resetPasswordConfirm.UnknownFormError;
exports.booleanField = resetPasswordConfirm.booleanField;
exports.clearFormFieldErrors = resetPasswordConfirm.clearFormFieldErrors;
exports.createForm = resetPasswordConfirm.createForm;
exports.emailField = resetPasswordConfirm.emailField;
exports.field = resetPasswordConfirm.field;
exports.getOnChangeValue = resetPasswordConfirm.getOnChangeValue;
exports.registerForm = resetPasswordConfirm.registerForm;
exports.resetPasswordConfirmForm = resetPasswordConfirm.resetPasswordConfirmForm;
exports.resetPasswordRequestForm = resetPasswordConfirm.resetPasswordRequestForm;
exports.textField = resetPasswordConfirm.textField;
exports.loginForm = login;
