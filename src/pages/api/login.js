import moment from 'moment';

import Elusive from '../../';
import {
  AlreadyAuthenticatedError,
  AuthenticationFailedError,
  TooManyLoginAttemptsError,
  comparePasswordHash,
} from '../../auth';
import { loginForm } from '../../forms';
import { POST } from '../../http';
import { UserNotFoundError, UserNotEnabledError } from '../../models/users';
import { createSessionCookies } from '../../sessions';
import { signTokens } from '../../tokens';

export const loginApi = async ({ req, res, session }) => {
  /*const { auth: authOptions, tokens: tokenOptions } = Elusive.options;

  if (session.isAuthenticated) {
    throw new AlreadyAuthenticatedError('You are already logged in');
  }

  const ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
  const date1HourAgo = moment().subtract(1, 'hour');
*/
  /*const recentLoginAttemptsByIP = await getLoginAttemptsByIPSinceDate(
    ip,
    date1HourAgo
  );

  if (
    recentLoginAttemptsByIP.length >= authOptions.loginMaxAttemptsPerIPPerHour
  ) {
    throw new TooManyLoginAttemptsError(
      'You have attempted to login too many times. Try again later.'
    );
  }*/
  // const { email, password } = req.body;
  /*const recentLoginAttemptsByAccount = await getLoginAttemptsByAccountSinceDate(
    ip,
    email,
    date1HourAgo
  );
  if (
    recentLoginAttemptsByAccount.length >=
    authOptions.loginMaxAttemptsPerAccountPerHour
  ) {
    throw new TooManyLoginAttemptsError(
      'You have attempted to login too many times. Try again later.'
    );
  }*/
  /*await createLoginAttempt({
    ip,
    email,
  });*/
  /*
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

  if (!comparePasswordHash(cleanValues.password, user.password)) {
    throw new AuthenticationFailedError('Authentication failed');
  }

  const claims = tokenOptions.createClaims(user);

  createSessionCookies(res, signTokens(claims, tokenOptions.secret), user.id);

  return {
    isAuthenticated: true,
    claims,
  };*/
};

loginApi.options = {
  allowedMethods: [POST],
};

export default loginApi;
