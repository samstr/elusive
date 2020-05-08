class ElusiveClient {
  static instance;

  setDefaults = () => {
    this.services = {
      firebase: null,
      sendgrid: null,
      sentry: null,
    };

    this.options = {
      auth: {
        maxLoginAttemptsPerAccountPerHour: 8,
        maxLoginAttemptsPerIPPerHour: 16,
        maxPasswordResetAttemptsPerHour: 4,
        maxRegistrationsPerDay: 5,
        passwordMinLength: 3,
        passwordResetExpiryHours: 24,
        saltRounds: 10,
      },
      mail: {
        fromEmail: 'no-reply@example.com',
        fromName: 'Example',
        resetPasswordRequestTemplateID: null,
        sendMailOnDevServer: false,
        verifyEmailTemplateID: null,
      },
      sessions: {
        accessTokenCookieName: 'at',
        cookieExpiryMins: 43800, // 1 month
        refreshTokenCookieName: 'rt',
        userIdCookieName: 'uid',
      },
      tokens: {
        accessTokenExpiryMins: 10,
        createClaims: null,
        refreshTokenExpiryMins: 43800, // 1 month
        secret: null,
      },
    };
  };

  init = (services, options) => {
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
      const { auth, mail, sessions, tokens } = options;

      if (auth) {
        const {
          maxLoginAttemptsPerAccountPerHour,
          maxLoginAttemptsPerIPPerHour,
          maxPasswordResetAttemptsPerHour,
          maxRegistrationsPerDay,
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

        if (maxPasswordResetAttemptsPerHour) {
          this.options.auth.maxPasswordResetAttemptsPerHour = maxPasswordResetAttemptsPerHour;
        }

        if (maxRegistrationsPerDay) {
          this.options.auth.maxRegistrationsPerDay = maxRegistrationsPerDay;
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
          resetPasswordRequestTemplateID,
          sendMailOnDevServer,
          verifyEmailTemplateID,
        } = mail;

        if (fromEmail) {
          this.options.mail.fromEmail = fromEmail;
        }

        if (fromName) {
          this.options.mail.fromName = fromName;
        }

        if (resetPasswordRequestTemplateID) {
          this.options.mail.resetPasswordRequestTemplateID = resetPasswordRequestTemplateID;
        }

        if (sendMailOnDevServer) {
          this.options.mail.sendMailOnDevServer = sendMailOnDevServer;
        }

        if (verifyEmailTemplateID) {
          this.options.mail.verifyEmailTemplateID = verifyEmailTemplateID;
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
  };

  static getInstance() {
    if (ElusiveClient.instance) {
      return ElusiveClient.instance;
    }
    ElusiveClient.instance = new ElusiveClient();
    return ElusiveClient.instance;
  }
}

export default ElusiveClient;
