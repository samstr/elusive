'use strict';

var index = require('./index.js');
var signup = require('./signup-d14953e8.js');

var onboardingForm = (function () {
  var authOptions = index.options.auth;
  return signup.createForm({
    fields: {
      password: signup.textField('password', {
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
  return signup.createForm({
    fields: {
      email: signup.emailField('email', {
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

exports.onboardingForm = onboardingForm;
exports.resetForm = resetForm;
