import Elusive from '../';

import { getClaims, signTokens } from '../tokens';
import {
  InvalidAccessTokenError,
  InvalidRefreshTokenError,
  RefreshTokenExpiredError,
  UserIdCookieAndTokenMismatchError,
} from './errors';

export const buildSessionCookieString = (name, value, expiryDate) =>
  [
    `${name}=${value}`,
    'path=/',
    'SameSite=Lax',
    `expires=${expiryDate}`,
    'HttpOnly',
    process.env.NODE_ENV === 'production' ? 'Secure;' : null,
  ].join(';');

export const createSessionCookieStrings = (tokens, userId) => {
  const { sessions: sessionOptions } = Elusive.options;
  const dateFuture = Date.now() + 60000 * sessionOptions.cookieExpiryMins;
  const expiryDate = new Date(dateFuture).toUTCString();

  return [
    buildSessionCookieString(
      sessionOptions.accessTokenCookieName,
      tokens.access,
      expiryDate
    ),
    buildSessionCookieString(
      sessionOptions.refreshTokenCookieName,
      tokens.refresh,
      expiryDate
    ),
    buildSessionCookieString(
      sessionOptions.userIdCookieName,
      userId,
      expiryDate
    ),
  ];
};

export const createSessionCookies = (res, tokens, userId) => {
  res.setHeader('Set-Cookie', createSessionCookieStrings(tokens, userId));
};

export const deleteSessionCookieStrings = () => {
  const { sessions: sessionOptions } = Elusive.options;
  const expiryDate = new Date(0).toUTCString(); // set it in the past

  return [
    buildSessionCookieString(
      sessionOptions.accessTokenCookieName,
      '',
      expiryDate
    ),
    buildSessionCookieString(
      sessionOptions.refreshTokenCookieName,
      '',
      expiryDate
    ),
    buildSessionCookieString(sessionOptions.userIdCookieName, '', expiryDate),
  ];
};

export const deleteSessionCookies = (res) => {
  res.setHeader('Set-Cookie', deleteSessionCookieStrings());
};

export const getSession = async (
  accessToken,
  refreshToken,
  userId,
  reloadSessionUser
) => {
  const { sessions: sessionOptions, tokens: tokenOptions } = Elusive.options;

  let session = {
    isAuthenticated: false,
    claims: null,
  };
  let tokens;

  if (accessToken && refreshToken && userId) {
    const {
      claims: accessTokenClaims,
      expired: accessTokenExpired,
      invalid: accessTokenInvalid,
    } = getClaims(accessToken, tokenOptions.secret);

    if (accessTokenInvalid) {
      throw new InvalidAccessTokenError('Invalid access token');
    }

    if (accessTokenClaims) {
      if (accessTokenClaims.user.id !== userId) {
        throw new UserIdCookieAndTokenMismatchError(
          'User id cookie does not match access token'
        );
      }

      session.claims = accessTokenClaims;

      // we don't need these on the object
      delete session.claims.iat;
      delete session.claims.exp;
    }

    if (accessTokenExpired) {
      // access token has expired (every 10 mins) so we need to generate a new one from the refreshToken
      const {
        claims: refreshTokenClaims,
        expired: refreshTokenExpired,
        invalid: refreshTokenInvalid,
      } = getClaims(refreshToken, tokenOptions.secret);

      if (refreshTokenInvalid) {
        throw new InvalidRefreshTokenError('Invalid refresh token');
      }

      if (refreshTokenExpired) {
        // this should never happen since we're always refreshing it whenever /api/session gets requested
        throw new RefreshTokenExpiredError('Refresh token expired');
      }

      if (refreshTokenClaims.user.id !== userId) {
        throw new UserIdCookieAndTokenMismatchError(
          'User id cookie does not match refresh token'
        );
      }

      if (reloadSessionUser) {
        console.log('REFRESHING ACCESS TOKEN by reloading session user');

        const user = await sessionOptions.reloadUser(
          refreshTokenClaims.user.id
        );
        session.claims = tokenOptions.createClaims(user);
      } else {
        console.log('returning refreshTokenClaims');
        session.claims = refreshTokenClaims;
      }

      tokens = signTokens(session.claims, tokenOptions.secret);
    }
  }

  session.isAuthenticated = !!session.claims;

  return { session, tokens };
};
