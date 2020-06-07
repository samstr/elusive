'use strict';

var index$1 = require('./index.js');
var signupForm = require('./signupForm-ee459d84.js');

var onboardingForm = (function () {
  var authOptions = index$1.options.auth;
  return signupForm.createForm({
    fields: {
      password: signupForm.textField('password', {
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
