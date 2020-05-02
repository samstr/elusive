import jwt, { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';

import Elusive from '../';

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
  const { sessions: options } = Elusive.options;
  const dateFuture = Date.now() + 60000 * options.cookies.expiryMins;
  const expiryDate = new Date(dateFuture).toUTCString();

  return [
    buildSessionCookieString(
      options.cookies.accessTokenName,
      tokens.access,
      expiryDate
    ),
    buildSessionCookieString(
      options.cookies.refreshTokenName,
      tokens.refresh,
      expiryDate
    ),
    buildSessionCookieString(options.cookies.userIdName, userId, expiryDate),
  ];
};

export const createSessionCookies = (res, tokens, userId) => {
  res.setHeader('Set-Cookie', createSessionCookieStrings(tokens, userId));
};

export const signToken = (claims, secret, expiryMins) =>
  jwt.sign(claims, secret, {
    expiresIn: expiryMins * 60,
  });

export const signTokens = (claims, secret) => {
  const { sessions: options } = Elusive.options;

  return {
    access: signToken(claims, secret, options.jwt.accessTokenExpiryMins),
    refresh: signToken(claims, secret, options.jwt.refreshTokenExpiryMins),
  };
};

export const deleteSessionCookieStrings = () => {
  const { sessions: options } = Elusive.options;
  const expiryDate = new Date(0).toUTCString(); // set it in the past

  return [
    buildSessionCookieString(options.cookies.accessTokenName, '', expiryDate),
    buildSessionCookieString(options.cookies.refreshTokenName, '', expiryDate),
    buildSessionCookieString(options.cookies.userIdName, '', expiryDate),
  ];
};

export const deleteSessionCookies = (res) => {
  res.setHeader('Set-Cookie', deleteSessionCookieStrings());
};

export const verifyToken = (token, secret) => jwt.verify(token, secret);

export const verifyAccessTokenFromCookie = (accessToken, secret) => {
  try {
    const claims = verifyToken(accessToken, secret);
    return { claims };
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      return { expired: true };
    } else if (err instanceof JsonWebTokenError) {
      return { invalid: true };
    }

    throw err;
  }
};

export const verifyRefreshTokenFromCookie = (refreshToken, secret) => {
  try {
    const claims = verifyToken(refreshToken, secret);
    return { claims };
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      return { expired: true };
    } else if (err instanceof JsonWebTokenError) {
      return { invalid: true };
    }

    throw err;
  }
};

export const getSession = (accessToken, refreshToken, userId) => {};

/*export const validateSession = async (req, res) => {
  const { sessions: options } = Elusive.options;
  const { createTokenClaims, reloadUser } = options.callbacks;

  const session = {
    isAuthenticated: false,
    claims: null,
  };

  const {
    [options.cookies.accessTokenName]: accessToken,
    [options.cookies.refreshTokenName]: refreshToken,
    [options.cookies.userIdName]: userId,
  } = req.cookies;

  // Regardless of whether the route has requiresAuth: true/false
  // we always validate the request if the cookies are present incase
  // we need to regenerate tokens
  if (accessToken && refreshToken && userId) {
    const {
      claims: accessTokenClaims,
      expired: accessTokenExpired,
      invalid: accessTokenInvalid,
    } = verifyAccessTokenFromCookie(accessToken, options.jwt.secret);

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
      // access token has expired (every 10 mins) so we need to generate a new one
      const {
        claims: refreshTokenClaims,
        expired: refreshTokenExpired,
        invalid: refreshTokenInvalid,
      } = verifyRefreshTokenFromCookie(refreshToken, options.jwt.secret);

      if (refreshTokenInvalid) {
        throw new InvalidRefreshTokenError('Invalid refresh token');
      }

      if (refreshTokenExpired) {
        // this should never happen since we're always refreshing it whenever we refresh an accessToken
        throw new RefreshTokenExpiredError('Refresh token expired');
      }

      if (refreshTokenClaims.user.id !== userId) {
        throw new UserIdCookieAndTokenMismatchError(
          'User id cookie does not match refresh token'
        );
      }

      const user = await reloadUser(refreshTokenClaims.user.id);

      session.claims = createTokenClaims(user);

      createSessionCookies(
        res,
        signTokens(session.claims, options.jwt.secret),
        user.id
      );
    }
  }

  session.isAuthenticated = !!session.claims;

  return session;
};
*/
