import {
  UserNotEnabledError,
  UserNotFoundError,
  updateUser,
} from '../../../../models/users';
import {
  UserVerificationAlreadyVerifiedError,
  UserVerificationNotFoundError,
  getUserVerificationByID,
  updateUserVerification,
} from '../../../../models/userVerifications';

const verifyEmailApi = async ({ req }) => {
  const userVerification = await getUserVerificationByID(req.query.id);

  if (!userVerification) {
    throw new UserVerificationNotFoundError('User verification key not found');
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

export default verifyEmailApi;
