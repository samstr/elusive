'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./classCallCheck-d2bb402f.js');
require('./createClass-013e6a9b.js');
require('./defineProperty-ba7cd53d.js');
require('./ElusiveClient-6f759f99.js');
require('./index.js');
require('./errors-2aa38575.js');
require('./assertThisInitialized-bc0de409.js');
var errors$1 = require('./errors-b2146c31.js');
require('./_commonjsHelpers-19ed5375.js');
require('./asyncToGenerator-c3c48e74.js');
require('bcryptjs');
require('./utils-34fd287d.js');
require('./utils-ac544182.js');
var utils$2 = require('./utils-88ea097e.js');



exports.AlreadyAuthenticatedError = errors$1.AlreadyAuthenticatedError;
exports.AuthError = errors$1.AuthError;
exports.AuthenticationFailedError = errors$1.AuthenticationFailedError;
exports.NotAuthenticatedError = errors$1.NotAuthenticatedError;
exports.TooManyLoginAttemptsError = errors$1.TooManyLoginAttemptsError;
exports.TooManyRegistrationsError = errors$1.TooManyRegistrationsError;
exports.TooManyResetAttemptsError = errors$1.TooManyResetAttemptsError;
exports.UserAlreadyExistsError = errors$1.UserAlreadyExistsError;
exports.comparePasswordHash = utils$2.comparePasswordHash;
exports.hasRole = utils$2.hasRole;
exports.hashPassword = utils$2.hashPassword;
exports.sendLoginEmail = utils$2.sendLoginEmail;
exports.sendResetEmail = utils$2.sendResetEmail;
exports.sendSignupEmail = utils$2.sendSignupEmail;
