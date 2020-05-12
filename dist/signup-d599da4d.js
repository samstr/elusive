'use strict';

var index = require('./index.js');
var utils = require('./utils-69cbd2b3.js');

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

var resetForm = (function () {
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

var signupForm = (function () {
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
exports.resetForm = resetForm;
exports.signupForm = signupForm;
