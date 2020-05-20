import bcrypt from 'bcryptjs';

import Elusive from '../';
import { defaultDynamicTemplateData, sendMail } from '../mail';
import {
  magicLoginRoute,
  termsRoute,
  onboardingRoute,
  settingsSecurityRoute,
} from '../routes';

export const LOGIN_TYPE_LINK = 'link';
export const LOGIN_TYPE_PASSWORD = 'password';
export const LOGIN_TYPES = [LOGIN_TYPE_LINK, LOGIN_TYPE_PASSWORD];

export const ROLE_USER = 'user';
export const ROLE_ADMIN = 'admin';

export const hashPassword = (password) => {
  const { auth: authOptions } = Elusive.options;

  return bcrypt.hashSync(password, authOptions.saltRounds);
};

export const comparePasswordHash = (password, hash) =>
  bcrypt.compareSync(password, hash);

export const hasRole = (role, roles) => roles.includes(role);

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
  const {
    auth: authOptions,
    mail: mailOptions,
    site: siteOptions,
  } = Elusive.options;
  const dynamicTemplateData = defaultDynamicTemplateData(req);

  return await sendMail({
    to: toEmail,
    template_id: mailOptions.resetTemplateID,
    dynamic_template_data: {
      ...dynamicTemplateData,
      subject: `Reset your ${siteOptions.name} password`,
      preheader: `Someone recently requested a password change for your ${siteOptions.name} account. If this was you, you can set a new password here. `,
      reasonForEmail: `we received a password reset request for this account`,
      magicLoginURL: `${dynamicTemplateData.baseURL}${
        magicLoginRoute(magicLoginID).asPath
      }?next=${encodeURIComponent(settingsSecurityRoute())}`,
      expiryHours:
        authOptions.magicLoginExpiryHours === 1
          ? `${authOptions.magicLoginExpiryHours} hour`
          : `${authOptions.magicLoginExpiryHours} hours`,
    },
  });
};
