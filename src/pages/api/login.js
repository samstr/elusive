import moment from 'moment';

import Elusive from '../../';
import {
  LOGIN_TYPE_LINK,
  LOGIN_TYPE_PASSWORD,
  AlreadyAuthenticatedError,
  AuthenticationFailedError,
  TooManyLoginAttemptsError,
  comparePasswordHash,
} from '../../auth';
import { loginWithLinkForm, loginWithPasswordForm } from '../../forms/auth';
import { POST } from '../../http';
import {
  createLoginAttempt,
  loginAttemptsCollection,
  listLoginAttempts,
} from '../../models/loginAttempts';
import { createMagicLogin, sendLoginEmail } from '../../models/magicLogins';
import {
  UserNotFoundError,
  UserNotEnabledError,
  getUser,
  usersCollection,
} from '../../models/users';
import { createSessionCookies } from '../../sessions';
import { signTokens } from '../../tokens';

export const loginAPI = async ({ req, res, session }) => {
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

  const { type, email, password, next } = req.body;

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
    type,
  });

  if (type === LOGIN_TYPE_PASSWORD) {
    const { cleanValues, errors } = loginWithPasswordForm().validate({
      type,
      email,
      password,
      next,
    });

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
      session: {
        isAuthenticated: true,
        claims,
      },
    };
  } else if (type === LOGIN_TYPE_LINK) {
    const { cleanValues, errors } = loginWithLinkForm().validate({
      type,
      email,
      next,
    });

    if (errors && errors.length) {
      return { errors };
    }

    const user = await getUser(
      usersCollection().where('email', '==', cleanValues.email)
    );

    if (user && user.enabled) {
      const magicLogin = await createMagicLogin({
        userId: user.id,
      });

      await sendLoginEmail(req, user.email, magicLogin.id, cleanValues.next);
    }
  }
};

loginAPI.options = {
  allowedMethods: [POST],
};

export default loginAPI;
