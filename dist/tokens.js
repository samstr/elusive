'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./classCallCheck-d2bb402f.js');
var client = require('./index-6c0d18da.js');
require('./defineProperty-ba7cd53d.js');
require('./index.js');
require('jsonwebtoken');
var utils$2 = require('./utils-b756bb3f.js');



exports.ACCESS_TOKEN_EXPIRY_MINS = client.ACCESS_TOKEN_EXPIRY_MINS;
exports.REFRESH_TOKEN_EXPIRY_MINS = client.REFRESH_TOKEN_EXPIRY_MINS;
exports.getClaims = utils$2.getClaims;
exports.signToken = utils$2.signToken;
exports.signTokens = utils$2.signTokens;
