'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var index = require('./index.js');
var bcrypt = _interopDefault(require('bcryptjs'));

var LOGIN_TYPE_LINK = 'link';
var LOGIN_TYPE_PASSWORD = 'password';
var LOGIN_TYPES = [LOGIN_TYPE_LINK, LOGIN_TYPE_PASSWORD];
var hashPassword = function hashPassword(password) {
  var authOptions = index.options.auth;
  return bcrypt.hashSync(password, authOptions.saltRounds);
};
var comparePasswordHash = function comparePasswordHash(password, hash) {
  return bcrypt.compareSync(password, hash);
};

exports.LOGIN_TYPES = LOGIN_TYPES;
exports.LOGIN_TYPE_LINK = LOGIN_TYPE_LINK;
exports.LOGIN_TYPE_PASSWORD = LOGIN_TYPE_PASSWORD;
exports.comparePasswordHash = comparePasswordHash;
exports.hashPassword = hashPassword;
