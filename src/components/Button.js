import PropTypes from 'prop-types';
import React from 'react';
import { Button as BootstrapButton, Spinner } from 'react-bootstrap';

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

  let _disabled = disabled;

  let spinnerContent;
  let textContent = text;

  if (isLoading && !disabled) {
    spinnerContent = (
      <Spinner
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
      />
    );
    _disabled = true;
    textContent = null;
  }

  return (
    <BootstrapButton
      variant={variant}
      type={type}
      onClick={onClick}
      disabled={_disabled}
      size={size}
      block={block}>
      {spinnerContent}
      {textContent}
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
