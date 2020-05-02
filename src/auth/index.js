import { SALT_ROUNDS } from './config';
export { SALT_ROUNDS };

import {
  AlreadyAuthenticatedError,
  AuthenticationFailedError,
  AuthError,
  NotAuthenticatedError,
  UserAlreadyExistsError,
} from './errors';
export {
  AlreadyAuthenticatedError,
  AuthenticationFailedError,
  AuthError,
  NotAuthenticatedError,
  UserAlreadyExistsError,
};

import { comparePasswordHash, hashPassword } from './utils';
export { comparePasswordHash, hashPassword };
