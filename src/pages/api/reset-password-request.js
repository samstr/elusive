import { resetPasswordRequestForm } from '../../forms';
import { POST } from '../../http';
import {
  createPasswordReset,
  sendPasswordResetRequestEmail,
} from '../../models/passwordResets';
import { getUserByEmail } from '../../models/users';

const resetPasswordRequestApi = async ({ req }) => {
  const { email } = req.body;

  const { cleanValues, errors } = resetPasswordRequestForm().validate({
    email,
  });

  if (errors && errors.length) {
    return { errors };
  }

  // TODO: throttle number of password reset requests that can be made in 1 day
  // throw new TooManyPasswordResetRequestsError

  const user = await getUserByEmail(cleanValues.email);

  if (user && user.enabled) {
    const passwordReset = await createPasswordReset({
      userId: user.id,
    });

    await sendPasswordResetRequestEmail(req, user.email, passwordReset.id);
  }
};

resetPasswordRequestApi.options = {
  allowedMethods: [POST],
};

export default resetPasswordRequestApi;
