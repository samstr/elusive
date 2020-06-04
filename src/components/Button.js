import { Button as MuiButton } from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';

export const useStyles = makeStyles((theme) => ({
  loading: {
    backgroundColor: theme.palette.primary.dark,
    color: '#8aafe1',
  },
}));

const Button = (props) => {
  const classes = useStyles();
  const { disabled, isLoading, loadingText, text } = props;

  const cleanProps = { ...props };

  delete cleanProps.isLoading;
  delete cleanProps.loadingText;

  return (
    <MuiButton
      {...cleanProps}
      disabled={disabled || isLoading}
      className={clsx(isLoading && classes.loading)}>
      {isLoading && <>{loadingText ? `${loadingText}...` : 'Loading...'}</>}
      {!isLoading && text}
    </MuiButton>
  );
};

Button.propTypes = {
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  loadingText: PropTypes.string,
  text: PropTypes.string.isRequired,
};

export default Button;
