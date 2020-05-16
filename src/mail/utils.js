import Elusive from '../';

export const defaultDynamicTemplateData = (req) => {
  const { site: siteOptions } = Elusive.options;
  const baseURL = `${
    process.env.NODE_ENV === 'production' ? 'https' : 'http'
  }://${req.headers.host}`;

  return {
    baseURL,
    siteName: siteOptions.name,
  };
};

export const sendMail = async (message) => {
  const { sendgrid, sentry } = Elusive.services;
  const { mail: mailOptions } = Elusive.options;

  message = {
    ...message,
    from: {
      email: mailOptions.fromEmail,
      name: mailOptions.fromName,
    },
  };

  if (
    process.env.NODE_ENV === 'production' ||
    mailOptions.sendMailOnDevServer
  ) {
    try {
      return await sendgrid.send(message);
    } catch (err) {
      console.log(err);

      if (err.response?.body?.errors) {
        console.log(err.response?.body?.errors);
      }

      sentry.captureException(err);
    }
  }
};
