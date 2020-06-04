import { Button as MuiButton } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const Button = (props) => {
  const { isLoading, loadingText } = props;

  return (
    <MuiButton {...props} disabled={disabled || isLoading}>
      {isLoading && loadingText ? `${loadingText}...` : 'Loading...'}
      {!isLoading && text}
    </MuiButton>
  );
};

Button.propTypes = {
  isLoading: PropTypes.bool,
  loadingText: PropTypes.string,
};

export default Button;
