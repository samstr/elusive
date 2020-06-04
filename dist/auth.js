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
require('./_commonjsHelpers-a81e97c5.js');
require('./asyncToGenerator-d7664c2f.js');
require('bcryptjs');
require('./utils-001fa7d1.js');
require('./utils-ac544182.js');
var utils$2 = require('./utils-f7e0915c.js');



exports.AlreadyAuthenticatedError = errors$1.AlreadyAuthenticatedError;
exports.AuthError = errors$1.AuthError;
exports.AuthenticationFailedError = errors$1.AuthenticationFailedError;
exports.NotAuthenticatedError = errors$1.NotAuthenticatedError;
exports.TooManyLoginAttemptsError = errors$1.TooManyLoginAttemptsError;
exports.TooManyRegistrationsError = errors$1.TooManyRegistrationsError;
exports.TooManyResetAttemptsError = errors$1.TooManyResetAttemptsError;
exports.UserAlreadyExistsError = errors$1.UserAlreadyExistsError;
exports.LOGIN_TYPES = utils$2.LOGIN_TYPES;
exports.LOGIN_TYPE_LINK = utils$2.LOGIN_TYPE_LINK;
exports.LOGIN_TYPE_PASSWORD = utils$2.LOGIN_TYPE_PASSWORD;
exports.comparePasswordHash = utils$2.comparePasswordHash;
exports.hasRole = utils$2.hasRole;
exports.hashPassword = utils$2.hashPassword;
exports.sendLoginEmail = utils$2.sendLoginEmail;
exports.sendResetEmail = utils$2.sendResetEmail;
exports.sendSignupEmail = utils$2.sendSignupEmail;
