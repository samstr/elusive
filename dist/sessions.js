'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('prop-types');
require('react');
require('react-bootstrap');
var index = require('./index-2340470f.js');
var errors = require('./errors-5835407b.js');
var getPrototypeOf = require('./getPrototypeOf-d3751d5a.js');
require('./FormErrors-22a51af8.js');
var SessionContext = require('./SessionContext-b57e1931.js');
var bcrypt = _interopDefault(require('bcryptjs'));
var nookies = require('nookies');
var jwt = require('jsonwebtoken');
var jwt__default = _interopDefault(jwt);

function _createSuper(Derived) { return function () { var Super = getPrototypeOf._getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = getPrototypeOf._getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return getPrototypeOf._possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var SessionError = /*#__PURE__*/function (_BaseError) {
  getPrototypeOf._inherits(SessionError, _BaseError);

  var _super = _createSuper(SessionError);

  function SessionError() {
    errors._classCallCheck(this, SessionError);

    return _super.apply(this, arguments);
  }

  return SessionError;
}(errors.BaseError);
var InvalidAccessTokenError$1 = /*#__PURE__*/function (_SessionError) {
  getPrototypeOf._inherits(InvalidAccessTokenError, _SessionError);

  var _super2 = _createSuper(InvalidAccessTokenError);

  function InvalidAccessTokenError(props) {
    var _this;

    errors._classCallCheck(this, InvalidAccessTokenError);

    _this = _super2.call(this, props);
    _this.name = 'InvalidAccessTokenError';
    return _this;
  }

  return InvalidAccessTokenError;
}(SessionError);
var UserIdCookieAndTokenMismatchError$1 = /*#__PURE__*/function (_SessionError2) {
  getPrototypeOf._inherits(UserIdCookieAndTokenMismatchError, _SessionError2);

  var _super3 = _createSuper(UserIdCookieAndTokenMismatchError);

  function UserIdCookieAndTokenMismatchError(props) {
    var _this2;

    errors._classCallCheck(this, UserIdCookieAndTokenMismatchError);

    _this2 = _super3.call(this, props);
    _this2.name = 'UserIdCookieAndTokenMismatchError';
    return _this2;
  }

  return UserIdCookieAndTokenMismatchError;
}(SessionError);
var InvalidRefreshTokenError$1 = /*#__PURE__*/function (_SessionError3) {
  getPrototypeOf._inherits(InvalidRefreshTokenError, _SessionError3);

  var _super4 = _createSuper(InvalidRefreshTokenError);

  function InvalidRefreshTokenError(props) {
    var _this3;

    errors._classCallCheck(this, InvalidRefreshTokenError);

    _this3 = _super4.call(this, props);
    _this3.name = 'InvalidRefreshTokenError';
    return _this3;
  }

  return InvalidRefreshTokenError;
}(SessionError);
var RefreshTokenExpiredError$1 = /*#__PURE__*/function (_SessionError4) {
  getPrototypeOf._inherits(RefreshTokenExpiredError, _SessionError4);

  var _super5 = _createSuper(RefreshTokenExpiredError);

  function RefreshTokenExpiredError(props) {
    var _this4;

    errors._classCallCheck(this, RefreshTokenExpiredError);

    _this4 = _super5.call(this, props);
    _this4.name = 'RefreshTokenExpiredError';
    return _this4;
  }

  return RefreshTokenExpiredError;
}(SessionError);
var SessionUserNoLongerExistsError = /*#__PURE__*/function (_SessionError5) {
  getPrototypeOf._inherits(SessionUserNoLongerExistsError, _SessionError5);

  var _super6 = _createSuper(SessionUserNoLongerExistsError);

  function SessionUserNoLongerExistsError(props) {
    var _this5;

    errors._classCallCheck(this, SessionUserNoLongerExistsError);

    _this5 = _super6.call(this, props);
    _this5.name = 'SessionUserNoLongerExistsError';
    return _this5;
  }

  return SessionUserNoLongerExistsError;
}(SessionError);
var SessionUserNotEnabledError = /*#__PURE__*/function (_SessionError6) {
  getPrototypeOf._inherits(SessionUserNotEnabledError, _SessionError6);

  var _super7 = _createSuper(SessionUserNotEnabledError);

  function SessionUserNotEnabledError(props) {
    var _this6;

    errors._classCallCheck(this, SessionUserNotEnabledError);

    _this6 = _super7.call(this, props);
    _this6.name = 'SessionUserNotEnabledError';
    return _this6;
  }

  return SessionUserNotEnabledError;
}(SessionError);

var JWT_ACCESS_TOKEN_EXPIRY_MINS = 3; // XXX set to 10

var JWT_REFRESH_TOKEN_EXPIRY_MINS = 43800; // 1 month

var ACCESS_TOKEN_COOKIE_NAME = 'at';
var REFRESH_TOKEN_COOKIE_NAME = 'rt';
var USER_ID_COOKIE_NAME = 'uid';
var COOKIE_EXPIRY_MINS = 43800; // 1 month

var BCRYPT_SALT_ROUNDS = 10;
var buildSessionCookieString = function buildSessionCookieString(name, value, expiryDate) {
  return ["".concat(name, "=").concat(value), 'path=/', 'SameSite=Lax', "expires=".concat(expiryDate), 'HttpOnly', process.env.NODE_ENV === 'production' ? 'Secure;' : null].join(';');
};
var createSessionCookieStrings = function createSessionCookieStrings(tokens, userId) {
  var dateFuture = Date.now() + 60000 * COOKIE_EXPIRY_MINS;
  var expiryDate = new Date(dateFuture).toUTCString();
  return [buildSessionCookieString(ACCESS_TOKEN_COOKIE_NAME, tokens.access, expiryDate), buildSessionCookieString(REFRESH_TOKEN_COOKIE_NAME, tokens.refresh, expiryDate), buildSessionCookieString(USER_ID_COOKIE_NAME, userId, expiryDate)];
};
var createSessionCookies = function createSessionCookies(res, tokens, userId) {
  res.setHeader('Set-Cookie', createSessionCookieStrings(tokens, userId));
};
var hashPassword = function hashPassword(password) {
  return bcrypt.hashSync(password, BCRYPT_SALT_ROUNDS);
};
var comparePasswordHash = function comparePasswordHash(password, hash) {
  return bcrypt.compareSync(password, hash);
};
var signToken = function signToken(claims, secret, expiryMins) {
  return jwt__default.sign(claims, secret, {
    expiresIn: expiryMins * 60
  });
};
var signTokens = function signTokens(claims, secret) {
  return {
    access: signToken(claims, secret, JWT_ACCESS_TOKEN_EXPIRY_MINS),
    refresh: signToken(claims, secret, JWT_REFRESH_TOKEN_EXPIRY_MINS)
  };
};
var deleteSessionCookieStrings = function deleteSessionCookieStrings() {
  var expiryDate = new Date(0).toUTCString(); // set it in the past

  return [buildSessionCookieString(ACCESS_TOKEN_COOKIE_NAME, '', expiryDate), buildSessionCookieString(REFRESH_TOKEN_COOKIE_NAME, '', expiryDate), buildSessionCookieString(USER_ID_COOKIE_NAME, '', expiryDate)];
};
var deleteSessionCookies = function deleteSessionCookies(res) {
  res.setHeader('Set-Cookie', deleteSessionCookieStrings());
};
var verifyToken = function verifyToken(token, secret) {
  return jwt__default.verify(token, secret);
};
var verifyAccessTokenFromCookie = function verifyAccessTokenFromCookie(accessToken, secret) {
  try {
    var decoded = verifyToken(accessToken, secret);
    return {
      decoded: decoded
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
var verifyRefreshTokenFromCookie = function verifyRefreshTokenFromCookie(refreshToken, secret) {
  try {
    var decoded = verifyToken(refreshToken, secret);
    return {
      decoded: decoded
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
var validateSession = function validateSession(req, res, config) {
  var createTokenClaims, getUser, jwtSecret, session, cookies, accessToken, refreshToken, userId, _verifyAccessTokenFro, accessTokenDecoded, accessTokenExpired, accessTokenInvalid, _verifyRefreshTokenFr, refreshTokenDecoded, refreshTokenExpired, refreshTokenInvalid, user;

  return index._regeneratorRuntime.async(function validateSession$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          createTokenClaims = config.createTokenClaims, getUser = config.getUser, jwtSecret = config.jwtSecret;
          session = {
            isAuthenticated: false,
            claims: null
          };
          cookies = nookies.parseCookies({
            req: req,
            res: res
          });
          accessToken = cookies[ACCESS_TOKEN_COOKIE_NAME];
          refreshToken = cookies[REFRESH_TOKEN_COOKIE_NAME];
          userId = cookies[USER_ID_COOKIE_NAME]; // Regardless of whether the route has requiresAuth: true/false
          // we always validate the request if the cookies are present incase
          // we need to regenerate tokens

          if (!(accessToken && refreshToken && userId)) {
            _context.next = 29;
            break;
          }

          _verifyAccessTokenFro = verifyAccessTokenFromCookie(accessToken, jwtSecret), accessTokenDecoded = _verifyAccessTokenFro.decoded, accessTokenExpired = _verifyAccessTokenFro.expired, accessTokenInvalid = _verifyAccessTokenFro.invalid;

          if (!accessTokenInvalid) {
            _context.next = 10;
            break;
          }

          throw new InvalidAccessTokenError();

        case 10:
          if (!accessTokenDecoded) {
            _context.next = 16;
            break;
          }

          if (!(accessTokenDecoded.user.id !== userId)) {
            _context.next = 13;
            break;
          }

          throw new UserIdCookieAndTokenMismatchError();

        case 13:
          session.claims = accessTokenDecoded; // we don't need these on the object

          delete session.claims.iat;
          delete session.claims.exp;

        case 16:
          if (!accessTokenExpired) {
            _context.next = 29;
            break;
          }

          // access token has expired (every 15 mins) so we need to generate a new one
          _verifyRefreshTokenFr = verifyRefreshTokenFromCookie(refreshToken, jwtSecret), refreshTokenDecoded = _verifyRefreshTokenFr.decoded, refreshTokenExpired = _verifyRefreshTokenFr.expired, refreshTokenInvalid = _verifyRefreshTokenFr.invalid;

          if (!refreshTokenInvalid) {
            _context.next = 20;
            break;
          }

          throw new InvalidRefreshTokenError();

        case 20:
          if (!refreshTokenExpired) {
            _context.next = 22;
            break;
          }

          throw new RefreshTokenExpiredError();

        case 22:
          if (!(refreshTokenDecoded.user.id !== userId)) {
            _context.next = 24;
            break;
          }

          throw new UserIdCookieAndTokenMismatchError();

        case 24:
          _context.next = 26;
          return index._regeneratorRuntime.awrap(getUser(refreshTokenDecoded.user.id));

        case 26:
          user = _context.sent;
          session.claims = createTokenClaims(user);
          createSessionCookies(res, signTokens(session.claims, jwtSecret), user.id);

        case 29:
          session.isAuthenticated = !!session.claims;
          return _context.abrupt("return", session);

        case 31:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, null, Promise);
};

exports.SessionContext = SessionContext.SessionContext;
exports.SessionProvider = SessionContext.SessionProvider;
exports.useSession = SessionContext.useSession;
exports.InvalidAccessTokenError = InvalidAccessTokenError$1;
exports.InvalidRefreshTokenError = InvalidRefreshTokenError$1;
exports.RefreshTokenExpiredError = RefreshTokenExpiredError$1;
exports.SessionError = SessionError;
exports.SessionUserNoLongerExistsError = SessionUserNoLongerExistsError;
exports.SessionUserNotEnabledError = SessionUserNotEnabledError;
exports.UserIdCookieAndTokenMismatchError = UserIdCookieAndTokenMismatchError$1;
exports.buildSessionCookieString = buildSessionCookieString;
exports.comparePasswordHash = comparePasswordHash;
exports.createSessionCookieStrings = createSessionCookieStrings;
exports.createSessionCookies = createSessionCookies;
exports.deleteSessionCookieStrings = deleteSessionCookieStrings;
exports.deleteSessionCookies = deleteSessionCookies;
exports.hashPassword = hashPassword;
exports.signToken = signToken;
exports.signTokens = signTokens;
exports.validateSession = validateSession;
exports.verifyAccessTokenFromCookie = verifyAccessTokenFromCookie;
exports.verifyRefreshTokenFromCookie = verifyRefreshTokenFromCookie;
exports.verifyToken = verifyToken;
