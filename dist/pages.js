'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('./classCallCheck-d2bb402f.js');
require('./ElusiveClient-d044fa81.js');
var defineProperty$1 = require('./defineProperty-ba7cd53d.js');
var index$1 = require('./index.js');
require('./errors-6d843f19.js');
require('./utils-8eb11d51.js');
require('./asyncToGenerator-7a28bf2e.js');
var utils$1 = require('./utils-ac544182.js');
var core = require('@material-ui/core');
require('@material-ui/core/styles');
require('prop-types');
var React = require('react');
var React__default = _interopDefault(React);
var SignupForm = require('./SignupForm-00559597.js');
require('clsx');
require('@material-ui/lab');
require('next/link');
var router$1 = require('next/router');
require('react-dom');
require('axios');
require('./signupForm-6a97ccb8.js');
require('./UserContext-1558dc2a.js');
require('./utils-cb2ac89c.js');
var useSession = require('./useSession-069cbdf9.js');

var __jsx = React__default.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty$1._defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var AutoLoginPage = function AutoLoginPage() {
  var data = useSession.useData();
  var router = router$1.useRouter();

  var _useSessionContext = useSession.useSessionContext(),
      setSessionContext = _useSessionContext.setSessionContext;

  var errors = data === null || data === void 0 ? void 0 : data.errors;
  React.useEffect(function () {
    if (data === null || data === void 0 ? void 0 : data.session) {
      var _data$session$claims, _data$session$claims$;

      setSessionContext(_objectSpread(_objectSpread({}, data.session), {}, {
        _ready: true
      }));

      if ((_data$session$claims = data.session.claims) === null || _data$session$claims === void 0 ? void 0 : (_data$session$claims$ = _data$session$claims.user) === null || _data$session$claims$ === void 0 ? void 0 : _data$session$claims$.needsOnboarding) {
        router.replace(utils$1.onboardingRoute());
      } else if (router.query.next) {
        window.location = decodeURIComponent(router.query.next);
      } else {
        router.replace(utils$1.homeRoute());
      }
    }
  }, [data]);
  return __jsx(SignupForm.AuthPage, null, __jsx(React__default.Fragment, null, data && errors ? __jsx(SignupForm.ErrorAlert, {
    errors: errors
  }) : __jsx(core.CircularProgress, null)));
};

var __jsx$1 = React__default.createElement;

var LoginPage = function LoginPage() {
  var session = useSession.useSession();
  var classes = SignupForm.useStyles();
  var router = router$1.useRouter();
  var siteOptions = index$1.options.site;
  React.useEffect(function () {
    if (session._ready && session.isAuthenticated) {
      router.replace(utils$1.homeRoute());
    }
  }, [session]);

  var onSuccess = function onSuccess() {
    var next = utils$1.homeRoute();

    if (router.query.next) {
      next = decodeURIComponent(router.query.next);
    }

    window.location = next;
  };

  return __jsx$1(SignupForm.AuthPage, {
    title: "Login to ".concat(siteOptions.name)
  }, __jsx$1("div", {
    className: classes.form
  }, __jsx$1(SignupForm.LoginForm, {
    onSuccess: onSuccess
  })), __jsx$1("div", {
    className: classes.footer
  }, __jsx$1(SignupForm.Link, {
    href: utils$1.resetRoute()
  }, "Forgot your password?")));
};

var __jsx$2 = React__default.createElement;

var LogoutPage = function LogoutPage() {
  var router = router$1.useRouter();
  var session = useSession.useSession();
  var classes = SignupForm.useStyles();
  React.useEffect(function () {
    if (session._ready && !session.isAuthenticated) {
      router.replace(utils$1.loginRoute());
    }
  }, [session]);

  var onSuccess = function onSuccess() {
    window.location = utils$1.indexRoute();
  };

  return __jsx$2(SignupForm.AuthPage, {
    title: "Logout"
  }, __jsx$2("div", {
    className: classes.intro
  }, "Are you sure you want to logout?"), __jsx$2("div", {
    className: classes.form
  }, __jsx$2(SignupForm.LogoutForm, {
    onSuccess: onSuccess
  })));
};

var __jsx$3 = React__default.createElement;

var ResetPage = function ResetPage() {
  useSession.useSession();
  var classes = SignupForm.useStyles();

  var _useState = React.useState(),
      success = _useState[0],
      setSuccess = _useState[1];

  var mailOptions = index$1.options.mail;

  var onSuccess = function onSuccess() {
    return setSuccess(true);
  };

  return __jsx$3(SignupForm.AuthPage, {
    title: success ? 'Check your inbox' : 'Forgot your password?'
  }, success ? __jsx$3("div", {
    className: classes.intro
  }, __jsx$3("p", null, "If an account exists with this email address, an e-mail will be sent with further instructions."), __jsx$3("p", null, "You may need to check your spam folder or whitelist", ' ', mailOptions.fromEmail)) : __jsx$3("div", {
    className: classes.form
  }, __jsx$3(SignupForm.ResetForm, {
    onSuccess: onSuccess
  })));
};

var __jsx$4 = React__default.createElement;

var LoginPage$1 = function LoginPage() {
  var session = useSession.useSession();
  var classes = SignupForm.useStyles();

  var _useState = React.useState(),
      success = _useState[0],
      setSuccess = _useState[1];

  var mailOptions = index$1.options.mail;
  React.useEffect(function () {
    if (session._ready && session.isAuthenticated) {
      router.replace(utils$1.homeRoute());
    }
  }, [session]);

  var onSuccess = function onSuccess() {
    return setSuccess(true);
  };

  return __jsx$4(SignupForm.AuthPage, {
    title: success ? 'Check your inbox' : 'Create an account'
  }, success ? __jsx$4("div", {
    className: classes.intro
  }, __jsx$4("p", null, "Please confirm your email address to get started."), __jsx$4("p", null, "You may need to check your spam folder or whitelist", ' ', mailOptions.fromEmail)) : __jsx$4(React__default.Fragment, null, __jsx$4("div", {
    className: classes.form
  }, __jsx$4(SignupForm.SignupForm, {
    onSuccess: onSuccess
  })), __jsx$4("div", {
    className: classes.footer
  }, __jsx$4(SignupForm.Link, {
    href: utils$1.loginRoute()
  }, "I already have an account"))));
};

exports.AutoLoginPage = AutoLoginPage;
exports.LoginPage = LoginPage;
exports.LogoutPage = LogoutPage;
exports.ResetPage = ResetPage;
exports.SignupPage = LoginPage$1;
