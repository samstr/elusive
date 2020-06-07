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
require('@material-ui/core/styles');
require('prop-types');
var React = require('react');
var React__default = _interopDefault(React);
var SignupForm = require('./SignupForm-54ff5db4.js');
var core = require('@material-ui/core');
require('clsx');
require('@material-ui/lab');
var NextLink = _interopDefault(require('next/link'));
var router$1 = require('next/router');
require('react-dom');
require('axios');
require('./signupForm-ee459d84.js');
require('./loginForm-5d0cd44b.js');
require('./UserContext-1558dc2a.js');
require('./utils-cb2ac89c.js');
var useSession = require('./useSession-8dd087fe.js');

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
  return __jsx(React__default.Fragment, null, data && errors ? __jsx(React__default.Fragment, null, __jsx("h1", null, "There was a problem")) : __jsx("p", null, "Spinner"));
};

var __jsx$1 = React__default.createElement;

var LoginPage = function LoginPage() {
  var session = useSession.useSession();
  var classes = SignupForm.useStyles();
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

  return __jsx$1(SignupForm.AuthPage, null, __jsx$1(core.Typography, {
    variant: "h4",
    className: classes.title
  }, "Login to ", siteOptions.name), __jsx$1("div", {
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
  React.useEffect(function () {
    if (session._ready && !session.isAuthenticated) {
      router.replace(utils$1.loginRoute());
    }
  }, [session]);

  return __jsx$2(React__default.Fragment, null, __jsx$2("h1", null, "Logout"), __jsx$2("div", {
    className: "intro"
  }, "Are sure you want to logout?"), __jsx$2("div", {
    className: "form"
  }));
};

var __jsx$3 = React__default.createElement;

var OnboardingPage = function OnboardingPage() {
  useSession.useRequireAuth();
  var session = useSession.useSession();

  var _useState = React.useState(),
      success = _useState[0],
      setSuccess = _useState[1];

  var _useSessionContext = useSession.useSessionContext(),
      setSessionContext = _useSessionContext.setSessionContext;

  React.useEffect(function () {
    if (session._ready && session.isAuthenticated) {
      var user = session.claims.user;

      if (!user.needsOnboarding) {
        setSuccess(true);
      }
    }
  }, [session._ready]);

  return __jsx$3(React__default.Fragment, null, session._ready ? __jsx$3(React__default.Fragment, null, success ? __jsx$3(React__default.Fragment, null, __jsx$3("h1", null, "What next?"), __jsx$3("div", {
    className: "options"
  }, __jsx$3(NextLink, {
    href: utils$1.settingsProfileRoute()
  }, __jsx$3("a", {
    className: "option"
  }, __jsx$3("div", {
    className: "icon"
  }, __jsx$3("img", {
    src: "/img/icons/user-1a73e8.svg",
    width: "38"
  })), __jsx$3("div", {
    className: "details"
  }, __jsx$3("div", {
    className: "heading"
  }, "Setup your profile"), __jsx$3("div", {
    className: "description"
  }, "Whether you're a creator or a fan, the next step is to set your name and picture. Click here to edit your profile.")))))) : __jsx$3(React__default.Fragment, null, __jsx$3("h1", null, "Create a password"), __jsx$3("div", {
    className: "intro"
  }, "Let's create a password for you to use when you login"), __jsx$3("div", {
    className: "form"
  }))) : __jsx$3("p", null, "Spinner"));
};

var __jsx$4 = React__default.createElement;

var ResetPage = function ResetPage() {
  useSession.useSession();

  var _useState = React.useState(),
      success = _useState[0],
      setSuccess = _useState[1];

  var mailOptions = index$1.options.mail;

  var onSuccess = function onSuccess() {
    return setSuccess(true);
  };

  return __jsx$4(SignupForm.AuthPage, null, success ? __jsx$4(React__default.Fragment, null, __jsx$4(core.Typography, {
    variant: "h4",
    className: classes.title
  }, "Check your inbox"), __jsx$4("div", {
    className: classes.intro
  }, __jsx$4("p", null, "If an account exists with this email address, an e-mail will be sent with further instructions."), __jsx$4("p", null, "You may need to check your spam folder or whitelist", ' ', mailOptions.fromEmail))) : __jsx$4(React__default.Fragment, null, __jsx$4(core.Typography, {
    variant: "h4",
    className: classes.title
  }, "Forgot your password?"), __jsx$4("div", {
    className: classes.form
  }, __jsx$4(SignupForm.ResetForm, {
    onSuccess: onSuccess
  }))), __jsx$4("p", {
    onClick: function onClick() {
      return setSuccess(true);
    }
  }, "test"));
};

var __jsx$5 = React__default.createElement;

var LoginPage$1 = function LoginPage() {
  var session = useSession.useSession();
  var classes = SignupForm.useStyles();

  var _useState = React.useState(),
      success = _useState[0],
      setSuccess = _useState[1];

  var _Elusive$options = index$1.options,
      mailOptions = _Elusive$options.mail,
      siteOptions = _Elusive$options.site;
  React.useEffect(function () {
    if (session._ready && session.isAuthenticated) {
      router.replace(utils$1.homeRoute());
    }
  }, [session]);

  var onSuccess = function onSuccess() {
    return setSuccess(true);
  };

  return __jsx$5(SignupForm.AuthPage, null, success ? __jsx$5(React__default.Fragment, null, __jsx$5(core.Typography, {
    variant: "h4",
    className: classes.title
  }, "Login to ", siteOptions.name), __jsx$5("div", {
    className: classes.intro
  }, __jsx$5("p", null, "Please confirm your email address to get started."), __jsx$5("p", null, "You may need to check your spam folder or whitelist", ' ', mailOptions.fromEmail))) : __jsx$5(React__default.Fragment, null, __jsx$5(core.Typography, {
    variant: "h4",
    className: classes.title
  }, "Create an account"), __jsx$5("div", {
    className: classes.form
  }, __jsx$5(SignupForm.SignupForm, {
    onSuccess: onSuccess
  })), __jsx$5("div", {
    className: classes.footer
  }, __jsx$5(SignupForm.Link, {
    href: utils$1.loginRoute()
  }, "I already have an account"))));
};

exports.AutoLoginPage = AutoLoginPage;
exports.LoginPage = LoginPage;
exports.LogoutPage = LogoutPage;
exports.OnboardingPage = OnboardingPage;
exports.ResetPage = ResetPage;
exports.SignupPage = LoginPage$1;
