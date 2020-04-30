'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var wrapNativeSuper = require('./wrapNativeSuper-b3646a2a.js');
var index = require('./index.js');
var index$1 = require('./index-2340470f.js');
var FormErrors = require('./FormErrors-a91e4b79.js');
var bcrypt = _interopDefault(require('bcryptjs'));
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
}(FormErrors.BaseError);
var InvalidAccessTokenError = /*#__PURE__*/function (_SessionError) {
  wrapNativeSuper._inherits(InvalidAccessTokenError, _SessionError);

  var _super2 = _createSuper(InvalidAccessTokenError);

  function InvalidAccessTokenError() {
    wrapNativeSuper._classCallCheck(this, InvalidAccessTokenError);

    return _super2.apply(this, arguments);
  }

  return InvalidAccessTokenError;
}(SessionError);
var UserIdCookieAndTokenMismatchError$1 = /*#__PURE__*/function (_SessionError2) {
  wrapNativeSuper._inherits(UserIdCookieAndTokenMismatchError, _SessionError2);

  var _super3 = _createSuper(UserIdCookieAndTokenMismatchError);

  function UserIdCookieAndTokenMismatchError() {
    wrapNativeSuper._classCallCheck(this, UserIdCookieAndTokenMismatchError);

    return _super3.apply(this, arguments);
  }

  return UserIdCookieAndTokenMismatchError;
}(SessionError);
var InvalidRefreshTokenError$1 = /*#__PURE__*/function (_SessionError3) {
  wrapNativeSuper._inherits(InvalidRefreshTokenError, _SessionError3);

  var _super4 = _createSuper(InvalidRefreshTokenError);

  function InvalidRefreshTokenError() {
    wrapNativeSuper._classCallCheck(this, InvalidRefreshTokenError);

    return _super4.apply(this, arguments);
  }

  return InvalidRefreshTokenError;
}(SessionError);
var RefreshTokenExpiredError$1 = /*#__PURE__*/function (_SessionError4) {
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

var buildSessionCookieString = function buildSessionCookieString(name, value, expiryDate) {
  return ["".concat(name, "=").concat(value), 'path=/', 'SameSite=Lax', "expires=".concat(expiryDate), 'HttpOnly', process.env.NODE_ENV === 'production' ? 'Secure;' : null].join(';');
};
var createSessionCookieStrings = function createSessionCookieStrings(tokens, userId) {
  var options = index.options.sessions;
  var dateFuture = Date.now() + 60000 * options.cookies.expiryMins;
  var expiryDate = new Date(dateFuture).toUTCString();
  return [buildSessionCookieString(options.cookies.accessTokenName, tokens.access, expiryDate), buildSessionCookieString(options.cookies.refreshTokenName, tokens.refresh, expiryDate), buildSessionCookieString(options.cookies.userIdName, userId, expiryDate)];
};
var createSessionCookies = function createSessionCookies(res, tokens, userId) {
  res.setHeader('Set-Cookie', createSessionCookieStrings(tokens, userId));
};
var hashPassword = function hashPassword(password) {
  var options = index.options.sessions;
  return bcrypt.hashSync(password, options.bcrypt.saltRounds);
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
  var options = index.options.sessions;
  return {
    access: signToken(claims, secret, options.jwt.accessTokenExpiryMins),
    refresh: signToken(claims, secret, options.jwt.refreshTokenExpiryMins)
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
    var claims = verifyToken(accessToken, secret);
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
var verifyRefreshTokenFromCookie = function verifyRefreshTokenFromCookie(refreshToken, secret) {
  try {
    var claims = verifyToken(refreshToken, secret);
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
var validateSession = function validateSession(req, res) {
  var options, _options$callbacks, createTokenClaims, reloadUser, session, _req$cookies, accessToken, refreshToken, userId, _verifyAccessTokenFro, accessTokenClaims, accessTokenExpired, accessTokenInvalid, _verifyRefreshTokenFr, refreshTokenClaims, refreshTokenExpired, refreshTokenInvalid, user;

  return index$1._regeneratorRuntime.async(function validateSession$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          options = index.options.sessions;
          _options$callbacks = options.callbacks, createTokenClaims = _options$callbacks.createTokenClaims, reloadUser = _options$callbacks.reloadUser;
          session = {
            isAuthenticated: false,
            claims: null
          };
          _req$cookies = req.cookies, accessToken = _req$cookies[options.cookies.accessTokenName], refreshToken = _req$cookies[options.cookies.refreshTokenName], userId = _req$cookies[options.cookies.userIdName]; // Regardless of whether the route has requiresAuth: true/false
          // we always validate the request if the cookies are present incase
          // we need to regenerate tokens

          if (!(accessToken && refreshToken && userId)) {
            _context.next = 27;
            break;
          }

          _verifyAccessTokenFro = verifyAccessTokenFromCookie(accessToken, options.jwt.secret), accessTokenClaims = _verifyAccessTokenFro.claims, accessTokenExpired = _verifyAccessTokenFro.expired, accessTokenInvalid = _verifyAccessTokenFro.invalid;

          if (!accessTokenInvalid) {
            _context.next = 8;
            break;
          }

          throw new InvalidAccessTokenError('Invalid access token');

        case 8:
          if (!accessTokenClaims) {
            _context.next = 14;
            break;
          }

          if (!(accessTokenClaims.user.id !== userId)) {
            _context.next = 11;
            break;
          }

          throw new UserIdCookieAndTokenMismatchError('User id cookie does not match access token');

        case 11:
          session.claims = accessTokenClaims; // we don't need these on the object

          delete session.claims.iat;
          delete session.claims.exp;

        case 14:
          if (!accessTokenExpired) {
            _context.next = 27;
            break;
          }

          // access token has expired (every 10 mins) so we need to generate a new one
          _verifyRefreshTokenFr = verifyRefreshTokenFromCookie(refreshToken, options.jwt.secret), refreshTokenClaims = _verifyRefreshTokenFr.claims, refreshTokenExpired = _verifyRefreshTokenFr.expired, refreshTokenInvalid = _verifyRefreshTokenFr.invalid;

          if (!refreshTokenInvalid) {
            _context.next = 18;
            break;
          }

          throw new InvalidRefreshTokenError('Invalid refresh token');

        case 18:
          if (!refreshTokenExpired) {
            _context.next = 20;
            break;
          }

          throw new RefreshTokenExpiredError('Refresh token expired');

        case 20:
          if (!(refreshTokenClaims.user.id !== userId)) {
            _context.next = 22;
            break;
          }

          throw new UserIdCookieAndTokenMismatchError('User id cookie does not match refresh token');

        case 22:
          _context.next = 24;
          return index$1._regeneratorRuntime.awrap(reloadUser(refreshTokenClaims.user.id));

        case 24:
          user = _context.sent;
          session.claims = createTokenClaims(user);
          createSessionCookies(res, signTokens(session.claims, options.jwt.secret), user.id);

        case 27:
          session.isAuthenticated = !!session.claims;
          return _context.abrupt("return", session);

        case 29:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, null, Promise);
};

exports.InvalidAccessTokenError = InvalidAccessTokenError;
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
