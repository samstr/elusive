'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./classCallCheck-d2bb402f.js');
var client = require('./index-59266c9b.js');
require('./defineProperty-ba7cd53d.js');
require('./utils-1794fb54.js');
require('./index.js');
require('jsonwebtoken');
var utils$3 = require('./utils-c25b9b40.js');



exports.ACCESS_TOKEN_EXPIRY_MINS = client.ACCESS_TOKEN_EXPIRY_MINS;
exports.REFRESH_TOKEN_EXPIRY_MINS = client.REFRESH_TOKEN_EXPIRY_MINS;
exports.getClaims = utils$3.getClaims;
exports.signToken = utils$3.signToken;
exports.signTokens = utils$3.signTokens;
