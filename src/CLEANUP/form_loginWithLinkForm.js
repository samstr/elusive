import { LOGIN_TYPES } from '../auth';
import { InvalidFieldValueError } from './errors';
import { createForm, emailField, textField } from './utils';

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
      type: textField(
        'type',
        {
          required: {
            value: true,
            errorMessage: 'Type field is missing.',
          },
        },
        (type) => {
          if (!LOGIN_TYPES.includes(type)) {
            throw new InvalidFieldValueError('Type field is invalid.', [
              'type',
            ]);
          }

          return type;
        }
      ),
      next: textField('next'),
    },
  });
