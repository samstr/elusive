'use strict';

var classCallCheck = require('./classCallCheck-d2bb402f.js');
var defineProperty = require('./defineProperty-ba7cd53d.js');
var utils = require('./utils-1794fb54.js');

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

var SALT_ROUNDS = 10;

var ACCESS_TOKEN_COOKIE_NAME = 'at';
var COOKIE_EXPIRY_MINS = 43800; // 1 month

var REFRESH_TOKEN_COOKIE_NAME = 'rt';
var USER_ID_COOKIE_NAME = 'uid';

var ACCESS_TOKEN_EXPIRY_MINS = 10;
var REFRESH_TOKEN_EXPIRY_MINS = 43800; // 1 month

var ElusiveClient = /*#__PURE__*/function () {
  function ElusiveClient() {
    var _this = this;

    classCallCheck._classCallCheck(this, ElusiveClient);

    defineProperty._defineProperty(this, "setDefaultOptions", function () {
      _this.options = {
        auth: {
          saltRounds: SALT_ROUNDS
        },
        routes: {
          apiSession: utils.apiSessionRoute,
          login: utils.loginRoute,
          logout: utils.logoutRoute
        },
        sessions: {
          accessTokenName: ACCESS_TOKEN_COOKIE_NAME,
          expiryMins: COOKIE_EXPIRY_MINS,
          refreshTokenName: REFRESH_TOKEN_COOKIE_NAME,
          reloadUser: null,
          userIdName: USER_ID_COOKIE_NAME
        },
        sentry: {
          dsn: null,
          enabled: false
        },
        tokens: {
          accessTokenExpiryMins: ACCESS_TOKEN_EXPIRY_MINS,
          createTokenClaims: null,
          refreshTokenExpiryMins: REFRESH_TOKEN_EXPIRY_MINS,
          secret: null
        }
      };
    });

    defineProperty._defineProperty(this, "init", function (options) {
      _this.setDefaultOptions();

      var auth = options.auth,
          routes = options.routes,
          sentry = options.sentry,
          sessions = options.sessions;

      if (auth) {
        var saltRounds = auth.saltRounds;

        if (saltRounds) {
          _this.options.auth.saltRounds = saltRounds;
        }
      }

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
        var accessTokenName = sessions.accessTokenName,
            expiryMins = sessions.expiryMins,
            refreshTokenName = sessions.refreshTokenName,
            reloadUser = sessions.reloadUser,
            userIdName = sessions.userIdName;

        if (accessTokenName) {
          _this.options.sessions.accessTokenName = accessTokenName;
        }

        if (expiryMins) {
          _this.options.sessions.expiryMins = expiryMins;
        }

        if (refreshTokenName) {
          _this.options.sessions.refreshTokenName = refreshTokenName;
        }

        if (reloadUser) {
          _this.options.sessions.reloadUser = reloadUser;
        }

        if (userIdName) {
          _this.options.sessions.userIdName = userIdName;
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

      if (tokens) {
        var _tokens = tokens,
            accessTokenExpiryMins = _tokens.accessTokenExpiryMins,
            createTokenClaims = _tokens.createTokenClaims,
            refreshTokenExpiryMins = _tokens.refreshTokenExpiryMins,
            secret = _tokens.secret;

        if (accessTokenExpiryMins) {
          _this.options.tokens.accessTokenExpiryMins = accessTokenExpiryMins;
        }

        if (createTokenClaims) {
          _this.options.tokens.createTokenClaims = createTokenClaims;
        }

        if (refreshTokenExpiryMins) {
          _this.options.tokens.refreshTokenExpiryMins = refreshTokenExpiryMins;
        }

        if (secret) {
          _this.options.tokens.secret = secret;
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

exports.ACCESS_TOKEN_COOKIE_NAME = ACCESS_TOKEN_COOKIE_NAME;
exports.ACCESS_TOKEN_EXPIRY_MINS = ACCESS_TOKEN_EXPIRY_MINS;
exports.COOKIE_EXPIRY_MINS = COOKIE_EXPIRY_MINS;
exports.ElusiveClient = ElusiveClient;
exports.REFRESH_TOKEN_COOKIE_NAME = REFRESH_TOKEN_COOKIE_NAME;
exports.REFRESH_TOKEN_EXPIRY_MINS = REFRESH_TOKEN_EXPIRY_MINS;
exports.SALT_ROUNDS = SALT_ROUNDS;
exports.USER_ID_COOKIE_NAME = USER_ID_COOKIE_NAME;
