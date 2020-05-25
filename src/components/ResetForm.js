import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

import { fieldErrors } from '../errors';
import { clearFormFieldErrors, getOnChangeValue, resetForm } from '../forms';
import { resetAPIRoute } from '../routes';

import Button from './Button';
import FormErrors from './FormErrors';

const ResetForm = ({ onSuccess }) => {
  const defaultValues = {
    email: '',
  };

  const [values, setValues] = useState(defaultValues);
  const [formErrors, setFormErrors] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const onChange = (event) => {
    const { field, value } = getOnChangeValue(event);

    setFormErrors(clearFormFieldErrors(formErrors, field));
    setValues({
      ...values,
      [field]: value,
    });
  };

  const submit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    setFormErrors(null);

    const { cleanValues, errors } = resetForm().validate(values);

    if (errors && errors.length) {
      return setFormErrors(errors);
    }

    setSubmitting(true);

    try {
      const response = await axios.post(resetAPIRoute(), cleanValues);
      onSuccess(response.data);
    } catch (err) {
      setSubmitting(false);
      setFormErrors(err.response?.data?.errors);
    }
  };

  return (
    <Form noValidate onSubmit={submit}>
      <Form.Group controlId="email">
        <Form.Control
          name="email"
          type="text"
          placeholder="Email"
          onChange={onChange}
          autoComplete="off"
          isInvalid={!!fieldErrors(formErrors, 'email').length}
          autoFocus
        />
        <FormErrors errors={formErrors} field="email" />
      </Form.Group>
      <FormErrors errors={formErrors} />
      <Button
        variant="primary"
        text="Send"
        loadingText="Sending"
        type="submit"
        isLoading={submitting}
        block
      />
    </Form>
  );
};

ResetForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

export default ResetForm;
