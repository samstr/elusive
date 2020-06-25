/*import Elusive from '../../';
import {
  AutoLoginAlreadyUsedError,
  AutoLoginExpiredError,
  AutoLoginNotFoundError,
  getAutoLoginByID,
  updateAutoLogin,
} from '../../models/autoLogins';
import { UserNotEnabledError, UserNotFoundError } from '../../models/users';
import { createSessionCookies } from '../../sessions';
import { signTokens } from '../../tokens';

const autoLoginDataAPI = async ({ req, res }) => {
  const { tokens: tokenOptions } = Elusive.options;

  const autoLogin = await getAutoLoginByID(req.query.id);

  if (!autoLogin) {
    throw new AutoLoginNotFoundError('This login link is invalid.');
  }

  if (autoLogin.used) {
    throw new AutoLoginAlreadyUsedError(
      'This login link has already been used.'
    );
  }

  await autoLogin.getUser();

  if (!autoLogin.user) {
    throw new UserNotFoundError('This account could not be found.');
  }

  if (!autoLogin.user.enabled) {
    throw new UserNotEnabledError('This account has been disabled.');
  }

  if (autoLogin.hasExpired()) {
    throw new AutoLoginExpiredError('This login link has expired.');
  }

  await updateAutoLogin(
    { id: autoLogin.id },
    {
      used: true,
    }
  );

  const claims = tokenOptions.createClaims(autoLogin.user);

  createSessionCookies(
    res,
    signTokens(claims, tokenOptions.secret),
    autoLogin.user.id
  );

  return {
    session: {
      isAuthenticated: true,
      claims,
    },
  };
};

export default autoLoginDataAPI;
*/
