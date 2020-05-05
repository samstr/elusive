import { BaseError } from '../../errors';

export class PasswordResetAlreadyUsedError extends BaseError {}
export class PasswordResetExpiredError extends BaseError {}
export class PasswordResetNotFoundError extends BaseError {}
