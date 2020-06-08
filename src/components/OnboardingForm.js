import { Hidden, TextField } from '@material-ui/core';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { fieldErrors } from '../errors';
import {
  clearFormFieldErrors,
  getOnChangeValue,
  onboardingForm,
} from '../forms';
import { onboardingAPIRoute } from '../routes';

import { useStyles } from './AuthPage';
import Button from './Button';
import ErrorAlert from './ErrorAlert';
import ErrorHelperText from './ErrorHelperText';

const defaultValues = {
  password: '',
};

const OnboardingForm = ({ email, onSuccess }) => {
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

    const { cleanValues, errors } = onboardingForm().validate(values);

    if (errors && errors.length) {
      return setFormErrors(errors);
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(onboardingAPIRoute(), cleanValues);
      onSuccess(response.data);
    } catch (err) {
      setIsSubmitting(false);
      setFormErrors(err.response?.data?.errors);
    }
  };

  return (
    <form onSubmit={submit}>
      <Hidden xsUp implementation="css">
        <TextField
          id="onboarding-form-email"
          name="email"
          label="Email address"
          variant="outlined"
          value={email}
          className={classes.textField}
          InputProps={{ classes: { root: classes.textFieldInput } }}
          autoFocus={true}
          onChange={onChange}
          helperText={<ErrorHelperText errors={formErrors} field="email" />}
          error={!!fieldErrors(formErrors, 'email').length}
        />
      </Hidden>
      <TextField
        id="onboarding-form-password"
        name="password"
        type="password"
        label="Password"
        variant="outlined"
        className={classes.textField}
        InputProps={{ classes: { root: classes.textFieldInput } }}
        onChange={onChange}
        helperText={<ErrorHelperText errors={formErrors} field="password" />}
        error={!!fieldErrors(formErrors, 'password').length}
      />
      <ErrorAlert errors={formErrors} className={classes.errors} />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        text="Save"
        loadingText="Saving"
        isLoading={isSubmitting}
        className={classes.button}
        disableElevation
      />
    </form>
  );
};

OnboardingForm.propTypes = {
  email: PropTypes.string,
  onSuccess: PropTypes.func.isRequired,
};

export default OnboardingForm;
