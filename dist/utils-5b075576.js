'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var classCallCheck = require('./classCallCheck-d2bb402f.js');
var index = require('./index.js');
var errors = require('./errors-2aa38575.js');
var jwt = require('jsonwebtoken');
var jwt__default = _interopDefault(jwt);

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = errors._getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = errors._getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return errors._possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var TokenError = /*#__PURE__*/function (_BaseError) {
  errors._inherits(TokenError, _BaseError);

  var _super = _createSuper(TokenError);

  function TokenError() {
    classCallCheck._classCallCheck(this, TokenError);

    return _super.apply(this, arguments);
  }

  return TokenError;
}(errors.BaseError);
var InvalidAccessTokenError = /*#__PURE__*/function (_TokenError) {
  errors._inherits(InvalidAccessTokenError, _TokenError);

  var _super2 = _createSuper(InvalidAccessTokenError);

  function InvalidAccessTokenError() {
    classCallCheck._classCallCheck(this, InvalidAccessTokenError);

    return _super2.apply(this, arguments);
  }

  return InvalidAccessTokenError;
}(TokenError);
var InvalidRefreshTokenError = /*#__PURE__*/function (_TokenError2) {
  errors._inherits(InvalidRefreshTokenError, _TokenError2);

  var _super3 = _createSuper(InvalidRefreshTokenError);

  function InvalidRefreshTokenError() {
    classCallCheck._classCallCheck(this, InvalidRefreshTokenError);

    return _super3.apply(this, arguments);
  }

  return InvalidRefreshTokenError;
}(TokenError);
var RefreshTokenExpiredError = /*#__PURE__*/function (_TokenError3) {
  errors._inherits(RefreshTokenExpiredError, _TokenError3);

  var _super4 = _createSuper(RefreshTokenExpiredError);

  function RefreshTokenExpiredError() {
    classCallCheck._classCallCheck(this, RefreshTokenExpiredError);

    return _super4.apply(this, arguments);
  }

  return RefreshTokenExpiredError;
}(TokenError);

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

exports.InvalidAccessTokenError = InvalidAccessTokenError;
exports.InvalidRefreshTokenError = InvalidRefreshTokenError;
exports.RefreshTokenExpiredError = RefreshTokenExpiredError;
exports.TokenError = TokenError;
exports.getClaims = getClaims;
exports.signToken = signToken;
exports.signTokens = signTokens;
