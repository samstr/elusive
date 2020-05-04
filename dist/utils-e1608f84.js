'use strict';

var classCallCheck = require('./classCallCheck-d2bb402f.js');
var index = require('./index.js');
var FormErrors = require('./FormErrors-1539c4dc.js');
var index$1 = require('./index-2340470f.js');
var utils$2 = require('./utils-eecac740.js');

function _createSuper(Derived) { return function () { var Super = FormErrors._getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = FormErrors._getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return FormErrors._possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var SessionError = /*#__PURE__*/function (_BaseError) {
  FormErrors._inherits(SessionError, _BaseError);

  var _super = _createSuper(SessionError);

  function SessionError() {
    classCallCheck._classCallCheck(this, SessionError);

    return _super.apply(this, arguments);
  }

  return SessionError;
}(FormErrors.BaseError);
var MissingSessionCookiesError = /*#__PURE__*/function (_SessionError) {
  FormErrors._inherits(MissingSessionCookiesError, _SessionError);

  var _super2 = _createSuper(MissingSessionCookiesError);

  function MissingSessionCookiesError() {
    classCallCheck._classCallCheck(this, MissingSessionCookiesError);

    return _super2.apply(this, arguments);
  }

  return MissingSessionCookiesError;
}(SessionError);
var SessionUserIdMismatchError = /*#__PURE__*/function (_SessionError2) {
  FormErrors._inherits(SessionUserIdMismatchError, _SessionError2);

  var _super3 = _createSuper(SessionUserIdMismatchError);

  function SessionUserIdMismatchError() {
    classCallCheck._classCallCheck(this, SessionUserIdMismatchError);

    return _super3.apply(this, arguments);
  }

  return SessionUserIdMismatchError;
}(SessionError);
var SessionUserNoLongerExistsError = /*#__PURE__*/function (_SessionError3) {
  FormErrors._inherits(SessionUserNoLongerExistsError, _SessionError3);

  var _super4 = _createSuper(SessionUserNoLongerExistsError);

  function SessionUserNoLongerExistsError() {
    classCallCheck._classCallCheck(this, SessionUserNoLongerExistsError);

    return _super4.apply(this, arguments);
  }

  return SessionUserNoLongerExistsError;
}(SessionError);
var SessionUserNotEnabledError = /*#__PURE__*/function (_SessionError4) {
  FormErrors._inherits(SessionUserNotEnabledError, _SessionError4);

  var _super5 = _createSuper(SessionUserNotEnabledError);

  function SessionUserNotEnabledError() {
    classCallCheck._classCallCheck(this, SessionUserNotEnabledError);

    return _super5.apply(this, arguments);
  }

  return SessionUserNotEnabledError;
}(SessionError);

var buildSessionCookieString = function buildSessionCookieString(name, value, expiryDate) {
  return ["".concat(name, "=").concat(value), 'path=/', 'SameSite=Lax', "expires=".concat(expiryDate), 'HttpOnly', process.env.NODE_ENV === 'production' ? 'Secure;' : null].join(';');
};
var createSessionCookieStrings = function createSessionCookieStrings(tokens, userId) {
  var sessionOptions = index.options.sessions;
  var dateFuture = Date.now() + 60000 * sessionOptions.cookieExpiryMins;
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
var getSession = function getSession(req, reloadSessionUser) {
  var _Elusive$options, sessionOptions, tokenOptions, accessToken, refreshToken, userId, session, tokens, _getClaims, accessTokenClaims, accessTokenExpired, accessTokenInvalid, _getClaims2, refreshTokenClaims, refreshTokenExpired, refreshTokenInvalid, user;

  return index$1._regeneratorRuntime.async(function getSession$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _Elusive$options = index.options, sessionOptions = _Elusive$options.sessions, tokenOptions = _Elusive$options.tokens;
          accessToken = req.cookies[sessionOptions.accessTokenCookieName];
          refreshToken = req.cookies[sessionOptions.refreshTokenCookieName];
          userId = req.cookies[sessionOptions.userIdCookieName]; // all 3 cookies must exist if 1 does

          if (!(accessToken && (!refreshToken || !userId) || refreshToken && (!accessToken || !userId) || userId && (!accessToken || !refreshToken))) {
            _context.next = 6;
            break;
          }

          throw new MissingSessionCookiesError('Missing one or more session cookies');

        case 6:
          session = {
            isAuthenticated: false,
            claims: null
          };

          if (!(accessToken && refreshToken && userId)) {
            _context.next = 40;
            break;
          }

          _getClaims = utils$2.getClaims(accessToken, tokenOptions.secret), accessTokenClaims = _getClaims.claims, accessTokenExpired = _getClaims.expired, accessTokenInvalid = _getClaims.invalid;

          if (!accessTokenInvalid) {
            _context.next = 11;
            break;
          }

          throw new utils$2.InvalidAccessTokenError('Invalid access token');

        case 11:
          if (!accessTokenClaims) {
            _context.next = 17;
            break;
          }

          if (!(accessTokenClaims.user.id !== userId)) {
            _context.next = 14;
            break;
          }

          throw new SessionUserIdMismatchError('User id cookie does not match access token');

        case 14:
          session.claims = accessTokenClaims; // we don't need these on the object

          delete session.claims.iat;
          delete session.claims.exp;

        case 17:
          if (!accessTokenExpired) {
            _context.next = 40;
            break;
          }

          // access token has expired (every 10 mins) so we need to generate a new one from the refreshToken
          _getClaims2 = utils$2.getClaims(refreshToken, tokenOptions.secret), refreshTokenClaims = _getClaims2.claims, refreshTokenExpired = _getClaims2.expired, refreshTokenInvalid = _getClaims2.invalid;

          if (!refreshTokenInvalid) {
            _context.next = 21;
            break;
          }

          throw new utils$2.InvalidRefreshTokenError('Invalid refresh token');

        case 21:
          if (!refreshTokenExpired) {
            _context.next = 23;
            break;
          }

          throw new utils$2.RefreshTokenExpiredError('Refresh token expired');

        case 23:
          if (!(refreshTokenClaims.user.id !== userId)) {
            _context.next = 25;
            break;
          }

          throw new SessionUserIdMismatchError('User id cookie does not match refresh token');

        case 25:
          if (!reloadSessionUser) {
            _context.next = 37;
            break;
          }

          console.log('REFRESHING ACCESS TOKEN by reloading session user');
          _context.next = 29;
          return index$1._regeneratorRuntime.awrap(sessionOptions.reloadUser(refreshTokenClaims.user.id));

        case 29:
          user = _context.sent;

          if (user) {
            _context.next = 32;
            break;
          }

          throw new SessionUserNoLongerExistsError('Session user no longer exists.');

        case 32:
          if (user.enabled) {
            _context.next = 34;
            break;
          }

          throw new SessionUserNotEnabledError('Session user not enabled.');

        case 34:
          session.claims = tokenOptions.createClaims(user);
          _context.next = 39;
          break;

        case 37:
          console.log('returning refreshTokenClaims');
          session.claims = refreshTokenClaims;

        case 39:
          tokens = utils$2.signTokens(session.claims, tokenOptions.secret);

        case 40:
          session.isAuthenticated = !!session.claims;
          return _context.abrupt("return", {
            session: session,
            tokens: tokens
          });

        case 42:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, null, Promise);
};

exports.SessionError = SessionError;
exports.SessionUserIdMismatchError = SessionUserIdMismatchError;
exports.SessionUserNoLongerExistsError = SessionUserNoLongerExistsError;
exports.SessionUserNotEnabledError = SessionUserNotEnabledError;
exports.buildSessionCookieString = buildSessionCookieString;
exports.createSessionCookieStrings = createSessionCookieStrings;
exports.createSessionCookies = createSessionCookies;
exports.deleteSessionCookieStrings = deleteSessionCookieStrings;
exports.deleteSessionCookies = deleteSessionCookies;
exports.getSession = getSession;
