import { BaseError } from '../errors';

export class AuthError extends BaseError {}

export class AlreadyAuthenticatedError extends AuthError {}
export class AuthenticationFailedError extends AuthError {}
export class NotAuthenticatedError extends AuthError {}
export class TooManyLoginAttemptsError extends AuthError {}
export class TooManyRegistrationsError extends AuthError {}
export class UserAlreadyExistsError extends AuthError {}
