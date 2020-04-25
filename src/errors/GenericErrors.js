import PropTypes from 'prop-types';
import React from 'react';
import { Alert } from 'react-bootstrap';

const GenericErrors = ({ errors }) => {
  return (
    <Alert variant="danger">
      {errors.map((error) => (
        <div key={error.name}>{error.message}</div>
      ))}
    </Alert>
  );
};

GenericErrors.propTypes = {
  errors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
    })
  ),
};

export default GenericErrors;
