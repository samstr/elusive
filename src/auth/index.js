import {
  AlreadyAuthenticatedError,
  AuthenticationFailedError,
  AuthError,
  NotAuthenticatedError,
  TooManyLoginAttemptsError,
  TooManyRegistrationsError,
  UserAlreadyExistsError,
} from './errors';
export {
  AlreadyAuthenticatedError,
  AuthenticationFailedError,
  AuthError,
  NotAuthenticatedError,
  TooManyLoginAttemptsError,
  TooManyRegistrationsError,
  UserAlreadyExistsError,
};

import { comparePasswordHash, hashPassword } from './utils';
export { comparePasswordHash, hashPassword };
