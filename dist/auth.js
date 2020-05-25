'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./classCallCheck-d2bb402f.js');
require('./ElusiveClient-7405d865.js');
require('./index.js');
require('./errors-b316e546.js');
var errors$1 = require('./errors-bc789b6a.js');
require('./asyncToGenerator-42483001.js');
require('bcryptjs');
require('./utils-c048fd8a.js');
require('./utils-3409f232.js');
var utils$2 = require('./utils-24b30e03.js');



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
