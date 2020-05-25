import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

import { fieldErrors, genericErrors } from '../errors';

import GenericErrors from './GenericErrors';

const FormErrors = ({ errors, field, includingFields }) => {
  // Errors for a specific form field
  if (field) {
    const _fieldErrors = fieldErrors(errors, field);
    if (!_fieldErrors.length) return null;

    return (
      <Form.Control.Feedback type="invalid">
        {_fieldErrors.map((error) => (
          <div key={error.message}>{error.message}</div>
        ))}
      </Form.Control.Feedback>
    );
  }

  // Generic errors
  const _genericErrors = genericErrors(errors, includingFields);
  if (!_genericErrors.length) return null;

  return <GenericErrors errors={_genericErrors} />;
};

FormErrors.propTypes = {
  errors: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string.isRequired,
      fields: PropTypes.arrayOf(PropTypes.string),
    })
  ),
  field: PropTypes.string,
  includingFields: PropTypes.arrayOf(PropTypes.string),
};

export default FormErrors;
