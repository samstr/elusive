import PropTypes from 'prop-types';
import React from 'react';
import { Button as BootstrapButton } from 'react-bootstrap';

const Button = (props) => {
  const {
    block,
    disabled,
    isLoading,
    onClick,
    size,
    text,
    type,
    variant,
  } = props;

  return (
    <BootstrapButton
      variant={variant}
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      size={size}
      block={block}>
      {isLoading && `Loading...`}
      {!isLoading && text}
    </BootstrapButton>
  );
};

Button.propTypes = {
  variant: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
  isLoading: PropTypes.bool,
  text: PropTypes.string,
  block: PropTypes.bool,
  disabled: PropTypes.bool,
  size: PropTypes.string,
};

export default Button;
