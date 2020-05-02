'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('./classCallCheck-d2bb402f.js');
var client = require('./index-08623d88.js');
require('./defineProperty-ba7cd53d.js');
require('./utils-1794fb54.js');
var index = require('./index.js');
var jwt = require('jsonwebtoken');
var jwt__default = _interopDefault(jwt);

var signToken = function signToken(claims, secret, expiryMins) {
  return jwt__default.sign(claims, secret, {
    expiresIn: expiryMins * 60
  });
};
var signTokens = function signTokens(claims, secret) {
  var options = index.options.tokens;
  return {
    access: signToken(claims, secret, options.accessTokenExpiryMins),
    refresh: signToken(claims, secret, options.refreshTokenExpiryMins)
  };
};
var getClaims = function getClaims(token, secret) {
  try {
    var claims = jwt__default.verify(token, secret);
    return {
      claims: claims
    };
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return {
        expired: true
      };
    } else if (err instanceof jwt.JsonWebTokenError) {
      return {
        invalid: true
      };
    }

    throw err;
  }
};

exports.ACCESS_TOKEN_EXPIRY_MINS = client.ACCESS_TOKEN_EXPIRY_MINS;
exports.REFRESH_TOKEN_EXPIRY_MINS = client.REFRESH_TOKEN_EXPIRY_MINS;
exports.getClaims = getClaims;
exports.signToken = signToken;
exports.signTokens = signTokens;
