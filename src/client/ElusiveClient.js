import {
  BCRYPT_SALT_ROUNDS,
  COOKIES_ACCESS_TOKEN_NAME,
  COOKIES_EXPIRY_MINS,
  COOKIES_REFRESH_TOKEN_NAME,
  COOKIES_USER_ID_NAME,
  JWT_ACCESS_TOKEN_EXPIRY_MINS,
  JWT_REFRESH_TOKEN_EXPIRY_MINS,
} from '../sessions/config';

import { MissingJWTSecretOptionError } from './errors';

class ElusiveClient {
  static instance;

  setDefaultOptions = () => {
    this.options = {
      sessions: {
        bcrypt: {
          saltRounds: BCRYPT_SALT_ROUNDS,
        },
        cookies: {
          accessTokenName: COOKIES_ACCESS_TOKEN_NAME,
          expiryMins: COOKIES_EXPIRY_MINS,
          refreshTokenName: COOKIES_REFRESH_TOKEN_NAME,
          userIdName: COOKIES_USER_ID_NAME,
        },
        jwt: {
          accessTokenExpiryMins: JWT_ACCESS_TOKEN_EXPIRY_MINS,
          refreshTokenExpiryMins: JWT_REFRESH_TOKEN_EXPIRY_MINS,
          secret: null,
        },
        callbacks: {
          createTokenClaims: null,
          reloadUser: null,
        },
      },
      sentry: null,
    };
  };

  init = (options) => {
    this.setDefaultOptions();

    const { sentry, sessions } = options;

    if (sessions) {
      const { bcrypt, callbacks, cookies, jwt } = sessions;

      if (bcrypt) {
        const { saltRounds } = bcrypt;

        if (saltRounds) {
          this.options.sessions.bcrypt.saltRounds = saltRounds;
        }
      }

      if (callbacks) {
        const { createTokenClaims, reloadUser } = callbacks;

        if (createTokenClaims) {
          this.options.sessions.callbacks.createTokenClaims = createTokenClaims;
        }

        if (reloadUser) {
          this.options.sessions.callbacks.reloadUser = reloadUser;
        }
      }

      if (cookies) {
        const {
          accessTokenName,
          expiryMins,
          refreshTokenName,
          userIdName,
        } = cookies;

        if (accessTokenName) {
          this.options.sessions.cookies.accessTokenName = accessTokenName;
        }

        if (expiryMins) {
          this.options.sessions.cookies.expiryMins = expiryMins;
        }

        if (refreshTokenName) {
          this.options.sessions.cookies.refreshTokenName = refreshTokenName;
        }

        if (userIdName) {
          this.options.sessions.cookies.userIdName = userIdName;
        }
      }

      if (jwt) {
        const { accessTokenExpiryMins, refreshTokenExpiryMins, secret } = jwt;

        if (accessTokenExpiryMins) {
          this.options.sessions.jwt.accessTokenExpiryMins = accessTokenExpiryMins;
        }

        if (refreshTokenExpiryMins) {
          this.options.sessions.jwt.refreshTokenExpiryMins = refreshTokenExpiryMins;
        }

        if (secret) {
          this.options.sessions.jwt.secret = secret;
        } else {
          throw new MissingJWTSecretOptionError();
        }
      }
    }

    if (sentry) {
      this.options.sentry = sentry;
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
