import {
  AlreadyAuthenticatedError,
  AuthenticationFailedError,
  AuthError,
  NotAuthenticatedError,
  TooManyRegistrationsError,
  UserAlreadyExistsError,
} from './errors';
export {
  AlreadyAuthenticatedError,
  AuthenticationFailedError,
  AuthError,
  NotAuthenticatedError,
  TooManyRegistrationsError,
  UserAlreadyExistsError,
};

import { comparePasswordHash, hashPassword } from './utils';
export { comparePasswordHash, hashPassword };
