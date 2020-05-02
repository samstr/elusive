'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var classCallCheck = require('./classCallCheck-d2bb402f.js');
var index = require('./index.js');
var FormErrors = require('./FormErrors-1539c4dc.js');
var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));

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
var InvalidAccessTokenError = /*#__PURE__*/function (_SessionError) {
  FormErrors._inherits(InvalidAccessTokenError, _SessionError);

  var _super2 = _createSuper(InvalidAccessTokenError);

  function InvalidAccessTokenError() {
    classCallCheck._classCallCheck(this, InvalidAccessTokenError);

    return _super2.apply(this, arguments);
  }

  return InvalidAccessTokenError;
}(SessionError);
var UserIdCookieAndTokenMismatchError = /*#__PURE__*/function (_SessionError2) {
  FormErrors._inherits(UserIdCookieAndTokenMismatchError, _SessionError2);

  var _super3 = _createSuper(UserIdCookieAndTokenMismatchError);

  function UserIdCookieAndTokenMismatchError() {
    classCallCheck._classCallCheck(this, UserIdCookieAndTokenMismatchError);

    return _super3.apply(this, arguments);
  }

  return UserIdCookieAndTokenMismatchError;
}(SessionError);
var InvalidRefreshTokenError = /*#__PURE__*/function (_SessionError3) {
  FormErrors._inherits(InvalidRefreshTokenError, _SessionError3);

  var _super4 = _createSuper(InvalidRefreshTokenError);

  function InvalidRefreshTokenError() {
    classCallCheck._classCallCheck(this, InvalidRefreshTokenError);

    return _super4.apply(this, arguments);
  }

  return InvalidRefreshTokenError;
}(SessionError);
var RefreshTokenExpiredError = /*#__PURE__*/function (_SessionError4) {
  FormErrors._inherits(RefreshTokenExpiredError, _SessionError4);

  var _super5 = _createSuper(RefreshTokenExpiredError);

  function RefreshTokenExpiredError() {
    classCallCheck._classCallCheck(this, RefreshTokenExpiredError);

    return _super5.apply(this, arguments);
  }

  return RefreshTokenExpiredError;
}(SessionError);
var SessionUserNoLongerExistsError = /*#__PURE__*/function (_SessionError5) {
  FormErrors._inherits(SessionUserNoLongerExistsError, _SessionError5);

  var _super6 = _createSuper(SessionUserNoLongerExistsError);

  function SessionUserNoLongerExistsError() {
    classCallCheck._classCallCheck(this, SessionUserNoLongerExistsError);

    return _super6.apply(this, arguments);
  }

  return SessionUserNoLongerExistsError;
}(SessionError);
var SessionUserNotEnabledError = /*#__PURE__*/function (_SessionError6) {
  FormErrors._inherits(SessionUserNotEnabledError, _SessionError6);

  var _super7 = _createSuper(SessionUserNotEnabledError);

  function SessionUserNotEnabledError() {
    classCallCheck._classCallCheck(this, SessionUserNotEnabledError);

    return _super7.apply(this, arguments);
  }

  return SessionUserNotEnabledError;
}(SessionError);

var __jsx = React__default.createElement;
var defaultValue = {
  isAuthenticated: false,
  claims: null
};
var SessionContext = React.createContext(defaultValue);
var SessionContextProvider = function SessionContextProvider(_ref) {
  var children = _ref.children;

  var _useState = React.useState(defaultValue),
      sessionContext = _useState[0],
      setSessionContext = _useState[1];

  var resetSessionContext = function resetSessionContext() {
    setSessionContext(defaultValue);
  };

  var context = {
    sessionContext: sessionContext,
    setSessionContext: setSessionContext,
    resetSessionContext: resetSessionContext
  };
  return __jsx(SessionContext.Provider, {
    value: context
  }, children);
};
SessionContextProvider.propTypes = {
  children: PropTypes.node.isRequired
};
var useSessionContext = function useSessionContext() {
  return React.useContext(SessionContext);
};

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
var deleteSessionCookieStrings = function deleteSessionCookieStrings() {
  var options = index.options.sessions;
  var expiryDate = new Date(0).toUTCString(); // set it in the past

  return [buildSessionCookieString(options.cookies.accessTokenName, '', expiryDate), buildSessionCookieString(options.cookies.refreshTokenName, '', expiryDate), buildSessionCookieString(options.cookies.userIdName, '', expiryDate)];
};
var deleteSessionCookies = function deleteSessionCookies(res) {
  res.setHeader('Set-Cookie', deleteSessionCookieStrings());
};
var getSession = function getSession(accessToken, refreshToken, userId) {};
/*export const validateSession = async (req, res) => {
  const { sessions: options } = Elusive.options;
  const { createTokenClaims, reloadUser } = options.callbacks;

  const session = {
    isAuthenticated: false,
    claims: null,
  };

  const {
    [options.cookies.accessTokenName]: accessToken,
    [options.cookies.refreshTokenName]: refreshToken,
    [options.cookies.userIdName]: userId,
  } = req.cookies;

  // Regardless of whether the route has requiresAuth: true/false
  // we always validate the request if the cookies are present incase
  // we need to regenerate tokens
  if (accessToken && refreshToken && userId) {
    const {
      claims: accessTokenClaims,
      expired: accessTokenExpired,
      invalid: accessTokenInvalid,
    } = verifyAccessTokenFromCookie(accessToken, options.jwt.secret);

    if (accessTokenInvalid) {
      throw new InvalidAccessTokenError('Invalid access token');
    }

    if (accessTokenClaims) {
      if (accessTokenClaims.user.id !== userId) {
        throw new UserIdCookieAndTokenMismatchError(
          'User id cookie does not match access token'
        );
      }

      session.claims = accessTokenClaims;

      // we don't need these on the object
      delete session.claims.iat;
      delete session.claims.exp;
    }

    if (accessTokenExpired) {
      // access token has expired (every 10 mins) so we need to generate a new one
      const {
        claims: refreshTokenClaims,
        expired: refreshTokenExpired,
        invalid: refreshTokenInvalid,
      } = verifyRefreshTokenFromCookie(refreshToken, options.jwt.secret);

      if (refreshTokenInvalid) {
        throw new InvalidRefreshTokenError('Invalid refresh token');
      }

      if (refreshTokenExpired) {
        // this should never happen since we're always refreshing it whenever we refresh an accessToken
        throw new RefreshTokenExpiredError('Refresh token expired');
      }

      if (refreshTokenClaims.user.id !== userId) {
        throw new UserIdCookieAndTokenMismatchError(
          'User id cookie does not match refresh token'
        );
      }

      const user = await reloadUser(refreshTokenClaims.user.id);

      session.claims = createTokenClaims(user);

      createSessionCookies(
        res,
        signTokens(session.claims, options.jwt.secret),
        user.id
      );
    }
  }

  session.isAuthenticated = !!session.claims;

  return session;
};
*/

exports.InvalidAccessTokenError = InvalidAccessTokenError;
exports.InvalidRefreshTokenError = InvalidRefreshTokenError;
exports.RefreshTokenExpiredError = RefreshTokenExpiredError;
exports.SessionContext = SessionContext;
exports.SessionContextProvider = SessionContextProvider;
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
exports.useSessionContext = useSessionContext;
