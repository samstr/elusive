'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var index = require('./index.js');
var jwt = require('jsonwebtoken');
var jwt__default = _interopDefault(jwt);

var signToken = function signToken(claims, secret, expiryMins) {
  return jwt__default.sign(claims, secret, {
    expiresIn: expiryMins * 60
  });
};
var signTokens = function signTokens(claims, secret) {
  var tokenOptions = index.options.tokens; // delete these if they exist. not needed

  delete claims.iat;
  delete claims.exp;
  return {
    access: signToken(claims, secret, tokenOptions.accessTokenExpiryMins),
    refresh: signToken(claims, secret, tokenOptions.refreshTokenExpiryMins)
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

exports.getClaims = getClaims;
exports.signToken = signToken;
exports.signTokens = signTokens;
