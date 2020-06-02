import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

import { fieldErrors } from '../errors';
import {
  clearFormFieldErrors,
  getOnChangeValue,
  onboardingForm,
} from '../forms';
import { onboardingAPIRoute } from '../routes';

import Button from './Button';
import FormErrors from './FormErrors';

const OnboardingForm = ({ email, onSuccess }) => {
  const defaultValues = {
    password: '',
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

    const { cleanValues, errors } = onboardingForm().validate(values);

    if (errors && errors.length) {
      return setFormErrors(errors);
    }

    setSubmitting(true);

    try {
      const response = await axios.post(onboardingAPIRoute(), cleanValues);
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
          value={email}
          hidden
          readOnly
        />
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Control
          type="password"
          name="password"
          placeholder="Password"
          onChange={onChange}
          autoComplete="off"
          isInvalid={!!fieldErrors(formErrors, 'password').length}
          autoFocus
        />
        <FormErrors errors={formErrors} field="password" />
      </Form.Group>
      <FormErrors errors={formErrors} />
      <Button
        variant="primary"
        text="Save"
        loadingText="Saving"
        type="submit"
        isLoading={submitting}
        block
      />
    </Form>
  );
};

OnboardingForm.propTypes = {
  email: PropTypes.string,
  onSuccess: PropTypes.func.isRequired,
};

export default OnboardingForm;
