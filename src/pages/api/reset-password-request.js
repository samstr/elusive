//import moment from 'moment';

import Elusive from '../../';
//import { TooManyResetPasswordRequestsError } from '../../auth';
import { resetPasswordRequestForm } from '../../forms';
import { POST } from '../../http';
//import {
//  createPasswordReset,
//  getPasswordResetsByIPSinceDate,
//  sendPasswordResetRequestEmail,
//} from '../../models/passwordResets';
// import { getUserByEmail } from '../../models/users';

const resetPasswordRequestApi = async ({ req }) => {
  const { auth: authOptions } = Elusive.options;
  const { email } = req.body;

  const { cleanValues, errors } = resetPasswordRequestForm().validate({
    email,
  });

  if (errors && errors.length) {
    return { errors };
  }

  /*const ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
  const date1HourAgo = moment().subtract(1, 'hour');
  const recentPasswordResetsByIP = await getPasswordResetsByIPSinceDate(
    ip,
    date1HourAgo
  );

  if (
    recentPasswordResetsByIP.length >=
    authOptions.resetPasswordMaxRequestsPerHour
  ) {
    throw new TooManyResetPasswordRequestsError(
      'You have requested too many password resets. Try again later.'
    );
  }
*/
  /* const user = await getUserByEmail(cleanValues.email);

  if (user && user.enabled) {
    const passwordReset = await createPasswordReset({
      userId: user.id,
      ip: ip,
    });

    await sendPasswordResetRequestEmail(req, user.email, passwordReset.id);
  }*/
};

resetPasswordRequestApi.options = {
  allowedMethods: [POST],
};

export default resetPasswordRequestApi;
