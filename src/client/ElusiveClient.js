import { SALT_ROUNDS } from '../auth/config';
import { apiSessionRoute, loginRoute, logoutRoute } from '../routes/utils';
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
      routes: {
        apiSession: apiSessionRoute,
        login: loginRoute,
        logout: logoutRoute,
      },
      sessions: {
        accessTokenName: ACCESS_TOKEN_COOKIE_NAME,
        expiryMins: COOKIE_EXPIRY_MINS,
        refreshTokenName: REFRESH_TOKEN_COOKIE_NAME,
        reloadUser: null,
        userIdName: USER_ID_COOKIE_NAME,
      },
      sentry: {
        dsn: null,
        enabled: false,
      },
      tokens: {
        accessTokenExpiryMins: ACCESS_TOKEN_EXPIRY_MINS,
        createTokenClaims: null,
        refreshTokenExpiryMins: REFRESH_TOKEN_EXPIRY_MINS,
        secret: null,
      },
    };
  };

  init = (options) => {
    this.setDefaultOptions();

    const { auth, routes, sentry, sessions } = options;

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

    if (sessions) {
      const {
        accessTokenName,
        expiryMins,
        refreshTokenName,
        reloadUser,
        userIdName,
      } = sessions;

      if (accessTokenName) {
        this.options.sessions.accessTokenName = accessTokenName;
      }

      if (expiryMins) {
        this.options.sessions.expiryMins = expiryMins;
      }

      if (refreshTokenName) {
        this.options.sessions.refreshTokenName = refreshTokenName;
      }

      if (reloadUser) {
        this.options.sessions.reloadUser = reloadUser;
      }

      if (userIdName) {
        this.options.sessions.userIdName = userIdName;
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
        createTokenClaims,
        refreshTokenExpiryMins,
        secret,
      } = tokens;

      if (accessTokenExpiryMins) {
        this.options.tokens.accessTokenExpiryMins = accessTokenExpiryMins;
      }

      if (createTokenClaims) {
        this.options.tokens.createTokenClaims = createTokenClaims;
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
