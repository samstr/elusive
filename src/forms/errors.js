import { BaseError } from '../errors';

export class FormError extends BaseError {}

export class UnknownFormError extends FormError {
  constructor(props) {
    super(props);
    this.name = 'UnknownFormError';
  }
}

export class InvalidFieldValueError extends FormError {
  constructor(props) {
    super(props);
    this.name = 'InvalidFieldValueError';
  }
}

export class FieldValueTooShortError extends FormError {
  constructor(props) {
    super(props);
    this.name = 'FieldValueTooShortError';
  }
}

export class FieldValueTooLongError extends FormError {
  constructor(props) {
    super(props);
    this.name = 'FieldValueTooLongError';
  }
}

export class MissingRequiredFieldError extends FormError {
  constructor(props) {
    super(props);
    this.name = 'MissingRequiredFieldError';
  }
}
