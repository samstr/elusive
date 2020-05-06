import { NotAuthenticatedError } from '../../auth';
import { POST } from '../../http';
import { deleteSessionCookies } from '../../sessions';

const logoutApi = async ({ res, session }) => {
  if (!session.isAuthenticated) {
    throw new NotAuthenticatedError('You are not logged in');
  }

  deleteSessionCookies(res);

  return {
    isAuthenticated: false,
    claims: null,
  };
};

logoutApi.options = {
  allowedMethods: [POST],
};

export default logoutApi;
