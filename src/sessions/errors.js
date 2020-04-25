import { BaseError } from '../errors';

export class SessionError extends BaseError {}

export class InvalidAccessTokenError extends SessionError {
  constructor(props) {
    super(props);
    this.name = 'InvalidAccessTokenError';
  }
}

export class UserIdCookieAndTokenMismatchError extends SessionError {
  constructor(props) {
    super(props);
    this.name = 'UserIdCookieAndTokenMismatchError';
  }
}

export class InvalidRefreshTokenError extends SessionError {
  constructor(props) {
    super(props);
    this.name = 'InvalidRefreshTokenError';
  }
}

export class RefreshTokenExpiredError extends SessionError {
  constructor(props) {
    super(props);
    this.name = 'RefreshTokenExpiredError';
  }
}

export class SessionUserNoLongerExistsError extends SessionError {
  constructor(props) {
    super(props);
    this.name = 'SessionUserNoLongerExistsError';
  }
}

export class SessionUserNotEnabledError extends SessionError {
  constructor(props) {
    super(props);
    this.name = 'SessionUserNotEnabledError';
  }
}
