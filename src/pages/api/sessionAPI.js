/*import Elusive from '../../';
import {
  RELOAD_USER_SOURCE_DATABASE,
  createSessionCookies,
} from '../../sessions';
import { signTokens } from '../../tokens';

const sessionAPI = async ({ res, session, tokens }) => {
  const { tokens: tokenOptions } = Elusive.options;

  // Are there tokens? That means we regenerated the session. Set new cookies
  if (session.isAuthenticated && tokens) {
    createSessionCookies(
      res,
      signTokens(session.claims, tokenOptions.secret),
      session.claims.user.id
    );
  }

  return { session };
};

sessionAPI.options = {
  reloadUserSource: RELOAD_USER_SOURCE_DATABASE,
};

export default sessionAPI;
*/
