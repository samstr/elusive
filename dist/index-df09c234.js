'use strict';

var classCallCheck = require('./classCallCheck-d2bb402f.js');

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

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var ElusiveClient = /*#__PURE__*/function () {
  function ElusiveClient() {
    var _this = this;

    classCallCheck._classCallCheck(this, ElusiveClient);

    _defineProperty(this, "setDefaultOptions", function () {
      _this.options = {
        auth: {
          passwordResetExpiryHours: 24,
          saltRounds: 10
        },
        routes: {
          apiSession: function apiSession() {
            return '/api/session';
          },
          login: function login() {
            return '/login';
          },
          logout: function logout() {
            return '/logout';
          }
        },
        firebase: {
          instance: null
        },
        sendgrid: {
          fromEmail: 'no-reply@example.com',
          fromName: 'Example',
          instance: null,
          resetPasswordRequestTemplateId: null,
          verifyEmailTemplateId: null
        },
        sentry: {
          instance: null
        },
        sessions: {
          accessTokenCookieName: 'at',
          cookieExpiryMins: 43800,
          // 1 month
          refreshTokenCookieName: 'rt',
          userIdCookieName: 'uid'
        },
        tokens: {
          accessTokenExpiryMins: 10,
          createClaims: null,
          refreshTokenExpiryMins: 43800,
          // 1 month
          secret: null
        }
      };
    });

    _defineProperty(this, "init", function (options) {
      _this.setDefaultOptions();

      var auth = options.auth,
          firebase = options.firebase,
          routes = options.routes,
          sendgrid = options.sendgrid,
          sentry = options.sentry,
          sessions = options.sessions,
          tokens = options.tokens;

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

      if (firebase) {
        var instance = firebase.instance;

        if (instance) {
          _this.options.firebase.instance = instance;
        }
      }

      if (sendgrid) {
        var fromEmail = sendgrid.fromEmail,
            fromName = sendgrid.fromName,
            _instance = sendgrid.instance,
            resetPasswordRequestTemplateId = sendgrid.resetPasswordRequestTemplateId,
            verifyEmailTemplateId = sendgrid.verifyEmailTemplateId;

        if (fromEmail) {
          _this.options.sendgrid.fromEmail = fromEmail;
        }

        if (fromName) {
          _this.options.sendgrid.fromName = fromName;
        }

        if (_instance) {
          _this.options.sendgrid.instance = _instance;
        }

        if (resetPasswordRequestTemplateId) {
          _this.options.sendgrid.resetPasswordRequestTemplateId = resetPasswordRequestTemplateId;
        }

        if (verifyEmailTemplateId) {
          _this.options.sendgrid.verifyEmailTemplateId = verifyEmailTemplateId;
        }
      }

      if (sentry) {
        var _instance2 = sentry.instance;

        if (_instance2) {
          _this.options.sentry.instance = _instance2;
        }
      }

      if (sessions) {
        var accessTokenCookieName = sessions.accessTokenCookieName,
            cookieExpiryMins = sessions.cookieExpiryMins,
            refreshTokenCookieName = sessions.refreshTokenCookieName,
            userIdCookieName = sessions.userIdCookieName;

        if (accessTokenCookieName) {
          _this.options.sessions.accessTokenCookieName = accessTokenCookieName;
        }

        if (cookieExpiryMins) {
          _this.options.sessions.cookieExpiryMins = cookieExpiryMins;
        }

        if (refreshTokenCookieName) {
          _this.options.sessions.refreshTokenCookieName = refreshTokenCookieName;
        }

        if (userIdCookieName) {
          _this.options.sessions.userIdCookieName = userIdCookieName;
        }
      }

      if (tokens) {
        var accessTokenExpiryMins = tokens.accessTokenExpiryMins,
            createClaims = tokens.createClaims,
            refreshTokenExpiryMins = tokens.refreshTokenExpiryMins,
            secret = tokens.secret;

        if (accessTokenExpiryMins) {
          _this.options.tokens.accessTokenExpiryMins = accessTokenExpiryMins;
        }

        if (createClaims) {
          _this.options.tokens.createClaims = createClaims;
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

_defineProperty(ElusiveClient, "instance", void 0);

exports.ElusiveClient = ElusiveClient;
exports._defineProperty = _defineProperty;
