import {
  AlreadyAuthenticatedError,
  AuthenticationFailedError,
  AuthError,
  NotAuthenticatedError,
  TooManyLoginAttemptsError,
  TooManyResetPasswordRequestsError,
  TooManyRegistrationsError,
  UserAlreadyExistsError,
} from './errors';
export {
  AlreadyAuthenticatedError,
  AuthenticationFailedError,
  AuthError,
  NotAuthenticatedError,
  TooManyLoginAttemptsError,
  TooManyResetPasswordRequestsError,
  TooManyRegistrationsError,
  UserAlreadyExistsError,
};

import { comparePasswordHash, hashPassword } from './utils';
export { comparePasswordHash, hashPassword };
