import Elusive from '../';
import { booleanField, createForm, emailField, textField } from './utils';

export default () => {
  const { auth: authOptions } = Elusive.options;

  return createForm({
    fields: {
      email: emailField('email', {
        required: {
          value: true,
          errorMessage: 'Your email is required',
        },
        invalid: {
          errorMessage: 'Your email address is invalid',
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
      termsAgreed: booleanField('termsAgreed', {
        required: {
          value: true,
          errorMessage: 'You must agree to the Terms of Service',
        },
      }),
    },
  });
};
