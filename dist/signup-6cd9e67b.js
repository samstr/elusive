'use strict';

var index = require('./index.js');
require('./FormErrors-1539c4dc.js');
var utils = require('./utils-a6a1ae57.js');
var utils$1 = require('./utils-fca7fe09.js');

var loginWithLinkForm = (function () {
  return utils$1.createForm({
    fields: {
      email: utils$1.emailField('email', {
        required: {
          value: true,
          errorMessage: 'Please enter your email'
        },
        invalid: {
          errorMessage: 'Your email is invalid'
        }
      }),
      type: utils$1.textField('type', {
        required: {
          value: true,
          errorMessage: 'Type field is missing.'
        }
      }, function (type) {
        if (!utils.LOGIN_TYPES.includes(type)) {
          throw new utils$1.InvalidFieldValueError('Type field is invalid.', ['type']);
        }

        return type;
      }),
      next: utils$1.textField('next')
    }
  });
});

var loginWithPasswordForm = (function () {
  var authOptions = index.options.auth;
  return utils$1.createForm({
    fields: {
      email: utils$1.emailField('email', {
        required: {
          value: true,
          errorMessage: 'Please enter your email.'
        },
        invalid: {
          errorMessage: 'Your email is invalid.'
        }
      }),
      password: utils$1.textField('password', {
        required: {
          value: true,
          errorMessage: 'Please enter your password.'
        },
        minLength: {
          value: authOptions.passwordMinLength,
          errorMessage: 'Your password is too short.'
        }
      }),
      type: utils$1.textField('type', {
        required: {
          value: true,
          errorMessage: 'Type field is missing.'
        }
      }, function (type) {
        if (!utils.LOGIN_TYPES.includes(type)) {
          throw new utils$1.InvalidFieldValueError('Type field is invalid.', ['type']);
        }

        return type;
      })
    }
  });
});

var resetForm = (function () {
  return utils$1.createForm({
    fields: {
      email: utils$1.emailField('email', {
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
  return utils$1.createForm({
    fields: {
      email: utils$1.emailField('email', {
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
