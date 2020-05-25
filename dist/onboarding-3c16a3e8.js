'use strict';

var index = require('./index.js');
var signup = require('./signup-5c75c218.js');

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

exports.onboardingForm = onboardingForm;
