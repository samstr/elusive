'use strict';

var classCallCheck = require('./classCallCheck-d2bb402f.js');
var index = require('./index.js');
var index$1 = require('./index-73b8f147.js');
var errors = require('./errors-2aa6e0aa.js');
require('./FormErrors-9579dce8.js');
var utils$2 = require('./utils-b756bb3f.js');

function _createSuper(Derived) { return function () { var Super = errors._getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = errors._getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return errors._possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var SessionError = /*#__PURE__*/function (_BaseError) {
  errors._inherits(SessionError, _BaseError);

  var _super = _createSuper(SessionError);

  function SessionError() {
    classCallCheck._classCallCheck(this, SessionError);

    return _super.apply(this, arguments);
  }

  return SessionError;
}(errors.BaseError);
var InvalidAccessTokenError = /*#__PURE__*/function (_SessionError) {
  errors._inherits(InvalidAccessTokenError, _SessionError);

  var _super2 = _createSuper(InvalidAccessTokenError);

  function InvalidAccessTokenError() {
    classCallCheck._classCallCheck(this, InvalidAccessTokenError);

    return _super2.apply(this, arguments);
  }

  return InvalidAccessTokenError;
}(SessionError);
var UserIdCookieAndTokenMismatchError = /*#__PURE__*/function (_SessionError2) {
  errors._inherits(UserIdCookieAndTokenMismatchError, _SessionError2);

  var _super3 = _createSuper(UserIdCookieAndTokenMismatchError);

  function UserIdCookieAndTokenMismatchError() {
    classCallCheck._classCallCheck(this, UserIdCookieAndTokenMismatchError);

    return _super3.apply(this, arguments);
  }

  return UserIdCookieAndTokenMismatchError;
}(SessionError);
var InvalidRefreshTokenError = /*#__PURE__*/function (_SessionError3) {
  errors._inherits(InvalidRefreshTokenError, _SessionError3);

  var _super4 = _createSuper(InvalidRefreshTokenError);

  function InvalidRefreshTokenError() {
    classCallCheck._classCallCheck(this, InvalidRefreshTokenError);

    return _super4.apply(this, arguments);
  }

  return InvalidRefreshTokenError;
}(SessionError);
var RefreshTokenExpiredError = /*#__PURE__*/function (_SessionError4) {
  errors._inherits(RefreshTokenExpiredError, _SessionError4);

  var _super5 = _createSuper(RefreshTokenExpiredError);

  function RefreshTokenExpiredError() {
    classCallCheck._classCallCheck(this, RefreshTokenExpiredError);

    return _super5.apply(this, arguments);
  }

  return RefreshTokenExpiredError;
}(SessionError);
var SessionUserNoLongerExistsError = /*#__PURE__*/function (_SessionError5) {
  errors._inherits(SessionUserNoLongerExistsError, _SessionError5);

  var _super6 = _createSuper(SessionUserNoLongerExistsError);

  function SessionUserNoLongerExistsError() {
    classCallCheck._classCallCheck(this, SessionUserNoLongerExistsError);

    return _super6.apply(this, arguments);
  }

  return SessionUserNoLongerExistsError;
}(SessionError);
var SessionUserNotEnabledError = /*#__PURE__*/function (_SessionError6) {
  errors._inherits(SessionUserNotEnabledError, _SessionError6);

  var _super7 = _createSuper(SessionUserNotEnabledError);

  function SessionUserNotEnabledError() {
    classCallCheck._classCallCheck(this, SessionUserNotEnabledError);

    return _super7.apply(this, arguments);
  }

  return SessionUserNotEnabledError;
}(SessionError);

var buildSessionCookieString = function buildSessionCookieString(name, value, expiryDate) {
  return ["".concat(name, "=").concat(value), 'path=/', 'SameSite=Lax', "expires=".concat(expiryDate), 'HttpOnly', process.env.NODE_ENV === 'production' ? 'Secure;' : null].join(';');
};
var createSessionCookieStrings = function createSessionCookieStrings(tokens, userId) {
  var sessionOptions = index.options.sessions;
  var dateFuture = Date.now() + 60000 * sessionOptions.expiryMins;
  var expiryDate = new Date(dateFuture).toUTCString();
  return [buildSessionCookieString(sessionOptions.accessTokenCookieName, tokens.access, expiryDate), buildSessionCookieString(sessionOptions.refreshTokenCookieName, tokens.refresh, expiryDate), buildSessionCookieString(sessionOptions.userIdCookieName, userId, expiryDate)];
};
var createSessionCookies = function createSessionCookies(res, tokens, userId) {
  res.setHeader('Set-Cookie', createSessionCookieStrings(tokens, userId));
};
var deleteSessionCookieStrings = function deleteSessionCookieStrings() {
  var sessionOptions = index.options.sessions;
  var expiryDate = new Date(0).toUTCString(); // set it in the past

  return [buildSessionCookieString(sessionOptions.accessTokenCookieName, '', expiryDate), buildSessionCookieString(sessionOptions.refreshTokenCookieName, '', expiryDate), buildSessionCookieString(sessionOptions.userIdCookieName, '', expiryDate)];
};
var deleteSessionCookies = function deleteSessionCookies(res) {
  res.setHeader('Set-Cookie', deleteSessionCookieStrings());
};
var getSession = function getSession(accessToken, refreshToken, userId, reloadSessionUser) {
  var _Elusive$options, sessionOptions, tokenOptions, session, tokens, _getClaims, accessTokenClaims, accessTokenExpired, accessTokenInvalid, _getClaims2, refreshTokenClaims, refreshTokenExpired, refreshTokenInvalid, user;

  return index$1._regeneratorRuntime.async(function getSession$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _Elusive$options = index.options, sessionOptions = _Elusive$options.sessions, tokenOptions = _Elusive$options.tokens;
          session = {
            isAuthenticated: false,
            claims: null
          };

          if (!(accessToken && refreshToken && userId)) {
            _context.next = 31;
            break;
          }

          _getClaims = utils$2.getClaims(accessToken, tokenOptions.secret), accessTokenClaims = _getClaims.claims, accessTokenExpired = _getClaims.expired, accessTokenInvalid = _getClaims.invalid;

          if (!accessTokenInvalid) {
            _context.next = 6;
            break;
          }

          throw new InvalidAccessTokenError('Invalid access token');

        case 6:
          if (!accessTokenClaims) {
            _context.next = 12;
            break;
          }

          if (!(accessTokenClaims.user.id !== userId)) {
            _context.next = 9;
            break;
          }

          throw new UserIdCookieAndTokenMismatchError('User id cookie does not match access token');

        case 9:
          session.claims = accessTokenClaims; // we don't need these on the object

          delete session.claims.iat;
          delete session.claims.exp;

        case 12:
          if (!accessTokenExpired) {
            _context.next = 31;
            break;
          }

          // access token has expired (every 10 mins) so we need to generate a new one from the refreshToken
          _getClaims2 = utils$2.getClaims(refreshToken, tokenOptions.secret), refreshTokenClaims = _getClaims2.claims, refreshTokenExpired = _getClaims2.expired, refreshTokenInvalid = _getClaims2.invalid;

          if (!refreshTokenInvalid) {
            _context.next = 16;
            break;
          }

          throw new InvalidRefreshTokenError('Invalid refresh token');

        case 16:
          if (!refreshTokenExpired) {
            _context.next = 18;
            break;
          }

          throw new RefreshTokenExpiredError('Refresh token expired');

        case 18:
          if (!(refreshTokenClaims.user.id !== userId)) {
            _context.next = 20;
            break;
          }

          throw new UserIdCookieAndTokenMismatchError('User id cookie does not match refresh token');

        case 20:
          if (!reloadSessionUser) {
            _context.next = 28;
            break;
          }

          console.log('REFRESHING ACCESS TOKEN by reloading session user');
          _context.next = 24;
          return index$1._regeneratorRuntime.awrap(sessionOptions.reloadUser(refreshTokenClaims.user.id));

        case 24:
          user = _context.sent;
          session.claims = tokenOptions.createClaims(user);
          _context.next = 30;
          break;

        case 28:
          console.log('returning refreshTokenClaims');
          session.claims = refreshTokenClaims;

        case 30:
          tokens = utils$2.signTokens(session.claims, tokenOptions.secret);

        case 31:
          session.isAuthenticated = !!session.claims;
          return _context.abrupt("return", {
            session: session,
            tokens: tokens
          });

        case 33:
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
exports.createSessionCookieStrings = createSessionCookieStrings;
exports.createSessionCookies = createSessionCookies;
exports.deleteSessionCookieStrings = deleteSessionCookieStrings;
exports.deleteSessionCookies = deleteSessionCookies;
exports.getSession = getSession;
