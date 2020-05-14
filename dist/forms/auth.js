'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../classCallCheck-d2bb402f.js');
require('../index-c5fa8643.js');
var index = require('../index.js');
require('../FormErrors-1539c4dc.js');
require('react');
require('prop-types');
require('react-bootstrap');
require('bcryptjs');
require('../utils-a6a1ae57.js');
var utils$1 = require('../utils-c88c9c04.js');
require('sanitize-html');
var signup = require('../signup-375a2069.js');

var onboarding = (function () {
  var authOptions = index.options.auth;
  return utils$1.createForm({
    fields: {
      password: utils$1.textField('password', {
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

exports.loginWithLinkForm = signup.loginWithLinkForm;
exports.loginWithPasswordForm = signup.loginWithPasswordForm;
exports.resetForm = signup.resetForm;
exports.signupForm = signup.signupForm;
exports.onboardingForm = onboarding;
