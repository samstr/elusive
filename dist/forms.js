'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./classCallCheck-d2bb402f.js');
require('./index-61c82eb7.js');
var index = require('./index.js');
require('./FormErrors-1539c4dc.js');
require('react');
require('prop-types');
require('react-bootstrap');
var resetPasswordRequest = require('./reset-password-request-82ea0636.js');
require('sanitize-html');

var resetPasswordConfirm = (function () {
  var authOptions = index.options.auth;
  return resetPasswordRequest.createForm({
    fields: {
      passwordResetId: resetPasswordRequest.textField('passwordResetId', {
        required: {
          value: true,
          errorMessage: 'Missing password reset key'
        }
      }),
      password: resetPasswordRequest.textField('password', {
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

exports.FieldValueTooLongError = resetPasswordRequest.FieldValueTooLongError;
exports.FieldValueTooShortError = resetPasswordRequest.FieldValueTooShortError;
exports.FormError = resetPasswordRequest.FormError;
exports.InvalidFieldValueError = resetPasswordRequest.InvalidFieldValueError;
exports.MissingRequiredFieldError = resetPasswordRequest.MissingRequiredFieldError;
exports.UnknownFormError = resetPasswordRequest.UnknownFormError;
exports.booleanField = resetPasswordRequest.booleanField;
exports.clearFormFieldErrors = resetPasswordRequest.clearFormFieldErrors;
exports.createForm = resetPasswordRequest.createForm;
exports.emailField = resetPasswordRequest.emailField;
exports.field = resetPasswordRequest.field;
exports.getOnChangeValue = resetPasswordRequest.getOnChangeValue;
exports.loginForm = resetPasswordRequest.loginForm;
exports.registerForm = resetPasswordRequest.registerForm;
exports.resetPasswordRequestForm = resetPasswordRequest.resetPasswordRequestForm;
exports.textField = resetPasswordRequest.textField;
exports.resetPasswordConfirmForm = resetPasswordConfirm;
