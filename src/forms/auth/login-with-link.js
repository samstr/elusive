import { createForm, emailField } from '../utils';

export default () =>
  createForm({
    fields: {
      email: emailField('email', {
        required: {
          value: true,
          errorMessage: 'Please enter your email',
        },
        invalid: {
          errorMessage: 'Your email is invalid',
        },
      }),
    },
  });
