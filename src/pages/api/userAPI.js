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

  return {
    user: {
      id: user.id,
      email: user.email,
      enabled: user.enabled,
      name: user.name,
      profilePictureURL: user.profilePictureURL,
      username: user.username,
      verifications: user.verifications,
    },
  };
};

userAPI.options = {
  reloadUserSource: RELOAD_USER_SOURCE_DATABASE,
  requireAuth: true,
};

export default userAPI;
