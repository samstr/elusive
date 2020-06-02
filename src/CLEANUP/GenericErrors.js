import PropTypes from 'prop-types';
import React from 'react';
import { Alert } from 'react-bootstrap';

const GenericErrors = ({ errors }) => {
  return (
    <Alert variant="danger">
      {errors.map((error) => (
        <div key={error.message}>{error.message}</div>
      ))}
    </Alert>
  );
};

GenericErrors.propTypes = {
  errors: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string.isRequired,
      fields: PropTypes.arrayOf(PropTypes.string),
    })
  ),
};

export default GenericErrors;
