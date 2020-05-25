'use strict';

var index = require('./index.js');
var loginWithPassword = require('./login-with-password-b9acd6c9.js');

var onboardingForm = (function () {
  var authOptions = index.options.auth;
  return loginWithPassword.createForm({
    fields: {
      password: loginWithPassword.textField('password', {
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
  return loginWithPassword.createForm({
    fields: {
      email: loginWithPassword.emailField('email', {
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
  return loginWithPassword.createForm({
    fields: {
      email: loginWithPassword.emailField('email', {
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
exports.signupForm = signupForm;
