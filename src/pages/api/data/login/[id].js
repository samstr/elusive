import Elusive from '../../../../';
import {
  MagicLoginAlreadyUsedError,
  MagicLoginNotFoundError,
  getMagicLoginByID,
  updateMagicLogin,
} from '../../../../models/magicLogins';
import {
  UserNotEnabledError,
  UserNotFoundError,
} from '../../../../models/users';
import { apiWrapper } from '../../../../pages/api';
import { createSessionCookies } from '../../../../sessions';
import { signTokens } from '../../../../tokens';

const magicLoginDataAPI = async ({ req, res }) => {
  const { tokens: tokenOptions } = Elusive.options;

  const magicLogin = await getMagicLoginByID(req.query.id);

  if (!magicLogin) {
    throw new MagicLoginNotFoundError('This login link is invalid.');
  }

  if (magicLogin.used) {
    throw new MagicLoginAlreadyUsedError(
      'This login link has already been used.'
    );
  }

  await magicLogin.getUser();

  if (!magicLogin.user) {
    throw new UserNotFoundError('This account could not be found.');
  }

  if (!magicLogin.user.enabled) {
    throw new UserNotEnabledError('This account has been disabled.');
  }

  if (magicLogin.user.password) {
    await updateMagicLogin(
      { id: magicLogin.id },
      {
        used: true,
      }
    );
  }

  const claims = tokenOptions.createClaims(magicLogin.user);

  createSessionCookies(
    res,
    signTokens(claims, tokenOptions.secret),
    magicLogin.user.id
  );

  return {
    session: {
      isAuthenticated: true,
      claims,
    },
  };
};

export default magicLoginDataAPI;
