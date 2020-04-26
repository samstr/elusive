import { BaseError } from '../errors';

export class SessionError extends BaseError {}

export class InvalidAccessTokenError extends SessionError {}
export class UserIdCookieAndTokenMismatchError extends SessionError {}
export class InvalidRefreshTokenError extends SessionError {}
export class RefreshTokenExpiredError extends SessionError {}
export class SessionUserNoLongerExistsError extends SessionError {}
export class SessionUserNotEnabledError extends SessionError {}
