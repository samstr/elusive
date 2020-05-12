class ElusiveClient {
  static instance;

  setDefaults() {
    this.services = {
      firebase: null,
      sendgrid: null,
      sentry: null,
    };

    this.options = {
      auth: {
        maxLoginAttemptsPerAccountPerHour: 8,
        maxLoginAttemptsPerIPPerHour: 16,
        maxRegistrationsPerDay: 5,
        maxResetAttemptsPerHour: 5,
        passwordMinLength: 3,
        passwordResetExpiryHours: 24,
        saltRounds: 10,
      },
      mail: {
        fromEmail: 'no-reply@example.com',
        fromName: 'Example',
        resetTemplateID: null,
        sendMailOnDevServer: false,
        signupTemplateID: null,
      },
      sessions: {
        accessTokenCookieName: 'at',
        cookieExpiryMins: 43800, // 1 month
        refreshTokenCookieName: 'rt',
        userIdCookieName: 'uid',
      },
      site: {
        name: 'Site name',
      },
      tokens: {
        accessTokenExpiryMins: 10,
        createClaims: null,
        refreshTokenExpiryMins: 43800, // 1 month
        secret: null,
      },
    };
  }

  init(services, options) {
    this.setDefaults();

    if (services) {
      const { firebase, sendgrid, sentry } = services;

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
      const { auth, mail, sessions, site, tokens } = options;

      if (auth) {
        const {
          maxLoginAttemptsPerAccountPerHour,
          maxLoginAttemptsPerIPPerHour,
          maxRegistrationsPerDay,
          maxResetAttemptsPerHour,
          passwordMinLength,
          passwordResetExpiryHours,
          saltRounds,
        } = auth;

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
        const {
          fromEmail,
          fromName,
          resetTemplateID,
          sendMailOnDevServer,
          signupTemplateID,
        } = mail;

        if (fromEmail) {
          this.options.mail.fromEmail = fromEmail;
        }

        if (fromName) {
          this.options.mail.fromName = fromName;
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
        const {
          accessTokenCookieName,
          cookieExpiryMins,
          refreshTokenCookieName,
          userIdCookieName,
        } = sessions;

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
        const { name } = site;

        if (name) {
          this.options.site.name = name;
        }
      }

      if (tokens) {
        const {
          accessTokenExpiryMins,
          createClaims,
          refreshTokenExpiryMins,
          secret,
        } = tokens;

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

  static getInstance() {
    if (ElusiveClient.instance) {
      return ElusiveClient.instance;
    }
    ElusiveClient.instance = new ElusiveClient();
    return ElusiveClient.instance;
  }
}

export default ElusiveClient;
