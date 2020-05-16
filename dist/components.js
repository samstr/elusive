'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var reactBootstrap = require('react-bootstrap');

var __jsx = React__default.createElement;

var Button = function Button(props) {
  var block = props.block,
      disabled = props.disabled,
      isLoading = props.isLoading,
      onClick = props.onClick,
      size = props.size,
      text = props.text,
      type = props.type,
      variant = props.variant;
  return __jsx(reactBootstrap.Button, {
    variant: variant,
    type: type,
    onClick: onClick,
    disabled: disabled || isLoading,
    size: size,
    block: block
  }, isLoading && "Loading...", !isLoading && text);
};

Button.propTypes = {
  variant: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
  isLoading: PropTypes.bool,
  text: PropTypes.string,
  block: PropTypes.bool,
  disabled: PropTypes.bool,
  size: PropTypes.string
};

exports.Button = Button;
