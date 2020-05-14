import Elusive from '../';
import { BaseError } from '../errors';
import { defaultDynamicTemplateData, sendMail } from '../mail';
import { magicLoginRoute, termsRoute } from '../routes';
import { createModel, createService } from './';
import { getUserByID } from './users';

const COLLECTION = 'magicLogins';

export const model = (data) => {
  const model = createModel(data);

  model.getUser = async (_) => {
    model.user = await getUserByID(model.userId);
  };

  return model;
};

export const {
  collection: magicLoginsCollection,
  getObjectByID: getMagicLoginByID,
  getObject: getMagicLogin,
  createObject: createMagicLogin,
  updateObject: updateMagicLogin,
  listObjects: listMagicLogins,
} = createService(model, COLLECTION);

export class MagicLoginAlreadyUsedError extends BaseError {}
export class MagicLoginNotFoundError extends BaseError {}

export const sendLoginEmail = async (req, toEmail, magicLoginID) => {
  const {
    auth: authOptions,
    mail: mailOptions,
    site: siteOptions,
  } = Elusive.options;
  const dynamicTemplateData = defaultDynamicTemplateData(req);

  return await sendMail({
    to: toEmail,
    template_id: mailOptions.magicLoginTemplateID,
    dynamic_template_data: {
      ...dynamicTemplateData,
      subject: `Login to your ${siteOptions.name} account`,
      preheader: `Click the button below and you will be automatically logged in to your ${siteOptions.name} account. `,
      reasonForEmail: `you requested an automatic login link`,
      magicLoginURL: `${dynamicTemplateData.baseURL}${
        magicLoginRoute(magicLoginID).asPath
      }`,
      expiryHours:
        authOptions.magicLoginExpiryHours === 1
          ? `${authOptions.magicLoginExpiryHours} hour`
          : `${authOptions.magicLoginExpiryHours} hours`,
    },
  });
};

export const sendSignupEmail = async (req, toEmail, magicLoginID) => {
  const { mail: mailOptions, site: siteOptions } = Elusive.options;
  const dynamicTemplateData = defaultDynamicTemplateData(req);

  return await sendMail({
    to: toEmail,
    template_id: mailOptions.magicSignUpTemplateID,
    dynamic_template_data: {
      ...dynamicTemplateData,
      subject: `Confirm your ${siteOptions.name} account`,
      preheader: `Welcome to ${siteOptions.name}. Thank you for confirming your email address. Click here to create your account. `,
      reasonForEmail: `you signed up for a ${siteOptions.name} account`,
      magicLoginURL: `${dynamicTemplateData.baseURL}${
        magicLoginRoute(magicLoginID).asPath
      }`,
      termsURL: `${dynamicTemplateData.baseURL}${termsRoute()}`,
    },
  });
};

export const sendResetEmail = async (req, toEmail, magicLoginID) => {
  //
  //
  //
};
