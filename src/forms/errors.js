import { BaseError } from '../errors';

export class FormError extends BaseError {
  constructor(message, fields) {
    super(message);

    this.fields = [];

    if (fields) {
      this.fields = fields;
    }
  }
}

export class UnknownFormError extends FormError {}
export class InvalidFieldValueError extends FormError {}
export class FieldValueTooShortError extends FormError {}
export class FieldValueTooLongError extends FormError {}
export class MissingRequiredFieldError extends FormError {}
