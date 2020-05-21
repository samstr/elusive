import {
  UserNotEnabledError,
  UserNotFoundError,
  getUserByID,
} from '../../models/users';
import { RELOAD_USER_SOURCE_DATABASE } from '../../sessions';

const userAPI = async ({ session }) => {
  const user = await getUserByID(session.claims.user.id);

  if (!user) {
    throw new UserNotFoundError('Authentication failed');
  }

  if (!user.enabled) {
    throw new UserNotEnabledError('Authentication failed');
  }

  return { user };
};

userAPI.options = {
  reloadUserSource: RELOAD_USER_SOURCE_DATABASE,
  requireAuth: true,
};

export default userAPI;
