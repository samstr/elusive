import bcrypt from 'bcryptjs';
import { parseCookies } from 'nookies';
import jwt, { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';

import Elusive from '../';
import { InvalidAccessTokenError } from './errors';

// XXX remove later
export const viewElusiveOptions = () => {
  return Elusive.options;
};

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

  const dateFuture = Date.now() + 60000 * COOKIE_EXPIRY_MINS;
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

export const hashPassword = (password) => {
  const { sessions: options } = Elusive.options;

  return bcrypt.hashSync(password, options.bcrypt.saltRounds);
};

export const comparePasswordHash = (password, hash) =>
  bcrypt.compareSync(password, hash);

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

export const validateSession = async (req, res) => {
  const { sessions: options } = Elusive.options;

  // console.log('zz options', options);
  // console.log('zz sentry', sentry);

  const session = {
    isAuthenticated: false,
    claims: null,
  };

  const cookies = parseCookies({ req, res });
  const accessToken = cookies[options.accessTokenName];
  const refreshToken = cookies[options.cookies.refreshTokenName];
  const userId = cookies[options.cookies.userIdName];

  // console.log('req.cookies', req.cookies);
  // console.log('accessToken', accessToken);
  // console.log('refreshToken', refreshToken);
  // console.log('userId', userId);

  // Regardless of whether the route has requiresAuth: true/false
  // we always validate the request if the cookies are present incase
  // we need to regenerate tokens
  if (accessToken && refreshToken && userId) {
    const {
      decoded: accessTokenDecoded,
      expired: accessTokenExpired,
      invalid: accessTokenInvalid,
    } = verifyAccessTokenFromCookie(accessToken, options.jwt.secret);

    // console.log('accessTokenDecoded', accessTokenDecoded);
    // console.log('accessTokenExpired', accessTokenExpired);
    // console.log('accessTokenInvalid', accessTokenInvalid);

    if (accessTokenInvalid) {
      throw new InvalidAccessTokenError('Invalid accessToken');
    }

    // if (accessTokenDecoded) {
    //  if (accessTokenDecoded.user.id !== userId) {
    //    throw new UserIdCookieAndTokenMismatchError();
    //  }

    //  session.claims = accessTokenDecoded;

    // we don't need these on the object
    //  delete session.claims.iat;
    //  delete session.claims.exp;
    // }

    // if (accessTokenExpired) {
    // access token has expired (every 15 mins) so we need to generate a new one
    // const {
    //  decoded: refreshTokenDecoded,
    //  expired: refreshTokenExpired,
    //  invalid: refreshTokenInvalid,
    // } = verifyRefreshTokenFromCookie(refreshToken, jwtSecret);

    // if (refreshTokenInvalid) {
    //  throw new InvalidRefreshTokenError();
    // }

    // if (refreshTokenExpired) {
    // this should never happen since we're always refreshing it whenever we refresh an accessToken
    // throw new RefreshTokenExpiredError();
    // }

    // if (refreshTokenDecoded.user.id !== userId) {
    // throw new UserIdCookieAndTokenMismatchError();
    // }

    // TODO: wrap this in try catch and throw ReloadUserError()
    // const user = await reloadUser(refreshTokenDecoded.user.id);

    // session.claims = createTokenClaims(user);

    // createSessionCookies(res, signTokens(session.claims, jwtSecret), user.id);
    // }
  }

  session.isAuthenticated = !!session.claims;

  return session;
};
