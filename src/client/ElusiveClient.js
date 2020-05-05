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
        passwordResetExpiryHours: 24,
        saltRounds: 10,
      },
      routes: {
        apiSession: () => '/api/session',
        login: () => '/login',
        logout: () => '/logout',
      },
      mail: {
        fromEmail: 'no-reply@example.com',
        fromName: 'Example',
        resetPasswordRequestTemplateId: null,
        verifyEmailTemplateId: null,
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

    const { auth, routes, mail, sessions, tokens } = options;

    if (auth) {
      const { saltRounds } = auth;

      if (saltRounds) {
        this.options.auth.saltRounds = saltRounds;
      }
    }

    if (routes) {
      const { apiSession, login, logout } = routes;

      if (apiSession) {
        this.options.routes.apiSession = apiSession;
      }

      if (login) {
        this.options.routes.login = login;
      }

      if (logout) {
        this.options.routes.logout = logout;
      }
    }

    if (mail) {
      const {
        fromEmail,
        fromName,
        resetPasswordRequestTemplateId,
        verifyEmailTemplateId,
      } = mail;

      if (fromEmail) {
        this.options.mail.fromEmail = fromEmail;
      }

      if (fromName) {
        this.options.mail.fromName = fromName;
      }

      if (resetPasswordRequestTemplateId) {
        this.options.mail.resetPasswordRequestTemplateId = resetPasswordRequestTemplateId;
      }

      if (verifyEmailTemplateId) {
        this.options.mail.verifyEmailTemplateId = verifyEmailTemplateId;
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
