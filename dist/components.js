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
  var _disabled = disabled;
  var spinnerContent;
  var textContent = text;

  if (isLoading && !disabled) {
    spinnerContent = __jsx(reactBootstrap.Spinner, {
      as: "span",
      animation: "border",
      size: "sm",
      role: "status",
      "aria-hidden": "true"
    });
    _disabled = true;
    textContent = null;
  }

  return __jsx(reactBootstrap.Button, {
    variant: variant,
    type: type,
    onClick: onClick,
    disabled: _disabled,
    size: size,
    block: block
  }, spinnerContent, textContent);
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
