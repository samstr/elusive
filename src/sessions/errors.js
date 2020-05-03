import { BaseError } from '../errors';

export class SessionError extends BaseError {}

export class MissingSessionCookiesError extends SessionError {}
export class SessionUserIdMismatchError extends SessionError {}
export class SessionUserNoLongerExistsError extends SessionError {}
export class SessionUserNotEnabledError extends SessionError {}
