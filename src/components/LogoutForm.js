import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

import { logoutAPIRoute } from '../routes';

import Button from './Button';
import FormErrors from './FormErrors';

const LogoutForm = ({ onSuccess }) => {
  const [formErrors, setFormErrors] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    setFormErrors([]);
    setSubmitting(true);

    try {
      const response = await axios.post(logoutAPIRoute());
      onSuccess(response.data);
    } catch (err) {
      setSubmitting(false);
      setFormErrors(err.response?.data?.errors);
    }
  };

  return (
    <Form noValidate onSubmit={submit}>
      <FormErrors errors={formErrors} />
      <Button
        variant="primary"
        text="Logout"
        loadingText="Logging out"
        type="submit"
        isLoading={submitting}
        block
      />
    </Form>
  );
};

LogoutForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

export default LogoutForm;
