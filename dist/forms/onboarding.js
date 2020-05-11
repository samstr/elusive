'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../classCallCheck-d2bb402f.js');
require('../index-53403115.js');
var index = require('../index.js');
require('../FormErrors-1539c4dc.js');
require('react');
require('prop-types');
require('react-bootstrap');
var utils = require('../utils-9aa5c5d6.js');
require('sanitize-html');

var setPassword = (function () {
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

exports.setPasswordForm = setPassword;
