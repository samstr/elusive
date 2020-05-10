import moment from 'moment';

import Elusive from '../../';
import {
  AlreadyAuthenticatedError,
  TooManyRegistrationsError,
  UserAlreadyExistsError,
  hashPassword,
} from '../../auth';
import { registerForm } from '../../forms';
import { POST } from '../../http';
import {
  createUser,
  getUser,
  listUsers,
  usersCollection,
} from '../../models/users';
import {
  TYPE_EMAIL,
  createUserVerification,
  sendUserVerificationEmail,
} from '../../models/userVerifications';
import { createSessionCookies } from '../../sessions';
import { signTokens } from '../../tokens';

const registerApi = async ({ req, res, session }) => {
  const { auth: authOptions, tokens: tokenOptions } = Elusive.options;

  if (session.isAuthenticated) {
    throw new AlreadyAuthenticatedError('You are already logged in');
  }

  const { email } = req.body;

  const { cleanValues, errors } = registerForm().validate({
    email,
  });

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
    throw new UserAlreadyExistsError('User already exists');
  }

  if (!user) {
    user = await createUser({
      email: cleanValues.email,
      imageUrl: '', // TODO: set a default image from public/static
      enabled: true,
      registrationIP: ip,
      verifications: {
        email: false,
        phone: false,
      },
    });

    // const userVerification = await createUserVerification({
    //  userId: user.id,
    //  type: TYPE_EMAIL,
    // });
  }

  const claims = tokenOptions.createClaims(user);

  createSessionCookies(res, signTokens(claims, tokenOptions.secret), user.id);

  await sendUserVerificationEmail(req, user.email, userVerification.id);

  return {
    isAuthenticated: true,
    claims,
  };
};

registerApi.options = {
  allowedMethods: [POST],
};

export default registerApi;
