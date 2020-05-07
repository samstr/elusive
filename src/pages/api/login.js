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
import {
  createLoginAttempt,
  loginAttemptsCollection,
  listLoginAttempts,
} from '../../models/loginAttempts';
import {
  UserNotFoundError,
  UserNotEnabledError,
  getUser,
  usersCollection,
} from '../../models/users';
import { createSessionCookies } from '../../sessions';
import { signTokens } from '../../tokens';

export const loginApi = async ({ req, res, session }) => {
  const { auth: authOptions, tokens: tokenOptions } = Elusive.options;

  if (session.isAuthenticated) {
    throw new AlreadyAuthenticatedError('You are already logged in');
  }

  const ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
  const date1HourAgo = moment().subtract(1, 'hour');

  if (process.env.NODE_ENV === 'production') {
    const recentLoginAttemptsByIP = await listLoginAttempts(
      loginAttemptsCollection()
        .where('ip', '==', ip)
        .where('dateCreated', '>', date1HourAgo)
        .limit(authOptions.maxLoginAttemptsPerIPPerHour)
    );

    if (
      recentLoginAttemptsByIP.length >= authOptions.maxLoginAttemptsPerIPPerHour
    ) {
      throw new TooManyLoginAttemptsError(
        'You have attempted to login too many times. Try again later.'
      );
    }
  }

  const { email, password } = req.body;

  if (process.env.NODE_ENV === 'production') {
    const recentLoginAttemptsByAccount = await listLoginAttempts(
      loginAttemptsCollection()
        .where('ip', '==', ip)
        .where('email', '==', email)
        .where('dateCreated', '>', date1HourAgo)
        .limit(authOptions.maxLoginAttemptsPerAccountPerHour)
    );

    if (
      recentLoginAttemptsByAccount.length >=
      authOptions.maxLoginAttemptsPerAccountPerHour
    ) {
      throw new TooManyLoginAttemptsError(
        'You have attempted to login too many times. Try again later.'
      );
    }
  }

  await createLoginAttempt({
    ip,
    email,
  });

  const { cleanValues, errors } = loginForm().validate({ email, password });

  if (errors && errors.length) {
    return { errors };
  }

  const user = await getUser(
    usersCollection().where('email', '==', cleanValues.email)
  );

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
  };
};

loginApi.options = {
  allowedMethods: [POST],
};

export default loginApi;
