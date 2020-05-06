import Elusive from '../';
import { BaseError } from '../errors';
import { defaultDynamicTemplateData, sendMail } from '../mail';
import { createModel, createService } from './';
import { getUser } from './users';
import moment from 'moment';

const COLLECTION = 'passwordResets';

export const model = (data) => {
  const model = createModel(data);

  model.hasExpired = () => passwordResetExpired(model);
  model.getUser = async () => {
    model.user = await getUser(model.userId);
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
    authOptions.resetPasswordExpiryHours,
    'hours'
  );

  return dateNow.isAfter(dateExpires);
};

/* export const getPasswordResetsByIPSinceDate = async (ip, date) => {
  const { firebase } = Elusive.services;
  const firestore = firebase.firestore();

  const docs = await firestore
    .collection(COLLECTION)
    .where('ip', '==', ip)
    .where('dateCreated', '>', date)
    .get();

  const objects = [];

  docs.forEach((doc) => {
    objects.push(
      model({
        id: doc.id,
        ...doc.data(),
      })
    );
  });

  return objects;
};

export const sendPasswordResetRequestEmail = async (
  req,
  toEmail,
  passwordResetId
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
    template_id: mailOptions.resetPasswordRequestTemplateId,
    dynamic_template_data: {
      ...dynamicTemplateData,
      resetPasswordConfirmUrl: `${dynamicTemplateData.baseUrl}/reset/${passwordResetId}`,
    },
  });
};
*/
