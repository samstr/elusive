'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./classCallCheck-d2bb402f.js');
require('./ElusiveClient-d044fa81.js');
require('./defineProperty-ba7cd53d.js');
require('./index.js');
require('./errors-6d843f19.js');
var errors$1 = require('./errors-304c18aa.js');
require('./asyncToGenerator-7a28bf2e.js');
require('bcryptjs');
require('./utils-8c3c3461.js');
require('./utils-ac544182.js');
var utils$2 = require('./utils-744e9199.js');



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
