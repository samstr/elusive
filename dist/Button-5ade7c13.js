'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var reactBootstrap = require('react-bootstrap');
var _JSXStyle = _interopDefault(require('styled-jsx/style'));

var __jsx = React__default.createElement;

var AuthBasePage = function AuthBasePage(_ref) {
  var children = _ref.children;
  return __jsx("div", {
    className: "jsx-1362455275" + " " + "hello"
  }, __jsx("p", {
    className: "jsx-1362455275"
  }, "Hello World"), __jsx(_JSXStyle, {
    id: "1362455275"
  }, ".hello.jsx-1362455275{font:15px Helvetica,Arial,sans-serif;background:#eee;padding:100px;text-align:center;-webkit-transition:100ms ease-in background;transition:100ms ease-in background;}.hello.jsx-1362455275:hover{background:#ccc;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkF1dGhCYXNlUGFnZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPa0IsQUFHa0QsQUFPdkIsZ0JBQ2xCLHFCQVBrQixnQkFDRixjQUNJLGtCQUNrQixnRkFDdEMiLCJmaWxlIjoiQXV0aEJhc2VQYWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNvbnN0IEF1dGhCYXNlUGFnZSA9ICh7IGNoaWxkcmVuIH0pID0+IHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImhlbGxvXCI+XG4gICAgICA8cD5IZWxsbyBXb3JsZDwvcD5cbiAgICAgIDxzdHlsZSBqc3g+e2BcbiAgICAgICAgLmhlbGxvIHtcbiAgICAgICAgICBmb250OiAxNXB4IEhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWY7XG4gICAgICAgICAgYmFja2dyb3VuZDogI2VlZTtcbiAgICAgICAgICBwYWRkaW5nOiAxMDBweDtcbiAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgICAgdHJhbnNpdGlvbjogMTAwbXMgZWFzZS1pbiBiYWNrZ3JvdW5kO1xuICAgICAgICB9XG4gICAgICAgIC5oZWxsbzpob3ZlciB7XG4gICAgICAgICAgYmFja2dyb3VuZDogI2NjYztcbiAgICAgICAgfVxuICAgICAgYH08L3N0eWxlPlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuQXV0aEJhc2VQYWdlLnByb3BUeXBlcyA9IHtcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQXV0aEJhc2VQYWdlO1xuIl19 */\n/*@ sourceURL=AuthBasePage.js */"));
};

AuthBasePage.propTypes = {
  children: PropTypes.node
};

var __jsx$1 = React__default.createElement;

var Button = function Button(props) {
  var block = props.block,
      disabled = props.disabled,
      isLoading = props.isLoading,
      loadingText = props.loadingText,
      onClick = props.onClick,
      size = props.size,
      text = props.text,
      type = props.type,
      variant = props.variant;

  var _loadingText = "".concat(loadingText, "...") || 'Loading...';

  return __jsx$1(reactBootstrap.Button, {
    variant: variant,
    type: type,
    onClick: onClick,
    disabled: disabled || isLoading,
    size: size,
    block: block
  }, isLoading && _loadingText, !isLoading && text);
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
  size: PropTypes.string
};

exports.AuthBasePage = AuthBasePage;
exports.Button = Button;
