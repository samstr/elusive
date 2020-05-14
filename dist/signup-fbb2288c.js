'use strict';

var index = require('./index.js');
require('./FormErrors-1539c4dc.js');
var utils$2 = require('./utils-8e2326e3.js');
var utils$3 = require('./utils-bc45515c.js');

var loginWithLinkForm = (function () {
  return utils$3.createForm({
    fields: {
      email: utils$3.emailField('email', {
        required: {
          value: true,
          errorMessage: 'Please enter your email'
        },
        invalid: {
          errorMessage: 'Your email is invalid'
        }
      }),
      type: utils$3.textField('type', {
        required: {
          value: true,
          errorMessage: 'Type field is missing.'
        }
      }, function (type) {
        if (!utils$2.LOGIN_TYPES.includes(type)) {
          throw new utils$3.InvalidFieldValueError('Type field is invalid.', ['type']);
        }

        return type;
      }),
      next: utils$3.textField('next')
    }
  });
});

var loginWithPasswordForm = (function () {
  var authOptions = index.options.auth;
  return utils$3.createForm({
    fields: {
      email: utils$3.emailField('email', {
        required: {
          value: true,
          errorMessage: 'Please enter your email.'
        },
        invalid: {
          errorMessage: 'Your email is invalid.'
        }
      }),
      password: utils$3.textField('password', {
        required: {
          value: true,
          errorMessage: 'Please enter your password.'
        },
        minLength: {
          value: authOptions.passwordMinLength,
          errorMessage: 'Your password is too short.'
        }
      }),
      type: utils$3.textField('type', {
        required: {
          value: true,
          errorMessage: 'Type field is missing.'
        }
      }, function (type) {
        if (!utils$2.LOGIN_TYPES.includes(type)) {
          throw new utils$3.InvalidFieldValueError('Type field is invalid.', ['type']);
        }

        return type;
      })
    }
  });
});

var resetForm = (function () {
  return utils$3.createForm({
    fields: {
      email: utils$3.emailField('email', {
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
  return utils$3.createForm({
    fields: {
      email: utils$3.emailField('email', {
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

exports.loginWithLinkForm = loginWithLinkForm;
exports.loginWithPasswordForm = loginWithPasswordForm;
exports.resetForm = resetForm;
exports.signupForm = signupForm;
