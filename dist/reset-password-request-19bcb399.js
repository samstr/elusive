'use strict';

var index = require('./index.js');
var utils = require('./utils-77793fc7.js');

var loginForm = (function () {
  var authOptions = index.options.auth;
  return utils.createForm({
    fields: {
      email: utils.emailField('email', {
        required: {
          value: true,
          errorMessage: 'Please enter your email'
        },
        invalid: {
          errorMessage: 'Your email is invalid'
        }
      }),
      password: utils.textField('password', {
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

var registerForm = (function () {
  return utils.createForm({
    fields: {
      email: utils.emailField('email', {
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

var resetPasswordConfirmForm = (function () {
  var authOptions = index.options.auth;
  return utils.createForm({
    fields: {
      passwordResetID: utils.textField('passwordResetID', {
        required: {
          value: true,
          errorMessage: 'Missing password reset key'
        }
      }),
      password: utils.textField('password', {
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

var resetPasswordRequestForm = (function () {
  return utils.createForm({
    fields: {
      email: utils.emailField('email', {
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

exports.loginForm = loginForm;
exports.registerForm = registerForm;
exports.resetPasswordConfirmForm = resetPasswordConfirmForm;
exports.resetPasswordRequestForm = resetPasswordRequestForm;
