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
          maxLoginAttemptsPerAccountPerHour: 8,
          maxLoginAttemptsPerIPPerHour: 16,
          maxPasswordResetAttemptsPerHour: 4,
          maxRegistrationsPerDay: 5,
          passwordMinLength: 3,
          passwordResetExpiryHours: 24,
          saltRounds: 10
        },
        mail: {
          fromEmail: 'no-reply@example.com',
          fromName: 'Example',
          resetPasswordRequestTemplateID: null,
          verifyEmailTemplateID: null
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
            mail = options.mail,
            sessions = options.sessions,
            tokens = options.tokens;

        if (auth) {
          var maxLoginAttemptsPerAccountPerHour = auth.maxLoginAttemptsPerAccountPerHour,
              maxLoginAttemptsPerIPPerHour = auth.maxLoginAttemptsPerIPPerHour,
              maxPasswordResetAttemptsPerHour = auth.maxPasswordResetAttemptsPerHour,
              maxRegistrationsPerDay = auth.maxRegistrationsPerDay,
              passwordMinLength = auth.passwordMinLength,
              passwordResetExpiryHours = auth.passwordResetExpiryHours,
              saltRounds = auth.saltRounds;

          if (maxLoginAttemptsPerAccountPerHour) {
            _this.options.auth.maxLoginAttemptsPerAccountPerHour = maxLoginAttemptsPerAccountPerHour;
          }

          if (maxLoginAttemptsPerIPPerHour) {
            _this.options.auth.maxLoginAttemptsPerIPPerHour = maxLoginAttemptsPerIPPerHour;
          }

          if (maxPasswordResetAttemptsPerHour) {
            _this.options.auth.maxPasswordResetAttemptsPerHour = maxPasswordResetAttemptsPerHour;
          }

          if (maxRegistrationsPerDay) {
            _this.options.auth.maxRegistrationsPerDay = maxRegistrationsPerDay;
          }

          if (passwordMinLength) {
            _this.options.auth.passwordMinLength = passwordMinLength;
          }

          if (passwordResetExpiryHours) {
            _this.options.auth.passwordResetExpiryHours = passwordResetExpiryHours;
          }

          if (saltRounds) {
            _this.options.auth.saltRounds = saltRounds;
          }
        }

        if (mail) {
          var fromEmail = mail.fromEmail,
              fromName = mail.fromName,
              resetPasswordRequestTemplateID = mail.resetPasswordRequestTemplateID,
              verifyEmailTemplateID = mail.verifyEmailTemplateID;

          if (fromEmail) {
            _this.options.mail.fromEmail = fromEmail;
          }

          if (fromName) {
            _this.options.mail.fromName = fromName;
          }

          if (resetPasswordRequestTemplateID) {
            _this.options.mail.resetPasswordRequestTemplateID = resetPasswordRequestTemplateID;
          }

          if (verifyEmailTemplateID) {
            _this.options.mail.verifyEmailTemplateID = verifyEmailTemplateID;
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
