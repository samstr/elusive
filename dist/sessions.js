'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var classCallCheck = require('./classCallCheck-d2bb402f.js');
var client = require('./index-f3e3cee9.js');
require('./defineProperty-ba7cd53d.js');
var getPrototypeOf = require('./getPrototypeOf-b5b03665.js');
var index = require('./index.js');
require('prop-types');
require('react');
require('react-bootstrap');
var index$1 = require('./index-2340470f.js');
var errors = require('./errors-df969561.js');
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
    classCallCheck._classCallCheck(this, SessionError);

    return _super.apply(this, arguments);
  }

  return SessionError;
}(errors.BaseError);
var InvalidAccessTokenError = /*#__PURE__*/function (_SessionError) {
  getPrototypeOf._inherits(InvalidAccessTokenError, _SessionError);

  var _super2 = _createSuper(InvalidAccessTokenError);

  function InvalidAccessTokenError(props) {
    var _this;

    classCallCheck._classCallCheck(this, InvalidAccessTokenError);

    _this = _super2.call(this, props);
    _this.name = 'InvalidAccessTokenError';
    return _this;
  }

  return InvalidAccessTokenError;
}(SessionError);
var UserIdCookieAndTokenMismatchError = /*#__PURE__*/function (_SessionError2) {
  getPrototypeOf._inherits(UserIdCookieAndTokenMismatchError, _SessionError2);

  var _super3 = _createSuper(UserIdCookieAndTokenMismatchError);

  function UserIdCookieAndTokenMismatchError(props) {
    var _this2;

    classCallCheck._classCallCheck(this, UserIdCookieAndTokenMismatchError);

    _this2 = _super3.call(this, props);
    _this2.name = 'UserIdCookieAndTokenMismatchError';
    return _this2;
  }

  return UserIdCookieAndTokenMismatchError;
}(SessionError);
var InvalidRefreshTokenError = /*#__PURE__*/function (_SessionError3) {
  getPrototypeOf._inherits(InvalidRefreshTokenError, _SessionError3);

  var _super4 = _createSuper(InvalidRefreshTokenError);

  function InvalidRefreshTokenError(props) {
    var _this3;

    classCallCheck._classCallCheck(this, InvalidRefreshTokenError);

    _this3 = _super4.call(this, props);
    _this3.name = 'InvalidRefreshTokenError';
    return _this3;
  }

  return InvalidRefreshTokenError;
}(SessionError);
var RefreshTokenExpiredError = /*#__PURE__*/function (_SessionError4) {
  getPrototypeOf._inherits(RefreshTokenExpiredError, _SessionError4);

  var _super5 = _createSuper(RefreshTokenExpiredError);

  function RefreshTokenExpiredError(props) {
    var _this4;

    classCallCheck._classCallCheck(this, RefreshTokenExpiredError);

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

    classCallCheck._classCallCheck(this, SessionUserNoLongerExistsError);

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

    classCallCheck._classCallCheck(this, SessionUserNotEnabledError);

    _this6 = _super7.call(this, props);
    _this6.name = 'SessionUserNotEnabledError';
    return _this6;
  }

  return SessionUserNotEnabledError;
}(SessionError);

var viewElusiveOptions = function viewElusiveOptions() {
  return index.options;
};
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
  return bcrypt.hashSync(password, client.BCRYPT_SALT_ROUNDS);
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
var validateSession = function validateSession(req, res) {
  var options, session, cookies, accessToken, refreshToken, userId;
  return index$1._regeneratorRuntime.async(function validateSession$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          options = index.options.sessions;
          console.log('options', options);
          session = {
            isAuthenticated: false,
            claims: null
          };
          cookies = nookies.parseCookies({
            req: req,
            res: res
          });
          accessToken = cookies[options.accessTokenName];
          refreshToken = cookies[options.cookies.refreshTokenName];
          userId = cookies[options.cookies.userIdName];
          console.log('accessToken', accessToken);
          console.log('refreshToken', refreshToken);
          console.log('userId', userId);
          console.log('req.cookies', req.cookies); // Regardless of whether the route has requiresAuth: true/false
          // we always validate the request if the cookies are present incase
          // we need to regenerate tokens

          /*if (accessToken && refreshToken && userId) {
            const {
              decoded: accessTokenDecoded,
              expired: accessTokenExpired,
              invalid: accessTokenInvalid,
            } = verifyAccessTokenFromCookie(accessToken, jwtSecret);
             if (accessTokenInvalid) {
              throw new InvalidAccessTokenError();
            }
             if (accessTokenDecoded) {
              if (accessTokenDecoded.user.id !== userId) {
                throw new UserIdCookieAndTokenMismatchError();
              }
               session.claims = accessTokenDecoded;
               // we don't need these on the object
              delete session.claims.iat;
              delete session.claims.exp;
            }
             if (accessTokenExpired) {
              // access token has expired (every 15 mins) so we need to generate a new one
              const {
                decoded: refreshTokenDecoded,
                expired: refreshTokenExpired,
                invalid: refreshTokenInvalid,
              } = verifyRefreshTokenFromCookie(refreshToken, jwtSecret);
               if (refreshTokenInvalid) {
                throw new InvalidRefreshTokenError();
              }
               if (refreshTokenExpired) {
                // this should never happen since we're always refreshing it whenever we refresh an accessToken
                throw new RefreshTokenExpiredError();
              }
               if (refreshTokenDecoded.user.id !== userId) {
                throw new UserIdCookieAndTokenMismatchError();
              }
               // TODO: wrap this in try catch and throw ReloadUserError()
              const user = await reloadUser(refreshTokenDecoded.user.id);
               session.claims = createTokenClaims(user);
               createSessionCookies(res, signTokens(session.claims, jwtSecret), user.id);
            }
          }*/

          session.isAuthenticated = !!session.claims;
          return _context.abrupt("return", session);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, null, Promise);
};

exports.BCRYPT_SALT_ROUNDS = client.BCRYPT_SALT_ROUNDS;
exports.COOKIES_ACCESS_TOKEN_NAME = client.COOKIES_ACCESS_TOKEN_NAME;
exports.COOKIES_EXPIRY_MINS = client.COOKIES_EXPIRY_MINS;
exports.COOKIES_REFRESH_TOKEN_NAME = client.COOKIES_REFRESH_TOKEN_NAME;
exports.COOKIES_USER_ID_NAME = client.COOKIES_USER_ID_NAME;
exports.JWT_ACCESS_TOKEN_EXPIRY_MINS = client.JWT_ACCESS_TOKEN_EXPIRY_MINS;
exports.JWT_REFRESH_TOKEN_EXPIRY_MINS = client.JWT_REFRESH_TOKEN_EXPIRY_MINS;
exports.SessionContext = SessionContext.SessionContext;
exports.SessionProvider = SessionContext.SessionProvider;
exports.useSession = SessionContext.useSession;
exports.InvalidAccessTokenError = InvalidAccessTokenError;
exports.InvalidRefreshTokenError = InvalidRefreshTokenError;
exports.RefreshTokenExpiredError = RefreshTokenExpiredError;
exports.SessionError = SessionError;
exports.SessionUserNoLongerExistsError = SessionUserNoLongerExistsError;
exports.SessionUserNotEnabledError = SessionUserNotEnabledError;
exports.UserIdCookieAndTokenMismatchError = UserIdCookieAndTokenMismatchError;
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
exports.viewElusiveOptions = viewElusiveOptions;
