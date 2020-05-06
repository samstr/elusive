import Elusive from '../../';
import { hashPassword } from '../../auth';
import { resetPasswordConfirmForm } from '../../forms';
import { POST } from '../../http';
import {
  PasswordResetNotFoundError,
  PasswordResetAlreadyUsedError,
  PasswordResetExpiredError,
  getPasswordReset,
  updatePasswordReset,
} from '../../models/passwordResets';
import {
  UserNotEnabledError,
  UserNotFoundError,
  updateUser,
} from '../../models/users';
import { createSessionCookies } from '../../sessions';
import { signTokens } from '../../tokens';

const resetPasswordConfirmApi = async ({ req, res }) => {
  const { tokens: tokenOptions } = Elusive.options;
  const { passwordResetId, password } = req.body;

  const { cleanValues, errors } = resetPasswordConfirmForm().validate({
    passwordResetId,
    password,
  });

  if (errors && errors.length) {
    return { errors };
  }

  const passwordReset = await getPasswordReset(passwordResetId);

  if (!passwordReset) {
    throw new PasswordResetNotFoundError('Password reset key not found');
  }

  if (passwordReset.used) {
    throw new PasswordResetAlreadyUsedError('Password reset key already used');
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

  await updatePasswordReset(passwordReset, {
    used: true,
  });

  await updateUser(passwordReset.user, {
    password: hashPassword(cleanValues.password),
  });

  const claims = tokenOptions.createClaims(passwordReset.user);

  createSessionCookies(
    res,
    signTokens(claims, tokenOptions.secret),
    passwordReset.user.id
  );

  return {
    isAuthenticated: true,
    claims,
  };
};

resetPasswordConfirmApi.options = {
  allowedMethods: [POST],
};

export default resetPasswordConfirmApi;
