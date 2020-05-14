import moment from 'moment';

import Elusive from '../';
import { BaseError } from '../errors';
import { defaultDynamicTemplateData, sendMail } from '../mail';
import { magicLoginRoute, termsRoute, onboardingRoute } from '../routes';
import { createModel, createService } from './';
import { getUserByID } from './users';

const COLLECTION = 'magicLogins';

export const model = (data) => {
  const model = createModel(data);

  model.hasExpired = () => magicLoginExpired(model);
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
export class MagicLoginExpiredError extends BaseError {}

export const magicLoginExpired = (magicLogin) => {
  const { auth: authOptions } = Elusive.options;

  const dateNow = moment();
  const dateCreated = moment.unix(magicLogin.dateCreated);
  const dateExpires = moment(dateCreated).add(
    authOptions.magicLoginExpiryHours,
    'hours'
  );

  return dateNow.isAfter(dateExpires);
};

export const sendLoginEmail = async (req, toEmail, magicLoginID, next) => {
  const {
    auth: authOptions,
    mail: mailOptions,
    site: siteOptions,
  } = Elusive.options;
  const dynamicTemplateData = defaultDynamicTemplateData(req);

  let magicLoginURL = `${dynamicTemplateData.baseURL}${
    magicLoginRoute(magicLoginID).asPath
  }`;

  if (next) {
    magicLoginURL = `${magicLoginURL}?next=${encodeURIComponent(next)}`;
  }

  return await sendMail({
    to: toEmail,
    template_id: mailOptions.loginTemplateID,
    dynamic_template_data: {
      ...dynamicTemplateData,
      subject: `Login to your ${siteOptions.name} account`,
      preheader: `Click the button below and you will be automatically logged in to your ${siteOptions.name} account. `,
      reasonForEmail: `you requested an automatic login link`,
      magicLoginURL,
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
    template_id: mailOptions.signupTemplateID,
    dynamic_template_data: {
      ...dynamicTemplateData,
      subject: `Confirm your ${siteOptions.name} account`,
      preheader: `Welcome to ${siteOptions.name}. Thank you for confirming your email address. Click here to create your account. `,
      reasonForEmail: `you signed up for a ${siteOptions.name} account`,
      magicLoginURL: `${dynamicTemplateData.baseURL}${
        magicLoginRoute(magicLoginID).asPath
      }?next=${encodeURIComponent(onboardingRoute())}`,
      termsURL: `${dynamicTemplateData.baseURL}${termsRoute()}`,
    },
  });
};

export const sendResetEmail = async (req, toEmail, magicLoginID) => {
  //
  //
  //
};
