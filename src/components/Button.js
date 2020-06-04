import { Button as MuiButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';

export const useStyles = makeStyles((theme) => ({
  loading: {
    opacity: 0.75,
    pointerEvents: 'none',
  },
}));

const Button = (props) => {
  const classes = useStyles();
  const { className, isLoading, loadingText, text } = props;

  const cleanProps = { ...props };

  delete cleanProps.isLoading;
  delete cleanProps.loadingText;

  return (
    <MuiButton
      {...cleanProps}
      className={clsx(className, isLoading && classes.loading)}>
      {isLoading && <>{loadingText ? `${loadingText}...` : 'Loading...'}</>}
      {!isLoading && text}
    </MuiButton>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  loadingText: PropTypes.string,
  text: PropTypes.string.isRequired,
};

export default Button;
