import Elusive from '../';
import { BaseError } from '../errors';
import { defaultDynamicTemplateData, sendMail } from '../mail';
import { createModel, createService } from './';
import { getUserByID } from './users';

const COLLECTION = 'userVerifications';

export const TYPE_EMAIL = 'email';
export const TYPE_PHONE = 'phone';

export const model = (data) => {
  const model = createModel(data);

  model.getUser = async (_) => {
    model.user = await getUserByID(model.userId);
  };

  return model;
};

export const {
  collection: userVerificationsCollection,
  getObjectByID: getUserVerificationByID,
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

  return await sendMail({
    to: toEmail,
    template_id: mailOptions.verifyEmailTemplateID,
    dynamic_template_data: {
      ...dynamicTemplateData,
      subject: 'Please verify your email address',
      preheader: 'Verify your email address on Fanned by clicking here',
      reasonForEmail: 'you signed up for a Fanned account',
      verifyEmailURL: `${dynamicTemplateData.baseURL}/verify/${userVerificationId}`,
    },
  });
};
