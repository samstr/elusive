import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

import { LOGIN_TYPE_PASSWORD } from '../auth';
import { fieldErrors, FormErrors } from '../errors';
import {
  clearFormFieldErrors,
  getOnChangeValue,
  loginWithPasswordForm,
} from '../forms';
import { loginAPIRoute } from '../routes';

import Button from './Button';

const LoginWithPasswordForm = ({ onSuccess }) => {
  const defaultValues = {
    type: LOGIN_TYPE_PASSWORD,
    email: '',
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

    const { cleanValues, errors } = loginWithPasswordForm().validate(values);

    if (errors && errors.length) {
      return setFormErrors(errors);
    }

    setSubmitting(true);

    try {
      const response = await axios.post(loginAPIRoute(), cleanValues);
      onSuccess(response.data);
    } catch (err) {
      setSubmitting(false);
      setFormErrors(err.response?.data?.errors);
    }
  };

  return (
    <>
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
        <Form.Group controlId="password">
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            onChange={onChange}
            autoComplete="off"
            isInvalid={!!fieldErrors(formErrors, 'password').length}
          />
          <FormErrors errors={formErrors} field="password" />
        </Form.Group>
        <FormErrors errors={formErrors} includingFields={['type']} />
        <Button
          variant="primary"
          text="Login"
          loadingText="Logging in"
          type="submit"
          isLoading={submitting}
          block
        />
      </Form>
    </>
  );
};

LoginWithPasswordForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

export default LoginWithPasswordForm;
