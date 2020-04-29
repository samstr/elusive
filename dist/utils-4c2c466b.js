'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var wrapNativeSuper = require('./wrapNativeSuper-b3646a2a.js');
var index = require('./index.js');
var index$1 = require('./index-2340470f.js');
var errors = require('./errors-a41e2d55.js');
require('./FormErrors-8aabc0ca.js');
var bcrypt = _interopDefault(require('bcryptjs'));
var nookies = require('nookies');
var jwt = require('jsonwebtoken');
var jwt__default = _interopDefault(jwt);

function _createSuper(Derived) { return function () { var Super = wrapNativeSuper._getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = wrapNativeSuper._getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return wrapNativeSuper._possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var SessionError = /*#__PURE__*/function (_BaseError) {
  wrapNativeSuper._inherits(SessionError, _BaseError);

  var _super = _createSuper(SessionError);

  function SessionError() {
    wrapNativeSuper._classCallCheck(this, SessionError);

    return _super.apply(this, arguments);
  }

  return SessionError;
}(errors.BaseError);
var InvalidAccessTokenError = /*#__PURE__*/function (_SessionError) {
  wrapNativeSuper._inherits(InvalidAccessTokenError, _SessionError);

  var _super2 = _createSuper(InvalidAccessTokenError);

  function InvalidAccessTokenError() {
    wrapNativeSuper._classCallCheck(this, InvalidAccessTokenError);

    return _super2.apply(this, arguments);
  }

  return InvalidAccessTokenError;
}(SessionError);
var UserIdCookieAndTokenMismatchError = /*#__PURE__*/function (_SessionError2) {
  wrapNativeSuper._inherits(UserIdCookieAndTokenMismatchError, _SessionError2);

  var _super3 = _createSuper(UserIdCookieAndTokenMismatchError);

  function UserIdCookieAndTokenMismatchError() {
    wrapNativeSuper._classCallCheck(this, UserIdCookieAndTokenMismatchError);

    return _super3.apply(this, arguments);
  }

  return UserIdCookieAndTokenMismatchError;
}(SessionError);
var InvalidRefreshTokenError = /*#__PURE__*/function (_SessionError3) {
  wrapNativeSuper._inherits(InvalidRefreshTokenError, _SessionError3);

  var _super4 = _createSuper(InvalidRefreshTokenError);

  function InvalidRefreshTokenError() {
    wrapNativeSuper._classCallCheck(this, InvalidRefreshTokenError);

    return _super4.apply(this, arguments);
  }

  return InvalidRefreshTokenError;
}(SessionError);
var RefreshTokenExpiredError = /*#__PURE__*/function (_SessionError4) {
  wrapNativeSuper._inherits(RefreshTokenExpiredError, _SessionError4);

  var _super5 = _createSuper(RefreshTokenExpiredError);

  function RefreshTokenExpiredError() {
    wrapNativeSuper._classCallCheck(this, RefreshTokenExpiredError);

    return _super5.apply(this, arguments);
  }

  return RefreshTokenExpiredError;
}(SessionError);
var SessionUserNoLongerExistsError = /*#__PURE__*/function (_SessionError5) {
  wrapNativeSuper._inherits(SessionUserNoLongerExistsError, _SessionError5);

  var _super6 = _createSuper(SessionUserNoLongerExistsError);

  function SessionUserNoLongerExistsError() {
    wrapNativeSuper._classCallCheck(this, SessionUserNoLongerExistsError);

    return _super6.apply(this, arguments);
  }

  return SessionUserNoLongerExistsError;
}(SessionError);
var SessionUserNotEnabledError = /*#__PURE__*/function (_SessionError6) {
  wrapNativeSuper._inherits(SessionUserNotEnabledError, _SessionError6);

  var _super7 = _createSuper(SessionUserNotEnabledError);

  function SessionUserNotEnabledError() {
    wrapNativeSuper._classCallCheck(this, SessionUserNotEnabledError);

    return _super7.apply(this, arguments);
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
  var options = index.options.sessions;
  var expiryDate = new Date(0).toUTCString(); // set it in the past

  return [buildSessionCookieString(options.cookies.accessTokenName, '', expiryDate), buildSessionCookieString(options.cookies.refreshTokenName, '', expiryDate), buildSessionCookieString(options.cookies.userIdName, '', expiryDate)];
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
  var options, session, cookies, accessToken, refreshToken, userId, _verifyAccessTokenFro, accessTokenDecoded, accessTokenExpired, accessTokenInvalid;

  return index$1._regeneratorRuntime.async(function validateSession$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          options = index.options.sessions; // console.log('zz options', options);
          // console.log('zz sentry', sentry);

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
          userId = cookies[options.cookies.userIdName]; // console.log('req.cookies', req.cookies);
          // console.log('accessToken', accessToken);
          // console.log('refreshToken', refreshToken);
          // console.log('userId', userId);
          // Regardless of whether the route has requiresAuth: true/false
          // we always validate the request if the cookies are present incase
          // we need to regenerate tokens

          if (!(accessToken && refreshToken && userId)) {
            _context.next = 10;
            break;
          }

          _verifyAccessTokenFro = verifyAccessTokenFromCookie(accessToken, options.jwt.secret), accessTokenDecoded = _verifyAccessTokenFro.decoded, accessTokenExpired = _verifyAccessTokenFro.expired, accessTokenInvalid = _verifyAccessTokenFro.invalid; // console.log('accessTokenDecoded', accessTokenDecoded);
          // console.log('accessTokenExpired', accessTokenExpired);
          // console.log('accessTokenInvalid', accessTokenInvalid);

          if (!accessTokenInvalid) {
            _context.next = 10;
            break;
          }

          throw new InvalidAccessTokenError('Invalid accessToken');

        case 10:
          session.isAuthenticated = !!session.claims;
          return _context.abrupt("return", session);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, null, Promise);
};

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
