import PropTypes from 'prop-types';
import React from 'react';
import { Button as BootstrapButton } from 'react-bootstrap';

const Button = (props) => {
  const {
    block,
    disabled,
    isLoading,
    loadingText,
    onClick,
    size,
    text,
    type,
    variant,
  } = props;

  const _loadingText = `${loadingText}...` || 'Loading...';

  return (
    <BootstrapButton
      variant={variant}
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      size={size}
      block={block}>
      {isLoading && _loadingText}
      {!isLoading && text}
    </BootstrapButton>
  );
};

Button.propTypes = {
  variant: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
  isLoading: PropTypes.bool,
  loadingText: PropTypes.string,
  text: PropTypes.string,
  block: PropTypes.bool,
  disabled: PropTypes.bool,
  size: PropTypes.string,
};

export default Button;
