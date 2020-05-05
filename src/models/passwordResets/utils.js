import moment from 'moment';

import Elusive from '../../';
import { defaultDynamicTemplateData } from '../../mail';
import { PASSWORD_RESET_EXPIRY_HOURS } from './config';

export const passwordResetExpired = (passwordReset) => {
  const dateNow = moment();
  const dateCreated = moment.unix(passwordReset.dateCreated);
  const dateExpires = moment(dateCreated).add(
    PASSWORD_RESET_EXPIRY_HOURS,
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
