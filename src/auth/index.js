import {
  AlreadyAuthenticatedError,
  AuthenticationFailedError,
  AuthError,
  NotAuthenticatedError,
  TooManyLoginAttemptsError,
  TooManyResetAttemptsError,
  TooManyRegistrationsError,
  UserAlreadyExistsError,
} from './errors';
export {
  AlreadyAuthenticatedError,
  AuthenticationFailedError,
  AuthError,
  NotAuthenticatedError,
  TooManyLoginAttemptsError,
  TooManyResetAttemptsError,
  TooManyRegistrationsError,
  UserAlreadyExistsError,
};

import {
  comparePasswordHash,
  hashPassword,
  hasRole,
  sendLoginEmail,
  sendResetEmail,
  sendSignupEmail,
} from './utils';
export {
  comparePasswordHash,
  hashPassword,
  hasRole,
  sendLoginEmail,
  sendResetEmail,
  sendSignupEmail,
};
