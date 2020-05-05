import { SALT_ROUNDS } from '../auth/config';
import { PASSWORD_RESET_EXPIRY_HOURS } from '../models/passwordResets/config';
import { apiSessionRoute, loginRoute, logoutRoute } from '../routes/config';
import {
  ACCESS_TOKEN_COOKIE_NAME,
  COOKIE_EXPIRY_MINS,
  REFRESH_TOKEN_COOKIE_NAME,
  USER_ID_COOKIE_NAME,
} from '../sessions/config';
import {
  ACCESS_TOKEN_EXPIRY_MINS,
  REFRESH_TOKEN_EXPIRY_MINS,
} from '../tokens/config';

class ElusiveClient {
  static instance;

  setDefaultOptions = () => {
    this.options = {
      auth: {
        passwordResetExpiryHours: PASSWORD_RESET_EXPIRY_HOURS,
        saltRounds: SALT_ROUNDS,
      },
      routes: {
        apiSession: apiSessionRoute,
        login: loginRoute,
        logout: logoutRoute,
      },
      firebase: {
        instance: null,
      },
      sendgrid: {
        fromEmail: 'no-reply@example.com',
        fromName: 'Example',
        instance: null,
        resetPasswordConfirmTemplateId: null,
        verifyEmailTemplateId: null,
      },
      sentry: {
        instance: null,
      },
      sessions: {
        accessTokenCookieName: ACCESS_TOKEN_COOKIE_NAME,
        cookieExpiryMins: COOKIE_EXPIRY_MINS,
        refreshTokenCookieName: REFRESH_TOKEN_COOKIE_NAME,
        userIdCookieName: USER_ID_COOKIE_NAME,
      },
      tokens: {
        accessTokenExpiryMins: ACCESS_TOKEN_EXPIRY_MINS,
        createClaims: null,
        refreshTokenExpiryMins: REFRESH_TOKEN_EXPIRY_MINS,
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
      const { fromEmail, fromName, instance } = sendgrid;

      if (fromEmail) {
        this.options.sendgrid.fromEmail = fromEmail;
      }

      if (fromName) {
        this.options.sendgrid.fromName = fromName;
      }

      if (instance) {
        this.options.sendgrid.instance = instance;
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
