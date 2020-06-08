import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { logoutAPIRoute } from '../routes';

import { useStyles } from './AuthPage';
import Button from './Button';
import ErrorAlert from './ErrorAlert';

const LogoutForm = ({ onSuccess }) => {
  const classes = useStyles();
  const [formErrors, setFormErrors] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setFormErrors(null);
    setIsSubmitting(true);

    try {
      const response = await axios.post(logoutAPIRoute());
      onSuccess(response.data);
    } catch (err) {
      setIsSubmitting(false);
      setFormErrors(err.response?.data?.errors);
    }
  };

  return (
    <form onSubmit={submit}>
      <ErrorAlert errors={formErrors} className={classes.errors} />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        text="Logout"
        loadingText="Logging out"
        isLoading={isSubmitting}
        className={classes.button}
        disableElevation
      />
    </form>
  );
};

LogoutForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

export default LogoutForm;
