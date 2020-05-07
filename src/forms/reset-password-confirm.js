import Elusive from '../';
import { createForm, textField } from './utils';

export default () => {
  const { auth: authOptions } = Elusive.options;

  return createForm({
    fields: {
      passwordResetID: textField('passwordResetID', {
        required: {
          value: true,
          errorMessage: 'Missing password reset key',
        },
      }),
      password: textField('password', {
        required: {
          value: true,
          errorMessage: 'Your password is required',
        },
        minLength: {
          value: authOptions.passwordMinLength,
          errorMessage: 'Your password is too short',
        },
      }),
    },
  });
};
