import bcrypt from 'bcryptjs';

import Elusive from '../';
import { defaultDynamicTemplateData, sendMail } from '../mail';
import {
  autoLoginRoute,
  termsRoute,
  onboardingRoute,
  settingsAccountRoute,
} from '../routes';

export const ROLE_USER = 'user';
export const ROLE_ADMIN = 'admin';

export const hashPassword = (password) => {
  const { auth: authOptions } = Elusive.options;

  return bcrypt.hashSync(password, authOptions.saltRounds);
};

export const comparePasswordHash = (password, hash) =>
  bcrypt.compareSync(password, hash);

export const hasRole = (role, roles) => roles.includes(role);

export const sendLoginEmail = async (req, toEmail, autoLoginID, next) => {
  const {
    auth: authOptions,
    mail: mailOptions,
    site: siteOptions,
  } = Elusive.options;
  const dynamicTemplateData = defaultDynamicTemplateData(req);

  let autoLoginURL = `${dynamicTemplateData.baseURL}${
    autoLoginRoute(autoLoginID).asPath
  }`;

  if (next) {
    autoLoginURL = `${autoLoginURL}?next=${encodeURIComponent(next)}`;
  }

  return await sendMail({
    to: toEmail,
    template_id: mailOptions.loginTemplateID,
    dynamic_template_data: {
      ...dynamicTemplateData,
      subject: `Login to your ${siteOptions.name} account`,
      preheader: `Click the button below and you will be automatically logged in to your ${siteOptions.name} account. `,
      reasonForEmail: `you requested an automatic login link`,
      autoLoginURL,
      expiryHours:
        authOptions.autoLoginExpiryHours === 1
          ? `${authOptions.autoLoginExpiryHours} hour`
          : `${authOptions.autoLoginExpiryHours} hours`,
    },
  });
};

export const sendSignupEmail = async (req, toEmail, autoLoginID) => {
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
      autoLoginURL: `${dynamicTemplateData.baseURL}${
        autoLoginRoute(autoLoginID).asPath
      }?next=${encodeURIComponent(onboardingRoute())}`,
      termsURL: `${dynamicTemplateData.baseURL}${termsRoute()}`,
    },
  });
};

export const sendResetEmail = async (req, toEmail, autoLoginID) => {
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
      autoLoginURL: `${dynamicTemplateData.baseURL}${
        autoLoginRoute(autoLoginID).asPath
      }?next=${encodeURIComponent(settingsAccountRoute())}`,
      expiryHours:
        authOptions.autoLoginExpiryHours === 1
          ? `${authOptions.autoLoginExpiryHours} hour`
          : `${authOptions.autoLoginExpiryHours} hours`,
    },
  });
};
