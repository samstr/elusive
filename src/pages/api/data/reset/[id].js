import {
  PasswordResetAlreadyUsedError,
  PasswordResetExpiredError,
  PasswordResetNotFoundError,
  getPasswordReset,
} from '../../../../models/passwordResets';
import {
  UserNotEnabledError,
  UserNotFoundError,
} from '../../../../models/users';

const resetPasswordConfirmDataApi = async ({ req }) => {
  const passwordReset = await getPasswordReset(req.query.id);

  if (!passwordReset) {
    throw new PasswordResetNotFoundError('Password reset key not found');
  }

  if (passwordReset.used) {
    throw new PasswordResetAlreadyUsedError(
      'Password reset key has already been used'
    );
  }

  if (passwordReset.hasExpired()) {
    throw new PasswordResetExpiredError('Password reset key has expired');
  }

  await passwordReset.getUser();

  if (!passwordReset.user) {
    throw new UserNotFoundError('User not found');
  }

  if (!passwordReset.user.enabled) {
    throw new UserNotEnabledError('User not enabled');
  }

  return {
    passwordReset: {
      id: passwordReset.id,
    },
  };
};

export default resetPasswordConfirmDataApi;
