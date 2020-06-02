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
require('bcryptjs');
require('./utils-001fa7d1.js');
var utils$1$1 = require('./utils-997c78e5.js');
var utils$2 = require('./utils-a00ce781.js');
var React = require('react');
var React__default = _interopDefault(React);
var Link = require('./Link-52095e71.js');
require('prop-types');
require('clsx');
var Link$1$1 = _interopDefault(require('next/link'));
var router = require('next/router');
require('react-dom');
require('./UserContext-41109d68.js');
require('axios');
require('./utils-325de3e4.js');
var useSession = require('./useSession-54daacff.js');

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
        router$1.replace(utils$1$1.onboardingRoute());
      } else if (router$1.query.next) {
        window.location = decodeURIComponent(router$1.query.next);
      } else {
        router$1.replace(utils$1$1.homeRoute());
      }
    }
  }, [data]);
  return __jsx(Link.AuthBasePage, null, data && errors ? __jsx(React__default.Fragment, null, __jsx("h1", null, "There was a problem")) : __jsx("p", null, "Spinner"));
};

var __jsx$1 = React__default.createElement;

var LoginPage = function LoginPage() {
  var router$1 = router.useRouter();
  var session = useSession.useSession();

  var _useState = React.useState(),
      type = _useState[0],
      setType = _useState[1];

  var _useState2 = React.useState(),
      success = _useState2[0],
      setSuccess = _useState2[1];

  var _Elusive$options = index.options,
      mailOptions = _Elusive$options.mail,
      siteOptions = _Elusive$options.site;
  React.useEffect(function () {
    if (router$1.query.type) {
      if (utils$2.LOGIN_TYPES.includes(router$1.query.type)) {
        setType(router$1.query.type);
      } else {
        router$1.replace(utils$1$1.loginRoute());
      }
    } else {
      setType();
      setSuccess();
    }
  }, [router$1.query]);
  React.useEffect(function () {
    if (session._ready && session.isAuthenticated) {
      router$1.replace(utils$1$1.homeRoute());
    }
  }, [session]);

  var loginTypeRouteWithNext = function loginTypeRouteWithNext(type) {
    var url = "".concat(utils$1$1.loginRoute(), "?type=").concat(type);

    if (router$1.query.next) {
      url = "".concat(url, "&next=").concat(encodeURIComponent(router$1.query.next));
    }

    return url;
  };

  return __jsx$1(Link.AuthBasePage, null, type === utils$2.LOGIN_TYPE_PASSWORD && __jsx$1(React__default.Fragment, null, __jsx$1("h1", {
    className: "jsx-1275567024"
  }, "Login to ", siteOptions.name), __jsx$1("div", {
    className: "jsx-1275567024" + " " + "form"
  }), __jsx$1("div", {
    className: "jsx-1275567024" + " " + "footer"
  }, __jsx$1(Link$1$1, {
    href: utils$1$1.resetRoute()
  }, __jsx$1("a", {
    className: "jsx-1275567024"
  }, "Forgot your password?")), "\xA0\xA0\u2022\xA0\xA0", __jsx$1(Link$1$1, {
    href: loginTypeRouteWithNext(utils$2.LOGIN_TYPE_LINK)
  }, __jsx$1("a", {
    className: "jsx-1275567024"
  }, "Email me a login link")))), type === utils$2.LOGIN_TYPE_LINK && __jsx$1(React__default.Fragment, null, success ? __jsx$1(React__default.Fragment, null, __jsx$1("h1", {
    className: "jsx-1275567024"
  }, "Check your inbox"), __jsx$1("div", {
    className: "jsx-1275567024" + " " + "intro"
  }, __jsx$1("p", {
    className: "jsx-1275567024"
  }, "We have sent you an email with an automatic login link."), __jsx$1("p", {
    className: "jsx-1275567024"
  }, "You may need to check your spam folder or whitelist", ' ', mailOptions.fromEmail))) : __jsx$1(React__default.Fragment, null, __jsx$1("h1", {
    className: "jsx-1275567024"
  }, "Login to ", siteOptions.name), __jsx$1("div", {
    className: "jsx-1275567024" + " " + "form"
  }), __jsx$1("div", {
    className: "jsx-1275567024" + " " + "footer"
  }, __jsx$1(Link$1$1, {
    href: loginTypeRouteWithNext(utils$2.LOGIN_TYPE_PASSWORD)
  }, __jsx$1("a", {
    className: "jsx-1275567024"
  }, "Use password"))))), !type && __jsx$1(React__default.Fragment, null, __jsx$1("h1", {
    className: "jsx-1275567024"
  }, "How do you want to login?"), __jsx$1("div", {
    className: "jsx-1275567024" + " " + "options"
  }, __jsx$1(Link$1$1, {
    href: loginTypeRouteWithNext(utils$2.LOGIN_TYPE_PASSWORD)
  }, __jsx$1("a", {
    className: "jsx-1275567024" + " " + "option"
  }, __jsx$1("div", {
    className: "jsx-1275567024" + " " + "icon"
  }, __jsx$1("img", {
    src: "/img/icons/password-1a73e8.svg",
    width: "38",
    className: "jsx-1275567024"
  })), __jsx$1("div", {
    className: "jsx-1275567024" + " " + "text"
  }, "Login with my password"))), __jsx$1(Link$1$1, {
    href: loginTypeRouteWithNext(utils$2.LOGIN_TYPE_LINK)
  }, __jsx$1("a", {
    className: "jsx-1275567024" + " " + "option"
  }, __jsx$1("div", {
    className: "jsx-1275567024" + " " + "icon"
  }, __jsx$1("img", {
    src: "/img/icons/email-1a73e8.svg",
    width: "38",
    className: "jsx-1275567024"
  })), __jsx$1("div", {
    className: "jsx-1275567024" + " " + "text"
  }, "Email me a login link"))))), __jsx$1(Link.style, {
    id: "1275567024"
  }, ".options.jsx-1275567024{text-align:center;}a.option.jsx-1275567024{display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;vertical-align:top;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;justify-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;width:150px;height:150px;border:2px solid #78a7e6;border-radius:3px;margin:0 12px;padding:20px;font-weight:bold;cursor:pointer;-webkit-transition:0.15s ease-in-out -webkit-transform, 0.15s ease-in-out border-color;-webkit-transition:0.15s ease-in-out transform, 0.15s ease-in-out border-color;transition:0.15s ease-in-out transform, 0.15s ease-in-out border-color;background-color:#fff;font-size:16px;}a.option.jsx-1275567024:hover{border-color:#f90;-webkit-text-decoration:none;text-decoration:none;-webkit-transform:scale(1.025);-ms-transform:scale(1.025);transform:scale(1.025);-webkit-text-decoration:none !important;text-decoration:none !important;}.icon.jsx-1275567024{-webkit-flex:1;-ms-flex:1;flex:1;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;}.text.jsx-1275567024{margin-top:10px;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkxvZ2luUGFnZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUF3SWtCLEFBRzZCLEFBSUUsQUFxQkYsQUFPWCxBQUtTLGdCQUNsQixFQXJDQSxBQXlCdUIsZUFPUixtQ0FOVSxrQ0F0QkQsS0E2QnhCLDBDQU5rQywrQkF0QmIsbUJBQ0Esc0JBc0JyQix1RUFyQnVCLHFCQUNFLG1HQUNYLFlBQ0MsYUFDWSx5QkFDUCxrQkFDSixjQUNELGFBQ0ksaUJBQ0YsZUFFaUIsNk9BQ1Ysc0JBQ1AsZUFDakIiLCJmaWxlIjoiTG9naW5QYWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExpbmsgZnJvbSAnbmV4dC9saW5rJztcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gJ25leHQvcm91dGVyJztcbmltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgRWx1c2l2ZSBmcm9tICcuLi8nO1xuaW1wb3J0IHsgTE9HSU5fVFlQRV9MSU5LLCBMT0dJTl9UWVBFX1BBU1NXT1JELCBMT0dJTl9UWVBFUyB9IGZyb20gJy4uL2F1dGgnO1xuaW1wb3J0IHtcbiAgQXV0aEJhc2VQYWdlLFxuICAvLyBMb2dpbldpdGhMaW5rRm9ybSxcbiAgLy8gTG9naW5XaXRoUGFzc3dvcmRGb3JtLFxufSBmcm9tICcuLi9jb21wb25lbnRzJztcbmltcG9ydCB7IHVzZVNlc3Npb24gfSBmcm9tICcuLi9ob29rcyc7XG5pbXBvcnQgeyBob21lUm91dGUsIGxvZ2luUm91dGUsIHJlc2V0Um91dGUgfSBmcm9tICcuLi9yb3V0ZXMnO1xuXG5jb25zdCBMb2dpblBhZ2UgPSAoKSA9PiB7XG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xuICBjb25zdCBzZXNzaW9uID0gdXNlU2Vzc2lvbigpO1xuICBjb25zdCBbdHlwZSwgc2V0VHlwZV0gPSB1c2VTdGF0ZSgpO1xuICBjb25zdCBbc3VjY2Vzcywgc2V0U3VjY2Vzc10gPSB1c2VTdGF0ZSgpO1xuICBjb25zdCB7IG1haWw6IG1haWxPcHRpb25zLCBzaXRlOiBzaXRlT3B0aW9ucyB9ID0gRWx1c2l2ZS5vcHRpb25zO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHJvdXRlci5xdWVyeS50eXBlKSB7XG4gICAgICBpZiAoTE9HSU5fVFlQRVMuaW5jbHVkZXMocm91dGVyLnF1ZXJ5LnR5cGUpKSB7XG4gICAgICAgIHNldFR5cGUocm91dGVyLnF1ZXJ5LnR5cGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcm91dGVyLnJlcGxhY2UobG9naW5Sb3V0ZSgpKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgc2V0VHlwZSgpO1xuICAgICAgc2V0U3VjY2VzcygpO1xuICAgIH1cbiAgfSwgW3JvdXRlci5xdWVyeV0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHNlc3Npb24uX3JlYWR5ICYmIHNlc3Npb24uaXNBdXRoZW50aWNhdGVkKSB7XG4gICAgICByb3V0ZXIucmVwbGFjZShob21lUm91dGUoKSk7XG4gICAgfVxuICB9LCBbc2Vzc2lvbl0pO1xuXG4gIGNvbnN0IGxvZ2luVHlwZVJvdXRlV2l0aE5leHQgPSAodHlwZSkgPT4ge1xuICAgIGxldCB1cmwgPSBgJHtsb2dpblJvdXRlKCl9P3R5cGU9JHt0eXBlfWA7XG5cbiAgICBpZiAocm91dGVyLnF1ZXJ5Lm5leHQpIHtcbiAgICAgIHVybCA9IGAke3VybH0mbmV4dD0ke2VuY29kZVVSSUNvbXBvbmVudChyb3V0ZXIucXVlcnkubmV4dCl9YDtcbiAgICB9XG5cbiAgICByZXR1cm4gdXJsO1xuICB9O1xuXG4gIGNvbnN0IG9uUGFzc3dvcmRTdWNjZXNzID0gKCkgPT4ge1xuICAgIGxldCBuZXh0ID0gaG9tZVJvdXRlKCk7XG4gICAgaWYgKHJvdXRlci5xdWVyeS5uZXh0KSB7XG4gICAgICBuZXh0ID0gZGVjb2RlVVJJQ29tcG9uZW50KHJvdXRlci5xdWVyeS5uZXh0KTtcbiAgICB9XG4gICAgd2luZG93LmxvY2F0aW9uID0gbmV4dDtcbiAgfTtcblxuICBjb25zdCBvbkxpbmtTdWNjZXNzID0gKCkgPT4gc2V0U3VjY2Vzcyh0cnVlKTtcblxuICByZXR1cm4gKFxuICAgIDxBdXRoQmFzZVBhZ2U+XG4gICAgICB7dHlwZSA9PT0gTE9HSU5fVFlQRV9QQVNTV09SRCAmJiAoXG4gICAgICAgIDw+XG4gICAgICAgICAgPGgxPkxvZ2luIHRvIHtzaXRlT3B0aW9ucy5uYW1lfTwvaDE+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtXCI+XG4gICAgICAgICAgICB7LyogPExvZ2luV2l0aFBhc3N3b3JkRm9ybSBvblN1Y2Nlc3M9e29uUGFzc3dvcmRTdWNjZXNzfSAvPiovfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9vdGVyXCI+XG4gICAgICAgICAgICA8TGluayBocmVmPXtyZXNldFJvdXRlKCl9PlxuICAgICAgICAgICAgICA8YT5Gb3Jnb3QgeW91ciBwYXNzd29yZD88L2E+XG4gICAgICAgICAgICA8L0xpbms+XG4gICAgICAgICAgICAmbmJzcDsmbmJzcDsmYnVsbDsmbmJzcDsmbmJzcDtcbiAgICAgICAgICAgIDxMaW5rIGhyZWY9e2xvZ2luVHlwZVJvdXRlV2l0aE5leHQoTE9HSU5fVFlQRV9MSU5LKX0+XG4gICAgICAgICAgICAgIDxhPkVtYWlsIG1lIGEgbG9naW4gbGluazwvYT5cbiAgICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC8+XG4gICAgICApfVxuICAgICAge3R5cGUgPT09IExPR0lOX1RZUEVfTElOSyAmJiAoXG4gICAgICAgIDw+XG4gICAgICAgICAge3N1Y2Nlc3MgPyAoXG4gICAgICAgICAgICA8PlxuICAgICAgICAgICAgICA8aDE+Q2hlY2sgeW91ciBpbmJveDwvaDE+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW50cm9cIj5cbiAgICAgICAgICAgICAgICA8cD5XZSBoYXZlIHNlbnQgeW91IGFuIGVtYWlsIHdpdGggYW4gYXV0b21hdGljIGxvZ2luIGxpbmsuPC9wPlxuICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgWW91IG1heSBuZWVkIHRvIGNoZWNrIHlvdXIgc3BhbSBmb2xkZXIgb3Igd2hpdGVsaXN0eycgJ31cbiAgICAgICAgICAgICAgICAgIHttYWlsT3B0aW9ucy5mcm9tRW1haWx9XG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvPlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8PlxuICAgICAgICAgICAgICA8aDE+TG9naW4gdG8ge3NpdGVPcHRpb25zLm5hbWV9PC9oMT5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtXCI+XG4gICAgICAgICAgICAgICAgey8qIDxMb2dpbldpdGhMaW5rRm9ybSBvblN1Y2Nlc3M9e29uTGlua1N1Y2Nlc3N9IC8+Ki99XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvb3RlclwiPlxuICAgICAgICAgICAgICAgIDxMaW5rIGhyZWY9e2xvZ2luVHlwZVJvdXRlV2l0aE5leHQoTE9HSU5fVFlQRV9QQVNTV09SRCl9PlxuICAgICAgICAgICAgICAgICAgPGE+VXNlIHBhc3N3b3JkPC9hPlxuICAgICAgICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8Lz5cbiAgICAgICAgICApfVxuICAgICAgICA8Lz5cbiAgICAgICl9XG4gICAgICB7IXR5cGUgJiYgKFxuICAgICAgICA8PlxuICAgICAgICAgIDxoMT5Ib3cgZG8geW91IHdhbnQgdG8gbG9naW4/PC9oMT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9wdGlvbnNcIj5cbiAgICAgICAgICAgIDxMaW5rIGhyZWY9e2xvZ2luVHlwZVJvdXRlV2l0aE5leHQoTE9HSU5fVFlQRV9QQVNTV09SRCl9PlxuICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJvcHRpb25cIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImljb25cIj5cbiAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiL2ltZy9pY29ucy9wYXNzd29yZC0xYTczZTguc3ZnXCIgd2lkdGg9XCIzOFwiIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0XCI+TG9naW4gd2l0aCBteSBwYXNzd29yZDwvZGl2PlxuICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICA8L0xpbms+XG4gICAgICAgICAgICA8TGluayBocmVmPXtsb2dpblR5cGVSb3V0ZVdpdGhOZXh0KExPR0lOX1RZUEVfTElOSyl9PlxuICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJvcHRpb25cIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImljb25cIj5cbiAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiL2ltZy9pY29ucy9lbWFpbC0xYTczZTguc3ZnXCIgd2lkdGg9XCIzOFwiIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0XCI+RW1haWwgbWUgYSBsb2dpbiBsaW5rPC9kaXY+XG4gICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICB7LyogPGRpdiBjbGFzc05hbWU9XCJmb290ZXJcIj5cbiAgICAgICAgICAgIDxMaW5rIGhyZWY9e3NpZ251cFJvdXRlKCl9PlxuICAgICAgICAgICAgICA8YT5DcmVhdGUgYW4gYWNjb3VudCBpbnN0ZWFkPC9hPlxuICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgPC9kaXY+Ki99XG4gICAgICAgIDwvPlxuICAgICAgKX1cblxuICAgICAgPHN0eWxlIGpzeD57YFxuICAgICAgICAub3B0aW9ucyB7XG4gICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgYS5vcHRpb24ge1xuICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgICAgdmVydGljYWwtYWxpZ246IHRvcDtcbiAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgICB3aWR0aDogMTUwcHg7XG4gICAgICAgICAgaGVpZ2h0OiAxNTBweDtcbiAgICAgICAgICBib3JkZXI6IDJweCBzb2xpZCAjNzhhN2U2O1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgICAgICAgICBtYXJnaW46IDAgMTJweDtcbiAgICAgICAgICBwYWRkaW5nOiAyMHB4O1xuICAgICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgICB0cmFuc2l0aW9uOiAwLjE1cyBlYXNlLWluLW91dCB0cmFuc2Zvcm0sXG4gICAgICAgICAgICAwLjE1cyBlYXNlLWluLW91dCBib3JkZXItY29sb3I7XG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbiAgICAgICAgICBmb250LXNpemU6IDE2cHg7XG4gICAgICAgIH1cblxuICAgICAgICBhLm9wdGlvbjpob3ZlciB7XG4gICAgICAgICAgYm9yZGVyLWNvbG9yOiAjZjkwO1xuICAgICAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMDI1KTtcbiAgICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmUgIWltcG9ydGFudDtcbiAgICAgICAgfVxuXG4gICAgICAgIC5pY29uIHtcbiAgICAgICAgICBmbGV4OiAxO1xuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIH1cblxuICAgICAgICAudGV4dCB7XG4gICAgICAgICAgbWFyZ2luLXRvcDogMTBweDtcbiAgICAgICAgfVxuICAgICAgYH08L3N0eWxlPlxuICAgIDwvQXV0aEJhc2VQYWdlPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTG9naW5QYWdlO1xuIl19 */\n/*@ sourceURL=LoginPage.js */"));
};

var __jsx$2 = React__default.createElement;

var LogoutPage = function LogoutPage() {
  var router$1 = router.useRouter();
  var session = useSession.useSession();
  React.useEffect(function () {
    if (session._ready && !session.isAuthenticated) {
      router$1.replace(utils$1$1.loginRoute());
    }
  }, [session]);

  return __jsx$2(Link.AuthBasePage, null, __jsx$2("h1", null, "Logout"), __jsx$2("div", {
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

  return __jsx$3(Link.AuthBasePage, null, session._ready ? __jsx$3(React__default.Fragment, null, success ? __jsx$3(React__default.Fragment, null, __jsx$3("h1", null, "What next?"), __jsx$3("div", {
    className: "options"
  }, __jsx$3(Link$1$1, {
    href: utils$1$1.settingsProfileRoute()
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
  var mailOptions = index.options.mail;

  var _useState = React.useState(),
      success = _useState[0],
      setSuccess = _useState[1];

  return __jsx$4(Link.AuthBasePage, null, success ? __jsx$4(React__default.Fragment, null, __jsx$4("h1", null, "Check your inbox"), __jsx$4("div", {
    className: "intro"
  }, __jsx$4("p", null, "If an account exists with this email address, an e-mail will be sent with further instructions."), __jsx$4("p", null, "You may need to check your spam folder or whitelist", ' ', mailOptions.fromEmail))) : __jsx$4(React__default.Fragment, null, __jsx$4("h1", null, "Forgot your password?"), __jsx$4("div", {
    className: "form"
  })));
};

exports.AutoLoginPage = AutoLoginPage;
exports.LoginPage = LoginPage;
exports.LogoutPage = LogoutPage;
exports.OnboardingPage = OnboardingPage;
exports.ResetPage = ResetPage;
