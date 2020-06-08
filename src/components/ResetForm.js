import { TextField } from '@material-ui/core';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { fieldErrors } from '../errors';
import { clearFormFieldErrors, getOnChangeValue, resetForm } from '../forms';
import { resetAPIRoute } from '../routes';

import { useStyles } from './AuthPage';
import Button from './Button';
import ErrorAlert from './ErrorAlert';
import ErrorHelperText from './ErrorHelperText';

const defaultValues = {
  email: '',
};

const ResetForm = ({ onSuccess }) => {
  const classes = useStyles();
  const [values, setValues] = useState(defaultValues);
  const [formErrors, setFormErrors] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setFormErrors(null);

    const { cleanValues, errors } = resetForm().validate(values);

    if (errors && errors.length) {
      return setFormErrors(errors);
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(resetAPIRoute(), cleanValues);
      onSuccess(response.data);
    } catch (err) {
      setIsSubmitting(false);
      setFormErrors(err.response?.data?.errors);
    }
  };

  return (
    <form onSubmit={submit}>
      <TextField
        id="reset-form-email"
        name="email"
        label="Email address"
        variant="outlined"
        className={classes.textField}
        InputProps={{ classes: { root: classes.textFieldInput } }}
        autoFocus={true}
        onChange={onChange}
        helperText={<ErrorHelperText errors={formErrors} field="email" />}
        error={!!fieldErrors(formErrors, 'email').length}
      />
      <ErrorAlert errors={formErrors} className={classes.errors} />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        text="Reset password"
        loadingText="Resetting account"
        isLoading={isSubmitting}
        className={classes.button}
        disableElevation
      />
    </form>
  );
};

ResetForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

export default ResetForm;