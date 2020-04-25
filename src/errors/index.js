import FormErrors from './FormErrors';
export { FormErrors };

import GenericErrors from './GenericErrors';
export { GenericErrors };

import { createErrorResponseArray, genericErrors, fieldErrors } from './utils';
export { createErrorResponseArray, genericErrors, fieldErrors };

export class BaseError {
  constructor(props) {
    if (props && props.message) {
      this.message = props.message;
    }

    if (props && props.fields) {
      this.fields = props.fields;
    }
  }
}
