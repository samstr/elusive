import Elusive from '../../';
import { LOGIN_TYPES } from '../../auth';
import { InvalidFieldValueError } from '../errors';
import { createForm, emailField, textField } from '../utils';

export default () => {
  const { auth: authOptions } = Elusive.options;

  return createForm({
    fields: {
      email: emailField('email', {
        required: {
          value: true,
          errorMessage: 'Please enter your email.',
        },
        invalid: {
          errorMessage: 'Your email is invalid.',
        },
      }),
      password: textField('password', {
        required: {
          value: true,
          errorMessage: 'Please enter your password.',
        },
        minLength: {
          value: authOptions.passwordMinLength,
          errorMessage: 'Your password is too short.',
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
    },
  });
};
