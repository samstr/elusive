import Elusive from '../';
import { BaseError } from '../errors';
import { defaultDynamicTemplateData, sendMail } from '../mail';
import { createModel, createService } from './';
import { getUser } from './users';
import moment from 'moment';

export const COLLECTION = 'passwordResets';

export const model = (data) => {
  const model = createModel(data);

  model.hasExpired = () => passwordResetExpired(model);
  model.getUser = async () => {
    model.user = await getUser(model.userId);
  };

  return model;
};

export const {
  getObject: getPasswordReset,
  createObject: createPasswordReset,
  updateObject: updatePasswordReset,
  listObjects: listPasswordResets,
} = createService(model, COLLECTION);

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
  passwordResetId
) => {
  const { sendgrid: sendgridOptions } = Elusive.options;
  const dynamicTemplateData = defaultDynamicTemplateData(req);

  toEmail = 'samstr@gmail.com';

  return await sendMail({
    to: toEmail,
    from: {
      email: sendgridOptions.fromEmail,
      name: sendgridOptions.fromName,
    },
    template_id: sendgridOptions.resetPasswordRequestTemplateId,
    dynamic_template_data: {
      ...dynamicTemplateData,
      resetPasswordConfirmUrl: `${dynamicTemplateData.baseUrl}/reset/${passwordResetId}`,
    },
  });
};

export class PasswordResetAlreadyUsedError extends BaseError {}
export class PasswordResetExpiredError extends BaseError {}
export class PasswordResetNotFoundError extends BaseError {}