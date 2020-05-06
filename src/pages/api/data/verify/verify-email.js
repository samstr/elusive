/* import { apiWrapper } from 'elusive/pages/api';
import {
  UserNotEnabledError,
  UserNotFoundError,
  updateUser,
} from 'elusive/models/users';
import {
  UserVerificationAlreadyVerifiedError,
  UserVerificationNotFoundError,
  getUserVerification,
  updateUserVerification,
} from 'elusive/models/userVerifications';
import { initElusiveServer } from 'utils/elusive/server';

export default async (req, res) => {
  initElusiveServer();

  const verifyEmailDataApi = async () => {
    const userVerification = await getUserVerification(req.query.id);

    if (!userVerification) {
      throw new UserVerificationNotFoundError(
        'User verification key not found'
      );
    }

    if (userVerification.verified) {
      throw new UserVerificationAlreadyVerifiedError('Already verified');
    }

    await userVerification.getUser();

    if (!userVerification.user) {
      throw new UserNotFoundError('User not found');
    }

    if (!userVerification.user.enabled) {
      throw new UserNotEnabledError('User not enabled');
    }

    if (userVerification.user.verifications.email) {
      throw new UserVerificationAlreadyVerifiedError('Already verified');
    }

    await updateUserVerification(userVerification, {
      verified: true,
    });
    await updateUser(userVerification.user, {
      'verifications.email': true,
    });

    return {
      userVerification: {
        id: userVerification.id,
      },
    };
  };

  verifyEmailDataApi.options = {
    useSession: true,
  };

  return await apiWrapper(req, res, verifyEmailDataApi);
};
*/
