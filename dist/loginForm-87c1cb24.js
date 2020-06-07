'use strict';

var index$1 = require('./index.js');
var utils$2 = require('./utils-c37e1803.js');

var loginForm = (function () {
  var authOptions = index$1.options.auth;
  return utils$2.createForm({
    fields: {
      email: utils$2.emailField('email', {
        required: {
          value: true,
          errorMessage: 'Please enter your email address.'
        },
        invalid: {
          errorMessage: 'Your email address is invalid.'
        }
      }),
      password: utils$2.textField('password', {
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

exports.loginForm = loginForm;
