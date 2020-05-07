import moment from 'moment';

import Elusive from '../../';
import { TooManyResetPasswordRequestsError } from '../../auth';
import { resetPasswordRequestForm } from '../../forms';
import { POST } from '../../http';
import {
  listPasswordResetAttempts,
  passwordResetAttemptsCollection,
  createPasswordResetAttempt,
} from '../../models/passwordResetAttempts';
import {
  createPasswordReset,
  sendPasswordResetRequestEmail,
} from '../../models/passwordResets';
import { getUser, usersCollection } from '../../models/users';

const resetPasswordRequestApi = async ({ req }) => {
  const { auth: authOptions } = Elusive.options;
  const { email } = req.body;

  const ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
  const date1HourAgo = moment().subtract(1, 'hour');

  const recentPasswordResetAttemptsByIP = await listPasswordResetAttempts(
    passwordResetAttemptsCollection()
      .where('ip', '==', ip)
      .where('dateCreated', '>', date1HourAgo)
      .limit(authOptions.maxPasswordResetAttemptsPerHour)
  );

  if (
    recentPasswordResetAttemptsByIP.length >=
    authOptions.maxPasswordResetAttemptsPerHour
  ) {
    throw new TooManyResetPasswordRequestsError(
      'You have requested too many password resets. Try again later.'
    );
  }

  await createPasswordResetAttempt({
    ip,
    email,
  });

  const { cleanValues, errors } = resetPasswordRequestForm().validate({
    email,
  });

  if (errors && errors.length) {
    return { errors };
  }

  const user = await getUser(
    usersCollection().where('email', '==', cleanValues.email)
  );

  if (user && user.enabled) {
    const passwordReset = await createPasswordReset({
      userId: user.id,
      ip: ip,
    });

    await sendPasswordResetRequestEmail(req, user.email, passwordReset.id);
  }
};

resetPasswordRequestApi.options = {
  allowedMethods: [POST],
};

export default resetPasswordRequestApi;
