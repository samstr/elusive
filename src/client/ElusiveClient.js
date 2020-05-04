import { SALT_ROUNDS } from '../auth/config';
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
        saltRounds: SALT_ROUNDS,
      },
      firebase: {
        instance: null,
      },
      routes: {
        apiSession: apiSessionRoute,
        login: loginRoute,
        logout: logoutRoute,
      },
      sessions: {
        accessTokenCookieName: ACCESS_TOKEN_COOKIE_NAME,
        cookieExpiryMins: COOKIE_EXPIRY_MINS,
        refreshTokenCookieName: REFRESH_TOKEN_COOKIE_NAME,
        reloadUser: null,
        userIdCookieName: USER_ID_COOKIE_NAME,
      },
      sentry: {
        dsn: null,
        enabled: false,
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

    const { auth, firebase, routes, sentry, sessions, tokens } = options;

    if (auth) {
      const { saltRounds } = auth;

      if (saltRounds) {
        this.options.auth.saltRounds = saltRounds;
      }
    }

    if (firebase) {
      const { instance } = firebase;

      if (instance) {
        this.options.firebase.instance = instance;
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

    if (sessions) {
      const {
        accessTokenCookieName,
        cookieExpiryMins,
        refreshTokenCookieName,
        reloadUser,
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

      if (reloadUser) {
        this.options.sessions.reloadUser = reloadUser;
      }

      if (userIdCookieName) {
        this.options.sessions.userIdCookieName = userIdCookieName;
      }
    }

    if (sentry) {
      const { dsn, enabled } = sentry;

      if (dsn) {
        this.options.sentry.dsn = dsn;
      }

      if (enabled) {
        this.options.sentry.enabled = enabled;
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
