import Elusive from '../';
import { BaseError } from '../errors';
import { defaultDynamicTemplateData, sendMail } from '../mail';
import { createModel, createService } from './';
import { getUserByID } from './users';
import moment from 'moment';

const COLLECTION = 'passwordResets';

export const model = (data) => {
  const model = createModel(data);

  model.hasExpired = () => passwordResetExpired(model);
  model.getUser = async () => {
    model.user = await getUserByID(model.userId);
  };

  return model;
};

export const {
  collection: passwordResetsCollection,
  getObjectByID: getPasswordResetByID,
  getObject: getPasswordReset,
  createObject: createPasswordReset,
  updateObject: updatePasswordReset,
  listObjects: listPasswordResets,
} = createService(model, COLLECTION);

export class PasswordResetAlreadyUsedError extends BaseError {}
export class PasswordResetExpiredError extends BaseError {}
export class PasswordResetNotFoundError extends BaseError {}

export const passwordResetExpired = (passwordReset) => {
  const { auth: authOptions } = Elusive.options;

  const dateNow = moment();
  const dateCreated = moment.unix(passwordReset.dateCreated);
  const dateExpires = moment(dateCreated).add(
    authOptions.passwordResetExpiryHours,
    'hours'
  );

  return dateNow.isAfter(dateExpires);
};

export const sendPasswordResetRequestEmail = async (
  req,
  toEmail,
  passwordResetID
) => {
  const { mail: mailOptions } = Elusive.options;
  const dynamicTemplateData = defaultDynamicTemplateData(req);

  toEmail = 'samstr@gmail.com';

  return await sendMail({
    to: toEmail,
    template_id: mailOptions.resetPasswordRequestTemplateID,
    dynamic_template_data: {
      ...dynamicTemplateData,
      subject: 'Reset your Fanned password',
      preheader:
        'Someone recently requested a password change for your Fanned account. If this was you, you can set a new password here',
      reasonForEmail: 'we received a request for a password reset',
      resetPasswordConfirmURL: `${dynamicTemplateData.baseURL}/reset/${passwordResetID}`,
    },
  });
};
