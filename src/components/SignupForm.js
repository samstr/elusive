import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { fieldErrors } from '../errors';
import { clearFormFieldErrors, getOnChangeValue, signupForm } from '../forms';
import { signupAPIRoute } from '../routes';

import Button from './Button';
import ErrorAlert from './ErrorAlert';
import ErrorHelperText from './ErrorHelperText';

const useStyles = makeStyles((theme) => ({
  textField: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  textFieldInput: {
    backgroundColor: theme.palette.common.white,
  },
  button: {
    width: '100%',
  },
  errors: {
    marginBottom: theme.spacing(2),
  },
}));

const defaultValues = {
  email: '',
};

const SignupForm = ({ onSuccess }) => {
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

    const { cleanValues, errors } = signupForm().validate(values);

    if (errors && errors.length) {
      return setFormErrors(errors);
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(signupAPIRoute(), cleanValues);
      onSuccess(response.data);
    } catch (err) {
      setIsSubmitting(false);
      setFormErrors(err.response?.data?.errors);
    }
  };

  return (
    <form onSubmit={submit}>
      <TextField
        id="signup-form-email"
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
        text="Create account"
        loadingText="Creating account"
        isLoading={isSubmitting}
        className={classes.button}
        disableElevation
      />
    </form>
  );
};

SignupForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

export default SignupForm;
