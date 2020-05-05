import Elusive from '../';

export const defaultDynamicTemplateData = (req) => {
  const baseUrl = `${
    process.env.NODE_ENV === 'production' ? 'https' : 'http'
  }://${req.headers.host}`;

  return {
    baseUrl,
  };
};

export const sendMail = async (message) => {
  const { sendgrid, sentry } = Elusive.services;

  // XXX if (process.env.NODE_ENV !== 'production') return;

  try {
    return await sendgrid.send(message);
  } catch (err) {
    sentry.captureException(err);
  }
};
