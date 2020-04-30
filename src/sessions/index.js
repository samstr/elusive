import {
  BCRYPT_SALT_ROUNDS,
  COOKIES_ACCESS_TOKEN_NAME,
  COOKIES_REFRESH_TOKEN_NAME,
  COOKIES_USER_ID_NAME,
  COOKIES_EXPIRY_MINS,
  JWT_ACCESS_TOKEN_EXPIRY_MINS,
  JWT_REFRESH_TOKEN_EXPIRY_MINS,
} from './config';
export {
  BCRYPT_SALT_ROUNDS,
  COOKIES_ACCESS_TOKEN_NAME,
  COOKIES_REFRESH_TOKEN_NAME,
  COOKIES_USER_ID_NAME,
  COOKIES_EXPIRY_MINS,
  JWT_ACCESS_TOKEN_EXPIRY_MINS,
  JWT_REFRESH_TOKEN_EXPIRY_MINS,
};

import {
  SessionError,
  InvalidAccessTokenError,
  UserIdCookieAndTokenMismatchError,
  InvalidRefreshTokenError,
  RefreshTokenExpiredError,
  SessionUserNoLongerExistsError,
  SessionUserNotEnabledError,
} from './errors';
export {
  SessionError,
  InvalidAccessTokenError,
  UserIdCookieAndTokenMismatchError,
  InvalidRefreshTokenError,
  RefreshTokenExpiredError,
  SessionUserNoLongerExistsError,
  SessionUserNotEnabledError,
};

import {
  SessionContext,
  SessionContextProvider,
  useSessionContext,
} from './SessionContext';
export { SessionContext, SessionContextProvider, useSessionContext };

import {
  buildSessionCookieString,
  createSessionCookieStrings,
  createSessionCookies,
  hashPassword,
  comparePasswordHash,
  signToken,
  signTokens,
  deleteSessionCookieStrings,
  deleteSessionCookies,
  verifyToken,
  verifyAccessTokenFromCookie,
  verifyRefreshTokenFromCookie,
  validateSession,
} from './utils';
export {
  buildSessionCookieString,
  createSessionCookieStrings,
  createSessionCookies,
  hashPassword,
  comparePasswordHash,
  signToken,
  signTokens,
  deleteSessionCookieStrings,
  deleteSessionCookies,
  verifyToken,
  verifyAccessTokenFromCookie,
  verifyRefreshTokenFromCookie,
  validateSession,
};
