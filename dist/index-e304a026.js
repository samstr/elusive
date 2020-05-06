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

    _defineProperty(this, "setDefaults", function () {
      _this.services = {
        firebase: null,
        sendgrid: null,
        sentry: null
      };
      _this.options = {
        auth: {
          loginMaxAttemptsPerHour: 10,
          passwordMinLength: 3,
          passwordResetExpiryHours: 24,
          registrationMaxAccountsPerDay: 5,
          resetPasswordMaxRequestsPerHour: 5,
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
        mail: {
          fromEmail: 'no-reply@example.com',
          fromName: 'Example',
          resetPasswordRequestTemplateId: null,
          verifyEmailTemplateId: null
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

    _defineProperty(this, "init", function (services, options) {
      _this.setDefaults();

      if (services) {
        var firebase = services.firebase,
            sendgrid = services.sendgrid,
            sentry = services.sentry;

        if (firebase) {
          _this.services.firebase = firebase;
        }

        if (sendgrid) {
          _this.services.sendgrid = sendgrid;
        }

        if (sentry) {
          _this.services.sentry = sentry;
        }
      }

      if (options) {
        var auth = options.auth,
            routes = options.routes,
            mail = options.mail,
            sessions = options.sessions,
            tokens = options.tokens;

        if (auth) {
          var loginMaxAttemptsPerHour = auth.loginMaxAttemptsPerHour,
              passwordMinLength = auth.passwordMinLength,
              passwordResetExpiryHours = auth.passwordResetExpiryHours,
              registrationMaxAccountsPerDay = auth.registrationMaxAccountsPerDay,
              resetPasswordMaxRequestsPerHour = auth.resetPasswordMaxRequestsPerHour,
              saltRounds = auth.saltRounds;

          if (loginMaxAttemptsPerHour) {
            _this.options.auth.loginMaxAttemptsPerHour = loginMaxAttemptsPerHour;
          }

          if (passwordMinLength) {
            _this.options.auth.passwordMinLength = passwordMinLength;
          }

          if (passwordResetExpiryHours) {
            _this.options.auth.passwordResetExpiryHours = passwordResetExpiryHours;
          }

          if (registrationMaxAccountsPerDay) {
            _this.options.auth.registrationMaxAccountsPerDay = registrationMaxAccountsPerDay;
          }

          if (resetPasswordMaxRequestsPerHour) {
            _this.options.auth.resetPasswordMaxRequestsPerHour = resetPasswordMaxRequestsPerHour;
          }

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

        if (mail) {
          var fromEmail = mail.fromEmail,
              fromName = mail.fromName,
              resetPasswordRequestTemplateId = mail.resetPasswordRequestTemplateId,
              verifyEmailTemplateId = mail.verifyEmailTemplateId;

          if (fromEmail) {
            _this.options.mail.fromEmail = fromEmail;
          }

          if (fromName) {
            _this.options.mail.fromName = fromName;
          }

          if (resetPasswordRequestTemplateId) {
            _this.options.mail.resetPasswordRequestTemplateId = resetPasswordRequestTemplateId;
          }

          if (verifyEmailTemplateId) {
            _this.options.mail.verifyEmailTemplateId = verifyEmailTemplateId;
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
