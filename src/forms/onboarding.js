import Elusive from '../';
import { createForm, textField } from './utils';

export default () => {
  const { auth: authOptions } = Elusive.options;

  return createForm({
    fields: {
      password: textField('password', {
        required: {
          value: true,
          errorMessage: 'Please enter your password',
        },
        minLength: {
          value: authOptions.passwordMinLength,
          errorMessage: 'Your password is too short',
        },
      }),
    },
  });
};
