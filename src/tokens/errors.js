import { BaseError } from '../errors';

export class TokenError extends BaseError {}

export class InvalidAccessTokenError extends TokenError {}
export class InvalidRefreshTokenError extends TokenError {}
export class RefreshTokenExpiredError extends TokenError {}
