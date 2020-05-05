import Elusive from '../../';
import {
  AlreadyAuthenticatedError,
  UserAlreadyExistsError,
  hashPassword,
} from '../../auth';
import { registerForm } from '../../forms';
import { POST } from '../../http';
import { createUser, getUserByEmail } from '../../models/users';
import {
  TYPE_EMAIL,
  createUserVerification,
  sendUserVerificationEmail,
} from '../../models/userVerifications';
import { createSessionCookies } from '../../sessions';
import { signTokens } from '../..//tokens';

const registerApi = async ({ req, res, session }) => {
  const { tokens: tokenOptions } = Elusive.options;

  if (session.isAuthenticated) {
    throw new AlreadyAuthenticatedError('You are already logged in');
  }

  const { email, password, termsAgreed } = req.body;

  const { cleanValues, errors } = registerForm().validate({
    email,
    password,
    termsAgreed,
  });

  if (errors && errors.length) {
    return { errors };
  }

  let user = await getUserByEmail(cleanValues.email);

  if (user) {
    throw new UserAlreadyExistsError('User already exists');
  }

  // TODO: throttle this endpoint (TooManyRegistrationsError)

  user = await createUser({
    email: cleanValues.email,
    password: hashPassword(cleanValues.password),
    imageUrl: '',
    enabled: true,
    termsAgreed,
    verifications: {
      email: false,
      phone: false,
    },
  });

  const userVerification = await createUserVerification({
    userId: user.id,
    type: TYPE_EMAIL,
  });

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
  useSession: true,
};

export default registerApi;
