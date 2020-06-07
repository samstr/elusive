'use strict';

var index$1 = require('./index.js');
var signupForm = require('./signupForm-1231bb04.js');

var loginForm = (function () {
  var authOptions = index$1.options.auth;
  return signupForm.createForm({
    fields: {
      email: signupForm.emailField('email', {
        required: {
          value: true,
          errorMessage: 'Please enter your email address.'
        },
        invalid: {
          errorMessage: 'Your email address is invalid.'
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

exports.loginForm = loginForm;
