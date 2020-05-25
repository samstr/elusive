import axios from 'axios';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

import { LOGIN_TYPE_LINK } from '../auth';
import { fieldErrors } from '../errors';
import {
  clearFormFieldErrors,
  getOnChangeValue,
  loginWithLinkForm,
} from '../forms';
import { loginAPIRoute } from '../routes';

import Button from './Button';
import FormErrors from './FormErrors';

const LoginWithLinkForm = ({ onSuccess }) => {
  const router = useRouter();

  const defaultValues = {
    type: LOGIN_TYPE_LINK,
    email: '',
    next: router.query.next,
  };

  const [values, setValues] = useState(defaultValues);
  const [formErrors, setFormErrors] = useState();
  const [submitting, setSubmitting] = useState();

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
    setFormErrors();

    const { cleanValues, errors } = loginWithLinkForm().validate(values);

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
      <FormErrors errors={formErrors} includingFields={['type']} />
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

LoginWithLinkForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

export default LoginWithLinkForm;
