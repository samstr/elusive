import PropTypes from 'prop-types';
import React from 'react';

import { fieldErrors } from '../errors';

const ErrorHelperText = ({ errors, field }) => {
  const filteredErrors = fieldErrors(errors, field);

  if (!filteredErrors?.length) return null;

  return (
    <>
      {filteredErrors.map(({ message }) => (
        <span key={message} style={{ display: 'block' }}>
          {message}
        </span>
      ))}
    </>
  );
};

ErrorHelperText.propTypes = {
  errors: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string.isRequired,
      fields: PropTypes.arrayOf(PropTypes.string),
    })
  ),
  field: PropTypes.string.isRequired,
};

export default ErrorHelperText;
