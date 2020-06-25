/*import Elusive from '../../';
import { hashPassword } from '../../auth';
import { onboardingForm } from '../../forms';
import { POST } from '../../http';
import {
  UserNotEnabledError,
  UserNotFoundError,
  getUserByID,
  updateUser,
} from '../../models/users';
import { createSessionCookies } from '../../sessions';
import { signTokens } from '../../tokens';

const onboardingAPI = async ({ req, res, session }) => {
  const { tokens: tokenOptions } = Elusive.options;
  const { password } = req.body;

  const { cleanValues, errors } = onboardingForm().validate({
    password,
  });

  if (errors && errors.length) {
    return { errors };
  }

  let user = await getUserByID(session.claims.user.id);

  if (!user) {
    throw new UserNotFoundError('This account no longer exists.');
  }

  if (!user.enabled) {
    throw new UserNotEnabledError('This account has been disabled.');
  }

  user = await updateUser(user, {
    password: hashPassword(cleanValues.password),
  });

  const claims = tokenOptions.createClaims(user);

  createSessionCookies(res, signTokens(claims, tokenOptions.secret), user.id);

  return {
    session: {
      isAuthenticated: true,
      claims,
    },
  };
};

onboardingAPI.options = {
  allowedMethods: [POST],
  requireAuth: true,
};

export default onboardingAPI;*/
