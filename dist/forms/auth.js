'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../classCallCheck-d2bb402f.js');
require('../index-15dd3ed4.js');
var index = require('../index.js');
require('../FormErrors-1539c4dc.js');
require('react');
require('prop-types');
require('react-bootstrap');
var utils = require('../utils-69cbd2b3.js');
require('sanitize-html');
var signup = require('../signup-6e2a8ff3.js');

var loginWithLink = (function () {
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
      })
    }
  });
});

var onboarding = (function () {
  var authOptions = index.options.auth;
  return utils.createForm({
    fields: {
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

exports.loginWithPasswordForm = signup.loginWithPasswordForm;
exports.resetForm = signup.resetForm;
exports.signupForm = signup.signupForm;
exports.loginWithLinkForm = loginWithLink;
exports.onboardingForm = onboarding;
