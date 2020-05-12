import moment from 'moment';

import Elusive from '../../';
import { TooManyResetAttemptsError } from '../../auth';
import { resetForm } from '../../forms/auth';
import { POST } from '../../http';
import {
  listResetAttempts,
  resetAttemptsCollection,
  createResetAttempt,
} from '../../models/resetAttempts';
import { getUser, usersCollection } from '../../models/users';

const resetAPI = async ({ req }) => {
  const { auth: authOptions } = Elusive.options;
  const { email } = req.body;

  const ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
  const date1HourAgo = moment().subtract(1, 'hour');

  if (process.env.NODE_ENV === 'production') {
    const recentResetAttemptsByIP = await listResetAttempts(
      resetAttemptsCollection()
        .where('ip', '==', ip)
        .where('dateCreated', '>', date1HourAgo)
        .limit(authOptions.maxResetAttemptsPerHour)
    );

    if (recentResetAttemptsByIP.length >= authOptions.maxResetAttemptsPerHour) {
      throw new TooManyResetAttemptsError(
        'You have requested too many password resets. Try again later.'
      );
    }
  }

  await createResetAttempt({
    ip,
    email,
  });

  const { cleanValues, errors } = resetForm().validate({
    email,
  });

  if (errors && errors.length) {
    return { errors };
  }

  const user = await getUser(
    usersCollection().where('email', '==', cleanValues.email)
  );

  if (user && user.enabled) {
    // TODO: Create magic login link
    // Send email
  }
};

resetAPI.options = {
  allowedMethods: [POST],
};

export default resetAPI;