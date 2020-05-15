import moment from 'moment';

import Elusive from '../../';
import {
  AlreadyAuthenticatedError,
  TooManyRegistrationsError,
  UserAlreadyExistsError,
  sendSignupEmail,
} from '../../auth';
import { signupForm } from '../../forms/auth';
import { POST } from '../../http';
import { createMagicLogin } from '../../models/magicLogins';
import {
  UserNotEnabledError,
  createUser,
  getUser,
  listUsers,
  usersCollection,
} from '../../models/users';

const signupAPI = async ({ req, res, session }) => {
  const { auth: authOptions } = Elusive.options;

  if (session.isAuthenticated) {
    throw new AlreadyAuthenticatedError('You are already logged in.');
  }

  const { email } = req.body;

  const { cleanValues, errors } = signupForm().validate({ email });

  if (errors && errors.length) {
    return { errors };
  }

  const ip = req.headers['x-real-ip'] || req.connection.remoteAddress;

  if (process.env.NODE_ENV === 'production') {
    const date1DayAgo = moment().subtract(1, 'day');
    const recentUsersByIP = await listUsers(
      usersCollection()
        .where('registrationIP', '==', ip)
        .where('dateCreated', '>', date1DayAgo)
        .limit(authOptions.maxRegistrationsPerDay)
    );

    if (recentUsersByIP.length >= authOptions.maxRegistrationsPerDay) {
      throw new TooManyRegistrationsError(
        'You have created too many accounts recently.'
      );
    }
  }

  let user = await getUser(
    usersCollection().where('email', '==', cleanValues.email)
  );

  if (user && user.password) {
    throw new UserAlreadyExistsError(
      'An account with this email address already exists.'
    );
  }

  if (user && !user.enabled) {
    throw new UserNotEnabledError('This account has been disabled.');
  }

  if (!user) {
    const baseURL = `${
      process.env.NODE_ENV === 'production' ? 'https' : 'http'
    }://${req.headers.host}`;

    user = await createUser({
      email: cleanValues.email,
      enabled: true,
      registrationIP: ip,
      profilePictureURL: `${baseURL}/img/profile-picture/default.png`,
      verifications: {
        email: false,
      },
    });
  }

  const magicLogin = await createMagicLogin({
    userId: user.id,
  });

  await sendSignupEmail(req, user.email, magicLogin.id);

  return {
    user: {
      id: user.id,
    },
  };
};

signupAPI.options = {
  allowedMethods: [POST],
};

export default signupAPI;
