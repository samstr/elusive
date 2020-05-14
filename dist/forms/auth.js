'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../classCallCheck-d2bb402f.js');
require('../index-c5fa8643.js');
var index = require('../index.js');
require('../FormErrors-1539c4dc.js');
require('react');
require('prop-types');
require('react-bootstrap');
require('../asyncToGenerator-ae22edb1.js');
require('bcryptjs');
require('../utils-4b2eeb65.js');
require('../utils-3f60041c.js');
require('../utils-8e2326e3.js');
var utils$3 = require('../utils-bc45515c.js');
var signup = require('../signup-fbb2288c.js');

var onboarding = (function () {
  var authOptions = index.options.auth;
  return utils$3.createForm({
    fields: {
      password: utils$3.textField('password', {
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
