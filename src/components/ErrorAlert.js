import { Alert } from '@material-ui/lab';
import PropTypes from 'prop-types';
import React from 'react';

import { genericErrors } from '../errors';

const ErrorAlert = ({ className, errors, includingFields }) => {
  const filteredErrors = genericErrors(errors, includingFields);

  if (!filteredErrors?.length) return null;

  return (
    <Alert severity="error" variant="filled" className={className}>
      {filteredErrors.map(({ message }) => (
        <div key={message}>{message}</div>
      ))}
    </Alert>
  );
};

ErrorAlert.propTypes = {
  className: PropTypes.string,
  errors: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string.isRequired,
      fields: PropTypes.arrayOf(PropTypes.string),
    })
  ),
  includingFields: PropTypes.arrayOf(PropTypes.string),
};

export default ErrorAlert;
