import { NotAuthenticatedError } from '../../auth';
import { POST } from '../../http';
import { deleteSessionCookies } from '../../sessions';

const logoutAPI = async ({ res, session }) => {
  if (!session.isAuthenticated) {
    throw new NotAuthenticatedError('You are not logged in');
  }

  deleteSessionCookies(res);

  return {
    isAuthenticated: false,
    claims: null,
  };
};

logoutAPI.options = {
  allowedMethods: [POST],
};

export default logoutAPI;
