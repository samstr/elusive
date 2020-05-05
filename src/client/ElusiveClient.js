class ElusiveClient {
  static instance;

  setDefaultOptions = () => {
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
      firebase: {
        instance: null,
      },
      sendgrid: {
        fromEmail: 'no-reply@example.com',
        fromName: 'Example',
        instance: null,
        resetPasswordRequestTemplateId: null,
        verifyEmailTemplateId: null,
      },
      sentry: {
        instance: null,
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

  init = (options) => {
    this.setDefaultOptions();

    const {
      auth,
      firebase,
      routes,
      sendgrid,
      sentry,
      sessions,
      tokens,
    } = options;

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

    if (firebase) {
      const { instance } = firebase;

      if (instance) {
        this.options.firebase.instance = instance;
      }
    }

    if (sendgrid) {
      const {
        fromEmail,
        fromName,
        instance,
        resetPasswordRequestTemplateId,
        verifyEmailTemplateId,
      } = sendgrid;

      if (fromEmail) {
        this.options.sendgrid.fromEmail = fromEmail;
      }

      if (fromName) {
        this.options.sendgrid.fromName = fromName;
      }

      if (instance) {
        this.options.sendgrid.instance = instance;
      }

      if (resetPasswordRequestTemplateId) {
        this.options.sendgrid.resetPasswordRequestTemplateId = resetPasswordRequestTemplateId;
      }

      if (verifyEmailTemplateId) {
        this.options.sendgrid.verifyEmailTemplateId = verifyEmailTemplateId;
      }
    }

    if (sentry) {
      const { instance } = sentry;

      if (instance) {
        this.options.sentry.instance = instance;
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
