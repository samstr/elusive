import Elusive from '../';
import { BaseError } from '../errors';
import { defaultDynamicTemplateData, sendMail } from '../mail';
import { createModel, createService } from './';
import { getUser } from './users';

export const COLLECTION = 'userVerifications';

export const TYPE_EMAIL = 'email';
export const TYPE_PHONE = 'phone';

export const model = (data) => {
  const model = createModel(data);

  model.getUser = async (_) => {
    model.user = await getUser(model.userId);
  };

  return model;
};

export const {
  getObject: getUserVerification,
  createObject: createUserVerification,
  updateObject: updateUserVerification,
  listObjects: listUserVerifications,
} = createService(model, COLLECTION);

export class UserVerificationAlreadyVerifiedError extends BaseError {}
export class UserVerificationNotFoundError extends BaseError {}

export const sendUserVerificationEmail = async (
  req,
  toEmail,
  userVerificationId
) => {
  const { mail: mailOptions } = Elusive.options;
  const dynamicTemplateData = defaultDynamicTemplateData(req);

  toEmail = 'samstr@gmail.com';

  return await sendMail({
    to: toEmail,
    from: {
      email: mailOptions.fromEmail,
      name: mailOptions.fromName,
    },
    template_id: mailOptions.verifyEmailTemplateId,
    dynamic_template_data: {
      ...dynamicTemplateData,
      verifyEmailUrl: `${dynamicTemplateData.baseUrl}/verify/${userVerificationId}`,
    },
  });
};
