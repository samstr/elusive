'use strict';

var classCallCheck = require('./classCallCheck-d2bb402f.js');
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

var ElusiveClient = /*#__PURE__*/function () {
  function ElusiveClient() {
    classCallCheck._classCallCheck(this, ElusiveClient);
  }

  _createClass(ElusiveClient, [{
    key: "setDefaults",
    value: function setDefaults() {
      this.services = {
        firebase: null,
        sendgrid: null,
        sentry: null
      };
      this.options = {
        auth: {
          magicLoginExpiryHours: 1,
          maxLoginAttemptsPerAccountPerHour: 8,
          maxLoginAttemptsPerIPPerHour: 16,
          maxRegistrationsPerDay: 5,
          maxResetAttemptsPerHour: 5,
          numDefaultProfilePictureVariations: 12,
          passwordMinLength: 3,
          passwordResetExpiryHours: 24,
          saltRounds: 10
        },
        mail: {
          fromEmail: 'no-reply@example.com',
          fromName: 'Example',
          loginTemplateID: null,
          resetTemplateID: null,
          sendMailOnDevServer: false,
          signupTemplateID: null
        },
        sessions: {
          accessTokenCookieName: 'at',
          cookieExpiryMins: 43800,
          // 1 month
          refreshTokenCookieName: 'rt',
          userIdCookieName: 'uid'
        },
        site: {
          name: 'Site name'
        },
        tokens: {
          accessTokenExpiryMins: 10,
          createClaims: null,
          refreshTokenExpiryMins: 43800,
          // 1 month
          secret: null
        }
      };
    }
  }, {
    key: "init",
    value: function init(services, options) {
      this.setDefaults();

      if (services) {
        var firebase = services.firebase,
            sendgrid = services.sendgrid,
            sentry = services.sentry;

        if (firebase) {
          this.services.firebase = firebase;
        }

        if (sendgrid) {
          this.services.sendgrid = sendgrid;
        }

        if (sentry) {
          this.services.sentry = sentry;
        }
      }

      if (options) {
        var auth = options.auth,
            mail = options.mail,
            sessions = options.sessions,
            site = options.site,
            tokens = options.tokens;

        if (auth) {
          var magicLoginExpiryHours = auth.magicLoginExpiryHours,
              maxLoginAttemptsPerAccountPerHour = auth.maxLoginAttemptsPerAccountPerHour,
              maxLoginAttemptsPerIPPerHour = auth.maxLoginAttemptsPerIPPerHour,
              maxRegistrationsPerDay = auth.maxRegistrationsPerDay,
              maxResetAttemptsPerHour = auth.maxResetAttemptsPerHour,
              numDefaultProfilePictureVariations = auth.numDefaultProfilePictureVariations,
              passwordMinLength = auth.passwordMinLength,
              passwordResetExpiryHours = auth.passwordResetExpiryHours,
              saltRounds = auth.saltRounds;

          if (magicLoginExpiryHours) {
            this.options.auth.magicLoginExpiryHours = magicLoginExpiryHours;
          }

          if (maxLoginAttemptsPerAccountPerHour) {
            this.options.auth.maxLoginAttemptsPerAccountPerHour = maxLoginAttemptsPerAccountPerHour;
          }

          if (maxLoginAttemptsPerIPPerHour) {
            this.options.auth.maxLoginAttemptsPerIPPerHour = maxLoginAttemptsPerIPPerHour;
          }

          if (maxRegistrationsPerDay) {
            this.options.auth.maxRegistrationsPerDay = maxRegistrationsPerDay;
          }

          if (maxResetAttemptsPerHour) {
            this.options.auth.maxResetAttemptsPerHour = maxResetAttemptsPerHour;
          }

          if (numDefaultProfilePictureVariations) {
            this.options.auth.numDefaultProfilePictureVariations = numDefaultProfilePictureVariations;
          }

          if (passwordMinLength) {
            this.options.auth.passwordMinLength = passwordMinLength;
          }

          if (passwordResetExpiryHours) {
            this.options.auth.passwordResetExpiryHours = passwordResetExpiryHours;
          }

          if (saltRounds) {
            this.options.auth.saltRounds = saltRounds;
          }
        }

        if (mail) {
          var fromEmail = mail.fromEmail,
              fromName = mail.fromName,
              loginTemplateID = mail.loginTemplateID,
              resetTemplateID = mail.resetTemplateID,
              sendMailOnDevServer = mail.sendMailOnDevServer,
              signupTemplateID = mail.signupTemplateID;

          if (fromEmail) {
            this.options.mail.fromEmail = fromEmail;
          }

          if (fromName) {
            this.options.mail.fromName = fromName;
          }

          if (loginTemplateID) {
            this.options.mail.loginTemplateID = loginTemplateID;
          }

          if (resetTemplateID) {
            this.options.mail.resetTemplateID = resetTemplateID;
          }

          if (sendMailOnDevServer) {
            this.options.mail.sendMailOnDevServer = sendMailOnDevServer;
          }

          if (signupTemplateID) {
            this.options.mail.signupTemplateID = signupTemplateID;
          }
        }

        if (sessions) {
          var accessTokenCookieName = sessions.accessTokenCookieName,
              cookieExpiryMins = sessions.cookieExpiryMins,
              refreshTokenCookieName = sessions.refreshTokenCookieName,
              userIdCookieName = sessions.userIdCookieName;

          if (accessTokenCookieName) {
            this.options.sessions.accessTokenCookieName = accessTokenCookieName;
          }

          if (cookieExpiryMins) {
            this.options.sessions.cookieExpiryMins = cookieExpiryMins;
          }

          if (refreshTokenCookieName) {
            this.options.sessions.refreshTokenCookieName = refreshTokenCookieName;
          }

          if (userIdCookieName) {
            this.options.sessions.userIdCookieName = userIdCookieName;
          }
        }

        if (site) {
          var name = site.name;

          if (name) {
            this.options.site.name = name;
          }
        }

        if (tokens) {
          var accessTokenExpiryMins = tokens.accessTokenExpiryMins,
              createClaims = tokens.createClaims,
              refreshTokenExpiryMins = tokens.refreshTokenExpiryMins,
              secret = tokens.secret;

          if (accessTokenExpiryMins) {
            this.options.tokens.accessTokenExpiryMins = accessTokenExpiryMins;
          }

          if (createClaims) {
            this.options.tokens.createClaims = createClaims;
          }

          if (refreshTokenExpiryMins) {
            this.options.tokens.refreshTokenExpiryMins = refreshTokenExpiryMins;
          }

          if (secret) {
            this.options.tokens.secret = secret;
          }
        }
      }
    }
  }], [{
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

exports.ElusiveClient = ElusiveClient;
