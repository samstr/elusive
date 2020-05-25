'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var ElusiveClient = require('./ElusiveClient-7405d865.js');
require('./index.js');
var FormErrors = require('./FormErrors-bf65213f.js');
var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var reactBootstrap = require('react-bootstrap');
var asyncToGenerator = require('./asyncToGenerator-42483001.js');
require('bcryptjs');
var utils$1 = require('./utils-3409f232.js');
var utils$2 = require('./utils-24b30e03.js');
var _JSXStyle = _interopDefault(require('styled-jsx/style'));
var axios = require('axios');
var axios__default = _interopDefault(axios);
var router = require('next/router');
var signup = require('./signup-d14953e8.js');

var __jsx = React__default.createElement;

var AuthBasePage = function AuthBasePage(_ref) {
  var children = _ref.children;
  return __jsx("div", {
    className: "jsx-2507273223" + " " + "auth-base-page"
  }, children, __jsx(_JSXStyle, {
    id: "2507273223"
  }, ".auth-base-page{padding:50px 20px 75px;width:100%;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;height:100%;}.auth-base-page h1{font-size:32px;font-weight:bold;margin-bottom:35px;text-align:center;}.auth-base-page .intro{text-align:center;margin-bottom:35px;}.auth-base-page .form{margin:0 auto;width:100%;}.auth-base-page .footer{margin-top:35px;text-align:center;}@media (min-width:600px){.auth-base-page{width:auto;}.auth-base-page .form{width:320px;}}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkF1dGhCYXNlUGFnZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFNdUIsQUFHZ0MsQUFVUixBQU9HLEFBS0osQUFLRSxBQU1ILEFBSUMsV0FIZCxDQUlBLEVBZlcsQ0FaTSxDQWlCQyxFQVZDLEtBakJSLEVBdUJiLE9BWnFCLEVBVkcsQUEyQnhCLEdBVkEsY0FOb0Isa0JBQ3BCLDJDQVhlLDBFQUNNLDZGQUNJLG1HQUNYLFlBQ2QiLCJmaWxlIjoiQXV0aEJhc2VQYWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNvbnN0IEF1dGhCYXNlUGFnZSA9ICh7IGNoaWxkcmVuIH0pID0+IChcbiAgPGRpdiBjbGFzc05hbWU9XCJhdXRoLWJhc2UtcGFnZVwiPlxuICAgIHtjaGlsZHJlbn1cbiAgICA8c3R5bGUgZ2xvYmFsIGpzeD57YFxuICAgICAgLmF1dGgtYmFzZS1wYWdlIHtcbiAgICAgICAgcGFkZGluZzogNTBweCAyMHB4IDc1cHg7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgfVxuXG4gICAgICAuYXV0aC1iYXNlLXBhZ2UgaDEge1xuICAgICAgICBmb250LXNpemU6IDMycHg7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAzNXB4O1xuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICB9XG5cbiAgICAgIC5hdXRoLWJhc2UtcGFnZSAuaW50cm8ge1xuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDM1cHg7XG4gICAgICB9XG5cbiAgICAgIC5hdXRoLWJhc2UtcGFnZSAuZm9ybSB7XG4gICAgICAgIG1hcmdpbjogMCBhdXRvO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgIH1cblxuICAgICAgLmF1dGgtYmFzZS1wYWdlIC5mb290ZXIge1xuICAgICAgICBtYXJnaW4tdG9wOiAzNXB4O1xuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICB9XG5cbiAgICAgIEBtZWRpYSAobWluLXdpZHRoOiA2MDBweCkge1xuICAgICAgICAuYXV0aC1iYXNlLXBhZ2Uge1xuICAgICAgICAgIHdpZHRoOiBhdXRvO1xuICAgICAgICB9XG5cbiAgICAgICAgLmF1dGgtYmFzZS1wYWdlIC5mb3JtIHtcbiAgICAgICAgICB3aWR0aDogMzIwcHg7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBgfTwvc3R5bGU+XG4gIDwvZGl2PlxuKTtcblxuQXV0aEJhc2VQYWdlLnByb3BUeXBlcyA9IHtcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQXV0aEJhc2VQYWdlO1xuIl19 */\n/*@ sourceURL=AuthBasePage.js */"));
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

var __jsx$2 = React__default.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { ElusiveClient._defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var LoginWithLinkForm = function LoginWithLinkForm(_ref) {
  var onSuccess = _ref.onSuccess;
  var router$1 = router.useRouter();
  var defaultValues = {
    type: utils$2.LOGIN_TYPE_LINK,
    email: '',
    next: router$1.query.next
  };

  var _useState = React.useState(defaultValues),
      values = _useState[0],
      setValues = _useState[1];

  var _useState2 = React.useState(),
      formErrors = _useState2[0],
      setFormErrors = _useState2[1];

  var _useState3 = React.useState(),
      submitting = _useState3[0],
      setSubmitting = _useState3[1];

  var onChange = function onChange(event) {
    var _getOnChangeValue = signup.getOnChangeValue(event),
        field = _getOnChangeValue.field,
        value = _getOnChangeValue.value;

    setFormErrors(signup.clearFormFieldErrors(formErrors, field));
    setValues(_objectSpread(_objectSpread({}, values), {}, ElusiveClient._defineProperty({}, field, value)));
  };

  var submit = /*#__PURE__*/function () {
    var _ref2 = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator.regenerator.mark(function _callee(event) {
      var _loginWithLinkForm$va, cleanValues, errors, response, _err$response, _err$response$data;

      return asyncToGenerator.regenerator.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              event.preventDefault();
              event.stopPropagation();
              setFormErrors();
              _loginWithLinkForm$va = signup.loginWithLinkForm().validate(values), cleanValues = _loginWithLinkForm$va.cleanValues, errors = _loginWithLinkForm$va.errors;

              if (!(errors && errors.length)) {
                _context.next = 6;
                break;
              }

              return _context.abrupt("return", setFormErrors(errors));

            case 6:
              setSubmitting(true);
              _context.prev = 7;
              _context.next = 10;
              return axios__default.post(utils$1.loginAPIRoute(), cleanValues);

            case 10:
              response = _context.sent;
              onSuccess(response.data);
              _context.next = 18;
              break;

            case 14:
              _context.prev = 14;
              _context.t0 = _context["catch"](7);
              setSubmitting(false);
              setFormErrors((_err$response = _context.t0.response) === null || _err$response === void 0 ? void 0 : (_err$response$data = _err$response.data) === null || _err$response$data === void 0 ? void 0 : _err$response$data.errors);

            case 18:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[7, 14]]);
    }));

    return function submit(_x) {
      return _ref2.apply(this, arguments);
    };
  }();

  return __jsx$2(React__default.Fragment, null, __jsx$2(reactBootstrap.Form, {
    noValidate: true,
    onSubmit: submit
  }, __jsx$2(reactBootstrap.Form.Group, {
    controlId: "email"
  }, __jsx$2(reactBootstrap.Form.Control, {
    name: "email",
    type: "text",
    placeholder: "Email",
    onChange: onChange,
    autoComplete: "off",
    isInvalid: !!FormErrors.fieldErrors(formErrors, 'email').length,
    autoFocus: true
  }), __jsx$2(FormErrors.FormErrors, {
    errors: formErrors,
    field: "email"
  })), __jsx$2(FormErrors.FormErrors, {
    errors: formErrors,
    includingFields: ['type']
  }), __jsx$2(Button, {
    variant: "primary",
    text: "Send",
    loadingText: "Sending",
    type: "submit",
    isLoading: submitting,
    block: true
  })));
};

LoginWithLinkForm.propTypes = {
  onSuccess: PropTypes.func.isRequired
};

var __jsx$3 = React__default.createElement;

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { ElusiveClient._defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var LoginWithPasswordForm = function LoginWithPasswordForm(_ref) {
  var onSuccess = _ref.onSuccess;
  var defaultValues = {
    type: utils$2.LOGIN_TYPE_PASSWORD,
    email: '',
    password: ''
  };

  var _useState = React.useState(defaultValues),
      values = _useState[0],
      setValues = _useState[1];

  var _useState2 = React.useState(null),
      formErrors = _useState2[0],
      setFormErrors = _useState2[1];

  var _useState3 = React.useState(false),
      submitting = _useState3[0],
      setSubmitting = _useState3[1];

  var onChange = function onChange(event) {
    var _getOnChangeValue = signup.getOnChangeValue(event),
        field = _getOnChangeValue.field,
        value = _getOnChangeValue.value;

    setFormErrors(signup.clearFormFieldErrors(formErrors, field));
    setValues(_objectSpread$1(_objectSpread$1({}, values), {}, ElusiveClient._defineProperty({}, field, value)));
  };

  var submit = /*#__PURE__*/function () {
    var _ref2 = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator.regenerator.mark(function _callee(event) {
      var _loginWithPasswordFor, cleanValues, errors, response, _err$response, _err$response$data;

      return asyncToGenerator.regenerator.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              event.preventDefault();
              event.stopPropagation();
              setFormErrors(null);
              _loginWithPasswordFor = signup.loginWithPasswordForm().validate(values), cleanValues = _loginWithPasswordFor.cleanValues, errors = _loginWithPasswordFor.errors;

              if (!(errors && errors.length)) {
                _context.next = 6;
                break;
              }

              return _context.abrupt("return", setFormErrors(errors));

            case 6:
              setSubmitting(true);
              _context.prev = 7;
              _context.next = 10;
              return axios__default.post(utils$1.loginAPIRoute(), cleanValues);

            case 10:
              response = _context.sent;
              onSuccess(response.data);
              _context.next = 18;
              break;

            case 14:
              _context.prev = 14;
              _context.t0 = _context["catch"](7);
              setSubmitting(false);
              setFormErrors((_err$response = _context.t0.response) === null || _err$response === void 0 ? void 0 : (_err$response$data = _err$response.data) === null || _err$response$data === void 0 ? void 0 : _err$response$data.errors);

            case 18:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[7, 14]]);
    }));

    return function submit(_x) {
      return _ref2.apply(this, arguments);
    };
  }();

  return __jsx$3(React__default.Fragment, null, __jsx$3(reactBootstrap.Form, {
    noValidate: true,
    onSubmit: submit
  }, __jsx$3(reactBootstrap.Form.Group, {
    controlId: "email"
  }, __jsx$3(reactBootstrap.Form.Control, {
    name: "email",
    type: "text",
    placeholder: "Email",
    onChange: onChange,
    autoComplete: "off",
    isInvalid: !!FormErrors.fieldErrors(formErrors, 'email').length,
    autoFocus: true
  }), __jsx$3(FormErrors.FormErrors, {
    errors: formErrors,
    field: "email"
  })), __jsx$3(reactBootstrap.Form.Group, {
    controlId: "password"
  }, __jsx$3(reactBootstrap.Form.Control, {
    type: "password",
    name: "password",
    placeholder: "Password",
    onChange: onChange,
    autoComplete: "off",
    isInvalid: !!FormErrors.fieldErrors(formErrors, 'password').length
  }), __jsx$3(FormErrors.FormErrors, {
    errors: formErrors,
    field: "password"
  })), __jsx$3(FormErrors.FormErrors, {
    errors: formErrors,
    includingFields: ['type']
  }), __jsx$3(Button, {
    variant: "primary",
    text: "Login",
    loadingText: "Logging in",
    type: "submit",
    isLoading: submitting,
    block: true
  })));
};

LoginWithPasswordForm.propTypes = {
  onSuccess: PropTypes.func.isRequired
};

var __jsx$4 = React__default.createElement;

function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$2(Object(source), true).forEach(function (key) { ElusiveClient._defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var SignupForm = function SignupForm(_ref) {
  var onSuccess = _ref.onSuccess;
  var defaultValues = {
    email: ''
  };

  var _useState = React.useState(defaultValues),
      values = _useState[0],
      setValues = _useState[1];

  var _useState2 = React.useState(null),
      formErrors = _useState2[0],
      setFormErrors = _useState2[1];

  var _useState3 = React.useState(false),
      submitting = _useState3[0],
      setSubmitting = _useState3[1];

  var onChange = function onChange(event) {
    var _getOnChangeValue = signup.getOnChangeValue(event),
        field = _getOnChangeValue.field,
        value = _getOnChangeValue.value;

    setFormErrors(signup.clearFormFieldErrors(formErrors, field));
    setValues(_objectSpread$2(_objectSpread$2({}, values), {}, ElusiveClient._defineProperty({}, field, value)));
  };

  var submit = /*#__PURE__*/function () {
    var _ref2 = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator.regenerator.mark(function _callee(event) {
      var _signupForm$validate, cleanValues, errors, response, _err$response, _err$response$data;

      return asyncToGenerator.regenerator.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              event.preventDefault();
              event.stopPropagation();
              setFormErrors(null);
              _signupForm$validate = signup.signupForm().validate(values), cleanValues = _signupForm$validate.cleanValues, errors = _signupForm$validate.errors;

              if (!(errors && errors.length)) {
                _context.next = 6;
                break;
              }

              return _context.abrupt("return", setFormErrors(errors));

            case 6:
              setSubmitting(true);
              _context.prev = 7;
              _context.next = 10;
              return axios__default.post(utils$1.signupAPIRoute(), cleanValues);

            case 10:
              response = _context.sent;
              onSuccess(response.data);
              _context.next = 18;
              break;

            case 14:
              _context.prev = 14;
              _context.t0 = _context["catch"](7);
              setSubmitting(false);
              setFormErrors((_err$response = _context.t0.response) === null || _err$response === void 0 ? void 0 : (_err$response$data = _err$response.data) === null || _err$response$data === void 0 ? void 0 : _err$response$data.errors);

            case 18:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[7, 14]]);
    }));

    return function submit(_x) {
      return _ref2.apply(this, arguments);
    };
  }();

  return __jsx$4(React__default.Fragment, null, __jsx$4(reactBootstrap.Form, {
    noValidate: true,
    onSubmit: submit
  }, __jsx$4(reactBootstrap.Form.Group, {
    controlId: "email"
  }, __jsx$4(reactBootstrap.Form.Control, {
    name: "email",
    type: "text",
    placeholder: "Email",
    onChange: onChange,
    autoComplete: "off",
    isInvalid: !!FormErrors.fieldErrors(formErrors, 'email').length,
    autoFocus: true
  }), __jsx$4(FormErrors.FormErrors, {
    errors: formErrors,
    field: "email"
  })), __jsx$4(FormErrors.FormErrors, {
    errors: formErrors
  }), __jsx$4(Button, {
    variant: "primary",
    text: "Sign Up",
    loadingText: "Signing up",
    type: "submit",
    isLoading: submitting,
    block: true
  })));
};

SignupForm.propTypes = {
  onSuccess: PropTypes.func.isRequired
};

exports.AuthBasePage = AuthBasePage;
exports.Button = Button;
exports.LoginWithLinkForm = LoginWithLinkForm;
exports.LoginWithPasswordForm = LoginWithPasswordForm;
exports.SignupForm = SignupForm;
