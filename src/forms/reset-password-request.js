import { createForm, emailField } from './utils';

export default () =>
  createForm({
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
    },
  });
