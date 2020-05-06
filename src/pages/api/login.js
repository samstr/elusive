import Elusive from '../../';
import {
  AlreadyAuthenticatedError,
  AuthenticationFailedError,
  comparePasswordHash,
} from '../../auth';
import { loginForm } from '../../forms';
import { POST } from '../../http';
import {
  UserNotFoundError,
  UserNotEnabledError,
  getUserByEmail,
} from '../../models/users';
import { createSessionCookies } from '../../sessions';
import { signTokens } from '../../tokens';

export const loginApi = async ({ req, res, session }) => {
  const { tokens: tokenOptions } = Elusive.options;

  if (session.isAuthenticated) {
    throw new AlreadyAuthenticatedError('You are already logged in');
  }

  const { email, password } = req.body;

  const { cleanValues, errors } = loginForm().validate({ email, password });

  if (errors && errors.length) {
    return { errors };
  }

  const user = await getUserByEmail(cleanValues.email);

  if (!user) {
    throw new UserNotFoundError('Authentication failed');
  }

  if (!user.enabled) {
    throw new UserNotEnabledError('Authentication failed');
  }

  // TODO: throttle this endpoint by IP using TooManyAuthenticationAttemptsError

  if (!comparePasswordHash(cleanValues.password, user.password)) {
    throw new AuthenticationFailedError('Authentication failed');
  }

  const claims = tokenOptions.createClaims(user);

  createSessionCookies(res, signTokens(claims, tokenOptions.secret), user.id);

  return {
    isAuthenticated: true,
    claims,
  };
};

loginApi.options = {
  allowedMethods: [POST],
};

export default loginApi;
