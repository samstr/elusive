'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../classCallCheck-d2bb402f.js');
require('../index-d4a1d5bf.js');
var index = require('../index.js');
require('../FormErrors-1539c4dc.js');
require('react');
require('prop-types');
require('react-bootstrap');
var utils = require('../utils-7117daaa.js');
require('sanitize-html');
var signup = require('../signup-6fe2610a.js');

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

exports.loginForm = signup.loginForm;
exports.resetForm = signup.resetForm;
exports.signupForm = signup.signupForm;
exports.onboardingForm = onboarding;
