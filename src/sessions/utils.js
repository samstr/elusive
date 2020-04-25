import bcrypt from 'bcryptjs';
import { parseCookies } from 'nookies';
import jwt, { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';

export const JWT_ACCESS_TOKEN_EXPIRY_MINS = 3; // XXX set to 10
export const JWT_REFRESH_TOKEN_EXPIRY_MINS = 43800; // 1 month

export const ACCESS_TOKEN_COOKIE_NAME = 'at';
export const REFRESH_TOKEN_COOKIE_NAME = 'rt';
export const USER_ID_COOKIE_NAME = 'uid';
export const COOKIE_EXPIRY_MINS = 43800; // 1 month

const BCRYPT_SALT_ROUNDS = 10;

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
  const dateFuture = Date.now() + 60000 * COOKIE_EXPIRY_MINS;
  const expiryDate = new Date(dateFuture).toUTCString();

  return [
    buildSessionCookieString(
      ACCESS_TOKEN_COOKIE_NAME,
      tokens.access,
      expiryDate
    ),
    buildSessionCookieString(
      REFRESH_TOKEN_COOKIE_NAME,
      tokens.refresh,
      expiryDate
    ),
    buildSessionCookieString(USER_ID_COOKIE_NAME, userId, expiryDate),
  ];
};

export const createSessionCookies = (res, tokens, userId) => {
  res.setHeader('Set-Cookie', createSessionCookieStrings(tokens, userId));
};

export const hashPassword = (password) =>
  bcrypt.hashSync(password, BCRYPT_SALT_ROUNDS);

export const comparePasswordHash = (password, hash) =>
  bcrypt.compareSync(password, hash);

export const signToken = (claims, secret, expiryMins) =>
  jwt.sign(claims, secret, {
    expiresIn: expiryMins * 60,
  });

export const signTokens = (claims, secret) => ({
  access: signToken(claims, secret, JWT_ACCESS_TOKEN_EXPIRY_MINS),
  refresh: signToken(claims, secret, JWT_REFRESH_TOKEN_EXPIRY_MINS),
});

export const deleteSessionCookieStrings = () => {
  const expiryDate = new Date(0).toUTCString(); // set it in the past

  return [
    buildSessionCookieString(ACCESS_TOKEN_COOKIE_NAME, '', expiryDate),
    buildSessionCookieString(REFRESH_TOKEN_COOKIE_NAME, '', expiryDate),
    buildSessionCookieString(USER_ID_COOKIE_NAME, '', expiryDate),
  ];
};

export const deleteSessionCookies = (res) => {
  res.setHeader('Set-Cookie', deleteSessionCookieStrings());
};

export const verifyToken = (token, secret) => jwt.verify(token, secret);

export const verifyAccessTokenFromCookie = (accessToken, secret) => {
  try {
    const decoded = verifyToken(accessToken, secret);
    return { decoded };
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
    const decoded = verifyToken(refreshToken, secret);
    return { decoded };
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      return { expired: true };
    } else if (err instanceof JsonWebTokenError) {
      return { invalid: true };
    }

    throw err;
  }
};

export const validateSession = async (req, res, config) => {
  const { createTokenClaims, getUser, jwtSecret } = config;

  const session = {
    isAuthenticated: false,
    claims: null,
  };

  const cookies = parseCookies({ req, res });
  const accessToken = cookies[ACCESS_TOKEN_COOKIE_NAME];
  const refreshToken = cookies[REFRESH_TOKEN_COOKIE_NAME];
  const userId = cookies[USER_ID_COOKIE_NAME];

  // Regardless of whether the route has requiresAuth: true/false
  // we always validate the request if the cookies are present incase
  // we need to regenerate tokens
  if (accessToken && refreshToken && userId) {
    const {
      decoded: accessTokenDecoded,
      expired: accessTokenExpired,
      invalid: accessTokenInvalid,
    } = verifyAccessTokenFromCookie(accessToken, jwtSecret);

    if (accessTokenInvalid) {
      throw new InvalidAccessTokenError();
    }

    if (accessTokenDecoded) {
      if (accessTokenDecoded.user.id !== userId) {
        throw new UserIdCookieAndTokenMismatchError();
      }

      session.claims = accessTokenDecoded;

      // we don't need these on the object
      delete session.claims.iat;
      delete session.claims.exp;
    }

    if (accessTokenExpired) {
      // access token has expired (every 15 mins) so we need to generate a new one
      const {
        decoded: refreshTokenDecoded,
        expired: refreshTokenExpired,
        invalid: refreshTokenInvalid,
      } = verifyRefreshTokenFromCookie(refreshToken, jwtSecret);

      if (refreshTokenInvalid) {
        throw new InvalidRefreshTokenError();
      }

      if (refreshTokenExpired) {
        // this should never happen since we're always refreshing it whenever we refresh an accessToken
        throw new RefreshTokenExpiredError();
      }

      if (refreshTokenDecoded.user.id !== userId) {
        throw new UserIdCookieAndTokenMismatchError();
      }

      // TODO: wrap this in try catch and throw GetUserError()
      const user = await getUser(refreshTokenDecoded.user.id);

      session.claims = createTokenClaims(user);

      createSessionCookies(res, signTokens(session.claims, jwtSecret), user.id);
    }
  }

  session.isAuthenticated = !!session.claims;

  return session;
};
