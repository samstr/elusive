import sanitizeHtml from 'sanitize-html';

import Elusive from '../';
import { errorJson } from '../errors';

import {
  FieldValueTooShortError,
  FieldValueTooLongError,
  FormError,
  InvalidFieldValueError,
  MissingRequiredFieldError,
  UnknownFormError,
} from './errors';

export const createForm = ({ fields, validate }) => {
  const { sentry } = Elusive.services;

  return {
    fields,
    validate: (values, fieldsToValidate) => {
      const cleanValues = {};
      let errors = [];

      // use all fields if none provided
      if (!fieldsToValidate) {
        fieldsToValidate = Object.keys(fields);
      }

      // validate each field
      fieldsToValidate.forEach((field) => {
        const value = values[field];

        try {
          cleanValues[field] = fields[field].validate(value);
        } catch (err) {
          if (err instanceof FormError) {
            errors.push(err);
          } else {
            console.log(err);

            if (sentry) {
              sentry.captureException(err);
            }

            errors = [new UnknownFormError('An unknown form error occured.')];
          }
        }
      });

      if (!errors.length && typeof validate === 'function') {
        try {
          // additional validation
          validate(cleanValues);
        } catch (err) {
          if (err instanceof FormError) {
            errors.push(err);
          } else {
            console.log(err);

            if (sentry) {
              sentry.captureException(err);
            }

            errors = [new UnknownFormError('An unknown form error occured.')];
          }
        }
      }

      if (errors.length) {
        return errorJson(errors);
      }

      return {
        valid: true,
        cleanValues,
      };
    },
  };
};

export const field = (name, options, validate) => ({
  validate: (value) => {
    let cleanValue;

    if (value) {
      cleanValue = value.trim();
    }

    if (options?.required?.value && !cleanValue) {
      throw new MissingRequiredFieldError(options.required.errorMessage, [
        name,
      ]);
    }

    if (typeof validate === 'function') {
      cleanValue = validate(cleanValue);
    }

    return cleanValue || null;
  },
});

export const textField = (name, options, validate) =>
  field(name, options, (value) => {
    let cleanValue;

    if (value) {
      cleanValue = sanitizeHtml(value, {
        allowedTags: [],
        allowedAttributes: {},
        parser: {
          decodeEntities: false,
        },
      });
    }

    if (
      options?.minLength?.value &&
      cleanValue.length < options?.minLength?.value
    ) {
      throw new FieldValueTooShortError(options.minLength.errorMessage, [name]);
    }

    if (
      options?.maxLength?.value &&
      cleanValue.length > options?.maxLength?.value
    ) {
      throw new FieldValueTooLongError(options.maxLength.errorMessage, [name]);
    }

    if (options?.invalid?.value && !options?.invalid?.value?.test(cleanValue)) {
      throw new InvalidFieldValueError(options.invalid.errorMessage, [name]);
    }

    if (typeof validate === 'function') {
      cleanValue = validate(cleanValue);
    }

    return cleanValue || null;
  });

export const emailField = (name, options) =>
  textField(name, options, (value) => {
    const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i; // eslint-disable-line no-control-regex

    let cleanValue;

    if (value) {
      cleanValue = value.toLowerCase();
    } else {
      cleanValue = null;
    }

    if (!regex.test(cleanValue)) {
      throw new InvalidFieldValueError(options.invalid.errorMessage, [name]);
    }

    return cleanValue;
  });

export const booleanField = (name, options, validate) => ({
  validate: (value) => {
    const cleanValue = value;

    if (options?.required?.value && !cleanValue) {
      throw new MissingRequiredFieldError(options.required.errorMessage, [
        name,
      ]);
    }

    if (typeof validate === 'function') {
      cleanValue = validate(cleanValue);
    }

    return cleanValue || null;
  },
});

export const clearFormFieldErrors = (formErrors, field) => {
  if (!formErrors) return null;

  return formErrors.filter((e) => e.fields && !e.fields.includes(field));
};

export const getOnChangeValue = (event) => {
  const { name, type, value, checked } = event.target;

  let _value = value;

  if (type === 'checkbox') {
    _value = checked;
  }

  return {
    field: name,
    value: _value,
  };
};
