'use strict';

var wrapNativeSuper = require('./wrapNativeSuper-b3646a2a.js');
var defineProperty = require('./defineProperty-ba7cd53d.js');

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var BCRYPT_SALT_ROUNDS = 10;
var COOKIES_ACCESS_TOKEN_NAME = 'at';
var COOKIES_REFRESH_TOKEN_NAME = 'rt';
var COOKIES_USER_ID_NAME = 'uid';
var COOKIES_EXPIRY_MINS = 43800; // 1 month

var JWT_ACCESS_TOKEN_EXPIRY_MINS = 10;
var JWT_REFRESH_TOKEN_EXPIRY_MINS = 43800; // 1 month

var apiSessionRoute = function apiSessionRoute() {
  return '/api/session';
};
var loginRoute = function loginRoute() {
  return '/login';
};
var logoutRoute = function logoutRoute() {
  return '/logout';
};

function _createSuper(Derived) { return function () { var Super = wrapNativeSuper._getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = wrapNativeSuper._getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return wrapNativeSuper._possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var ClientError = /*#__PURE__*/function (_Error) {
  wrapNativeSuper._inherits(ClientError, _Error);

  var _super = _createSuper(ClientError);

  function ClientError() {
    wrapNativeSuper._classCallCheck(this, ClientError);

    return _super.apply(this, arguments);
  }

  return ClientError;
}( /*#__PURE__*/wrapNativeSuper._wrapNativeSuper(Error));
var MissingJWTSecretOptionError = /*#__PURE__*/function (_ClientError) {
  wrapNativeSuper._inherits(MissingJWTSecretOptionError, _ClientError);

  var _super2 = _createSuper(MissingJWTSecretOptionError);

  function MissingJWTSecretOptionError() {
    wrapNativeSuper._classCallCheck(this, MissingJWTSecretOptionError);

    return _super2.apply(this, arguments);
  }

  return MissingJWTSecretOptionError;
}(ClientError);

var ElusiveClient = /*#__PURE__*/function () {
  function ElusiveClient() {
    var _this = this;

    wrapNativeSuper._classCallCheck(this, ElusiveClient);

    defineProperty._defineProperty(this, "setDefaultOptions", function () {
      _this.options = {
        routes: {
          apiSession: apiSessionRoute,
          login: loginRoute,
          logout: logoutRoute
        },
        sessions: {
          bcrypt: {
            saltRounds: BCRYPT_SALT_ROUNDS
          },
          cookies: {
            accessTokenName: COOKIES_ACCESS_TOKEN_NAME,
            expiryMins: COOKIES_EXPIRY_MINS,
            refreshTokenName: COOKIES_REFRESH_TOKEN_NAME,
            userIdName: COOKIES_USER_ID_NAME
          },
          jwt: {
            accessTokenExpiryMins: JWT_ACCESS_TOKEN_EXPIRY_MINS,
            refreshTokenExpiryMins: JWT_REFRESH_TOKEN_EXPIRY_MINS,
            secret: null
          },
          callbacks: {
            createTokenClaims: null,
            reloadUser: null
          }
        },
        sentry: {
          dsn: null,
          enabled: false
        }
      };
    });

    defineProperty._defineProperty(this, "init", function (options) {
      _this.setDefaultOptions();

      var routes = options.routes,
          sentry = options.sentry,
          sessions = options.sessions;

      if (routes) {
        var apiSession = routes.apiSession,
            login = routes.login,
            logout = routes.logout;

        if (apiSession) {
          _this.options.routes.apiSession = apiSession;
        }

        if (login) {
          _this.options.routes.login = login;
        }

        if (logout) {
          _this.options.routes.logout = logout;
        }
      }

      if (sessions) {
        var bcrypt = sessions.bcrypt,
            callbacks = sessions.callbacks,
            cookies = sessions.cookies,
            jwt = sessions.jwt;

        if (bcrypt) {
          var saltRounds = bcrypt.saltRounds;

          if (saltRounds) {
            _this.options.sessions.bcrypt.saltRounds = saltRounds;
          }
        }

        if (callbacks) {
          var createTokenClaims = callbacks.createTokenClaims,
              reloadUser = callbacks.reloadUser;

          if (createTokenClaims) {
            _this.options.sessions.callbacks.createTokenClaims = createTokenClaims;
          }

          if (reloadUser) {
            _this.options.sessions.callbacks.reloadUser = reloadUser;
          }
        }

        if (cookies) {
          var accessTokenName = cookies.accessTokenName,
              expiryMins = cookies.expiryMins,
              refreshTokenName = cookies.refreshTokenName,
              userIdName = cookies.userIdName;

          if (accessTokenName) {
            _this.options.sessions.cookies.accessTokenName = accessTokenName;
          }

          if (expiryMins) {
            _this.options.sessions.cookies.expiryMins = expiryMins;
          }

          if (refreshTokenName) {
            _this.options.sessions.cookies.refreshTokenName = refreshTokenName;
          }

          if (userIdName) {
            _this.options.sessions.cookies.userIdName = userIdName;
          }
        }

        if (jwt) {
          var accessTokenExpiryMins = jwt.accessTokenExpiryMins,
              refreshTokenExpiryMins = jwt.refreshTokenExpiryMins,
              secret = jwt.secret;

          if (accessTokenExpiryMins) {
            _this.options.sessions.jwt.accessTokenExpiryMins = accessTokenExpiryMins;
          }

          if (refreshTokenExpiryMins) {
            _this.options.sessions.jwt.refreshTokenExpiryMins = refreshTokenExpiryMins;
          }

          if (secret) {
            _this.options.sessions.jwt.secret = secret;
          } else {
            if (typeof window === 'undefined') {
              throw new MissingJWTSecretOptionError();
            }
          }
        }
      }

      if (sentry) {
        var dsn = sentry.dsn,
            enabled = sentry.enabled;

        if (dsn) {
          _this.options.sentry.dsn = dsn;
        }

        if (enabled) {
          _this.options.sentry.enabled = enabled;
        }
      }
    });
  }

  _createClass(ElusiveClient, null, [{
    key: "getInstance",
    value: function getInstance() {
      if (ElusiveClient.instance) {
        return ElusiveClient.instance;
      }

      ElusiveClient.instance = new ElusiveClient();
      return ElusiveClient.instance;
    }
  }]);

  return ElusiveClient;
}();

defineProperty._defineProperty(ElusiveClient, "instance", void 0);

exports.BCRYPT_SALT_ROUNDS = BCRYPT_SALT_ROUNDS;
exports.COOKIES_ACCESS_TOKEN_NAME = COOKIES_ACCESS_TOKEN_NAME;
exports.COOKIES_EXPIRY_MINS = COOKIES_EXPIRY_MINS;
exports.COOKIES_REFRESH_TOKEN_NAME = COOKIES_REFRESH_TOKEN_NAME;
exports.COOKIES_USER_ID_NAME = COOKIES_USER_ID_NAME;
exports.ElusiveClient = ElusiveClient;
exports.JWT_ACCESS_TOKEN_EXPIRY_MINS = JWT_ACCESS_TOKEN_EXPIRY_MINS;
exports.JWT_REFRESH_TOKEN_EXPIRY_MINS = JWT_REFRESH_TOKEN_EXPIRY_MINS;
