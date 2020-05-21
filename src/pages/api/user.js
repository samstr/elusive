import {
  UserNotEnabledError,
  UserNotFoundError,
  getUserByID,
} from '../../models/users';

const userAPI = async ({ session }) => {
  const user = await getUserByID(session.claims.user.id);

  if (!user) {
    throw new UserNotFoundError('User not found');
  }

  if (!user.enabled) {
    throw new UserNotEnabledError('User not enabled');
  }

  return { user };
};

userAPI.options = {
  requireAuth: true,
};

export default userAPI;
