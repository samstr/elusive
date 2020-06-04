'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('./classCallCheck-d2bb402f.js');
require('./createClass-013e6a9b.js');
var defineProperty$1 = require('./defineProperty-ba7cd53d.js');
require('./ElusiveClient-6f759f99.js');
var index = require('./index.js');
require('./errors-2aa38575.js');
require('./assertThisInitialized-bc0de409.js');
require('./_commonjsHelpers-a81e97c5.js');
require('./asyncToGenerator-d7664c2f.js');
var utils$1 = require('./utils-ac544182.js');
var React = require('react');
var React__default = _interopDefault(React);
var Link = require('./Link-a9288084.js');
require('prop-types');
require('clsx');
var NextLink = _interopDefault(require('next/link'));
var router = require('next/router');
require('react-dom');
require('./UserContext-41109d68.js');
require('axios');
require('./utils-325de3e4.js');
var useSession = require('./useSession-9a64abfd.js');

var __jsx = React__default.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty$1._defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var AutoLoginPage = function AutoLoginPage() {
  var data = useSession.useData();
  var router$1 = router.useRouter();

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
        router$1.replace(utils$1.onboardingRoute());
      } else if (router$1.query.next) {
        window.location = decodeURIComponent(router$1.query.next);
      } else {
        router$1.replace(utils$1.homeRoute());
      }
    }
  }, [data]);
  return __jsx(Link.AuthBasePage, null, data && errors ? __jsx(React__default.Fragment, null, __jsx("h1", null, "There was a problem")) : __jsx("p", null, "Spinner"));
};

var __jsx$1 = React__default.createElement;

var LogoutPage = function LogoutPage() {
  var router$1 = router.useRouter();
  var session = useSession.useSession();
  React.useEffect(function () {
    if (session._ready && !session.isAuthenticated) {
      router$1.replace(utils$1.loginRoute());
    }
  }, [session]);

  return __jsx$1(Link.AuthBasePage, null, __jsx$1("h1", null, "Logout"), __jsx$1("div", {
    className: "intro"
  }, "Are sure you want to logout?"), __jsx$1("div", {
    className: "form"
  }));
};

var __jsx$2 = React__default.createElement;

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

  return __jsx$2(Link.AuthBasePage, null, session._ready ? __jsx$2(React__default.Fragment, null, success ? __jsx$2(React__default.Fragment, null, __jsx$2("h1", null, "What next?"), __jsx$2("div", {
    className: "options"
  }, __jsx$2(NextLink, {
    href: utils$1.settingsProfileRoute()
  }, __jsx$2("a", {
    className: "option"
  }, __jsx$2("div", {
    className: "icon"
  }, __jsx$2("img", {
    src: "/img/icons/user-1a73e8.svg",
    width: "38"
  })), __jsx$2("div", {
    className: "details"
  }, __jsx$2("div", {
    className: "heading"
  }, "Setup your profile"), __jsx$2("div", {
    className: "description"
  }, "Whether you're a creator or a fan, the next step is to set your name and picture. Click here to edit your profile.")))))) : __jsx$2(React__default.Fragment, null, __jsx$2("h1", null, "Create a password"), __jsx$2("div", {
    className: "intro"
  }, "Let's create a password for you to use when you login"), __jsx$2("div", {
    className: "form"
  }))) : __jsx$2("p", null, "Spinner"));
};

var __jsx$3 = React__default.createElement;

var ResetPage = function ResetPage() {
  useSession.useSession();
  var mailOptions = index.options.mail;

  var _useState = React.useState(),
      success = _useState[0],
      setSuccess = _useState[1];

  return __jsx$3(Link.AuthBasePage, null, success ? __jsx$3(React__default.Fragment, null, __jsx$3("h1", null, "Check your inbox"), __jsx$3("div", {
    className: "intro"
  }, __jsx$3("p", null, "If an account exists with this email address, an e-mail will be sent with further instructions."), __jsx$3("p", null, "You may need to check your spam folder or whitelist", ' ', mailOptions.fromEmail))) : __jsx$3(React__default.Fragment, null, __jsx$3("h1", null, "Forgot your password?"), __jsx$3("div", {
    className: "form"
  })));
};

exports.AutoLoginPage = AutoLoginPage;
exports.LogoutPage = LogoutPage;
exports.OnboardingPage = OnboardingPage;
exports.ResetPage = ResetPage;
